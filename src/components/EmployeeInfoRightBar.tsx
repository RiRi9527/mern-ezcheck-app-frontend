import { useUpdateAccount } from "@/api/AccountApi";
import { useAppContext } from "@/content/AppContext";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";

const EmployeeInfoRightBar = () => {
  const { user } = useAppContext();

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
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeInfoRightBar;
