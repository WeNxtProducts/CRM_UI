/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { CarFront } from "lucide-react";
import { format, isToday, isYesterday, parseISO } from 'date-fns';

const ActivityCards = [
    {
        id: '1',
        desc: 'Presentation to the new department',
        date: '2025-03-04T00:00:00.000+00:00',
    },
    {
        id: '2',
        desc: 'Anna Lead Appointment',
        date: '2025-03-04T00:00:00.000+00:00',
    },
    {
        id: '3',
        desc: 'Ray Lead Appointment',
        date: '2025-03-03T00:00:00.000+00:00',
    },
    {
        id: '4',
        desc: 'Daily meeting',
        date: '2025-03-03T00:00:00.000+00:00',
    },
    {
        id: '5',
        desc: 'Sales Meeting',
        date: '2025-03-02T00:00:00.000+00:00',
    },
    {
        id: '6',
        desc: 'Sales Meeting',
        date: '2025-03-02T00:00:00.000+00:00',
    },
    {
        id: '7',
        desc: 'Sales Meeting',
        date: '2024-02-01T00:00:00.000+00:00',
    }
]

const Activity = ({ setLeftExpanded, leftExpanded }: any) => {
    const [groupedActivities, setGroupedActivities] = useState({});

    const groupActivities = () => {
        return ActivityCards.reduce((acc: any, activity: any) => {
            const activityDate = parseISO(activity.date);
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

    useEffect(() => {
        const grouped = groupActivities();
        setGroupedActivities(grouped);
    }, [ActivityCards]);


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
            <div className="space-y-6">
                {Object.entries(groupedActivities).map(([groupLabel, activities]: any) => (
                    <div key={groupLabel}>
                        <h2 className="text-sm font-semibold text-gray-800 mb-1">{groupLabel}</h2>
                        <div className="space-y-2">
                            {activities?.map((activity: any) => (
                                <div key={activity.id} className="flex items-center p-1 bg-white">
                                    {/* Icon */}
                                    <div className="w-9 h-9 flex items-center justify-center bg-[#002280] rounded-full">
                                        <CarFront className="text-white w-5 h-5" />
                                    </div>

                                    {/* Content */}
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm font-semibold">{activity.desc}</p>
                                        <p className="text-xs text-gray-500">{format(parseISO(activity.date), 'hh:mm a')}</p>
                                    </div>

                                    {/* Admin Name */}
                                    {/* <div className="text-xs text-gray-700 font-medium">Admin</div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Activity
