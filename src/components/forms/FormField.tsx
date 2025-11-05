import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface FormFieldProps {
  label: string
  error?: string
  component?: 'input' | 'textarea' | 'select'
  children?: React.ReactNode
  className?: string
  rows?: number
  [key: string]: any
}

export const FormField = forwardRef<any, FormFieldProps>(
  ({ label, error, component = 'input', className, children, ...props }, ref) => {
    const baseStyles = "w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base transition-colors"
    const errorStyles = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
    
    const Component = component
    
    return (
      <div className="space-y-1 sm:space-y-2">
        <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <Component
          ref={ref}
          className={cn(baseStyles, errorStyles, className)}
          {...props}
        >
          {children}
        </Component>
        {error && (
          <p className="text-red-500 text-xs sm:text-sm">{error}</p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'