import RegisterDialog from "./RegisterDialog";

type Props = {
  users: any;
  handleClick: (userId: any) => void;
};

export type NavListUser = {
  _id: string;
  firstName: string;
  imageUrl: string;
};

const MainUsersNav = ({ users, handleClick }: Props) => {
  return (
    <>
      {users.map((user: NavListUser) => (
        <div
          key={user._id}
          className="flex flex-col items-center hover:cursor-pointer"
          onClick={() => handleClick(user)}
        >
          <img
            src={user.imageUrl}
            alt="user"
            className="w-16 h-16 rounded-full "
          />
          <h1 className="text-xl">{user.firstName}</h1>
        </div>
      ))}
      <RegisterDialog />
    </>
  );
};

export default MainUsersNav;
