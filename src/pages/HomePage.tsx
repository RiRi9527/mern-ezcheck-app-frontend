import LoginFrom from "@/forms/login-form/LoginForm";
import { useLogin } from "@/api/AuthApi";
import { Link } from "react-router-dom";
import { useAppContext } from "@/content/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const { userLogin, isLoading } = useLogin();
  const { auth } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate(`/user-profile/${auth._id}`);
    }
  }, [auth, navigate]);

  return (
    <div className="container mx-auto py-10 flex flex-col justify-center items-center min-h-screen">
      <Link
        to="/"
        className="flex flex-col text-3xl font-bold tracking-tight text-orange-500 mb-16"
      >
        Paul Lee Agency, Inc.
      </Link>

      <div className="md:px-32 bg-white rounded-lg py-8 flex flex-col gap-5 text-center ">
        <LoginFrom onSave={userLogin} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomePage;
