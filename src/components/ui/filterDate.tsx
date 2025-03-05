"use client"

import * as React from "react"
import { subDays, subYears, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type DateOption = "last7days" | "last30days" | "lastyear" | "selectRange"

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [dateOption, setDateOption] = React.useState<DateOption>("last7days")
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [isOpen, setIsOpen] = React.useState(false)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [hasSelectedCustomRange, setHasSelectedCustomRange] = React.useState(false)

  const handleOptionSelect = (option: DateOption) => {
    setDateOption(option)
    if (option === "last7days") {
      setDateRange({ from: subDays(new Date(), 7), to: new Date() })
      setIsOpen(false)
    } else if (option === "last30days") {
      setDateRange({ from: subDays(new Date(), 30), to: new Date() })
      setIsOpen(false)
    } else if (option === "lastyear") {
      setDateRange({ from: subYears(new Date(), 1), to: new Date() })
      setIsOpen(false)
    } else if (option === "selectRange") {
      setShowCalendar(true)
      setHasSelectedCustomRange(false)
    }
  }

  const handleCalendarSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange?.from && selectedRange?.to) {
      setDateRange(selectedRange)
      setDateOption("selectRange")
      setHasSelectedCustomRange(true)
    }
  }

  const handleApply = () => {
    setIsOpen(false)
    setShowCalendar(false)
    if (dateOption === "selectRange" && !hasSelectedCustomRange) {
      setDateOption("last7days")
      setDateRange({ from: subDays(new Date(), 7), to: new Date() })
    }
    console.log("Submitted date range:", dateRange)
  }

  const handleCancel = () => {
    setShowCalendar(false)
    if (!hasSelectedCustomRange) {
      setDateOption("last7days")
      setDateRange({ from: subDays(new Date(), 7), to: new Date() })
    }
  }

  const formatDateDisplay = () => {
    switch (dateOption) {
      case "last7days":
        return "Last 7 days"
      case "last30days":
        return "Last 30 days"
      case "lastyear":
        return "Last year"
      case "selectRange":
        return formatDateRange(dateRange)
      default:
        return "Select date range"
    }
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range || !range.from) return "Select date range"
    if (!range.to) return format(range.from, "LLL dd, y")
    return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
  }

  React.useEffect(() => {
    if (!isOpen) {
      setShowCalendar(dateOption === "selectRange" && hasSelectedCustomRange)
    }
  }, [isOpen, dateOption, hasSelectedCustomRange])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size='sm' role="combobox" aria-expanded={isOpen} className="w-[300px] justify-between">
            {formatDateDisplay()}
            <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {!showCalendar ? (
            <div className="p-2">
              <Button
                variant={dateOption === "last7days" ? "secondary" : "ghost"}
                size='sm'
                className="w-full justify-start font-normal"
                onClick={() => handleOptionSelect("last7days")}
              >
                Last 7 days
              </Button>
              <Button
                variant={dateOption === "last30days" ? "secondary" : "ghost"}
                size='sm'
                className="w-full justify-start font-normal"
                onClick={() => handleOptionSelect("last30days")}
              >
                Last 30 days
              </Button>
              <Button
                variant={dateOption === "lastyear" ? "secondary" : "ghost"}
                size='sm'
                className="w-full justify-start font-normal"
                onClick={() => handleOptionSelect("lastyear")}
              >
                Last year
              </Button>
              <Button
                variant={dateOption === "selectRange" ? "secondary" : "ghost"}
                size='sm'
                className="w-full justify-start font-normal"
                onClick={() => handleOptionSelect("selectRange")}
              >
                Select range
              </Button>
            </div>
          ) : (
            <>
              <div className="p-2">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleCalendarSelect}
                  numberOfMonths={1}
                />
              </div>
              <div className="flex justify-end gap-2 p-2 border-t border-border">
                <Button variant="outline" size='sm' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size='sm' onClick={handleApply}>Apply</Button>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

