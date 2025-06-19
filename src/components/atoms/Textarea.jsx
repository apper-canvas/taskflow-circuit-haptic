import { forwardRef } from 'react'

const Textarea = forwardRef(({ 
  label, 
  error, 
  rows = 3,
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
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-2.5 rounded-button border transition-all resize-none
          ${error 
            ? 'border-error focus:ring-error/20 focus:border-error' 
            : 'border-surface-200 focus:ring-primary/20 focus:border-primary'
          }
          focus:outline-none focus:ring-2
          disabled:bg-surface-50 disabled:text-surface-500
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea