"use client";

import React, { useState } from "react";
import { ToolbarProps } from "react-big-calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { startOfWeek, startOfMonth, startOfDay } from "date-fns";
import { MonthPicker } from "@/components/ui/monthPicker";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CustomToolbar: React.FC<ToolbarProps> = ({ label, onNavigate, onView, view }) => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false)

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);

    switch (view) {
      case "month":
        onNavigate("DATE", startOfMonth(date));
        break;
      case "week":
        onNavigate("DATE", startOfWeek(date));
        break;
      case "day":
        onNavigate("DATE", startOfDay(date));
        break;
      default:
        onNavigate("DATE", date);
        break;
    }
    setOpen(false)
  };

  return (
    <div className="rbc-toolbar">

      <Link href="/leadDashboard" className="flex items-center mr-3 text-sm text-blue-500 hover:text-blue-700 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </Link>
      <div className="flex items-center bg-[#E5E9F2] rounded-lg border border-primary h-[35px]">
        <div
          onClick={() => onNavigate("PREV")}
          className="h-full px-4 border border-r-primary text-sm cursor-pointer rounded-l-lg flex items-center justify-center hover:bg-primary hover:text-white"
        >
          Back
        </div>
        <div
          onClick={() => onNavigate("TODAY")}
          className="h-full px-4 text-sm cursor-pointer flex items-center justify-center hover:bg-primary hover:text-white"
        >
          Today
        </div>
        <div
          onClick={() => onNavigate("NEXT")}
          className="h-full px-4 border border-l-primary text-sm cursor-pointer rounded-r-lg flex items-center justify-center hover:bg-primary hover:text-white"
        >
          Next
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span className={cn(
            "rbc-toolbar-label cursor-pointer text-[15px] font-semibold text-[#0A1629]"
            , { "text-primary": open }
          )}
          >{label}</span>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {view === "month" ? (
            <MonthPicker onMonthSelect={handleDateChange} />
          ) : (
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
      <div className="rbc-btn-group">
        <div className="flex items-center bg-[#E5E9F2] rounded-lg border border-primary h-[35px]">
          <div
            onClick={() => onView("month")}
            className={cn(
              "h-full px-4 border border-r-primary text-sm cursor-pointer rounded-l-lg flex items-center justify-center hover:bg-primary hover:text-white",
              { "bg-primary text-white": view === "month" }
            )}
          >
            Month
          </div>
          <div
            onClick={() => onView("week")}
            className={cn(
              "h-full px-4 border border-l-primary text-sm cursor-pointer flex items-center justify-center hover:bg-primary hover:text-white",
              { "bg-primary text-white": view === "week" }
            )}
          >
            Week
          </div>
          <div
            onClick={() => onView("day")}
            className={cn("h-full px-4 border border-l-primary text-sm cursor-pointer rounded-r-lg flex items-center justify-center hover:bg-primary hover:text-white",
              { "bg-primary text-white": view === "day" }
            )}
          >
            Day
          </div>
          {/* <div
            onClick={() => onView("agenda")}
            className={cn("h-full px-4 border border-l-primary text-sm cursor-pointer rounded-r-lg flex items-center justify-center hover:bg-primary hover:text-white",
              { "bg-primary text-white": view === "agenda" }
            )}
          >
            Agenda
          </div> */}
        </div>
      </div>

    </div>
  );
};

export default CustomToolbar;
