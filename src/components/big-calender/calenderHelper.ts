/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, add, sub, parse } from 'date-fns';

export function transformEvent(event: any) {
  event.activityPriority = event?.activityPriority || 'low';
  event.activityType = event?.activityType || 'EVENT';
  event.activitySubject = event?.activitySubject || event.activityType || "Event"

  if (!event?.activityStartDate && !event?.activityEndDate) {
    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');
    event.activityStartDate = formattedToday;
    event.activityEndDate = formattedToday;
  } else if (event?.activityStartDate && !event?.activityEndDate) {
    event.activityEndDate = event.activityStartDate;
  } else if (!event?.activityStartDate && event?.activityEndDate) {
    event.activityStartDate = event?.activityEndDate;
  }

  if (!event?.activityStartTime && !event?.activityEndTime) {
    const now = new Date();
    event.activityStartTime = format(now, 'HH:mm');
    const oneHourLater = add(now, { hours: 1 });
    event.activityEndTime = format(oneHourLater, 'HH:mm');
  } else if (event?.activityStartTime && !event?.activityEndTime) {
    const parsedStart = parse(event?.activityStartTime, 'HH:mm', new Date());
    const oneHourLater = add(parsedStart, { hours: 1 });
    event.activityEndTime = format(oneHourLater, 'HH:mm');
  } else if (!event?.activityStartTime && event?.activityEndTime) {
    const parsedEnd = parse(event?.activityEndTime, 'HH:mm', new Date());
    const oneHourBefore = sub(parsedEnd, { hours: 1 });
    event.activityStartTime = format(oneHourBefore, 'HH:mm');
  }

  return event;
}


export const eventStyleGetter = (event: any) => {
  let backgroundColor = "#3174ad";
  let borderColor = "#3174ad";

  if (event.activityPriority && event.activityType === "EVENT") {
    switch (event.activityPriority) {
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
  } if (event.activityType === "APPOINTMENT") {
    backgroundColor = "#3174ad";
    // borderColor = "#E52020"
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