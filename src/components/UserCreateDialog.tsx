import { Dialog, DialogContent } from "./ui/dialog";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";
import { useCreateAccount } from "@/api/AccountApi";

interface EventDialogProps {
  isUserCreateDialog: boolean; // Define the type of isEventDialogOpen
  handleUserCreateDialog: () => void;
  handleClickAndRefetch: (userId: string) => void;
}

const UserCreateDialog: React.FC<EventDialogProps> = ({
  isUserCreateDialog,
  handleUserCreateDialog,
  handleClickAndRefetch,
}) => {
  const {
    createAccount,
    isLoading: isCreateLoading,
    isSuccess,
  } = useCreateAccount();

  return (
    <Dialog open={isUserCreateDialog} onOpenChange={handleUserCreateDialog}>
      <DialogContent className=" max-h-screen overflow-y-scroll">
        <div className="md:order-2">
          <ManageAccountForm
            onSave={createAccount}
            isLoading={isCreateLoading}
            isSuccess={isSuccess}
            handleClickAndRefetch={handleClickAndRefetch}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserCreateDialog;
