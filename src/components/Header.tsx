import { Link } from "react-router-dom";
// import MobileNav from "./MobileNav";
// import MainNav from "./MainNav";
import { Separator } from "./ui/separator";
import { useAppContext } from "@/content/AppContext";

const Header = () => {
  const { auth } = useAppContext();

  return (
    <>
      <div className="border-b-2 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex flex-col text-3xl font-bold tracking-tight text-orange-500"
          >
            Paul Lee Agency, Inc.
          </Link>
          <div>Hello, {auth && auth.firstName ? auth.firstName : "Guest"}!</div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
