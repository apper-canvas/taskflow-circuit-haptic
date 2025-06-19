import { motion } from 'framer-motion'

const PriorityPill = ({ priority, className = '' }) => {
  const priorities = {
    high: {
      label: 'High',
      color: 'bg-error text-white',
      pulse: 'animate-pulse'
    },
    medium: {
      label: 'Medium',
      color: 'bg-warning text-white',
      pulse: ''
    },
    low: {
      label: 'Low',
      color: 'bg-surface-400 text-white',
      pulse: ''
    }
  }

  const config = priorities[priority] || priorities.low

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.pulse} ${className}`}
    >
      {config.label}
    </motion.span>
  )
}

export default PriorityPill