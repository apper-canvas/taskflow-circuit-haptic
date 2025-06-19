import { toast } from 'react-toastify';

// Initialize ApperClient
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'category';

const categoryService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "task_count" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
      return [];
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "task_count" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, parseInt(id, 10), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      toast.error("Failed to fetch category");
      return null;
    }
  },

  async create(categoryData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Name: categoryData.Name || categoryData.name || '',
        Tags: categoryData.Tags || '',
        Owner: categoryData.Owner || null,
        color: categoryData.color || '#5B4FE9',
        icon: categoryData.icon || 'Folder',
        task_count: categoryData.task_count || categoryData.taskCount || 0
      };

      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success("Category created successfully");
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
      return null;
    }
  },

  async update(id, updateData) {
    try {
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id, 10),
        ...(updateData.Name !== undefined && { Name: updateData.Name }),
        ...(updateData.name !== undefined && { Name: updateData.name }),
        ...(updateData.Tags !== undefined && { Tags: updateData.Tags }),
        ...(updateData.Owner !== undefined && { Owner: updateData.Owner }),
        ...(updateData.color !== undefined && { color: updateData.color }),
        ...(updateData.icon !== undefined && { icon: updateData.icon }),
        ...(updateData.task_count !== undefined && { task_count: updateData.task_count }),
        ...(updateData.taskCount !== undefined && { task_count: updateData.taskCount })
      };

      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success("Category updated successfully");
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
      return null;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id, 10)]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success("Category deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
      return false;
    }
  }
};

export default categoryService;