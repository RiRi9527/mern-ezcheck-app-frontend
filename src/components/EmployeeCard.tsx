import { User } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  user?: User;
  isLoading: boolean;
};

const EmployeeCard = ({ user, isLoading }: Props) => {
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Card className="h-full w-full flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle>Employee Info.</CardTitle>
        <CardDescription className="self-center">
          Paul Lee Agency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img src={user?.imageUrl} alt="Logo" className="h-20  object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>{`${user?.firstName} ${user?.lastName}`}</p>
        <CardDescription className="self-center">
          {user?.position}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
