import logo from "/Logo.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmployeeCard = () => {
  return (
    <Card className="h-full w-full flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle>Employee Info.</CardTitle>
        <CardDescription className="self-center">
          Paul Lee Agency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img src={logo} alt="Logo" className="h-20  object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p>Hao Zhou</p>
        <CardDescription className="self-center">
          Customer Service Representative
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
