import { useGetAllUsers } from "@/api/AuthApi";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useCreateAccount } from "@/api/AccountApi";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";

type Props = {
  handleClick: (user: any) => void;
  refetch: () => void;
};

export type NavListUser = {
  _id: string;
  firstName: string;
  imageUrl: string;
};

const EmployeeList = ({ handleClick, refetch }: Props) => {
  const { users } = useGetAllUsers();

  const {
    createAccount,
    isLoading: isCreateLoading,
    isSuccess,
    userId,
  } = useCreateAccount();

  const handleClickAndRefetch = async (user: any) => {
    await handleClick(user);
    refetch();
  };

  return (
    <Card className="h-full w-full flex flex-col overflow-auto">
      <h1>online:</h1>
      <div className="p-2 grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {users?.map((user: NavListUser) => (
          <div
            className="flex justify-center items-center hover:cursor-pointer"
            key={user._id}
            onClick={() => handleClickAndRefetch(user)}
          >
            <div
              className="w-16 h-16 rounded-full bg-green-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center text-white border-2 border-green-500 overflow-hidden"
              style={{
                backgroundImage: `url(${user.imageUrl})`,
              }}
            >
              {user.firstName}
            </div>
          </div>
        ))}
        <Dialog>
          <DialogTrigger>
            <div className="flex flex-col items-center hover:cursor-pointer">
              <div className="min-w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                <div className="text-2xl font-bold text-gray-700">+</div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className=" max-h-screen overflow-y-scroll">
            <div className="md:order-2">
              <ManageAccountForm
                onSave={createAccount}
                isLoading={isCreateLoading}
                isSuccess={isSuccess}
                userId={userId}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="mt-4 border"></Separator>
      <h1>offline:</h1>
      <div className="p-2 grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {users?.map((user: NavListUser) => (
          <div
            className="flex justify-center items-center hover:cursor-pointer"
            key={user._id}
            onClick={() => handleClickAndRefetch(user)}
          >
            <div
              className="w-16 h-16 rounded-full bg-green-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center border-2 border-gray-500 overflow-hidden"
              style={{
                backgroundImage: `url(${user.imageUrl})`,
              }}
            >
              <p>{user.firstName}</p>
            </div>
          </div>
        ))}
        <Dialog>
          <DialogTrigger>
            <div className="flex flex-col items-center hover:cursor-pointer">
              <div className="min-w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                <div className="text-2xl font-bold text-gray-700">+</div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className="md:order-2">
              <ManageAccountForm
                onSave={createAccount}
                isLoading={isCreateLoading}
                isSuccess={isSuccess}
                userId={userId}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default EmployeeList;
