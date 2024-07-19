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
  const [date, time] = dateTime.split(", ");
  const [month, day, year] = date.split("/");
  const [hours, minutes] = time.split(":");

  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

const combineDateTime = (outputDate: string, outputTime: string) => {
  // 将日期和时间解析成单独的部分
  const [year, month, day] = outputDate.split("-").map(Number);
  const [hours, minutes] = outputTime.split(":").map(Number);

  // 创建一个新的 Date 对象，注意月份从0开始
  const date = new Date(year, month - 1, day, hours, minutes);
  const dateString = date.toISOString();

  return dateString;
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
      eventData.start = combineDateTime(
        eventData.startDate,
        eventData.startTime
      );
    }

    if (eventData.endDate && eventData.endTime) {
      eventData.end = combineDateTime(eventData.endDate, eventData.endTime);
    }

    if (event?._id) {
      const response = await editEvent(eventData);
      refetchEvents();
      if (response?.title === "Working Time") {
        // refetchHrs();
      }
    } else {
      const response = await createEvent(eventData);
      refetchEvents();
      if (response?.title === "Working Time") {
        // refetchHrs();
      }
    }

    setTimeout(() => {
      closeEventDialog();
    }, 500); // 500 milliseconds delay
  };

  const handleDelete = async () => {
    if (event?._id) {
      await deleteEvent(event._id);
      refetchEvents();
      if (event.title === "Working Time") {
        // refetchHrs();
      }
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
