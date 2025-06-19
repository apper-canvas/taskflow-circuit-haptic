import { motion } from 'framer-motion'
import { useState } from 'react'

const CategoryDot = ({ color, name, size = 'sm' }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className="relative">
      <motion.div
        className={`${sizes[size]} rounded-full cursor-pointer`}
        style={{ backgroundColor: color }}
        whileHover={{ scale: 1.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      />
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 5 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface-900 text-white text-xs rounded whitespace-nowrap z-10"
        >
          {name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-surface-900" />
        </motion.div>
      )}
    </div>
  )
}

export default CategoryDot