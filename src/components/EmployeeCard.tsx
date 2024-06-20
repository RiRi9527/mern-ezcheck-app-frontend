import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useAppContext } from "@/content/AppContext";
import { useState } from "react";
import { useUpdateStatus } from "@/api/AccountApi";

type Props = {
  handleOpenEmployeeInfoRightBar: () => void;
};

const EmployeeCard = ({ handleOpenEmployeeInfoRightBar }: Props) => {
  const { user } = useAppContext();

  const [busy, setBusy] = useState(user?.status);

  const { updateStatus } = useUpdateStatus(user?._id);

  const handleChangeStatus = async () => {
    let status;
    if (busy !== "busy") {
      status = await updateStatus("busy");
    } else {
      status = await updateStatus("online");
    }
    if (status !== null && status !== undefined) {
      setBusy(status);
    }
  };

  return (
    <Card className=" relative h-full w-full flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle>Employee Info.</CardTitle>
        <CardDescription className="self-center">
          Paul Lee Agency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img src={user?.imageUrl} className="h-20  object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>{`${user?.firstName} ${user?.lastName}`}</p>
        <CardDescription className="self-center">
          {user?.position}
        </CardDescription>
      </CardFooter>
      <Button
        variant="ghost"
        className="absolute left-0 top-0 w-16 h-8 border-2 hover:bg-green-300"
        onClick={handleOpenEmployeeInfoRightBar}
      >
        Edit
      </Button>
      <Button
        variant="ghost"
        className={`absolute right-0 bottom-0 w-16 h-8 border-2 hover:bg-red-300 ${
          busy === "busy" && "bg-red-500"
        }`}
        onClick={handleChangeStatus}
      >
        Busy
      </Button>
    </Card>
  );
};

export default EmployeeCard;
