import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label, 
  error, 
  icon, 
  type = 'text',
  className = '',
  ...props 
}, ref) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-surface-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <ApperIcon 
            name={icon} 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400"
          />
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full rounded-button border transition-all
            ${icon ? 'pl-10 pr-4' : 'px-4'} py-2.5
            ${error 
              ? 'border-error focus:ring-error/20 focus:border-error' 
              : 'border-surface-200 focus:ring-primary/20 focus:border-primary'
            }
            focus:outline-none focus:ring-2
            disabled:bg-surface-50 disabled:text-surface-500
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input