import { usePayroll } from "@/api/EventApi";
import { useAppContext } from "@/content/AppContext";
import { useEffect, useState } from "react";

const PayrollPage = () => {
  const { user } = useAppContext();
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const { payroll } = usePayroll(
    user?._id,
    "2024-07-13T12:34:56.789Z",
    "payroll"
  );

  useEffect(() => {
    if (payroll?.payRoll) {
      let hours = 0;
      let minutes = 0;

      payroll.payRoll.forEach((event) => {
        if (event.start && event.end) {
          const start = new Date(event.start);
          const end = new Date(event.end);
          const diffMilliseconds = end.getTime() - start.getTime();
          const diffMinutes = diffMilliseconds / (1000 * 60);
          hours += Math.floor(diffMinutes / 60);
          minutes += Math.floor(diffMinutes % 60);
        }
      });

      setTotalHours(hours);
      setTotalMinutes(minutes);
    }
  }, [payroll]);

  console.log(payroll);

  const totalPay =
    (user?.hourlyWage || 0) * Number(payroll?.hours || 0) +
    ((user?.hourlyWage || 0) * Number(payroll?.minutes || 0)) / 60;
  console.log(`Total pay for ${user?.firstName}: ${totalPay}`);

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
        {payroll?.payRoll ? (
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Start Time</th>
                <th className="border border-gray-300 px-4 py-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {payroll.payRoll.map((event, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {event.start
                      ? new Date(event.start).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "Date not available"}
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
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={3}
                  className="text-right border-t border-gray-400 px-4 py-2 table-cell col-span-3"
                >
                  Total Working Time: {totalHours} hours {totalMinutes} minutes
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
