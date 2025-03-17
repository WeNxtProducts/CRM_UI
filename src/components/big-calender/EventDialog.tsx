/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format, addMinutes, add, parse } from "date-fns";
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
import useApiRequests from "@/services/useApiRequests";
import toast from "../ui/toast";
import { Trash2 } from 'lucide-react';
import Loader from "../ui/Loader";
// import { Switch } from "@/components/ui/switch";

const getDefaultInitialState = () => {
  const now = new Date();

  return {
    activitySubject: "",
    activityDescription: "",
    activityPriority: "high",
    activityStartDate: format(now, "yyyy-MM-dd"),
    activityStartTime: format(now, "HH:mm"),
    activityEndTime: format(addMinutes(now, 30), "HH:mm"),
    activityEndDate: format(now, "yyyy-MM-dd"),
    activityType: 'EVENT'
  };
};

interface EventDialogProps {
  open: boolean;
  handleClose: (data?: any) => void;
  handleCloseDialog: () => void;
  startDate?: any;
  endDate?: any;
  currentEvent?: {
    activitySeqNo?: any;
    activityPriority: string;
    activityDescription: string;
    activitySubject: string;
    activityStartDate: string;
    activityStartTime: string;
    activityEndTime: string;
    activityEndDate?: string;
  };
}

const EventDialog: React.FC<EventDialogProps> = ({ open, handleClose, currentEvent, startDate, endDate, handleCloseDialog }) => {
  const [loader, setLoader] = useState(false)
  const creatEvent: any = useApiRequests('calenderEventActivityList', 'POST')
  const editEvent: any = useApiRequests('calenderEventActivityList', 'PUT')
  const deleteEvent: any = useApiRequests('calenderEventActivityList', 'DELETE')
  const [initialState, setInitialState] = useState<any>(null);
  const [isDateRange, setIsDateRange] = useState(false);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: initialState,
  });

  useEffect(() => {
    if (currentEvent) {
      setInitialState(currentEvent);
      reset(currentEvent);
      setIsDateRange(!!currentEvent.activityEndDate && currentEvent.activityEndDate !== currentEvent.activityStartDate);
    } else {
      const defaultState: any = getDefaultInitialState();
      if (startDate) {
        defaultState.activityStartDate = format(startDate, "yyyy-MM-dd");
        defaultState.activityEndDate = format(startDate, "yyyy-MM-dd");
        defaultState.activityStartTime = format(startDate, "HH:mm");
        defaultState.activityEndTime = format(endDate, "HH:mm");
        if (defaultState.activityStartTime === "00:00" && defaultState.activityEndTime === "00:00") {
          const now = new Date();
          defaultState.activityStartTime = format(now, "HH:mm");
          defaultState.activityEndTime = format(add(now, { hours: 1 }), "HH:mm");
        }
      }
      setInitialState(defaultState);
      reset(defaultState);
    }
  }, [currentEvent, startDate, endDate, reset]);

  const handleCreateEvent = async (event: any, apiCalls: any) => {
    setLoader(true)
    try {
      const response = await apiCalls(event, {}, currentEvent ? { activitySeqNo: currentEvent?.activitySeqNo } : {})
      if (response?.status === 'FAILURE') {
        setLoader(false)
        console.log('FAILURE : ', response)
        toast.error('Event Not Created');
      } else if (response?.status === 'SUCCESS') {
        setLoader(false)
        toast.success('Event Created Successfully');
        console.log("success : ", response)
        handleClose(response?.Data);
      }
    } catch (err) {
      console.log('err : ', err)
    }
  }

  function parseTime(timeString: string, referenceDate = new Date()) {
    const formats = ['HH:mm:ss', 'HH:mm'];
    for (const format of formats) {
      const parsedDate: any = parse(timeString, format, referenceDate);
      if (!isNaN(parsedDate)) {
        return parsedDate;
      }
    }
    throw new Error(`Invalid time format: ${timeString}`);
  }

  const onSubmit = (data: any) => {
    const startTimeDate = parseTime(data.activityStartTime);
    const endTimeDate = parseTime(data.activityEndTime);

    const finalData = {
      ...data,
      activityEndDate: isDateRange ? data.activityEndDate : data.activityStartDate,
      activityStartTime: format(startTimeDate, "HH:mm:ss"),
      activityEndTime: format(endTimeDate, "HH:mm:ss")
    };

    // console.log("finalData:", finalData);
    handleCreateEvent(finalData, currentEvent ? editEvent : creatEvent)
  };

  const handleDeleteEvent = async (event: any) => {
    setLoader(true)
    try {
      const response = await deleteEvent('', {}, { activitySeqNo: event?.activitySeqNo })
      if (response?.status === 'FAILURE') {
        setLoader(false)
        toast.error('Event Not Deleted');
      } else if (response?.status === 'SUCCESS') {
        setLoader(false)
        toast.success('Event Deleted Successfully');
        handleClose(false)
      }
    } catch (err) {
      console.log('err : ', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-lg p-0">
        {loader && <Loader />}
        <div className="flex flex-col h-[88vh] custom-scrollbar-lead-dashoard">
          <div className="flex-shrink-0 p-4 border-b">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center">
                  <p>{currentEvent ? "Edit Event" : "Add Event"}</p>
                  {currentEvent &&
                    <Trash2
                      onClick={() => {
                        handleDeleteEvent(currentEvent)
                      }}
                      className="w-6 h-6 text-white bg-red-500 rounded-md p-1 ml-5 cursor-pointer" />
                  }
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <form id="eventForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <Input label="Event Name" {...register("activitySubject", { required: true })} />
                <Textarea label="Event Description" {...register("activityDescription")} />

                {/* <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Once</span>
                  <Switch checked={isDateRange} onCheckedChange={setIsDateRange} />
                  <span className="text-sm font-medium text-gray-700">Date Range</span>
                </div> */}

                <Controller control={control} name="activityStartDate" render={({ field }) => (
                  <DatePickerDemo label={`Event ${isDateRange ? 'Start' : ''} date`} date={field.value} setDate={field.onChange} />
                )} />

                {/* Show activityEndDate only if Date Range is selected */}
                {isDateRange && (
                  <Controller control={control} name="activityEndDate" render={({ field }) => (
                    <DatePickerDemo label="Event End date" date={field.value} setDate={field.onChange} />
                  )} />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Controller control={control} name="activityStartTime" render={({ field }) => (
                    <TimePicker value={field.value} onChange={field.onChange} label="Start Time" />
                  )} />
                  <Controller control={control} name="activityEndTime" render={({ field }) => (
                    <TimePicker value={field.value} onChange={field.onChange} label="End Time" />
                  )} />
                </div>

                <Controller control={control} name="activityPriority" render={({ field }) => (
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
              <Button variant="outline" size="sm" type="button" onClick={() => handleCloseDialog()}>Cancel</Button>
              <Button size="sm" type="submit" form="eventForm">Save</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
