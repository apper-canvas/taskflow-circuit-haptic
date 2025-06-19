import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { isToday, isPast, parseISO } from 'date-fns'
import { taskService, categoryService } from '@/services'
import TaskList from '@/components/organisms/TaskList'
import TaskFilters from '@/components/organisms/TaskFilters'
import SkeletonLoader from '@/components/molecules/SkeletonLoader'
import ErrorState from '@/components/molecules/ErrorState'
import QuickAddModal from '@/components/organisms/QuickAddModal'

function Tasks() {
  const { searchQuery } = useOutletContext()
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentFilter, setCurrentFilter] = useState('all')
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      setError(err.message || 'Failed to load data')
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find(t => t.Id === taskId)
    if (!task) return

    try {
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed
      })
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ))
      
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task marked as pending')
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const handleEditTask = (task) => {
    // For now, we'll just show the quick add modal
    // In a full implementation, this would open an edit modal
    console.log('Edit task:', task)
  }

  // Filter tasks based on current filter and search query
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = task.title.toLowerCase().includes(query) ||
        (task.notes && task.notes.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }

    // Category/status filters
    switch (currentFilter) {
      case 'today':
        return task.dueDate && isToday(parseISO(task.dueDate))
      case 'overdue':
        return task.dueDate && isPast(parseISO(task.dueDate)) && !task.completed
      case 'pending':
        return !task.completed
      case 'high':
        return task.priority === 'high'
      default:
        return true
    }
  })

  // Calculate task counts for filters
  const taskCounts = {
    all: tasks.length,
    today: tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate))).length,
    overdue: tasks.filter(t => t.dueDate && isPast(parseISO(t.dueDate)) && !t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high').length
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
              My Tasks
            </h1>
            <p className="text-surface-600">
              Manage your daily tasks and stay productive
            </p>
          </div>
          <SkeletonLoader count={5} />
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
          <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">
            My Tasks
          </h1>
          <p className="text-surface-600">
            {tasks.length === 0 
              ? 'Get started by creating your first task'
              : `${tasks.filter(t => !t.completed).length} pending of ${tasks.length} total tasks`
            }
          </p>
        </div>

        {/* Filters */}
        {tasks.length > 0 && (
          <TaskFilters
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            taskCounts={taskCounts}
          />
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          categories={categories}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          emptyStateProps={{
            title: searchQuery 
              ? 'No tasks match your search'
              : currentFilter === 'all'
                ? 'No tasks yet'
                : `No ${currentFilter} tasks`,
            description: searchQuery
              ? `Try adjusting your search terms or clear the search to see all tasks.`
              : currentFilter === 'all'
                ? 'Create your first task to get started with TaskFlow.'
                : `You don't have any ${currentFilter} tasks at the moment.`,
            actionLabel: 'Add Task',
            onAction: () => setIsQuickAddOpen(true)
          }}
        />

        {/* Quick Add Modal */}
        <QuickAddModal
          isOpen={isQuickAddOpen}
          onClose={() => setIsQuickAddOpen(false)}
        />
      </div>
    </motion.div>
  )
}

export default Tasks