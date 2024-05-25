import { useCreateEvent, useDeleteEvent, useEditEvent } from "@/api/EventApi";
import { useAppContext } from "@/content/AppContext";
import { EventData } from "@/types";
import { useForm } from "react-hook-form";

type Props = {
  event?: EventData;
  closeEventDialog: () => void;
};

const EventFrom = ({ event, closeEventDialog }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EventData>({ defaultValues: event });

  const { user, refetchEvents } = useAppContext();

  const { isLoading: isCreateLoading, createEvent } = useCreateEvent(user?._id);
  const { isLoading: isEditLoading, editEvent } = useEditEvent(user?._id);
  const { isLoading: isDeleteLoading, deleteEvent } = useDeleteEvent(user?._id);

  const onSubmit = async (eventData: EventData) => {
    if (event?._id) {
      await editEvent(eventData);
      refetchEvents();
    } else {
      await createEvent(eventData);
      refetchEvents();
    }
    setTimeout(() => {
      closeEventDialog();
    }, 500); // 500 milliseconds delay
  };

  const handleDelete = async () => {
    if (event?._id) {
      await deleteEvent(event._id);
      refetchEvents();
    }
    setTimeout(() => {
      closeEventDialog();
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
                message: "Password must be at least 1 characters",
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
            {...register("start", {
              required: "This field is required",
              minLength: {
                value: 57,
                message: "Password must be at least 57 characters",
              },
            })}
          ></input>
          {errors.start && (
            <span className="text-red-500">{errors.start.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          endTime
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("end", {
              required: "This field is required",
              minLength: {
                value: 57,
                message: "Password must be at least 57 characters",
              },
            })}
          ></input>
          {errors.end && (
            <span className="text-red-500">{errors.end.message}</span>
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
