import { Card } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Schedule = {
  [key: string]: {
    start: string;
    end: string;
  };
};

type Editing = {
  day: string | null;
  type: "start" | "end" | null;
};

const initialSchedule = {
  Mon: { start: "09:00", end: "17:00" },
  Tue: { start: "09:00", end: "17:00" },
  Wed: { start: "09:00", end: "17:00" },
  Thu: { start: "09:00", end: "17:00" },
  Fri: { start: "09:00", end: "17:00" },
  Sat: { start: "10:00", end: "14:00" }, // Example different times for the weekend
  Sun: { start: "10:00", end: "14:00" },
};
const WorkSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);
  const [editing, setEditing] = useState<Editing>({ day: null, type: null });

  const handleInputChange = (
    day: string,
    type: "start" | "end",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const renderTimeInput = (day: string, type: "start" | "end") => {
    return editing.day === day && editing.type === type ? (
      <span className="flex justify-center relative">
        <input
          autoFocus
          type="number"
          className="w-full bg-slate-300 text-center"
          placeholder={schedule[day][type]}
          value={schedule[day][type]}
          onChange={(e) => handleInputChange(day, type, e.target.value)}
          onBlur={() => setEditing({ day: null, type: null })}
        />
        <ChevronUp className="absolute -translate-y-5 w-12" />
        <ChevronDown className="absolute translate-y-5 w-12" />
      </span>
    ) : (
      <span
        className="flex justify-center"
        onClick={() => setEditing({ day, type })}
      >
        {schedule[day][type]}
      </span>
    );
  };

  return (
    <Card className="h-full w-full flex flex-col items-center justify-center px-4 overflow-y-auto">
      <div className="mt-7 sm:p-3 lg:p-12 text-xl">
        <h1>Work Schedule</h1>
      </div>
      <div className="h-full w-full flex flex-col items-center space-y-4">
        {Object.keys(schedule).map((day) => (
          <div
            key={day}
            className=" bg-slate-300 w-full rounded-lg grid grid-cols-4"
          >
            <span className="flex justify-center">{day}</span>
            {renderTimeInput(day, "start")}
            {renderTimeInput(day, "end")}
            <span className="flex justify-center">Disable</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkSchedule;
