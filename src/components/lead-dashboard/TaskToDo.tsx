/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {useState,useEffect,useMemo } from 'react';
import {
    // format, differenceInDays, differenceInHours, differenceInMinutes,
    isPast,
    // parseISO
} from 'date-fns';
import { Button } from '../ui/button'
import { format as tz, toZonedTime } from 'date-fns-tz';
import { ChevronRight } from 'lucide-react';
import useApiRequests from '@/services/useApiRequests'

const TaskToDo = ({ setRightExpanded, rightExpanded }: any) => {
    const taskList: any = useApiRequests('taskList', 'GET')
    const [taskData,setTaskData] = useState([])


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
    (a, b) => new Date(a.taskDueDate).getTime() - new Date(b.taskDueDate).getTime()
  );
}, [taskData]);

    return (
        <div>
            <div className='flex justify-between'>
                <h2 className='text-lg font-semibold'>Tasks</h2>
                <Button
                    variant='link'
                    size='sm'
                    onClick={() => {
                        setRightExpanded(rightExpanded === 'tasks' ? null : 'tasks')
                    }}
                >
                    {rightExpanded === 'tasks' ? 'Collapse' : 'View All'} <ChevronRight />
                </Button>
            </div>
            <div>
                {sortedTasks.map((task) => {
                    const dueDate = new Date(task.taskDueDate);
                    const utcDate = toZonedTime(dueDate, 'UTC');
                    const formattedDate = tz(utcDate, 'd MMM yyyy', { timeZone: 'UTC' });
                    // const timeDiff = getTimeDifference(task.taskDueDate);
                    const isOverdue = isPast(dueDate);

                    return (
                        <div
                            key={task.id}
                            className={`flex items-center p-2 my-2 border rounded ${isOverdue ? 'text-red-500' : ''
                                }`}
                        >
                            <div className='w-24 text-sm font-semibold'>{formattedDate}</div>
                            <div className='flex-1 ml-4'>
                                <div className='text-sm font-medium'>{task.taskName}</div>
                                {/* <div className='text-xs text-gray-500'>
                                    {timeDiff}
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskToDo;
