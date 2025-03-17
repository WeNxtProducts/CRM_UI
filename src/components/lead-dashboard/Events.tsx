/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronRight, Plus } from 'lucide-react'
import EventCards from './EventCards'
import useApiRequests from '@/services/useApiRequests'
import { useRouter } from 'next/navigation'

const Events = ({ setRightExpanded, rightExpanded }: any) => {
    const router = useRouter()
    const eventList: any = useApiRequests('calenderEventActivityList', 'GET')
    const [eventData, setEventData] = useState([])


    const handleEventList = async () => {
        try {
            const response = await eventList()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'SUCCESS') {
                setEventData(response?.Data)
            }
        } catch (err) {
            console.log('err : ', err)
        }
    }

    useEffect(() => {
        handleEventList()
    }, [])

    return (
        <div>
            <div className='flex justify-between item-center'>
                <div className='flex items-center gap-x-3'>
                    <h2 className="text-md font-semibold">Nearest Events</h2>
                    <Button
                        onClick={() => {
                            router.push('/calender')
                        }}
                        size='sm'
                        className='h-3 w-8'>
                        <Plus />
                    </Button>
                </div>
                <Button
                    variant='link'
                    onClick={() =>
                        setRightExpanded(rightExpanded === 'events' ? null : 'events')
                    }
                    size='sm'>
                    {rightExpanded === 'events' ? 'Collapse' : 'View All'} <ChevronRight />
                </Button>
            </div>
            {eventData?.length > 0 &&
                <div className="space-y-4 mt-2">
                    {eventData?.map((card: any) => {
                        return (
                            <EventCards key={card.activitySeqNo} card={card} />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Events
