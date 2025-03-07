/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CustomToolbar from "./CustomToolbar";
import EventDialog from "./EventDialog";
import './big-calender.scss';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

// const DISABLED_DATES: Moment[] = [
//   moment("2025-01-01"), // New Year
//   moment("2025-12-25"), // Christmas
//   moment("2025-07-04"), // Independence Day
// ];


const CalendarComponent = () => {
  const [events, setEvents] = useState<any[]>([
    {
      id: 1,
      eventPriority: 'high',
      eventDescription: "Launch of the new product line",
      eventName: "Product Launch",
      eventDate: '2025-03-07',
      eventStartTime: '10:01',
      eventEndDate: '2025-03-07',
      eventEndTime: '21:30',
    },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<View>("month");

  const handleClose = (finalData: any) => {
    console.log("finalData : ", finalData)
    setModalVisible(false)
    handleSave(finalData)
  }

  // const disabledDate = (current: Moment): boolean => {
  //   return (
  //     current.day() === 0 || // Sunday
  //     current.day() === 6 || // Saturday
  //     DISABLED_DATES.some((d) => d.isSame(current, "day"))
  //   );
  // };

  const handleSelectSlot = ({ start }: SlotInfo) => {
    // if (disabledDate(moment(start))) return;
    setCurrentEvent(null);
    setStartDate(start);
    setModalVisible(true);
  };

  const handleSelectEvent = (event: any) => {
    setCurrentEvent(event);
    setModalVisible(true);
  };

  const handleSave = (newEvent: any) => {
    setEvents((prevEvents) => {
      if (currentEvent) {
        return prevEvents.map((e) => (e.id === currentEvent.id ? newEvent : e));
      } else {
        return [...prevEvents, newEvent];
      }
    });
  };


  const eventStyleGetter = (event: any) => {
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

  const handleEventDrop = ({ event, start, end }: any) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id
          ? {
              ...e,
              eventDate: moment(start).format("YYYY-MM-DD"),
              eventStartTime: moment(start).format("HH:mm"),
              eventEndDate: moment(end).format("YYYY-MM-DD"),
              eventEndTime: moment(end).format("HH:mm"),
            }
          : e
      )
    );
  };
  
  const handleEventResize = ({ event, start, end }: any) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id
          ? {
              ...e,
              eventEndDate: moment(end).format("YYYY-MM-DD"),
              eventEndTime: moment(end).format("HH:mm"),
            }
          : e
      )
    );
  };


  return (
    <div className="h-screen p-0 bg-gray-100">
      <DnDCalendar
        titleAccessor={(event: any) => event.eventName}
        startAccessor={(event: any) =>
          moment(`${event.eventDate} ${event.eventStartTime}`, "YYYY-MM-DD hh:mm").toDate()
        }
        endAccessor={(event: any) =>
          moment(`${event.eventEndDate} ${event.eventEndTime}`, "YYYY-MM-DD hh:mm").toDate()
        }

        localizer={localizer}
        events={events}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        view={view}
        onView={(newView: any) => setView(newView)}
        step={60}
        timeslots={1}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
        }}
        className="bg-white shadow-md rounded-lg p-4 custom-calendar custom-scrollbar-lead-dashoard"
        eventPropGetter={eventStyleGetter}
      />

      {modalVisible &&
        <EventDialog
          open={modalVisible}
          handleClose={handleClose}
          currentEvent={currentEvent}
          startDate={startDate}
        />
      }
    </div>
  );
};

export default CalendarComponent;
