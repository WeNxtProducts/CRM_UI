/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePickerDemo({ date, setDate, label = 'Select Date' }: any) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full flex justify-between items-center text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(format(selectedDate, 'yyyy-MM-dd')) // Ensure selected date is stored in the correct format
              }
              setOpen(false) // Auto-close on select
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
