import { PersonStanding } from "lucide-react";

import { Separator } from "@radix-ui/react-separator";

import { useState } from "react";
import { useAppContext } from "@/content/AppContext";
import { toast } from "sonner";
import { Users } from "@/types";

type Props = {
  handleUserCreateDialog: () => void;
};

const UserInfoNav = ({ handleUserCreateDialog }: Props) => {
  const [show, setShow] = useState(false);

  const { auth, users, handleUserIdChange, refetchUsers } = useAppContext();

  const disable =
    auth?.position !== "CEO" && auth?.position !== "Office Manager";

  const handleClickAndRefetchUser = async (userId: string) => {
    handleUserIdChange(userId);
    toast.success("User Switch");
  };

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center hover:bg-gray-800 border-b border-gray-500"
      onMouseEnter={() => {
        setShow(true);
        refetchUsers();
      }}
      onMouseLeave={() => setShow(false)}
    >
      <div className=" hover:cursor-pointer ">
        <PersonStanding className="text-white" />
      </div>
      {show && (
        <div className="absolute top-0 left-10 h-full w-[300px] bg-gray-800 z-50">
          <div className="h-full w-full flex flex-col justify-between overflow-y-auto bg-gray-800">
            <div>
              <div className="mb-12">
                <h1 className=" text-green-300 pl-2">online:</h1>
                <div className="p-2 grid grid-cols-4 gap-3">
                  {users?.map(
                    (user: Users) =>
                      user.status === "online" && (
                        <div
                          className="flex flex-col justify-center items-center hover:cursor-pointer text-white"
                          key={user._id}
                          onClick={
                            disable
                              ? undefined
                              : () => handleClickAndRefetchUser(user._id)
                          }
                        >
                          <div
                            className="w-16 h-16 rounded-full bg-green-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center border-2 border-green-500 overflow-hidden"
                            style={{
                              backgroundImage: `url(${user.imageUrl})`,
                            }}
                          ></div>
                          <h1>{user.firstName}</h1>
                        </div>
                      )
                  )}
                  {!disable && (
                    <div
                      className="flex flex-col items-center justify-center hover:cursor-pointer"
                      onClick={
                        disable ? undefined : () => handleUserCreateDialog()
                      }
                    >
                      <div className="min-w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
                        <div className="text-2xl font-bold text-gray-700">
                          +
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {users?.some((user) => user.status === "busy") && (
                <>
                  <Separator className="mt-4 border border-red-300 ml-1 w-[100px]"></Separator>
                  <div>
                    <h1 className=" text-red-300 pl-2">busy:</h1>
                    <div className="p-2 grid grid-cols-4 gap-3">
                      {users?.map(
                        (user: Users) =>
                          user.status === "busy" && (
                            <div
                              className="flex flex-col justify-center items-center hover:cursor-pointer text-white"
                              key={user._id}
                              onClick={
                                disable
                                  ? undefined
                                  : () => handleClickAndRefetchUser(user._id)
                              }
                            >
                              <div
                                className="w-16 h-16 rounded-full bg-red-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center border-2 border-red-500 overflow-hidden"
                                style={{
                                  backgroundImage: `url(${user.imageUrl})`,
                                }}
                              ></div>
                              <h1 className="text-red-300">{user.firstName}</h1>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <Separator className="mt-4 border"></Separator>
              <h1 className="pl-2">offline:</h1>
              <div className="p-2 grid grid-cols-4 gap-3 pb-6">
                {users?.map(
                  (user: Users) =>
                    user.status === "offline" && (
                      <div
                        className="flex flex-col justify-center items-center hover:cursor-pointer"
                        key={user._id}
                        onClick={
                          disable
                            ? undefined
                            : () => handleClickAndRefetchUser(user._id)
                        }
                      >
                        <div
                          className=" relative w-16 h-16 rounded-full bg-gray-300 flex flex-shrink-0 justify-center items-center bg-cover bg-center border-2 border-gray-500"
                          style={{
                            backgroundImage: `url(${user.imageUrl})`,
                          }}
                        >
                          <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                        </div>
                        <h1>{user.firstName}</h1>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoNav;
