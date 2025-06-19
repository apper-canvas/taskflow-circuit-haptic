import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { taskService, categoryService } from '@/services'
import TaskList from '@/components/organisms/TaskList'
import SkeletonLoader from '@/components/molecules/SkeletonLoader'
import ErrorState from '@/components/molecules/ErrorState'
import EmptyState from '@/components/molecules/EmptyState'
import ApperIcon from '@/components/ApperIcon'

function Completed() {
  const [completedTasks, setCompletedTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getCompleted(),
        categoryService.getAll()
      ])
      setCompletedTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message || 'Failed to load completed tasks')
      toast.error('Failed to load completed tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (taskId) => {
    const task = completedTasks.find(t => t.Id === taskId)
    if (!task) return

    try {
      await taskService.update(taskId, { completed: false })
      setCompletedTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task marked as pending')
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await taskService.delete(taskId)
      setCompletedTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const handleEditTask = (task) => {
    console.log('Edit task:', task)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
              Completed Tasks
            </h1>
            <p className="text-surface-600">
              Your accomplishments and finished tasks
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
          <ErrorState message={error} onRetry={loadData} />
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-surface-900">
                Completed Tasks
              </h1>
              <p className="text-surface-600">
                {completedTasks.length === 0 
                  ? 'No completed tasks yet'
                  : `${completedTasks.length} tasks completed`
                }
              </p>
            </div>
          </div>

          {completedTasks.length > 0 && (
            <div className="bg-gradient-to-r from-success/10 to-success/5 rounded-xl p-4 border border-success/20">
              <div className="flex items-center gap-3">
                <ApperIcon name="Trophy" size={20} className="text-success" />
                <div>
                  <p className="font-medium text-success">
                    Great job! You've completed {completedTasks.length} tasks.
                  </p>
                  <p className="text-sm text-success/80">
                    Keep up the productive momentum!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Completed Tasks List */}
        <TaskList
          tasks={completedTasks}
          categories={categories}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          emptyStateProps={{
            icon: 'CheckCircle',
            title: 'No completed tasks yet',
            description: 'Complete some tasks to see them here. Your accomplishments will be displayed in this section.',
            actionLabel: null
          }}
        />
      </div>
    </motion.div>
  )
}

export default Completed