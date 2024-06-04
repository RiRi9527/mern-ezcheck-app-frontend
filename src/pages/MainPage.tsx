import SettingNav from "@/components/SettingNav";
import UserInfoNav from "@/components/UserInfoNav";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Ads from "@/components/Ads";
import EmployeeCard from "@/components/EmployeeCard";
import CheckInfo from "@/components/CheckInfo";
import WorkSchedule from "@/components/WorkSchedule";
import EmployeeInfoRightBar from "@/components/EmployeeInfoRightBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserCreateDialog from "@/components/UserCreateDialog";
import MyCalendar from "@/big-react-calendar/big-react-calender";

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

  const [isUserCreateDialog, setIsUserCreateDialog] = useState(false);
  const handleUserCreateDialog = () => {
    setIsUserCreateDialog(!isUserCreateDialog);
  };

  const [openEmployeeInfoRightBar, setOpenEmployeeInfoRightBar] =
    useState(false);

  const handleOpenEmployeeInfoRightBar = () => {
    setOpenEmployeeInfoRightBar(!openEmployeeInfoRightBar);
  };

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
            <UserInfoNav handleUserCreateDialog={handleUserCreateDialog} />
          </div>
          <div className="w-full h-9">
            <SettingNav />
          </div>
        </div>
        <div className="flex-1 flex justify-center bg-gray-200">
          <div className="w-full flex justify-center">
            <div className=" pt-4 w-full max-w-[2200px]">
              <div
                className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
                  !openEmployeeInfoRightBar && "2xl:grid-cols-5"
                } auto-rows-[260px] m-1`}
              >
                <div className=" sm:col-span-2 ">
                  <Ads />
                </div>
                <div>
                  <EmployeeCard
                    handleOpenEmployeeInfoRightBar={
                      handleOpenEmployeeInfoRightBar
                    }
                  />
                </div>
                <div className="">
                  <CheckInfo />
                </div>
                <div className=" sm:col-span-2 sm:row-span-1 lg:col-span-1 lg:row-span-2">
                  <WorkSchedule />
                </div>
                <div
                  className={`sm:col-span-3 ${
                    !openEmployeeInfoRightBar && "2xl:col-span-4 "
                  } row-span-2`}
                >
                  <MyCalendar />
                </div>
              </div>
            </div>
          </div>
        </div>
        {openEmployeeInfoRightBar && (
          <div className=" absolute h-full right-0 lg:static lg:h-auto lg:right-auto w-[400px] flex flex-col z-50 bg-gray-200 border-l-2 border-b-8  border-gray-700">
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
              <EmployeeInfoRightBar />
            </div>
          </div>
        )}
      </div>
      <UserCreateDialog
        isUserCreateDialog={isUserCreateDialog}
        handleUserCreateDialog={handleUserCreateDialog}
      />
      <Footer />
    </div>
  );
};

export default MainPage;
