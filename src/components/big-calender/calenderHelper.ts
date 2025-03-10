/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, add, sub, parse } from 'date-fns';

export function transformEvent(event: any) {
    // Set default eventPriority if missing
    event.eventPriority = event?.eventPriority || 'low';

    // Process dates
    if (!event?.eventDate && !event?.eventEndDate) {
      // If both dates are missing, use today's date
      const today = new Date();
      const formattedToday = format(today, 'yyyy-MM-dd');
      event.eventDate = formattedToday;
      event.eventEndDate = formattedToday;
    } else if (event?.eventDate && !event?.eventEndDate) {
      // If only eventDate exists, copy it to eventEndDate
      event.eventEndDate = event.eventDate;
    } else if (!event?.eventDate && event?.eventEndDate) {
      // If only eventEndDate exists, copy it to eventDate
      event.eventDate = event?.eventEndDate;
    }

    // Process times
    if (!event?.eventStartTime && !event?.eventEndTime) {
      // Both times are missing: use current system time for start time
      const now = new Date();
      event.eventStartTime = format(now, 'HH:mm');
      const oneHourLater = add(now, { hours: 1 });
      event.eventEndTime = format(oneHourLater, 'HH:mm');
    } else if (event?.eventStartTime && !event?.eventEndTime) {
      // Start time exists: calculate end time as 1 hour later
      const parsedStart = parse(event?.eventStartTime, 'HH:mm', new Date());
      const oneHourLater = add(parsedStart, { hours: 1 });
      event.eventEndTime = format(oneHourLater, 'HH:mm');
    } else if (!event?.eventStartTime && event?.eventEndTime) {
      // End time exists: calculate start time as 1 hour before
      const parsedEnd = parse(event?.eventEndTime, 'HH:mm', new Date());
      const oneHourBefore = sub(parsedEnd, { hours: 1 });
      event.eventStartTime = format(oneHourBefore, 'HH:mm');
    }

    return event;
  }


  export const eventStyleGetter = (event: any) => {
    let backgroundColor = "#3174ad";
    let borderColor = "#3174ad";

    if (event.eventPriority) {
      switch (event.eventPriority) {
        case "high":
          backgroundColor = "#FFA09B";
          borderColor = "#E52020"
          break;
        case "moderate":
          backgroundColor = "#E7D283";
          borderColor = "#FFB22C"
          break;
        case "low":
          backgroundColor = "#B3D8A8";
          borderColor = "#0D4715"
          break;
        default:
          break;
      }
    }

    return {
      style: {
        backgroundColor,
        borderLeft: `3px solid ${borderColor}`,
        color: "black",
        borderRadius: "5px",
        padding: "5px",
      },
    };
  };