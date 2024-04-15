import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

import { useCreateAccount } from "@/api/AccountApi";
import { useAppContext } from "@/content/AppContext";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";

const RegisterDialog = () => {
  const { auth } = useAppContext();
  const disable =
    auth?.position !== "CEO" && auth?.position !== "Office Manager";

  const {
    createAccount,
    isLoading: isCreateLoading,
    isSuccess,
    userId,
  } = useCreateAccount();

  return (
    <Dialog>
      <DialogTrigger disabled={disable}>
        <div className="flex flex-col items-center hover:cursor-pointer">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200">
            <div className="text-2xl font-bold text-gray-700">+</div>
          </div>
          <h1 className="text-xl">Add User</h1>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="md:order-2">
              <ManageAccountForm
                onSave={createAccount}
                isLoading={isCreateLoading}
                isSuccess={isSuccess}
                userId={userId}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
