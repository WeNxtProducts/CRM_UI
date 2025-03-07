/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock3, ArrowUp } from 'lucide-react';
import { parseISO, format, isToday, isTomorrow } from 'date-fns';
import { useEffect } from 'react';

const getBorderColor = (eventPriority: any) => {
    if (eventPriority === 'high') return 'eventPriorityCard-high';
    if (eventPriority === 'moderate') return 'eventPriorityCard-medium';
    if (eventPriority === 'low') return 'eventPriorityCard-low';
    return 'gray-500';
};

const borderColorMap: { [key: string]: string } = {
    red: "border-red-500",
    blue: "border-blue-500",
    green: "border-green-500",
    // Add more mappings as needed
};

const formatCardDateTime = (isoString: string) => {
    if(!isoString) return "Invalid Date";
    const cardDateTime = parseISO(isoString);
    let dateLabel = '';
    if (isToday(cardDateTime)) {
        dateLabel = 'Today';
    } else if (isTomorrow(cardDateTime)) {
        dateLabel = 'Tomorrow';
    } else {
        dateLabel = format(cardDateTime, 'dd-MM-yyyy');
    }
    const timeLabel = format(cardDateTime, 'h:mm a');
    return `${dateLabel} | ${timeLabel}`;
};



const EventCards = ({ card }: any) => {
    const { eventPriority } = card;

    return (
        <div
            className={`p-2 bg-white rounded-lg shadow-md border-l-4 border-${eventPriority == 'high'
                ? 'red-500' : eventPriority === 'moderate' ? 'blue-500' : eventPriority === 'low' ? 'green-500' : 'red-500'}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-[#0A1629] text-[13px] font-medium break-words">{card.eventDescription || 'No Description'}</p>
                </div>
                
                <div className="ml-2">
                    <div><ArrowUp className={`mr-3 w-5 h-5 text-${eventPriority == 'high'
                ? 'red-500' : eventPriority === 'moderate' ? 'blue-500' : eventPriority === 'low' ? 'green-500' : 'red-500'}`} /></div>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>{formatCardDateTime(card?.eventDateTime)}</div>
                <div className="flex items-center bg-[#F4F9FD] rounded-lg p-1 mr-2">
                    <Clock3 className="mr-1 w-4 h-4" />
                    <span className='text-sm'>{card.reminderSent || 0}</span>
                </div>
            </div>
        </div>
    );
};

export default EventCards