import {
  Card,
  //   CardContent,
  //   CardDescription,
  //   CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

const EmployeeList = () => {
  return (
    <Card className="h-full w-full flex flex-col overflow-auto">
      <h1>online:</h1>
      <div className="p-2 grid grid-cols-3 gap-3">
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-green-300 flex justify-center items-center">
          IMG
        </div>
      </div>
      <Separator className="mt-4 border"></Separator>
      <h1>offline:</h1>
      <div className="p-2 grid grid-cols-3 gap-3">
        <div className="w-20 h-20 rounded-full bg-red-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-red-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-red-300 flex justify-center items-center">
          IMG
        </div>
        <div className="w-20 h-20 rounded-full bg-red-300 flex justify-center items-center">
          IMG
        </div>
      </div>
    </Card>
  );
};

export default EmployeeList;
