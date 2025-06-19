import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

function NotFound() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="text-center max-w-md">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Search" size={48} className="text-primary/60" />
          </div>
        </motion.div>

        <h1 className="text-6xl font-display font-bold text-surface-900 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-display font-semibold text-surface-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            icon="ArrowLeft"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/tasks')}
            icon="Home"
          >
            Go to Tasks
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound