import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { NavListUser } from "./MainUsersNav";
import RegisterDialog from "./RegisterDialog";

type Props = {
  users: NavListUser[];
  handleClick: (user: NavListUser) => void;
};

const MobileUsersNav: React.FC<Props> = ({ users, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUserClick = (user: NavListUser) => {
    handleClick(user);
    setIsOpen(false); // Close the Sheet
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3 overflow-auto">
        <div className="flex flex-col items-center hover:cursor-pointer">
          <RegisterDialog />
          <Separator />
        </div>

        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col items-center hover:cursor-pointer"
            onClick={() => handleUserClick(user)}
          >
            <SheetTitle>
              <img
                src={user.imageUrl}
                alt="user"
                className="w-16 h-16 rounded-full"
              />
            </SheetTitle>

            <SheetDescription className="flex">
              <h1 className="text-xl">{user.firstName}</h1>
            </SheetDescription>
            <Separator />
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileUsersNav;
