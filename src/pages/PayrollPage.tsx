import { usePayroll } from "@/api/EventApi";
import { useAppContext } from "@/content/AppContext";

const PayrollPage = () => {
  const { user } = useAppContext();

  const { payroll } = usePayroll(
    user?._id,
    "2024-07-13T12:34:56.789Z",
    "payroll"
  );

  console.log(payroll);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 w-[8.27in] h-[11.69in] border border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Payroll</h1>
        {/* 你可以在这里添加更多内容 */}
      </div>
    </div>
  );
};

export default PayrollPage;
