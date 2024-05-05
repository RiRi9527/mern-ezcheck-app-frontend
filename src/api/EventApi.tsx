import { EventData } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetEvents = (userId?: string) => {
  const getEventsRequest = async (): Promise<EventData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/events/${userId}`, {
      //   credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get event");
    }
    const eventData = await response.json();
    // const formattedEventData = eventData.map((event: any) => ({
    //   ...event,
    //   start: new Date(event.startTime),
    //   end: new Date(event.endTime),
    // }));
    // const formattedEventData = eventData.map((event: any) => {
    //   if (!event.endTime && event.title === "Actual Time") {
    //     return {
    //       ...event,
    //       start: new Date(event.startTime),
    //       end: new Date(),
    //     };
    //   } else {
    //     return {
    //       ...event,
    //       start: new Date(event.startTime),
    //       end: new Date(event.endTime),
    //     };
    //   }
    // });

    const formattedEventData = eventData.map((event: any) => {
      switch (true) {
        case !event.endTime || !event.startTime:
          return {
            ...event,
            start: new Date(event.startTime || event.endTime || ""),
            end: new Date(event.startTime || event.endTime || ""), // 如果没有结束时间，开始和结束时间相同
          };
        case !event.endTime && event.title === "Actual Time":
          const start = new Date(event.startTime);
          const end = new Date();
          return {
            ...event,
            start,
            end,
          };
        default:
          return {
            ...event,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
          };
      }
    });

    return formattedEventData;
  };
  const {
    data: events,
    // isLoading,
    // isSuccess,
    // error,
    refetch,
  } = useQuery("fetchEvent", getEventsRequest, {
    enabled: !!userId,
  });

  // if (isSuccess) {
  //   toast.success("Event got!");
  // }

  // if (error) {
  //   toast.error("Unable to get Event");
  // }

  return { events, refetch };
};

export const useCreateEvent = (userId?: string) => {
  const createEventRequest = async (eventData: EventData): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/events/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(eventData),
      //   credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    return response.json();
  };
  const {
    mutateAsync: createEvent,
    isLoading,
    isSuccess,
    error,
    reset,
    data: eventId,
  } = useMutation(createEventRequest);

  if (isSuccess) {
    toast.success("Event created!");
    reset();
  }

  if (error) {
    toast.error("Unable to create Event");
    reset();
  }

  return { createEvent, isLoading, isSuccess, eventId };
};

export const useEditEvent = (userId?: string) => {
  const editEventRequest = async (eventData: EventData): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/events/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(eventData),
      //   credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to edit event");
    }
    return response.json();
  };
  const {
    mutateAsync: editEvent,
    isLoading,
    isSuccess,
    error,
    reset,
    data: eventId,
  } = useMutation(editEventRequest);

  if (isSuccess) {
    toast.success("Event edited!");
    reset();
  }

  if (error) {
    toast.error("Unable to edit Event");
    reset();
  }

  return { editEvent, isLoading, isSuccess, eventId };
};

export const useDeleteEvent = (userId?: string) => {
  const deleteEventRequest = async (eventId: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/events/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ eventId }),
      //   credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    return response.json();
  };
  const {
    mutateAsync: deleteEvent,
    isLoading,
    isSuccess,
    error,
    reset,
    data: eventId,
  } = useMutation(deleteEventRequest);

  if (isSuccess) {
    toast.success("Event delete!");
    reset();
  }

  if (error) {
    toast.error("Unable to edit Event");
    reset();
  }

  return { deleteEvent, isLoading, isSuccess, eventId };
};

export const useCreateCheckIn = (userId?: string) => {
  const createEventRequest = async (eventData: EventData): Promise<string> => {
    const response = await fetch(
      `${API_BASE_URL}/api/events/${userId}/checkIn`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(eventData),
        //   credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    return response.json();
  };
  const {
    mutateAsync: createEvent,
    isLoading,
    isSuccess,
    error,
    reset,
    data: eventId,
  } = useMutation(createEventRequest);

  if (isSuccess) {
    toast.success("Event created!");
    reset();
  }

  if (error) {
    toast.error("Unable to create Event");
    reset();
  }

  return { createEvent, isLoading, isSuccess, eventId };
};
