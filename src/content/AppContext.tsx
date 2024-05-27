import { useGetAccount } from "@/api/AccountApi";
import { useGetAllUsers, useValidateToken } from "@/api/AuthApi";
import { useGetEvents } from "@/api/EventApi";
import { EventData, User, Users } from "@/types";
import React, { useContext, useEffect, useState } from "react";

type AppContext = {
  isLoggedIn: boolean;
  auth: User | undefined;
  user: User | undefined;
  users: Users | undefined;
  events: EventData[] | undefined;
  handleUserIdChange: (userId: string) => void;
  refetchUser: any;
  refetchUsers: any;
  refetchEvents: any;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, auth } = useValidateToken();
  const [userId, setUserId] = useState(auth?._id);

  useEffect(() => {
    const getWeekStartAndEnd = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6
      const diffToSunday = dayOfWeek; // Difference to the previous Sunday
      const diffToSaturday = 6 - dayOfWeek; // Difference to the next Saturday

      const sunday = new Date(now);
      sunday.setDate(now.getDate() - diffToSunday);
      sunday.setHours(0, 0, 0, 0); // Set to Sunday 00:00

      const saturday = new Date(now);
      saturday.setDate(now.getDate() + diffToSaturday);
      saturday.setHours(23, 59, 59, 999); // Set to Saturday 23:59:59:999

      console.log(sunday);
      console.log(saturday);
    };

    getWeekStartAndEnd();

    setUserId(auth?._id);
  }, [auth]);

  const { user, refetch: refetchUser } = useGetAccount(userId);
  const { users, refetch: refetchUsers } = useGetAllUsers();
  const { events, refetch: refetchEvents } = useGetEvents(userId);

  const handleUserIdChange = (userId: string) => {
    if (isError) {
      return;
    }
    setUserId(userId);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        auth,
        user,
        users,
        events,
        refetchUser,
        refetchUsers,
        refetchEvents,
        handleUserIdChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
