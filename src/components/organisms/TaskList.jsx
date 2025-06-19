import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import EmptyState from '@/components/molecules/EmptyState'

const TaskList = ({ 
  tasks = [], 
  categories = [], 
  onToggleComplete, 
  onEdit, 
  onDelete,
  emptyStateProps = {}
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon="CheckSquare"
        title="No tasks found"
        description="Create your first task to get started with TaskFlow."
        actionLabel="Add Task"
        {...emptyStateProps}
      />
    )
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <TaskCard
              task={task}
              categories={categories}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList