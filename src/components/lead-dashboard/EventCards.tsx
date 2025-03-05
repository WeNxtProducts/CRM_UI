/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock3 ,ArrowUp} from 'lucide-react';
import { parseISO, format, isToday, isTomorrow } from 'date-fns';

const getBorderColor = (priority: any) => {
    if (priority === 'high') return 'red-500';
    if (priority === 'moderate') return 'yellow-500';
    if (priority === 'low') return 'green-500';
    return 'gray-500';
};

const formatCardDateTime = (isoString: string) => {
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
    return (
        <div
            className={`p-2 bg-white rounded-lg shadow-md border-l-4 border-${getBorderColor(card.priority)}`}
        >
            {/* Top row: Description and Priority Icon */}
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-[#0A1629] text-[13px] font-medium break-words">{card.desc}</p>
                </div>
                {/* A simple circle as the priority icon */}
                <div className="ml-2">
                    <div><ArrowUp className={`mr-3 w-5 h-5 text-${getBorderColor(card?.priority)}`}/></div>
                </div>
            </div>
            {/* Bottom row: Date/Time on the left and Remainder on the right */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div>{formatCardDateTime(card?.date)}</div>
                <div className="flex items-center bg-[#F4F9FD] rounded-lg p-1 mr-2">
                    <Clock3 className="mr-1 w-4 h-4" />
                    <span className='text-sm'>{card.remainder}</span>
                </div>
            </div>
        </div>
    );
};

export default EventCards