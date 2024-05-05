import { useGetAccount, useUpdateAccount } from "@/api/AccountApi";
import { useGetAllUsers } from "@/api/AuthApi";
import { useCreateCheckIn } from "@/api/EventApi";
import MyCalendar from "@/big-react-calendar/big-react-calender";
import MainUsersNav, { NavListUser } from "@/components/MainUsersNav";
import MobileUsersNav from "@/components/MobileUsersNav";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/content/AppContext";
import ManageAccountForm from "@/forms/manage-account-form/ManageAccountForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UserProfileAdminPage = () => {
  const { auth } = useAppContext();

  const disable =
    auth?.position !== "CEO" && auth?.position !== "Office Manager";

  // Retrieve a list of all users using the custom hook
  const { users } = useGetAllUsers();

  // Get the userId parameter from the URL path
  const { userId: userIdParam } = useParams();

  // State to track the current user ID being viewed
  const [userId, setUserId] = useState(userIdParam);

  // Hooks for updating account and fetching account details
  const { isLoading: isUpdateLoading, updateAccount } =
    useUpdateAccount(userId);
  const {
    user,
    isLoading: isGetLoading,
    isError,
    refetch: refetchUser,
  } = useGetAccount(userId);

  // Handler function for switching the user profile being viewed
  const handleUserSwitchClick = (user: NavListUser) => {
    if (disable) {
      return;
    }

    setUserId(user._id);
    toast.success("User Switched!");
  };

  // Refetch the user data whenever the userId changes
  useEffect(() => {
    refetchUser();
  }, [userId, refetchUser]);

  // check in

  // const { createEvent } = useCreateEvent(userId);
  const { createCheckInEvent } = useCreateCheckIn(userId);

  const handleCheckIn = () => {
    const eventData = {
      title: "Actual Time",
      startTime: new Date().toString(),
    };

    createCheckInEvent(eventData);
  };

  // Display an error message if there is an error fetching the user data
  if (isError) {
    return <>Error fetching user data (404 Not Found)</>;
  }

  // Display a loading message while data is being fetched
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-row">
      {/* Main content area */}
      <div className="grid flex-grow">
        <div className="grid md:grid-flow-col md:grid-cols-2">
          {/* Display the form to manage account information */}
          <div className="md:order-2">
            <ManageAccountForm
              onSave={updateAccount}
              isLoading={isUpdateLoading}
              account={user}
            />
          </div>
          {/* Placeholder for additional content */}
          <div className="md:order-1">
            <div className="flex flex-col space-y-2">
              <Button onClick={handleCheckIn}>Check in</Button>
              <Button>Check out</Button>
              <Button>Lunch</Button>
            </div>
          </div>
        </div>
        {/* Placeholder for additional content */}
        <div>
          <MyCalendar userId={userId} />
        </div>
      </div>

      {/* Sidebar for desktop view */}
      <div className="hidden md:block flex-shrink-0 flex-col ml-6 items-center justify-center space-y-3">
        {users && (
          <MainUsersNav users={users} handleClick={handleUserSwitchClick} />
        )}
      </div>

      {/* Sidebar for mobile view */}
      <div className="md:hidden flex-shrink-0 flex-col ml-6 items-center justify-center space-y-3">
        {users && (
          <MobileUsersNav users={users} handleClick={handleUserSwitchClick} />
        )}
      </div>
    </div>
  );
};

export default UserProfileAdminPage;
