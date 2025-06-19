import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ checked, onChange, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onChange}
      className={`
        ${sizes[size]} 
        ${checked 
          ? 'bg-primary border-primary text-white' 
          : 'bg-white border-surface-300 hover:border-primary'
        }
        border-2 rounded flex items-center justify-center transition-all
        focus:outline-none focus:ring-2 focus:ring-primary/20
        ${className}
      `}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <ApperIcon name="Check" size={iconSizes[size]} />
        </motion.div>
      )}
    </motion.button>
  )
}

export default Checkbox