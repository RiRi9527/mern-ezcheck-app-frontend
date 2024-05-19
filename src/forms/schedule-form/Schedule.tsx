import { useState } from "react";
import { useForm } from "react-hook-form";

type Editing = {
  day: string | null;
  type: "checkIn" | "checkOut" | null;
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

const Schedule = ({ currentUserSchedule }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ScheduleFromData>({
    defaultValues: currentUserSchedule || initialSchedule,
  });

  const [editing, setEditing] = useState<Editing>({ day: null, type: null });

  <form>
    <label className=" bg-slate-300 w-full rounded-lg grid grid-cols-4">
      <span className="flex justify-center">Mon</span>
    </label>
  </form>;
};

export default Schedule;

const initialSchedule = {
  Mon: { checkIn: "09:00", checkOut: "17:00" },
  Tue: { checkIn: "09:00", checkOut: "17:00" },
  Wed: { checkIn: "09:00", checkOut: "17:00" },
  Thu: { checkIn: "09:00", checkOut: "17:00" },
  Fri: { checkIn: "09:00", checkOut: "17:00" },
  Sat: { checkIn: "10:00", checkOut: "14:00" }, // Example different times for the weekend
  Sun: { checkIn: "10:00", checkOut: "14:00" },
};
