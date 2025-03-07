import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export interface TimePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The current time value, formatted as "HH:MM". */
  value: string
  /** Callback fired when the time changes. */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Label text for the input. Defaults to "Time". */
  label?: string
  /** ID for the input element. Defaults to "time". */
  id?: string
}

export function TimePicker({
  value,
  onChange,
  label = "Time",
  id = "time",
  ...props
}: TimePickerProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative w-full">
        <Input
          label=''
          type="time"
          id={id}
          value={value}
          onChange={onChange}
          aria-label={`Choose ${label.toLowerCase()}`}
          className="w-full" // extra padding for the icon
          {...props}
        />
        <div className="absolute top-[17px] right-0 flex items-center pr-3 pointer-events-none">
          <ClockIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
