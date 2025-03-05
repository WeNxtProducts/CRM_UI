/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import EventCards from './EventCards'

const Events = ({ setRightExpanded, rightExpanded }: any) => {
    const cards = [
        {
            id: '1',
            desc: 'Presentation to the new department',
            priority: 'high',
            remainder: '30m',
            date: '2025-03-04T00:00:00.000+00:00',
            time: '12:00pm'
        },
        {
            id: '2',
            desc: 'Anna Lead Appointment',
            priority: 'moderate',
            remainder: '1h',
            date: '2025-03-05T00:00:00.000+00:00',
            time: '12:00pm'
        },
        {
            id: '3',
            desc: 'Ray Lead Appointment',
            priority: 'high',
            remainder: '3h',
            date: '2023-12-15T00:00:00.000+00:00',
            time: '12:00pm'
        },
        {
            id: '4',
            desc: 'Daily meeting',
            priority: 'low',
            remainder: '30m',
            date: '2023-12-15T00:00:00.000+00:00',
            time: '12:00pm'
        },
        {
            id: '5',
            desc: 'Sales Meeting',
            priority: 'moderate',
            remainder: '4h',
            date: '2023-12-15T00:00:00.000+00:00',
            time: '12:00pm'
        }
    ]
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

            <div className="space-y-4 mt-2">
                {cards.map((card) => (
                    <EventCards key={card.id} card={card} />
                ))}
            </div>
        </div>
    )
}

export default Events
