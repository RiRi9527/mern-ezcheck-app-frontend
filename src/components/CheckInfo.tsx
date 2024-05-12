import {
  Card,
  //   CardContent,
  //   CardDescription,
  //   CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const CheckInfo = () => {
  return (
    <Card className="h-full w-full grid grid-rows-2">
      <div className=" relative flex flex-col items-center justify-center border-b">
        <Button className=" w-28 ">Check in</Button>
        <div className=" absolute right-0 bottom-0">
          <Button variant="link" className=" w-20 ">
            Check out
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-t">
        <div>
          <p>Total Hrs: 40hr</p>
          <p>Check in at: 09:00 am</p>
          <p>Check out at: 17:00 pm</p>
        </div>
      </div>
    </Card>
  );
};

export default CheckInfo;
