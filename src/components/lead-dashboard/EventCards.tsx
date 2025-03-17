/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Clock3, ArrowUp } from 'lucide-react';
import { parseISO, isToday, isTomorrow, format } from 'date-fns';

const formatCardDateTime = (isoString: string): string => {
    if (!isoString) return 'No data';

    const cardDateTime = parseISO(isoString);
    let dateLabel = '';

    if (isToday(cardDateTime)) {
        dateLabel = 'Today';
    } else if (isTomorrow(cardDateTime)) {
        dateLabel = 'Tomorrow';
    } else {
        dateLabel = format(cardDateTime, 'dd-MMM-yyyy');
    }

    const timeLabel = format(cardDateTime, 'h:mm a');
    return `${dateLabel} | ${timeLabel}`;
};


const EventCards = ({ card }: any) => {
    const { activityPriority } = card;

    return (
        <div
            className={`p-2 bg-white rounded-lg shadow-md border-l-4 border-${activityPriority == 'high'
                ? 'red-500' : activityPriority === 'moderate' ? 'blue-500' : activityPriority === 'low' ? 'green-500' : 'red-500'}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-[#0A1629] text-[13px] font-medium break-words">{card.activitySubject || 'No Description'}</p>
                </div>

                {/* <div className="ml-2">
                    <div><ArrowUp className={`mr-3 w-5 h-5 text-${activityPriority == 'high'
                        ? 'red-500' : activityPriority === 'moderate' ? 'blue-500' : activityPriority === 'low' ? 'green-500' : 'red-500'}`} /></div>
                </div> */}
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>{formatCardDateTime(card?.activityStartDate)}</div>
                <div className="flex items-center bg-[#F4F9FD] rounded-lg p-1 mr-2">
                    <p
                        className={`text-white text-[8px] rounded-full px-1 py-0 ${card.activityType === 'APPOINTMENT'
                            ? 'bg-primary'
                            : card.activityType === 'EVENT'
                                ? 'bg-primary-btnforeground'
                                : 'bg-gray-500'
                            }`}
                    >
                        {card.activityType}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default EventCards