import { Card } from "@/components/ui/card";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const WorkSchedule = () => {
  const [editing, setEditing] = useState(false);

  return (
    <Card className="h-full w-full flex flex-col items-center justify-center px-4 overflow-y-auto">
      <div className=" mt-7 sm:p-12 text-xl">
        <h1>Work Schedule</h1>
      </div>
      <div className="h-full w-full flex flex-col items-center space-y-4">
        <div className=" bg-red-500  w-full rounded-lg grid grid-cols-4">
          <span className="flex justify-center">Monday</span>
          <span onClick={() => setEditing(true)}>
            {editing ? (
              <span className="flex justify-center">
                <input
                  autoFocus
                  type="text"
                  className="w-full bg-red-500 text-center "
                  placeholder="09:00"
                  onBlur={() => setEditing(false)}
                />
                <ChevronUp className=" absolute -translate-y-5  w-12" />
                <ChevronDown className=" absolute translate-y-5  w-12 " />
              </span>
            ) : (
              <span className="flex justify-center">09:00</span>
            )}
          </span>

          <span className="flex justify-center">17:00</span>
          <span className="flex justify-center">Disable</span>
        </div>
        <div className=" bg-red-500  w-full rounded-lg grid grid-cols-4 ">
          <span className="flex justify-center">Monday</span>

          <span className="flex justify-center">09:00</span>

          <span className="flex justify-center">17:00</span>
          <span className="flex justify-center">Disable</span>
        </div>
        <div className=" bg-red-500  w-full rounded-lg flex justify-evenly">
          <span>Wednesday</span>
          <span>9:00</span>
          <span>17:00</span>
          <span>Disable</span>
        </div>
        <div className=" bg-red-500  w-full rounded-lg flex justify-evenly">
          <span>Thursday</span>
          <span>9:00</span>
          <span>17:00</span>
          <span>Disable</span>
        </div>
        <div className=" bg-red-500  w-full rounded-lg flex justify-evenly">
          <span>Friday</span>
          <span>9:00</span>
          <span>17:00</span>
          <span>Disable</span>
        </div>
        <div className=" bg-red-500  w-full rounded-lg flex justify-evenly">
          <span>Saturday</span>
          <span>9:00</span>
          <span>17:00</span>
          <span>Disable</span>
        </div>
        <div className=" bg-red-500  w-full rounded-lg flex justify-evenly">
          <span>Sunday</span>
          <span>9:00</span>
          <span>17:00</span>
          <span>Disable</span>
        </div>
      </div>
    </Card>
  );
};

export default WorkSchedule;
