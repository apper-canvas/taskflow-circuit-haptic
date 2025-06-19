import { motion } from 'framer-motion'
import { useState } from 'react'
import { format, isToday, isPast, parseISO } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Checkbox from '@/components/atoms/Checkbox'
import PriorityPill from '@/components/atoms/PriorityPill'
import CategoryDot from '@/components/atoms/CategoryDot'

const TaskCard = ({ task, categories = [], onToggleComplete, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const category = categories.find(cat => cat.Id.toString() === task.categoryId)
  const dueDate = task.dueDate ? parseISO(task.dueDate) : null
  const isOverdue = dueDate && isPast(dueDate) && !task.completed
  const isDueToday = dueDate && isToday(dueDate)

  const handleToggleComplete = () => {
    onToggleComplete(task.Id)
    
    // Trigger confetti animation for completion
    if (!task.completed) {
      const confetti = document.createElement('div')
      confetti.className = 'fixed top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full confetti pointer-events-none z-50'
      document.body.appendChild(confetti)
      setTimeout(() => document.body.removeChild(confetti), 800)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
      className={`
        bg-white rounded-card shadow-card p-4 transition-all cursor-pointer
        ${task.completed ? 'opacity-75' : ''}
        ${isOverdue ? 'border-l-4 border-error' : ''}
        ${isDueToday ? 'border-l-4 border-warning' : ''}
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium text-surface-900 ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <PriorityPill priority={task.priority} />
              {category && (
                <CategoryDot color={category.color} name={category.name} />
              )}
            </div>
          </div>

          {/* Due date */}
          {dueDate && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              isOverdue ? 'text-error' : isDueToday ? 'text-warning' : 'text-surface-600'
            }`}>
              <ApperIcon name="Calendar" size={14} />
              <span>
                {isToday(dueDate) ? 'Today' : format(dueDate, 'MMM d, yyyy')}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          )}

          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            {task.notes && (
              <p className="text-sm text-surface-600 mt-3 p-3 bg-surface-50 rounded-lg">
                {task.notes}
              </p>
            )}
            
            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(task)
                }}
                className="flex items-center gap-1 px-2 py-1 text-sm text-surface-600 hover:text-primary hover:bg-primary/10 rounded transition-all"
              >
                <ApperIcon name="Edit2" size={14} />
                Edit
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(task.Id)
                }}
                className="flex items-center gap-1 px-2 py-1 text-sm text-surface-600 hover:text-error hover:bg-error/10 rounded transition-all"
              >
                <ApperIcon name="Trash2" size={14} />
                Delete
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard