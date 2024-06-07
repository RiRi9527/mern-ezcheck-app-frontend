import { useCreateEvent, useDeleteEvent, useEditEvent } from "@/api/EventApi";
import { useAppContext } from "@/content/AppContext";
import { EventData } from "@/types";
import { useForm } from "react-hook-form";

type Props = {
  event?: EventData;
  closeEventDialog: () => void;
};

type FormatEventData = {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

type CombinedEventData = EventData & FormatEventData;

// Utility function to split date-time string into date and time parts
const splitDateTime = (dateTime: string) => {
  const [date, time] = dateTime.split("T");
  const [hours, minutes] = time.split(":");
  console.log(dateTime);
  console.log(time);
  console.log(hours);
  console.log(minutes);

  return {
    date,
    time: `${hours}:${minutes}`,
  };
};

const EventForm = ({ event, closeEventDialog }: Props) => {
  const { user, refetchEvents } = useAppContext();

  // Split the event start and end times into date and time parts
  const startDateTime = event?.start
    ? splitDateTime(event.start)
    : { date: "", time: "" };
  const endDateTime = event?.end
    ? splitDateTime(event.end)
    : { date: "", time: "" };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CombinedEventData>({
    defaultValues: {
      ...event,
      startDate: startDateTime.date,
      startTime: startDateTime.time,
      endDate: endDateTime.date,
      endTime: endDateTime.time,
    },
  });

  const { isLoading: isCreateLoading, createEvent } = useCreateEvent(user?._id);
  const { isLoading: isEditLoading, editEvent } = useEditEvent(user?._id);
  const { isLoading: isDeleteLoading, deleteEvent } = useDeleteEvent(user?._id);

  const onSubmit = async (eventData: CombinedEventData) => {
    if (eventData.startDate && eventData.startTime) {
      eventData.start = `${eventData.startDate}T${eventData.startTime}:00.000Z`;
    }

    if (eventData.endDate && eventData.endTime) {
      eventData.end = `${eventData.endDate}T${eventData.endTime}:00.000Z`;
    }

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
        <h2 className="text-3xl font-bold">Event - {event?._id}</h2>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Title
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("title", {
              required: "This field is required",
              minLength: {
                value: 1,
                message: "Title must be at least 1 character",
              },
            })}
          ></input>
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Start Date
          <input
            type="date"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("startDate", {
              required: "This field is required",
            })}
          ></input>
          {errors.startDate && (
            <span className="text-red-500">{errors.startDate.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Start Time
          <input
            type="time"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("startTime", {
              required: "This field is required",
            })}
          ></input>
          {errors.startTime && (
            <span className="text-red-500">{errors.startTime.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          End Date
          <input
            type="date"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("endDate", {
              required: "This field is required",
            })}
          ></input>
          {errors.endDate && (
            <span className="text-red-500">{errors.endDate.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          End Time
          <input
            type="time"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("endTime", {
              required: "This field is required",
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

export default EventForm;
