import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { categoryService } from '@/services'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import SkeletonLoader from '@/components/molecules/SkeletonLoader'
import ErrorState from '@/components/molecules/ErrorState'
import EmptyState from '@/components/molecules/EmptyState'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(err.message || 'Failed to load categories')
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    try {
      await categoryService.delete(categoryId)
      setCategories(prev => prev.filter(c => c.Id !== categoryId))
      toast.success('Category deleted successfully')
    } catch (err) {
      toast.error('Failed to delete category')
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
              Categories
            </h1>
            <p className="text-surface-600">
              Organize your tasks with custom categories
            </p>
          </div>
          <SkeletonLoader count={3} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <ErrorState message={error} onRetry={loadCategories} />
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
              Categories
            </h1>
            <p className="text-surface-600">
              Organize your tasks with custom categories
            </p>
          </div>
          <EmptyState
            icon="FolderOpen"
            title="No categories yet"
            description="Create custom categories to organize your tasks more effectively."
            actionLabel="Create Category"
            onAction={() => console.log('Create category')}
          />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
              Categories
            </h1>
            <p className="text-surface-600">
              {categories.length} categories to organize your tasks
            </p>
          </div>
          <Button icon="Plus" onClick={() => console.log('Create category')}>
            New Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              }}
              whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)' }}
              className="bg-white rounded-card shadow-card p-6 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <ApperIcon 
                      name={category.icon} 
                      size={20} 
                      style={{ color: category.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-surface-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-surface-600">
                      {category.taskCount} tasks
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteCategory(category.Id)}
                  className="p-2 text-surface-400 hover:text-error hover:bg-error/10 rounded-lg transition-all"
                >
                  <ApperIcon name="Trash2" size={16} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="bg-surface-100 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((category.taskCount / 20) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <span 
                  className="ml-3 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color
                  }}
                >
                  {category.taskCount}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Categories