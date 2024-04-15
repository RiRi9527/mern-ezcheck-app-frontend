import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export type LoginFormData = {
  userName: string;
  password: string;
};
type Props = {
  onSave: (signInFormData: LoginFormData) => void;
  isLoading: boolean;
  isSuccess?: boolean;
  userId?: string;
};

const LoginFrom = ({ onSave, isLoading }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const onSubmit = async (signInFormData: LoginFormData) => {
    onSave(signInFormData);
  };

  return (
    <form
      className="flex flex-col gap-5 border-8 border-gray-500 p-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold">Log In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        userName
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("userName", { required: "This field is required" })}
        ></input>
        {errors.userName && (
          <span className="text-red-500">{errors.userName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/">
            Please contact manager
          </Link>
        </span>
        {isLoading ? (
          <button className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl ml-3">
            Loading
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl ml-3"
          >
            Log In
          </button>
        )}
      </span>
    </form>
  );
};

export default LoginFrom;
