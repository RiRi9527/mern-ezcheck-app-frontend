import { useGetAccount } from "@/api/AccountApi";
import { useGetAllUsers, useValidateToken } from "@/api/AuthApi";
import { User } from "@/types";
import React, { useContext, useEffect, useState } from "react";

type AppContext = {
  isLoggedIn: boolean;
  auth: User | undefined;
  user: User | undefined;
  users: any;
  handleUserIdChange: (userId: string) => void;
  refetchUser: any;
  refetchUsers: any;
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
        refetchUser,
        refetchUsers,
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
