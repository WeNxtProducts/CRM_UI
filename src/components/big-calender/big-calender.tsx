/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer, SlotInfo, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CustomToolbar from "./CustomToolbar";
import EventDialog from "./EventDialog";
import Loader from "../ui/Loader";
import useApiRequests from "@/services/useApiRequests";
import { transformEvent, eventStyleGetter } from "./calenderHelper";
import './big-calender.scss';

const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(BigCalendar);

const CalendarComponent = () => {
  const eventList: any = useApiRequests('calenderEventActivityList', 'GET')
  const [eventData, setEventData] = useState<any[]>([])
  const [loader, setLoader] = useState(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<View>("month");

  const handleCloseDialog = () => {
    setModalVisible(false)
  }

  const handleClose = (finalData: any) => {
    setModalVisible(false)
    if (finalData) {
      handleSave(finalData)
    } else if (!finalData) {
      handleDelete(currentEvent.activitySeqNo);
    }
  }

  const handleDelete = (eventId: any) => {
    setEventData((prevEvents) => prevEvents.filter((e) => e.activitySeqNo !== eventId));
    setCurrentEvent(null)
  };

  const handleEventList = async () => {
    setLoader(true)
    try {
      const response = await eventList()
      if (response?.status === 'FAILURE') {
        console.log('error : ', response)
      } else if (response?.status === 'SUCCESS') {
        const events = Array.isArray(response.Data) ? response.Data : [];
        const transformedEvents = events.map((event: any) => transformEvent({ ...event }));
        setEventData(transformedEvents)
      }
    } catch (err) {
      console.log('err : ', err)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    handleEventList()
  }, [])

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setCurrentEvent(null);
    setEndDate(end)
    setStartDate(start);
    setModalVisible(true);
  };

  const handleSelectEvent = (event: any) => {
    setCurrentEvent(event);
    setModalVisible(true);
  };

  const handleSave = (newEvent: any) => {
    setEventData((prevEvents: any) => {
      if (currentEvent) {
        return prevEvents.map((e: any) => (e?.activitySeqNo === currentEvent.activitySeqNo ? newEvent : e));
      } else {
        return [...prevEvents, newEvent];
      }
    });
    setCurrentEvent(null)
  };

  return (
    <div className="h-screen p-0 bg-gray-100">
      {loader && <Loader />}
      {eventData?.length > 0 &&
        <BigCalendar
          titleAccessor={(event: any) => event.activitySubject || 'No Name'}
          startAccessor={(event: any) =>
            moment(`${event.activityStartDate} ${event.activityStartTime}`, "YYYY-MM-DD hh:mm").toDate()
          }
          endAccessor={(event: any) =>
            moment(`${event.activityEndDate} ${event.activityEndTime}`, "YYYY-MM-DD hh:mm").toDate()
          }

          localizer={localizer}
          events={eventData}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
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
      }

      {modalVisible &&
        <EventDialog
          open={modalVisible}
          handleClose={handleClose}
          handleCloseDialog={handleCloseDialog}
          currentEvent={currentEvent}
          startDate={startDate}
          endDate={endDate}
        />
      }
    </div>
  );
};

export default CalendarComponent;
