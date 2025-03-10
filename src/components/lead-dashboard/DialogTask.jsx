/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { DatePickerDemo } from "../ui/datePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectWrapper } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Trash2 } from 'lucide-react';

const DialogTask = ({ open, handleClose }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [initialState, setInitialState] = useState({
        taskName: '123',
        taskDescription: 'Checking',
        taskPriority: 'high',
        taskDueDate: '2023-11-20T00:00:00.000+00:00'
    });

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: initialState,
    });

    useEffect(() => {
        setOpenDialog(open)
    }, [open])

    const onSubmit = (data) => {
        console.log("data : ",data)
    }

    return (
        <Dialog open={openDialog} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg p-0">
                <div className="flex flex-col h-[88vh] custom-scrollbar-lead-dashoard">
                    <div className="flex-shrink-0 p-4 border-b">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center">
                                    <p>Add Task</p>
                                    <Trash2
                                        className="w-6 h-6 text-white bg-red-500 rounded-md p-1 ml-5 cursor-pointer" />
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <form id="eventForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <Input label="Task Name" {...register("taskName", { required: true })} />
                                <Textarea label="Task Description" {...register("taskDescription")} />

                                <Controller control={control} name="taskDueDate" render={({ field }) => (
                                    <DatePickerDemo label={`Task Due Date`} date={field.value} setDate={field.onChange} />
                                )} />

                                <Controller control={control} name="taskPriority" render={({ field }) => (
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
    )
}

export default DialogTask
