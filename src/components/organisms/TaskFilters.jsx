import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const TaskFilters = ({ 
  currentFilter = 'all',
  onFilterChange,
  taskCounts = {}
}) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: 'List', count: taskCounts.all || 0 },
    { id: 'today', label: 'Due Today', icon: 'Calendar', count: taskCounts.today || 0 },
    { id: 'overdue', label: 'Overdue', icon: 'AlertCircle', count: taskCounts.overdue || 0 },
    { id: 'pending', label: 'Pending', icon: 'Clock', count: taskCounts.pending || 0 },
    { id: 'high', label: 'High Priority', icon: 'AlertTriangle', count: taskCounts.high || 0 }
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(filter.id)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
            ${currentFilter === filter.id
              ? 'bg-primary text-white shadow-button'
              : 'bg-white text-surface-700 hover:bg-surface-50 border border-surface-200'
            }
          `}
        >
          <ApperIcon name={filter.icon} size={14} />
          <span>{filter.label}</span>
          {filter.count > 0 && (
            <span className={`
              px-1.5 py-0.5 rounded-full text-xs font-semibold
              ${currentFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-surface-100 text-surface-600'
              }
            `}>
              {filter.count}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default TaskFilters