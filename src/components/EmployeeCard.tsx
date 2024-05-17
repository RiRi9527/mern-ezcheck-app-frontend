import { User } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type Props = {
  user?: User;
  isLoading: boolean;
  handleOpenEmployeeInfoRightBar: () => void;
};

const EmployeeCard = ({
  user,
  isLoading,
  handleOpenEmployeeInfoRightBar,
}: Props) => {
  if (isLoading) {
    return <div>Loading</div>;
  }

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
        className="absolute right-0 bottom-0 w-16 h-8 border-2 hover:bg-green-300"
        onClick={handleOpenEmployeeInfoRightBar}
      >
        Edit
      </Button>
    </Card>
  );
};

export default EmployeeCard;
