import MobileNav from "@/components/MobileNav";
import { Settings } from "lucide-react";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-700 h-11 flex justify-between">
        <div className="flex flex-row w-1/2">
          <div className="flex items-center">
            <img src="" alt="Logo" />
          </div>
          <div className="px-2 my-1 border-b border-gray-400 flex-1 max-w-[450px] flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-white"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-blue-900 rounded-full w-9 h-9 flex justify-center items-center">
            <h1 className="text-white font-bold">HZ</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full flex-1">
        <div className="w-10 bg-gray-700 flex flex-col items-center  ">
          <div className="w-full border-b border-gray-500 flex justify-center mt-1 py-2">
            <MobileNav />
          </div>
          <div className="w-full border-b border-gray-500 flex justify-center py-2">
            <Settings color="white" />
          </div>
        </div>
        <div className="flex-1 bg-red-500">right</div>
      </div>
      <div className="h-3 bg-gray-700"></div>
    </div>
  );
};

export default MainPage;
