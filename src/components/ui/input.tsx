'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
  label: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className='w-full'>
        {/* Label outside the field */}
        <label className='block text-xs font-medium text-topbar mb-2'>
          {label}
        </label>
        
        {/* Input field with placeholder inside */}
        <input
          type={type}
          className={cn(
            'h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-gray-400 placeholder:text-xxs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
