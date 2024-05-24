import SettingNav from "@/components/SettingNav";
import UserInfoNav from "@/components/UserInfoNav";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import MyCalendar from "@/big-react-calendar/big-react-calender";
import Ads from "@/components/Ads";
import EmployeeCard from "@/components/EmployeeCard";
import CheckInfo from "@/components/CheckInfo";
import WorkSchedule from "@/components/WorkSchedule";
import { useAppContext } from "@/content/AppContext";
import { toast } from "sonner";
import { useGetAccount } from "@/api/AccountApi";
import EmployeeInfoRightBar from "@/components/EmployeeInfoRightBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserCreateDialog from "@/components/UserCreateDialog";
import { useGetAllUsers } from "@/api/AuthApi";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { auth } = useAppContext();
  const disable =
    auth?.position !== "CEO" && auth?.position !== "Office Manager";

  // auth check
  const { userId: initialId } = useParams();
  const [userId, setUserId] = useState(initialId);

  const [isUserCreateDialog, setIsUserCreateDialog] = useState(false);
  const handleUserCreateDialog = () => {
    setIsUserCreateDialog(!isUserCreateDialog);
  };

  const [openEmployeeInfoRightBar, setOpenEmployeeInfoRightBar] =
    useState(false);

  const handleOpenEmployeeInfoRightBar = () => {
    setOpenEmployeeInfoRightBar(!openEmployeeInfoRightBar);
  };

  const handleClickAndRefetch = async (userId: string) => {
    if (disable) {
      return;
    }

    setUserId(userId);
    await refetchUsers();
    await refetchUser();
    toast.success("User Switched!");
  };

  const {
    user,
    isLoading: isGetLoading,
    isError,
    refetch: refetchUser,
  } = useGetAccount(userId);

  const { users, refetch: refetchUsers } = useGetAllUsers();

  if (isError) {
    return <>Error fetching user data (404 Not Found)</>;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Header
        handleIsMenuOpen={handleIsMenuOpen}
        handleOpenEmployeeInfoRightBar={handleOpenEmployeeInfoRightBar}
      />
      <div className="relative flex flex-row w-full flex-1">
        <div
          className={`w-10 bg-gray-700 flex-col items-center md:flex ${
            !isMenuOpen && "hidden"
          }`}
        >
          <div className="w-full h-9">
            <UserInfoNav
              handleClickAndRefetch={handleClickAndRefetch}
              handleUserCreateDialog={handleUserCreateDialog}
              users={users}
            />
          </div>
          <div className="w-full h-9">
            <SettingNav />
          </div>
        </div>
        <div className="flex-1 flex justify-center bg-gray-200">
          <div className=" pt-4 w-full max-w-[2200px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 auto-rows-[260px] m-1">
              <div className=" sm:col-span-2 ">
                <Ads />
              </div>
              <div>
                <EmployeeCard
                  user={user}
                  isLoading={isGetLoading}
                  handleOpenEmployeeInfoRightBar={
                    handleOpenEmployeeInfoRightBar
                  }
                />
              </div>
              <div className="">
                <CheckInfo />
              </div>
              <div className=" sm:col-span-2 sm:row-span-1 lg:col-span-1 lg:row-span-2">
                <WorkSchedule user={user} refetch={refetchUser} />
              </div>
              <div className="sm:col-span-3 2xl:col-span-4 row-span-2">
                <MyCalendar user={user} />
              </div>
            </div>
          </div>
        </div>
        {openEmployeeInfoRightBar && (
          <div className=" w-[400px] flex flex-col z-50 bg-gray-200 border-l-2 border-b-8  border-gray-700">
            <div className="w-full h-8 bg-gray-700 flex justify-between px-2 items-center">
              <span className=" text-white text-xs">Employee Info.</span>
              <span>
                <button
                  className="text-white"
                  onClick={() => setOpenEmployeeInfoRightBar(false)}
                >
                  <X size={20} />
                </button>
              </span>
            </div>

            <div className="p-4 ">
              <EmployeeInfoRightBar
                user={user}
                handleClickAndRefetch={handleClickAndRefetch}
              />
            </div>
          </div>
        )}
      </div>
      <UserCreateDialog
        isUserCreateDialog={isUserCreateDialog}
        handleUserCreateDialog={handleUserCreateDialog}
        handleClickAndRefetch={handleClickAndRefetch}
      />
      <Footer />
    </div>
  );
};

export default MainPage;
