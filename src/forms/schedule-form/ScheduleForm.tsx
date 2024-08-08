import { useState } from "react";
import { useForm } from "react-hook-form";

type Editing = {
  day: string | null;
  type: "checkIn" | "checkOut" | null;
};

type Props = {
  currentUserSchedule?: any;
};

export type ScheduleFromData = {
  monday?: { checkIn: string; checkOut: string };
  tuesday?: { checkIn: string; checkOut: string };
  wednesday?: { checkIn: string; checkOut: string };
  thursday?: { checkIn: string; checkOut: string };
  friday?: { checkIn: string; checkOut: string };
  saturday?: { checkIn: string; checkOut: string };
  sunday?: { checkIn: string; checkOut: string };
};

const ScheduleForm = ({ currentUserSchedule }: Props) => {
  const {
    register,
    // handleSubmit,
    // formState: { errors },
    // reset,
    // watch,
  } = useForm<ScheduleFromData>({
    defaultValues: currentUserSchedule || initialSchedule,
  });

  const [editing, setEditing] = useState<Editing>({ day: null, type: null });

  return (
    <form className="h-full w-full flex flex-col items-center space-y-4">
      <label className=" bg-slate-300 w-full rounded-lg grid grid-cols-4">
        <span className="flex justify-center">Mon</span>

        {editing.day === "monday" && editing.type === "checkIn" ? (
          <input
            className="flex justify-center relative"
            type="number"
            placeholder={currentUserSchedule?.monday?.checkIn}
            {...register("monday.checkIn")}
            onBlur={() => setEditing({ day: null, type: null })}
          />
        ) : (
          <span
            className="flex justify-center"
            onClick={() => setEditing({ day: "monday", type: "checkIn" })}
          >
            {currentUserSchedule?.monday?.checkIn}
          </span>
        )}

        {editing.day === "monday" && editing.type === "checkOut" ? (
          <input
            className="flex justify-center"
            type="number"
            {...register("monday.checkOut")}
            onBlur={() => setEditing({ day: null, type: null })}
          />
        ) : (
          <span
            className="flex justify-center"
            onClick={() => setEditing({ day: "monday", type: "checkOut" })}
          >
            {currentUserSchedule?.monday?.checkOut}
          </span>
        )}

        <span className="flex justify-center">Disable</span>
      </label>
    </form>
  );
};

export default ScheduleForm;

const initialSchedule = {
  Mon: { checkIn: "09:00", checkOut: "17:00" },
  Tue: { checkIn: "09:00", checkOut: "17:00" },
  Wed: { checkIn: "09:00", checkOut: "17:00" },
  Thu: { checkIn: "09:00", checkOut: "17:00" },
  Fri: { checkIn: "09:00", checkOut: "17:00" },
  Sat: { checkIn: "10:00", checkOut: "14:00" }, // Example different times for the weekend
  Sun: { checkIn: "10:00", checkOut: "14:00" },
};
