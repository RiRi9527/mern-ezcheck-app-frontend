import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = () => (
  <div className="myCustomHeight">
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      min={new Date(0, 0, 0, 8)} // 设置日历开始时间为上午 8:00
      max={new Date(0, 0, 0, 23)} // 设置日历结束时间为晚上 8:00
    />
  </div>
);

export default MyCalendar;

const myEventsList = [
  {
    title: "Schedule Time",
    start: new Date(2024, 3, 17, 9, 0), // April 17, 2024, 10:00 AM
    end: new Date(2024, 3, 17, 17, 0), // April 17, 2024, 11:00 AM
  },
  {
    title: "Lunch Break",
    start: new Date(2024, 3, 17, 12, 0), // April 17, 2024, 12:00 PM
    end: new Date(2024, 3, 17, 12, 28), // April 17, 2024, 1:00 PM
  },
  {
    title: "Actual Time",
    start: new Date(2024, 3, 17, 9, 0), // April 17, 2024, 10:00 AM
    end: new Date(2024, 3, 17, 17, 15), // April 17, 2024, 11:00 AM
  },
];
