/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import EventCards from './EventCards'
import useApiRequests from '@/services/useApiRequests'

const Events = ({ setRightExpanded, rightExpanded }: any) => {
    const eventList: any = useApiRequests('eventList', 'GET')
    const [eventData, setEventData] = useState([])


    const handleEventList = async () => {
        try {
            const response = await eventList()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'success') {
                console.log('success : ', response)
                setEventData(response?.data)
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
                <h2 className="text-md font-semibold">Nearest Events</h2>
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
                            <EventCards key={card.id} card={card} />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Events
