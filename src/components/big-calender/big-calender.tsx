/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import moment, { Moment } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// https://v0.dev/t/LQA2c4SCeP7
// import { SketchPicker } from "react-color";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TrashIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import './big-calender.scss';
import CustomToolbar from "./CustomToolbar";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

// 🚀 Event Type Definition
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
  allDay?: boolean;
}

// 🚀 Disabled Dates (Holidays)
const DISABLED_DATES: Moment[] = [
  moment("2025-01-01"), // New Year
  moment("2025-12-25"), // Christmas
  moment("2025-07-04"), // Independence Day
];

const CalendarComponent = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Meeting with Client",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      color: "#4CAF50",
    },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedColor, setSelectedColor] = useState<string>("#2196F3");
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const [view, setView] = useState<View>("month");
  const [isDateRange, setIsDateRange] = useState<boolean>(false);

  // 📌 Disabled Date Logic
  const disabledDate = (current: Moment): boolean => {
    return (
      current.day() === 0 || // Sunday
      current.day() === 6 || // Saturday
      DISABLED_DATES.some((d) => d.isSame(current, "day"))
    );
  };

  // 📌 Select slot (new event)
  const handleSelectSlot = ({ start }: SlotInfo) => {
    if (disabledDate(moment(start))) return;
    setCurrentEvent(null);
    setTitle("");
    setStartDate(start);
    setEndDate(moment(start).add(1, "hour").toDate());
    setSelectedColor("#2196F3");
    setIsDateRange(false);
    setModalVisible(true);
  };

  // 📌 Select event (edit event)
  const handleSelectEvent = (event: any) => {
    setCurrentEvent(event);
    setTitle(event.title);
    setStartDate(event.start);
    setEndDate(event.end);
    setSelectedColor(event.color);
    setIsAllDay(event.allDay || false);
    setIsDateRange(event.start !== event.end);
    setModalVisible(true);
  };

  // 📌 Handle save/update event
  const handleSave = () => {
    if (!title.trim()) return;
    const newEvent: CalendarEvent = {
      id: currentEvent ? currentEvent.id : Math.random(),
      title,
      start: isDateRange ? startDate! : moment(startDate).toDate(),
      end: isDateRange ? endDate! : moment(startDate).add(1, "hour").toDate(),
      color: selectedColor,
      allDay: isAllDay,
    };

    setEvents((prev) =>
      currentEvent ? prev.map((e) => (e.id === currentEvent.id ? newEvent : e)) : [...prev, newEvent]
    );

    setModalVisible(false);
  };

  // 📌 Handle delete event
  const handleDelete = () => {
    if (currentEvent) {
      setEvents((prev) => prev.filter((e) => e.id !== currentEvent.id));
      setModalVisible(false);
    }
  };

  // 📌 Drag event
  const onEventDrop = ({ event, start, end }: any) => {
    setEvents((prev: any) =>
      prev.map((e: any) =>
        e.id === event.id ? { ...e, start, end } : e
      )
    );
  };

  // 📌 Resize event
  const onEventResize = ({ event, start, end }: any) => {
    setEvents((prev: any) =>
      prev.map((e: any) =>
        e.id === event.id ? { ...e, start, end } : e
      )
    );
  };

  // 🎨 Custom event styling
  const eventStyleGetter = (event: object) => {
    const calendarEvent = event as CalendarEvent;
    return {
      style: {
        backgroundColor: calendarEvent.color,
        color: "white",
        borderRadius: "5px",
        padding: "5px",
      },
    };
  };

  return (
    <div className="h-screen p-5 bg-gray-100">
      <DnDCalendar
        localizer={localizer}
        events={events}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        view={view}
        onView={(newView: any) => setView(newView)}
        step={60}
        timeslots={1}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
        }}
        className="bg-white shadow-md rounded-lg p-4 custom-calendar custom-scrollbar-lead-dashoard"
        eventPropGetter={eventStyleGetter}
      />

      {/* 📌 Event Modal */}
      <Dialog open={modalVisible} onOpenChange={setModalVisible}>
        <DialogContent>
          <DialogTitle>{currentEvent ? "Edit Event" : "Add Event"}</DialogTitle>
          <Input label="Event Name" value={title} onChange={(e) => setTitle(e.target.value)} />

          <Label className="mt-3">Select Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{format(startDate!, "PPP p")}</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>

          {/* Toggle for "Once" or "Date Range" */}
          <div className="flex items-center gap-3 mt-3">
            <Label>Once</Label>
            <Switch checked={isDateRange} onCheckedChange={setIsDateRange} />
            <Label>Date Range</Label>
          </div>

          {isDateRange && (
            <>
              <Label className="mt-3">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">{format(endDate!, "PPP p")}</Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </>
          )}

          {/* <SketchPicker color={selectedColor} onChangeComplete={(color) => setSelectedColor(color.hex)} /> */}

          <DialogFooter>
            {currentEvent && <Button variant="destructive" onClick={handleDelete}><TrashIcon className="mr-2" /> Delete</Button>}
            <Button onClick={handleSave}>{currentEvent ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarComponent;
