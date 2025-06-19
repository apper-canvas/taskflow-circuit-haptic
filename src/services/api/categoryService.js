import categoryData from '../mockData/categories.json'

// Helper function to add delay for realistic API simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let categories = [...categoryData]

const categoryService = {
  async getAll() {
    await delay(300)
    return [...categories]
  },

  async getById(id) {
    await delay(200)
    const category = categories.find(cat => cat.Id === parseInt(id, 10))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      taskCount: 0
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updateData) {
    await delay(250)
    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id, 10))
    if (categoryIndex === -1) {
      throw new Error('Category not found')
    }
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...updateData,
      Id: categories[categoryIndex].Id // Preserve ID
    }
    
    categories[categoryIndex] = updatedCategory
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay(200)
    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id, 10))
    if (categoryIndex === -1) {
      throw new Error('Category not found')
    }
    
    categories.splice(categoryIndex, 1)
    return true
  }
}

export default categoryService