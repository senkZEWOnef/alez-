import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  description?: string
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, error, description, className, ...props }, ref) => {
    return (
      <div className="space-y-1 sm:space-y-2">
        <div className="flex items-start space-x-3">
          <input
            ref={ref}
            type="checkbox"
            className={cn(
              "mt-0.5 w-4 h-4 sm:w-5 sm:h-5 text-primary-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          <div className="flex-1">
            <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              {label}
            </label>
            {description && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs sm:text-sm ml-7">{error}</p>
        )}
      </div>
    )
  }
)

CheckboxField.displayName = 'CheckboxField'