import SettingNav from "@/components/SettingNav";
import UserInfoNav from "@/components/UserInfoNav";
import { UserRoundSearch } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../public/Logo.jpg";

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Control menu visibility based on screen width
      if (prevWidth >= 768 && screenWidth < 768) {
        setIsMenuOpen(false); // Hide menu when screen width decreases below 768
      } else if (prevWidth < 768 && screenWidth >= 768) {
        setIsMenuOpen(true); // Show menu when screen width increases to 768 or above
      }

      // Update prevWidth
      setPrevWidth(screenWidth);
    };

    // Run once on component load
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [prevWidth]); // useEffect depends on prevWidth

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-700 h-11 flex justify-between">
        <div className="flex flex-row w-1/2 space-x-2">
          <div
            className="flex w-10 justify-center items-center text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </div>
          <div className="flex items-center py-2">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="px-2 my-1 border-b border-gray-400 flex-1 max-w-[450px] md:flex items-center hidden">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-white"
            />
            <UserRoundSearch className="text-white hover:cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-blue-900 rounded-full w-9 h-9 flex justify-center items-center">
            <h1 className="text-white font-bold">HZ</h1>
          </div>
          <div className="flex w-10 justify-center items-center text-white md:hidden">
            <UserRoundSearch />
          </div>
        </div>
      </div>
      <div className="relative flex flex-row w-full flex-1">
        <div
          className={`w-10 bg-gray-700 flex-col items-center md:flex ${
            !isMenuOpen && "hidden"
          }`}
        >
          <div className="w-full h-9">
            <UserInfoNav />
          </div>
          <div className="w-full h-9">
            <SettingNav />
          </div>
        </div>
        <div className="flex-1">right</div>
      </div>
      <div className="h-3 bg-gray-700"></div>
    </div>
  );
};

export default MainPage;