import { useValidateToken } from "@/api/AuthApi";
import { User } from "@/types";
import React, { useContext } from "react";

type AppContext = {
  isLoggedIn: boolean;
  auth: User | undefined;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, auth } = useValidateToken();

  return (
    <AppContext.Provider value={{ isLoggedIn: !isError, auth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
