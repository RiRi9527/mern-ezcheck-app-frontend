import { usePayroll } from "@/api/EventApi";
import { useAppContext } from "@/content/AppContext";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const PayrollPage = () => {
  const { user, payrollDateString } = useAppContext();

  const [date, setDate] = useState<Date>();

  const payrollDate = date ? date.toISOString() : payrollDateString;
  const { payroll } = usePayroll(user?._id, payrollDate, "payroll");

  const totalPay =
    (user?.hourlyWage || 0) * Number(payroll?.hours || 0) +
    ((user?.hourlyWage || 0) * Number(payroll?.minutes || 0)) / 60;

  let previousStart: string = "1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 w-[8.27in] h-[11.69in] border border-gray-300">
        <h1 className="text-2xl font-bold mb-4">
          Payroll: ${totalPay}- {user?.firstName} -{" "}
          {payroll?.weekStartDateString &&
            new Date(payroll?.weekStartDateString).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}{" "}
          -{" "}
          {payroll?.weekEndDateString &&
            new Date(payroll?.weekEndDateString).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal mb-4",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {payroll?.payRoll ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Start Time</th>
                <th className="border border-gray-300 px-4 py-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {payroll.payRoll.map((event, index) => {
                const xxx = previousStart.split("T")[0];
                const yyy = event?.start?.split("T")[0];

                const showDate = xxx !== yyy;

                previousStart = event.start || "1"; // Update previousStart for next comparison

                console.log(xxx);
                console.log(yyy);
                console.log(previousStart);

                return (
                  <tr key={index}>
                    <td
                      className={
                        showDate
                          ? "border-l border-r border-t border-gray-300 px-4 py-2"
                          : ""
                      }
                    >
                      {event.start && showDate
                        ? new Date(event.start).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {event.start
                        ? new Date(event.start).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Start time not available"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {event.end
                        ? new Date(event.end).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "End time not available"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  className="text-right border-t border-gray-300 px-4 py-2 table-cell col-span-3"
                >
                  Total Working Time: {payroll.hours} hours {payroll.minutes}{" "}
                  minutes
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No payroll events found.</p>
        )}
      </div>
    </div>
  );
};

export default PayrollPage;
