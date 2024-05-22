import { PersonStanding } from "lucide-react";

import { Separator } from "@radix-ui/react-separator";

import { useState } from "react";

type Props = {
  handleClick: (user: any) => void;
  refetch: () => void;
  handleUserCreateDialog: () => void;
  users?: any;
};

export type NavListUser = {
  _id: string;
  firstName: string;
  imageUrl: string;
};

const UserInfoNav = ({
  handleClick,
  refetch,
  handleUserCreateDialog,
  users,
}: Props) => {
  const [show, setShow] = useState(false);

  const handleClickAndRefetch = async (user: any) => {
    await handleClick(user);
    refetch();
  };

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
        <div className="absolute top-0 left-10 h-full w-[300px] bg-gray-800 z-50">
          <div className="h-full w-full flex flex-col justify-between overflow-y-auto bg-gray-800">
            <div>
              <h1 className=" text-white pl-2">online:</h1>
              <div className="p-2 grid grid-cols-4 gap-3">
                {users?.map((user: NavListUser) => (
                  <div
                    className="flex flex-col justify-center items-center hover:cursor-pointer text-white "
                    key={user._id}
                    onClick={() => handleClickAndRefetch(user)}
                  >
                    <div
                      className="w-16 h-16 rounded-full bg-green-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center  border-2 border-green-500 overflow-hidden"
                      style={{
                        backgroundImage: `url(${user.imageUrl})`,
                      }}
                    ></div>
                    <h1> {user.firstName}</h1>
                  </div>
                ))}
                <div
                  className="flex flex-col items-center justify-center hover:cursor-pointer"
                  onClick={handleUserCreateDialog}
                >
                  <div className="min-w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                    <div className="text-2xl font-bold text-gray-700">+</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Separator className="mt-4 border"></Separator>
              <h1 className="pl-2">offline:</h1>
              <div className="p-2 grid grid-cols-4 gap-3 pb-6">
                {users?.map((user: NavListUser) => (
                  <div
                    className="flex flex-col justify-center items-center hover:cursor-pointer"
                    key={user._id}
                    onClick={() => handleClickAndRefetch(user)}
                  >
                    <div
                      className=" relative w-16 h-16 rounded-full bg-green-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center border-2 border-gray-500"
                      style={{
                        backgroundImage: `url(${user.imageUrl})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                    </div>
                    <h1>{user.firstName}</h1>
                  </div>
                ))}
                <div
                  className="flex flex-col items-center justify-center hover:cursor-pointer"
                  onClick={handleUserCreateDialog}
                >
                  <div className="min-w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                    <div className="text-2xl font-bold text-gray-700">+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoNav;
