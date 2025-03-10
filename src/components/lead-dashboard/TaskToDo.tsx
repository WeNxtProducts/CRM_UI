/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect, useMemo } from 'react';
import {
  // format, differenceInDays, differenceInHours, differenceInMinutes,
  isPast,
  // parseISO
} from 'date-fns';
import { Button } from '../ui/button'
import { format as tz, toZonedTime } from 'date-fns-tz';
import { ChevronRight, MoveRight } from 'lucide-react';
import useApiRequests from '@/services/useApiRequests'
import DialogTask from './DialogTask';

const TaskToDo = ({ setRightExpanded, rightExpanded }: any) => {
  const taskList: any = useApiRequests('taskList', 'GET')
  const [taskData, setTaskData] = useState<any>([])
  const [taskDialog, setTaskDialog] = useState(false)


  const handleEventList = async () => {
    try {
      const response = await taskList()
      if (response?.status === 'error') {
        console.log('error : ', response)
      } else if (response?.status === 'success') {
        console.log('success : ', response)
        setTaskData(response?.data)
      }
    } catch (err) {
      console.log('err : ', err)
    }
  }

  useEffect(() => {
    handleEventList()
  }, [])

  const handleClose = () => {
    setTaskDialog(false)
  }

  // Function to format the remaining time as "X days X hrs X min
  // const getTimeDifference = (dueDate: string) => {
  //     const now = new Date(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")); // Correct: Keep it as a Date object
  //     const due = new Date(dueDate);
  //     const isOverdue = isPast(due);

  //     let days = differenceInDays(due, now);
  //     let hours = differenceInHours(due, now) % 24;
  //     let minutes = differenceInMinutes(due, now) % 60;

  //     // Convert negative values to positive for overdue tasks
  //     if (isOverdue) {
  //         days = Math.abs(days);
  //         hours = Math.abs(hours);
  //         minutes = Math.abs(minutes);
  //     }

  //     const formattedTime = `${days > 0 ? `${days} days ` : ''}${hours > 0 ? `${hours} hrs ` : ''}${minutes > 0 ? `${minutes} min` : ''}`.trim();

  //     return isOverdue ? `-${formattedTime}` : formattedTime;
  // };

  const sortedTasks = useMemo(() => {
    return [...taskData].sort(
      (a: any, b: any) => new Date(a.taskDueDate).getTime() - new Date(b.taskDueDate).getTime()
    );
  }, [taskData]);

  return (
    <div className="">
      <div className="flex justify-between px-3 py-1">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            setRightExpanded(rightExpanded === 'tasks' ? null : 'tasks');
          }}
        >
          {rightExpanded === 'tasks' ? 'Collapse' : 'View All'} <ChevronRight />
        </Button>
      </div>

      {/* Main tasks list with bottom padding */}
      <div className="pb-2">
        {sortedTasks?.map((task) => {
          const dueDate = new Date(task?.taskDueDate);
          const utcDate = toZonedTime(dueDate, 'UTC');
          const formattedDate = tz(utcDate, 'd MMM yyyy', { timeZone: 'UTC' });
          const isOverdue = isPast(dueDate);

          return (
            <div
              key={task.id}
              className={`flex items-center px-3 py-2 border rounded ${isOverdue ? 'text-red-500' : ''
                }`}
            >
              <div className="w-24 text-sm font-semibold">{formattedDate}</div>
              <div className="flex-1 ml-4">
                <div className="text-sm font-medium">{task.taskName}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        onClick={() => {
          setTaskDialog(true)
        }}
        className="sticky bottom-0 left-0 right-0 bg-white p-2 flex items-center justify-between cursor-pointer">
        <p className="text-sm font-light ml-2">Add New Task</p>
        <MoveRight className="text-[#514EF3]" />
      </div>
      {taskDialog &&
        <DialogTask
          open={taskDialog}
          handleClose={handleClose}
        />
      }
    </div>
  );
};

export default TaskToDo;
