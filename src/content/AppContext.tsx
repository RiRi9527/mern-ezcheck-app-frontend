import { useGetAccount } from "@/api/AccountApi";
import { useGetAllUsers, useValidateToken } from "@/api/AuthApi";
import { useGetEvents, usePayroll } from "@/api/EventApi";
import { EventData, Payroll, User, Users } from "@/types";
import React, { useContext, useEffect, useMemo, useState } from "react";

type AppContext = {
  isLoggedIn: boolean;
  auth: User | undefined;
  user: User | undefined;
  users: Users[] | undefined;
  events: EventData[] | undefined;
  payroll: Payroll | undefined;
  userId: string | undefined;
  handleUserIdChange: (userId: string) => void;
  handleTimeRangeChange: (start: string, end: string) => void;
  refetchUser: any;
  refetchUsers: any;
  refetchEvents: any;
  refetchPayroll: any;
  payrollDateString: string;
};

type TimeRange = {
  start: string | undefined;
  end: string | undefined;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, auth } = useValidateToken();
  const [userId, setUserId] = useState(auth?._id);
  const [timeRange, setTimeRange] = useState<TimeRange | undefined>();

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

      // console.log(sunday.toISOString);
      // console.log(saturday);
      setTimeRange({
        start: sunday.toISOString(),
        end: saturday.toISOString(),
      });
    };

    getWeekStartAndEnd();

    setUserId(auth?._id);
  }, [auth]);

  const { user, refetch: refetchUser } = useGetAccount(userId);
  const { users, refetch: refetchUsers } = useGetAllUsers();
  const { events, refetch: refetchEvents } = useGetEvents(
    userId,
    timeRange?.start,
    timeRange?.end
  );

  const payrollDateString = useMemo(() => {
    const today = new Date();
    return today.toISOString();
  }, []);

  const { payroll, refetchPayroll } = usePayroll(
    user?._id,
    payrollDateString,
    "today"
  );

  const handleUserIdChange = (userId: string) => {
    if (isError) {
      return;
    }
    setUserId(userId);
  };

  const handleTimeRangeChange = (start: string, end: string) => {
    setTimeRange({
      start: start,
      end: end,
    });
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        auth,
        user,
        users,
        events,
        payroll,
        userId,
        refetchUser,
        refetchUsers,
        refetchEvents,
        handleUserIdChange,
        handleTimeRangeChange,
        refetchPayroll,
        payrollDateString,
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
