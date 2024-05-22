import { useUpdateAccount } from "@/api/AccountApi";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";
import { User } from "@/types";

type Props = {
  user?: User;
  refetchUser: () => void;
};

const EmployeeInfoRightBar = ({ user, refetchUser }: Props) => {
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
            refetchUser={refetchUser}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeInfoRightBar;
