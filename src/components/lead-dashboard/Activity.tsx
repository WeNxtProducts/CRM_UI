/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { CarFront } from "lucide-react";
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import useApiRequests from '@/services/useApiRequests'

const Activity = ({ setLeftExpanded, leftExpanded }: any) => {
    const activityList: any = useApiRequests('activityList', 'GET')
    const [activityData, setActivityData] = useState<any>(null)

    const handleActivityList = async () => {
        try {
            const response = await activityList()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'success') {
                const grouped = groupActivities(response?.data);
                setActivityData(grouped)
            }
        } catch (err) {
            console.log('err : ', err)
        }
    }

    useEffect(() => {
        handleActivityList()
    }, [])

    const groupActivities = (data: any) => {
        return data?.reduce((acc: any, activity: any) => {
            const activityDate = parseISO(activity?.activityDate || new Date());
            let groupLabel = format(activityDate, 'dd-MM-yyyy');

            if (isToday(activityDate)) {
                groupLabel = 'Today';
            } else if (isYesterday(activityDate)) {
                groupLabel = 'Yesterday';
            }

            if (!acc[groupLabel]) {
                acc[groupLabel] = [];
            }
            acc[groupLabel].push(activity);
            return acc;
        }, {});
    };

    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-lg font-semibold">Activity</h2>
                <Button
                    variant='link'
                    onClick={() => setLeftExpanded(!leftExpanded)}
                    size='sm'>
                    {leftExpanded ? 'Collapse' : 'View All'} <ChevronRight />
                </Button>
            </div>
            {activityData !== null &&
                <div className="space-y-6">
                    {Object.entries(activityData).map(([groupLabel, activities]: any) => (
                        <div key={groupLabel}>
                            {/* Group Header with Line */}
                            <div className="flex items-center mb-1">
                                <h2 className="text-sm font-semibold text-gray-800 whitespace-nowrap">{groupLabel}</h2>
                                <div className="flex-1 h-[1px] mt-1 bg-gray-300 ml-2"></div>
                            </div>

                            <div className="space-y-2">
                                {activities?.map((activity: any) => (
                                    <div key={activity.id} className="flex items-center p-1 bg-white">
                                        {/* Icon */}
                                        <div className="w-9 h-9 flex items-center justify-center bg-[#002280] rounded-full">
                                            <CarFront className="text-white w-5 h-5" />
                                        </div>

                                        {/* Content */}
                                        <div className="ml-4 flex-1">
                                            <p className="text-sm font-semibold">{activity.activityDescription}</p>
                                            <p className="text-xs text-gray-500">{format(parseISO(activity.activityDate), "hh:mm a")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            }
        </div>
    )
}

export default Activity
