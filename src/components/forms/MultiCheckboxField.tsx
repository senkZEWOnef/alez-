import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

interface Option {
  value: string
  label: string
  description?: string
}

interface MultiCheckboxFieldProps {
  label: string
  options: Option[]
  value?: string[]
  onChange: (values: string[]) => void
  error?: string
  className?: string
}

export const MultiCheckboxField = forwardRef<HTMLDivElement, MultiCheckboxFieldProps>(
  ({ label, options, value = [], onChange, error, className }, ref) => {
    const handleChange = (optionValue: string, checked: boolean) => {
      if (checked) {
        onChange([...value, optionValue])
      } else {
        onChange(value.filter(v => v !== optionValue))
      }
    }

    return (
      <div ref={ref} className={cn("space-y-2 sm:space-y-3", className)}>
        <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="space-y-2 sm:space-y-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={option.value}
                checked={value.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className={cn(
                  "mt-0.5 w-4 h-4 sm:w-5 sm:h-5 text-primary-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800",
                  error && "border-red-500 focus:ring-red-500"
                )}
              />
              <div className="flex-1">
                <label 
                  htmlFor={option.value}
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-xs sm:text-sm">{error}</p>
        )}
      </div>
    )
  }
)

MultiCheckboxField.displayName = 'MultiCheckboxField'