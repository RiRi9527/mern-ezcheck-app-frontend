import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import moment from "moment";
import EventDialog from "@/components/EventDialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EventData } from "@/types";
import { useGetEvents } from "@/api/EventApi";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

interface MyCalendarProps {
  userId?: string;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ userId }) => {
  const { events, refetch: refetchEvents } = useGetEvents(userId);

  useEffect(() => {
    refetchEvents();
  }, [userId, refetchEvents]);

  // "Because setCalendarEvents(events) doesn't immediately update the value of calendarEvents.
  // The value of events may have changed before setCalendarEvents(events) is executed.";

  // Refetch the events data whenever the userId changes
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await refetchEvents();
  //     if (events) {
  //       setCalenderEvents(events);
  //     }
  //   };

  //   fetchData();
  // }, [userId, refetchEvents, events]); --- due to "Infinite fetch

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | undefined>();

  const closeEventDialog = () => {
    setIsEventDialogOpen(false);
  };

  // const handleEventSelect = (event: any) => {
  //   setIsEventDialogOpen(true);
  //   let SelectedEvent: EventData = {
  //     _id: event._id,
  //     title: event.title,
  //     startTime: event.start.toString(),
  //     endTime: event.end.toString(),
  //   };
  //   setSelectedEvent(SelectedEvent);
  // };

  const handleEventSelect = useCallback(
    (event: any) => {
      setIsEventDialogOpen(true);
      let SelectedEvent: EventData = {
        _id: event._id,
        title: event.title,
        startTime: event.start.toString(),
        endTime: event.end.toString(),
      };
      setSelectedEvent(SelectedEvent);
    },
    [setIsEventDialogOpen, setSelectedEvent]
  );

  // const handleSlotSelect = (event: any) => {
  //   // console.log("Selected slot:", event.start, event.end);
  //   setIsEventDialogOpen(true);
  //   let SelectedEvent: EventData = {
  //     _id: event._id,
  //     title: event.title,
  //     startTime: event.start.toString(),
  //     endTime: event.end.toString(),
  //   };
  //   setSelectedEvent(SelectedEvent);
  // };

  const handleSlotSelect = useCallback(
    (event: any) => {
      // console.log("Selected slot:", event.start, event.end);
      setIsEventDialogOpen(true);
      let SelectedEvent: EventData = {
        _id: event._id,
        title: event.title,
        startTime: event.start.toString(),
        endTime: event.end.toString(),
      };
      setSelectedEvent(SelectedEvent);
    },
    [setIsEventDialogOpen, setSelectedEvent]
  );

  const generateWorkHours = () => {
    const startOfWeek = moment().startOf("week"); // Start date of the week
    const endOfWeek = moment().endOf("week"); // End date of the week

    const workHours = [];

    for (let day = startOfWeek; day <= endOfWeek; day.add(1, "day")) {
      if (day.isoWeekday() >= 1 && day.isoWeekday() <= 5) {
        // Only handle Monday to Friday
        const start = day.clone().hour(9).toDate(); // 9:00 AM
        const end = day.clone().hour(17).toDate(); // 5:00 PM

        workHours.push({
          title: "Work Hours",
          start,
          end,
          allDay: false,
          backgroundColor: "rgba(0, 255, 0, 0.3)", // need fix - not working now
        });
      }
    }

    return workHours;
  };
  // const backgroundEvents = generateWorkHours();
  const backgroundEvents = useMemo(() => generateWorkHours(), []);

  // const eventStyleGetter = (
  //   event: any,
  //   start: Date,
  //   end: Date
  //   // isSelected: boolean
  // ) => {
  //   if (event.title === "Lunch Break") {
  //     const time = end.getTime() - start.getTime();
  //     if (time <= 30 * 60 * 1000) {
  //       return {
  //         style: {
  //           backgroundColor: "rgba(0, 255, 0, 0.7)", // Green color with 30% opacity
  //         },
  //       };
  //     }
  //     if (time > 30 * 60 * 1000) {
  //       return {
  //         style: {
  //           backgroundColor: "rgba(255, 0, 0, 0.3)", // Red color with 30% opacity
  //         },
  //       };
  //     }
  //   }

  //   if (event.title === "Actual Time") {
  //     const time = end.getTime() - start.getTime();
  //     if (time >= 8 * 1000 * 60 * 60) {
  //       return {
  //         style: {
  //           backgroundColor: "rgba(0, 255, 0, 0.6)", // Green color with 30% opacity
  //         },
  //       };
  //     }
  //     if (time < 7.83 * 1000 * 60 * 60) {
  //       return {
  //         style: {
  //           backgroundColor: "rgba(255, 0, 0, 0.6)", // Red color with 30% opacity
  //         },
  //       };
  //     }
  //   }

  //   return {};
  // };

  const eventStyleGetter = useCallback(
    (
      event: any,
      start: Date,
      end: Date
      // isSelected: boolean
    ) => {
      if (event.title === "Lunch Break") {
        const time = end.getTime() - start.getTime();
        if (time <= 30 * 60 * 1000) {
          return {
            style: {
              backgroundColor: "rgba(0, 255, 0, 0.7)", // Green color with 30% opacity
            },
          };
        }
        if (time > 30 * 60 * 1000) {
          return {
            style: {
              backgroundColor: "rgba(255, 0, 0, 0.3)", // Red color with 30% opacity
            },
          };
        }
      }

      if (event.title === "Actual Time") {
        const time = end.getTime() - start.getTime();
        if (time >= 8 * 1000 * 60 * 60) {
          return {
            style: {
              backgroundColor: "rgba(0, 255, 0, 0.6)", // Green color with 30% opacity
            },
          };
        }
        if (time < 7.83 * 1000 * 60 * 60) {
          return {
            style: {
              backgroundColor: "rgba(255, 0, 0, 0.6)", // Red color with 30% opacity
            },
          };
        }
      }

      return {};
    },
    []
  );

  return (
    <>
      <div className="myCustomHeight h-[520px] ">
        <Calendar
          // dayLayoutAlgorithm="no-overlap"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          min={new Date(0, 0, 0, 8)} // Set calendar start time to 8:00 AM
          max={new Date(0, 0, 0, 23)} // Set calendar end time to 8:00 PM
          defaultView="week"
          views={{
            month: true,
            week: true,
            work_week: true,
            day: true,
            agenda: true,
          }}
          backgroundEvents={backgroundEvents} // Set background events
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          onSelectSlot={handleSlotSelect}
          selectable
        />
      </div>
      <EventDialog
        isEventDialogOpen={isEventDialogOpen}
        closeEventDialog={closeEventDialog}
        selectedEvent={selectedEvent}
        userId={userId}
      />
    </>
  );
};
export default MyCalendar;

// const myEventsList = [
//   {
//     title: "Actual Time",
//     start: new Date(2024, 3, 22, 9, 0), // April 17, 2024, 9:00 AM
//     end: new Date(2024, 3, 22, 17, 15), // April 17, 2024, 5:15 PM
//   },
//   {
//     title: "Lunch Break",
//     start: new Date(2024, 3, 22, 12, 0), // April 17, 2024, 12:00 PM
//     end: new Date(2024, 3, 22, 12, 28), // April 17, 2024, 1:00 PM
//   },
//   {
//     title: "Actual Time",
//     start: new Date(2024, 3, 23, 9, 0), // April 17, 2024, 9:00 AM
//     end: new Date(2024, 3, 23, 16, 49), // April 17, 2024, 5:15 PM
//   },
//   {
//     title: "Lunch Break",
//     start: new Date(2024, 3, 23, 12, 0), // April 17, 2024, 12:00 PM
//     end: new Date(2024, 3, 23, 12, 31), // April 17, 2024, 1:00 PM
//   },
// ];
