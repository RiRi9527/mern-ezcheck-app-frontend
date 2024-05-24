import { useUpdateAccount } from "@/api/AccountApi";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";
import { User } from "@/types";

type Props = {
  user?: User;
  handleClickAndRefetch: (userId: string) => void;
};

const EmployeeInfoRightBar = ({ user, handleClickAndRefetch }: Props) => {
  const { isLoading: isUpdateLoading, updateAccount } = useUpdateAccount(
    user?._id
  );
  return (
    <div>
      {true && (
        <div>
          <ManageAccountForm
            account={user}
            onSave={updateAccount}
            isLoading={isUpdateLoading}
            handleClickAndRefetch={handleClickAndRefetch}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeInfoRightBar;
