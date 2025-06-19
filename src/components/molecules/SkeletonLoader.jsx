import { motion } from 'framer-motion'

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-card shadow-card p-4"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox skeleton */}
            <div className="w-5 h-5 bg-surface-200 rounded animate-pulse" />
            
            {/* Content skeleton */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gradient-to-r from-surface-200 via-surface-300 to-surface-200 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-surface-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-12 h-5 bg-surface-200 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-surface-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SkeletonLoader