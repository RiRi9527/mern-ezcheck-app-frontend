import { Settings } from "lucide-react";
import { useState } from "react";

const SettingNav = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="h-full w-full flex items-center justify-center hover:bg-gray-800  border-b border-gray-500"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className=" hover:cursor-pointer ">
        <Settings color="white" />
      </div>
      {show && (
        <div className="absolute top-0 left-10 h-full w-[300px] bg-gray-800 z-10">
          Setting
        </div>
      )}
    </div>
  );
};

export default SettingNav;
