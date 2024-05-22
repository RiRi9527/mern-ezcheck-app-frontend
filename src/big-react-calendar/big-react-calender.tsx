import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import moment from "moment";
import EventDialog from "@/components/EventDialog";
import { useCallback, useEffect, useState } from "react";
import { EventData, User } from "@/types";
import { useGetEvents } from "@/api/EventApi";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

type Props = {
  user?: User;
};

const MyCalendar = ({ user }: Props) => {
  const { events, refetch: refetchEvents } = useGetEvents(user?._id);

  useEffect(() => {
    if (user) {
      refetchEvents();
    }
  }, [user]);

  useEffect(() => {
    if (user?.schedule) {
      const workHours = generateWorkHours(user.schedule);
      setBackgroundEvents(workHours);
    }
  }, [user]);

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | undefined>();
  const [backgroundEvents, setBackgroundEvents] = useState<
    {
      title: string;
      start: Date;
      end: Date;
      allDay: boolean;
    }[]
  >([]);

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
        startTime: event.start.toString(),
        endTime: event.end.toString(),
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
        startTime: event.start.toString(),
        endTime: event.end.toString(),
      };
      setSelectedEvent(SelectedEvent);
    },
    [setIsEventDialogOpen, setSelectedEvent]
  );

  const eventStyleGetter = useCallback(
    (
      event: any,
      start: Date,
      end: Date
      // isSelected: boolean
    ) => {
      if (event.title === "Working Time") {
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
        userId={user?._id}
      />
    </>
  );
};
export default MyCalendar;
