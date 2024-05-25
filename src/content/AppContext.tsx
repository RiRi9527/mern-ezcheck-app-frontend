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
