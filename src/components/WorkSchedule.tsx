import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserSchedule, User } from "@/types";
import { useUpdateSchedule } from "@/api/AccountApi";
import { Separator } from "./ui/separator";

type Props = {
  user: User | undefined;
  refetch: () => void;
};

type Editing = {
  day: string | null;
  type: "checkIn" | "checkOut" | null;
};

type Schedule = {
  [key: string]: {
    checkIn: string | undefined;
    checkOut: string | undefined;
    disable?: Boolean;
  };
};

type DayScheduleOne = {
  Mon: Schedule;
  Tue: Schedule;
  Wed: Schedule;
  Thu: Schedule;
  Fri: Schedule;
  Sat: Schedule;
  Sun: Schedule;
};

type DayScheduleTwo = {
  monday: Schedule;
  tuesday: Schedule;
  wednesday: Schedule;
  thursday: Schedule;
  friday: Schedule;
  saturday: Schedule;
  sunday: Schedule;
};

const initialSchedule = {
  Sun: { checkIn: "10:00", checkOut: "14:00", disable: true },
  Mon: { checkIn: "09:00", checkOut: "17:00", disable: true },
  Tue: { checkIn: "09:00", checkOut: "17:00", disable: true },
  Wed: { checkIn: "09:00", checkOut: "17:00", disable: true },
  Thu: { checkIn: "09:00", checkOut: "17:00", disable: true },
  Fri: { checkIn: "09:00", checkOut: "17:00", disable: true },
  Sat: { checkIn: "10:00", checkOut: "14:00", disable: true },
};

const WorkSchedule = ({ user, refetch }: Props) => {
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);

  useEffect(() => {
    let updateSchedule = {
      Sun: { checkIn: "10:00", checkOut: "14:00", disable: true },
      Mon: { checkIn: "09:00", checkOut: "17:00", disable: true },
      Tue: { checkIn: "09:00", checkOut: "17:00", disable: true },
      Wed: { checkIn: "09:00", checkOut: "17:00", disable: true },
      Thu: { checkIn: "09:00", checkOut: "17:00", disable: true },
      Fri: { checkIn: "09:00", checkOut: "17:00", disable: true },
      Sat: { checkIn: "10:00", checkOut: "14:00", disable: true },
    };
    const daysMap: { [key: string]: keyof DayScheduleOne } = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    };

    if (user?.schedule) {
      (Object.keys(user.schedule) as (keyof UserSchedule)[]).forEach((key) => {
        if (daysMap[key]) {
          const dayKey = key;
          updateSchedule[daysMap[dayKey]].checkIn =
            user.schedule[dayKey]?.checkIn || "";
          updateSchedule[daysMap[dayKey]].checkOut =
            user.schedule[dayKey]?.checkOut || "";
          updateSchedule[daysMap[dayKey]].disable = false;
        }
      });
    }

    setSchedule(updateSchedule);
  }, [user]);

  const { updateSchedule, isLoading } = useUpdateSchedule(user?._id);

  const [editing, setEditing] = useState<Editing>({ day: null, type: null });

  const handleInputChange = (
    day: string,
    type: "checkIn" | "checkOut",
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

  const renderTimeInput = (day: string, type: "checkIn" | "checkOut") => {
    return editing.day === day && editing.type === type ? (
      <span className="flex justify-center ">
        <input
          autoFocus
          type="time"
          className="w-full bg-slate-300 text-center"
          value={schedule[day][type]}
          onChange={(e) => handleInputChange(day, type, e.target.value)}
          onBlur={() => setEditing({ day: null, type: null })}
        />
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

  const handleDisable = (day: string) => {
    const newSchedule: Schedule = { ...schedule };
    if (newSchedule.hasOwnProperty(day)) {
      newSchedule[day] = {
        ...newSchedule[day],
        disable: !newSchedule[day].disable,
      };
    } else {
      console.error(`Invalid day: ${day}`);
    }
    setSchedule(newSchedule);
  };
  const handleScheduleSubmit = async () => {
    const daysMap: { [key: string]: keyof DayScheduleTwo } = {
      Mon: "monday",
      Tue: "tuesday",
      Wed: "wednesday",
      Thu: "thursday",
      Fri: "friday",
      Sat: "saturday",
      Sun: "sunday",
    };

    const formSchedule = Object.entries(schedule).reduce(
      (acc, [day, { checkIn, checkOut, disable }]) => {
        if (!disable) {
          const fullDay = daysMap[day];
          acc[fullDay.toLowerCase()] = { checkIn, checkOut };
        }
        return acc;
      },
      {} as {
        [key: string]: {
          checkIn: string | undefined;
          checkOut: string | undefined;
        };
      }
    );

    await updateSchedule(formSchedule);
    refetch();
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
            className=" relative bg-slate-300 w-full rounded-lg grid grid-cols-4 hover:cursor-pointer"
          >
            <span className="flex justify-center">{day}</span>
            {renderTimeInput(day, "checkIn")}
            {renderTimeInput(day, "checkOut")}
            <span className=" relative flex justify-center">
              {schedule[day].disable ? (
                <span
                  className=" flex justify-center hover:bg-green-300  w-full rounded-lg z-50"
                  onClick={() => handleDisable(day)}
                >
                  Enable
                </span>
              ) : (
                <span
                  className=" flex justify-center hover:bg-red-400  w-full rounded-lg"
                  onClick={() => handleDisable(day)}
                >
                  Disable
                </span>
              )}
            </span>
            {schedule[day].disable && (
              <div className="absolute inset-0 bg-black opacity-40 rounded-full flex items-center ">
                <Separator />
              </div>
            )}
          </div>
        ))}
        {isLoading ? (
          <Button className=" bg-blue-600 hover:bg-blue-300 w-full rounded-lg">
            Loading
          </Button>
        ) : (
          <Button
            className=" bg-blue-600 hover:bg-blue-300 w-full rounded-lg"
            onClick={handleScheduleSubmit}
          >
            Update
          </Button>
        )}
      </div>
    </Card>
  );
};

export default WorkSchedule;
