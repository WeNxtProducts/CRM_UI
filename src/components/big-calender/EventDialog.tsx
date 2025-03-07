/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format, addMinutes } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { DatePickerDemo } from "../ui/datePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectWrapper } from "@/components/ui/select";
import { Button } from "../ui/button";
import { TimePicker } from "../ui/timePicker";
import { Switch } from "@/components/ui/switch";

const getDefaultInitialState = () => {
  const now = new Date();

  return {
    id: 0,
    eventName: "",
    eventDescription: "",
    eventPriority: "high",
    eventDate: format(now, "yyyy-MM-dd"),
    eventStartTime: format(now, "HH:mm"),
    eventEndTime: format(addMinutes(now, 30), "HH:mm"),
    eventEndDate: format(now, "yyyy-MM-dd"),
    color: "#4CAF50",
  };
};

interface EventDialogProps {
  open: boolean;
  handleClose: (data?: any) => void;
  startDate?: any;
  currentEvent?: {
    id: any;
    eventPriority: string;
    eventDescription: string;
    eventName: string;
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventEndDate?: string;
    color: string;
  };
}

const EventDialog: React.FC<EventDialogProps> = ({ open, handleClose, currentEvent, startDate }) => {
  const [initialState, setInitialState] = useState<any>(null);
  const [isDateRange, setIsDateRange] = useState(false);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: initialState,
  });

  useEffect(() => {
    if (currentEvent) {
      setInitialState(currentEvent);
      reset(currentEvent);
      setIsDateRange(!!currentEvent.eventEndDate && currentEvent.eventEndDate !== currentEvent.eventDate);
    } else {
      const defaultState: any = getDefaultInitialState();
      if (startDate) {
        defaultState.eventDate = format(startDate, "yyyy-MM-dd");
        defaultState.eventEndDate = format(startDate, "yyyy-MM-dd");
      }
      setInitialState(defaultState);
      reset(defaultState);
    }
  }, [currentEvent, startDate, reset]);

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      id: Date.now(),
      eventEndDate: isDateRange ? data.eventEndDate : data.eventDate,
    };
    handleClose(finalData);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0">
        <div className="flex flex-col h-[88vh] custom-scrollbar-lead-dashoard">
          <div className="flex-shrink-0 p-4 border-b">
            <DialogHeader>
              <DialogTitle>{currentEvent ? "Edit Event" : "Add Event"}</DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <form id="eventForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <Input label="Event Name" {...register("eventName", { required: true })} />
                <Textarea label="Event Description" {...register("eventDescription")} />

                {/* <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Once</span>
                  <Switch checked={isDateRange} onCheckedChange={setIsDateRange} />
                  <span className="text-sm font-medium text-gray-700">Date Range</span>
                </div> */}

                <Controller control={control} name="eventDate" render={({ field }) => (
                  <DatePickerDemo label={`Event ${isDateRange ? 'Start' : ''} date`} date={field.value} setDate={field.onChange} />
                )} />

                {/* Show eventEndDate only if Date Range is selected */}
                {isDateRange && (
                  <Controller control={control} name="eventEndDate" render={({ field }) => (
                    <DatePickerDemo label="Event End date" date={field.value} setDate={field.onChange} />
                  )} />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Controller control={control} name="eventStartTime" render={({ field }) => (
                    <TimePicker value={field.value} onChange={field.onChange} label="Start Time" />
                  )} />
                  <Controller control={control} name="eventEndTime" render={({ field }) => (
                    <TimePicker value={field.value} onChange={field.onChange} label="End Time" />
                  )} />
                </div>

                <Controller control={control} name="eventPriority" render={({ field }) => (
                  <SelectWrapper label="Priority">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </SelectWrapper>
                )} />
              </div>
            </form>
          </div>

          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" type="button" onClick={() => handleClose()}>Cancel</Button>
              <Button size="sm" type="submit" form="eventForm">Save</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
