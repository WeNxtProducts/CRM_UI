/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format, parse, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

export function DatePickerDemo({ date, setDate, label = 'Select Date' }: any) {
	const [open, setOpen] = React.useState(false)
	const [inputValue, setInputValue] = React.useState(date ? format(date, 'dd-MM-yyyy') : '')
	const inputRef = React.useRef<HTMLInputElement>(null)
	const uniqueId = React.useId() // Generate a unique id for each instance

	// Helper to format the string as "YYYY-MM-DD" while allowing only numbers
	const formatDateInput = (value: string) => {
		const digits = value.replace(/\D/g, '')
		let result = ''
		if (digits.length > 0) {
			result += digits.substring(0, 4)
		}
		if (digits.length >= 5) {
			result += '-' + digits.substring(4, 6)
		}
		if (digits.length >= 7) {
			result += '-' + digits.substring(6, 8)
		}
		return result
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatDateInput(e.target.value)
		setInputValue(formattedValue)
		// When a full date is entered, parse and update state
		if (formattedValue.length === 10) {
			const parsedDate = parse(formattedValue, 'dd-MM-yyyy', new Date())
			if (isValid(parsedDate)) {
				setDate(parsedDate)
			}
		}
	}

	// Memoize the computed calendarMonth and calendarKey so that they update only when needed
	const { calendarMonth, calendarKey } = React.useMemo(() => {
		const parsedInputDate = parse(inputValue, 'dd-MM-yyyy', new Date())
		const month =
			inputValue.length === 10 && isValid(parsedInputDate) ? parsedInputDate : date || new Date()
		const key =
			uniqueId +
			'-' +
			(inputValue.length === 10 && isValid(parsedInputDate) ? inputValue : 'default-calendar')
		return { calendarMonth: month, calendarKey: key }
	}, [inputValue, date, uniqueId, label])

	return (
		<div className='flex flex-col gap-2'>
			<div className='relative w-full'>
				<Input
					ref={inputRef}
					label={label}
					type='text'
					placeholder='DD-MM-YYYY'
					value={inputValue}
					onChange={handleInputChange}
					onFocus={() => setOpen(true)}
					className='w-full pr-10'
					maxLength={10}
				/>
				<Popover
					open={open}
					key={`popover-${label}`}
					onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<div className='absolute bottom-[10px] right-3 cursor-pointer'>
							<CalendarIcon
								className='h-4 w-4 text-muted-foreground'
								onClick={() => setOpen(true)}
							/>
						</div>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto p-0'
						onOpenAutoFocus={(e) => e.preventDefault()}>
						<Calendar
							key={calendarKey}
							mode='single'
							selected={date}
							defaultMonth={calendarMonth}
							onSelect={(selectedDate) => {
								if (selectedDate) {
									setDate(selectedDate)
									setInputValue(format(selectedDate, 'dd-MM-yyyy'))
								}
								setOpen(false)
								// Refocus the input if needed.
								inputRef.current?.focus()
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
