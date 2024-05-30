import { UserRoundSearch, Menu, ContactRound } from "lucide-react";
import { useAppContext } from "@/content/AppContext";

type Props = {
  handleIsMenuOpen: () => void;
  handleOpenEmployeeInfoRightBar: () => void;
};

const Header = ({
  handleIsMenuOpen,
  handleOpenEmployeeInfoRightBar,
}: Props) => {
  const { auth } = useAppContext();

  return (
    <div className="bg-gray-700 h-11 flex justify-between">
      <div className="flex flex-row w-1/2 space-x-2">
        <div
          className="flex w-10 justify-center items-center text-white md:hidden"
          onClick={handleIsMenuOpen}
        >
          <Menu />
        </div>
        <div className="flex items-center py-2">
          <img
            src={auth?.imageUrl}
            alt="Logo"
            className="w-full h-full object-cover"
          />
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
      <div className="flex items-center space-x-2 pr-2">
        <div className="bg-blue-900 rounded-full w-9 h-9 flex justify-center items-center mr-4">
          <h1 className="text-white font-bold">
            {auth?.firstName.charAt(0)}
            {auth?.lastName.charAt(0)}
          </h1>
        </div>
        <div
          className="w-auto h-11 flex justify-center items-center"
          onClick={handleOpenEmployeeInfoRightBar}
        >
          <ContactRound className="text-white hover:cursor-pointer" size={30} />
        </div>
        <div className="flex h-11 w-auto justify-center items-center text-white md:hidden ">
          <UserRoundSearch />
        </div>
      </div>
    </div>
  );
};

export default Header;
