import { EventData } from "@/types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// export type EventData = {
//   _id: string;
//   title: string;
//   userName: string;
//   password: string;
// };

type Props = {
  event?: EventData;
};

const EventFrom = ({ event }: Props) => {
  const {
    register,
    formState: { errors },
    // handleSubmit,
  } = useForm<EventData>({ defaultValues: event });

  //   const onSubmit = async (event: LoginFormData) => {
  //     onSave(signInFormData);
  //   };

  return (
    <form className="flex flex-col gap-5 border-8 border-gray-500 p-16">
      <h2 className="text-3xl font-bold">Event</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        _id
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("_id", { required: "This field is required" })}
        ></input>
        {errors._id && (
          <span className="text-red-500">{errors._id.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        title
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("title", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        startTime
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("startTime", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.startTime && (
          <span className="text-red-500">{errors.startTime.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        endTime
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("endTime", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.endTime && (
          <span className="text-red-500">{errors.endTime.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/">
            Please contact manager
          </Link>
        </span>
        {false ? (
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

export default EventFrom;
