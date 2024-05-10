import { PersonStanding } from "lucide-react";

import { useState } from "react";

const UserInfoNav = () => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center hover:bg-gray-800 border-b border-gray-500"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className=" hover:cursor-pointer ">
        <PersonStanding className="text-white" />
      </div>
      {show && (
        <div className="absolute top-0 left-10 h-full w-[300px] bg-gray-800 ">
          show
        </div>
      )}
    </div>
  );
};

export default UserInfoNav;
