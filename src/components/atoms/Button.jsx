import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all rounded-button shadow-button focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white focus:ring-primary/20 disabled:bg-surface-300",
    secondary: "bg-white hover:bg-surface-50 text-surface-700 border border-surface-200 focus:ring-primary/20 disabled:bg-surface-100",
    accent: "bg-accent hover:bg-accent-hover text-white focus:ring-accent/20 disabled:bg-surface-300",
    ghost: "bg-transparent hover:bg-surface-100 text-surface-700 focus:ring-primary/20 disabled:text-surface-400"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2"
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" size={16} className="animate-spin" />}
      {!loading && icon && iconPosition === 'left' && <ApperIcon name={icon} size={16} />}
      {children}
      {!loading && icon && iconPosition === 'right' && <ApperIcon name={icon} size={16} />}
    </motion.button>
  )
}

export default Button