import {
  useCreateEvent,
  useDeleteEvent,
  useEditEvent,
  useGetEvents,
} from "@/api/EventApi";
import { EventData } from "@/types";
import { useForm } from "react-hook-form";

// export type EventData = {
//   _id: string;
//   title: string;
//   userName: string;
//   password: string;
// };

type Props = {
  event?: EventData;
  userId?: string;
  closeEventDialog: () => void;
};

const EventFrom = ({ event, userId, closeEventDialog }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EventData>({ defaultValues: event });

  const { refetch } = useGetEvents(userId);
  const { isLoading: isCreateLoading, createEvent } = useCreateEvent(userId);
  const { isLoading: isEditLoading, editEvent } = useEditEvent(userId);
  const { isLoading: isDeleteLoading, deleteEvent } = useDeleteEvent(userId);

  const onSubmit = async (eventData: EventData) => {
    if (event?._id) {
      await editEvent(eventData);
      refetch();
    } else {
      await createEvent(eventData);
      refetch();
    }
    setTimeout(() => {
      closeEventDialog();
      refetch();
    }, 500); // 500 milliseconds delay
  };

  const handleDelete = async () => {
    if (event?._id) {
      deleteEvent(event._id);
    }
    setTimeout(() => {
      closeEventDialog();
      refetch();
    }, 500); // 500 milliseconds delay
  };

  return (
    <div>
      <button
        className="absolute top-1 left-1 bg-red-600 text-white px-2 py-1 font-bold rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
      <form
        className="flex flex-col p-2 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold">Event -{event?._id}</h2>

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
        <span>
          {isCreateLoading || isEditLoading || isDeleteLoading ? (
            <button className="bg-blue-600 text-white w-full p-2 font-bold hover:bg-blue-500 text-xl rounded-sm">
              Loading
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white w-full p-2 font-bold hover:bg-blue-500 text-xl rounded-sm"
            >
              Submit
            </button>
          )}
        </span>
      </form>
    </div>
  );
};

export default EventFrom;
