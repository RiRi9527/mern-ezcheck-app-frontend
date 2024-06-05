import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import moment from "moment";
import EventDialog from "@/components/EventDialog";
import { useCallback, useEffect, useState } from "react";
import { BackgroundEvent, EventData } from "@/types";
import { useAppContext } from "@/content/AppContext";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = () => {
  const { user, events: fetchedEvent, handleTimeRangeChange } = useAppContext();

  const [events, setEvents] = useState<EventData[] | undefined>();
  const [backgroundEvents, setBackgroundEvents] = useState<BackgroundEvent[]>();

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | undefined>();

  useEffect(() => {
    if (user?.schedule) {
      const workHours = generateWorkHours(user.schedule);
      setBackgroundEvents(workHours);
    }
  }, [user]);

  useEffect(() => {
    if (fetchedEvent) {
      const formattedEventData = fetchedEvent.map((event: any) => {
        switch (true) {
          case !event.end && event.title === "Working Time":
            return {
              ...event,
              start: new Date(event.start),
              end: new Date(),
            };
          case !event.end || !event.start:
            return {
              ...event,
              start: new Date(event.start || event.end || ""),
              end: new Date(event.start || event.end || ""), // 如果没有结束时间，开始和结束时间相同
            };
          default:
            return {
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
            };
        }
      });
      setEvents(formattedEventData);
    }
  }, [fetchedEvent]);

  const generateWorkHours = (initialSchedule: any) => {
    const startOfWeek = moment().startOf("week"); // Start date of the week
    const endOfWeek = moment().endOf("week"); // End date of the week

    const workHours = [];

    for (let day = startOfWeek; day <= endOfWeek; day.add(1, "day")) {
      const dayOfWeek = day.format("dddd").toLocaleLowerCase();
      const schedule = initialSchedule[dayOfWeek];

      if (schedule) {
        const start = day
          .clone()
          .set({
            hour: moment(schedule.checkIn, "HH:mm").hour(),
            minute: moment(schedule.checkIn, "HH:mm").minute(),
          })
          .toDate();

        const end = day
          .clone()
          .set({
            hour: moment(schedule.checkOut, "HH:mm").hour(),
            minute: moment(schedule.checkOut, "HH:mm").minute(),
          })
          .toDate();

        workHours.push({
          title: "Work Schedule",
          start,
          end,
          allDay: false,
        });
      }
    }

    return workHours;
  };

  const closeEventDialog = () => {
    setIsEventDialogOpen(false);
  };

  const handleEventSelect = useCallback(
    (event: any) => {
      setIsEventDialogOpen(true);
      let SelectedEvent: EventData = {
        _id: event._id,
        title: event.title,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
      };
      setSelectedEvent(SelectedEvent);
    },
    [setIsEventDialogOpen, setSelectedEvent]
  );

  const handleSlotSelect = useCallback(
    (event: any) => {
      // console.log("Selected slot:", event.start, event.end);
      setIsEventDialogOpen(true);
      let SelectedEvent: EventData = {
        _id: event._id,
        title: event.title,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
      };
      setSelectedEvent(SelectedEvent);
    },
    [setIsEventDialogOpen, setSelectedEvent]
  );

  const handleRangeChange = (range: any) => {
    let start, end;
    if (Array.isArray(range)) {
      // The week view returns an array of dates
      start = range[0];
      end = range[range.length - 1];
    } else {
      // The month view and day view return an object
      start = range.start;
      end = range.end;
    }

    const dateStringStart = start.toISOString();
    const dateStringEnd = end.toISOString();
    handleTimeRangeChange(dateStringStart, dateStringEnd);
  };

  // const eventStyleGetter = useCallback(
  //   (
  //     event: any,
  //     start: Date,
  //     end: Date
  //     // isSelected: boolean
  //   ) => {
  //     if (event.title === "Working Time") {
  //       const time = end.getTime() - start.getTime();
  //       if (time >= 8 * 1000 * 60 * 60) {
  //         return {
  //           style: {
  //             backgroundColor: "rgba(0, 255, 0, 0.6)", // Green color with 30% opacity
  //           },
  //         };
  //       }
  //       if (time < 7.83 * 1000 * 60 * 60) {
  //         return {
  //           style: {
  //             backgroundColor: "rgba(255, 0, 0, 0.6)", // Red color with 30% opacity
  //           },
  //         };
  //       }
  //     }

  //     return {};
  //   },
  //   []
  // );

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
          // eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          onSelectSlot={handleSlotSelect}
          onRangeChange={handleRangeChange}
          selectable
        />
      </div>
      <EventDialog
        isEventDialogOpen={isEventDialogOpen}
        closeEventDialog={closeEventDialog}
        selectedEvent={selectedEvent}
      />
    </>
  );
};
export default MyCalendar;
