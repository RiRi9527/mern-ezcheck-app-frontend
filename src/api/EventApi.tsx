import { EventData, totalHrs } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetEvents = (userId?: string, start?: string, end?: string) => {
  const getEventsRequest = async (): Promise<EventData[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/events/get/${userId}/${start}/${end}`,
      {
        //   credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get event");
    }

    return response.json();
  };
  const { data: events, refetch } = useQuery(
    ["fetchEvent", start, end, userId],
    getEventsRequest,
    {
      enabled: !!userId,
    }
  );

  return { events, refetch };
};

export const useCreateEvent = (userId?: string) => {
  const createEventRequest = async (eventData: EventData): Promise<any> => {
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
    data,
  } = useMutation(createEventRequest);

  if (isSuccess) {
    toast.success("Event created!");
    reset();
  }

  if (error) {
    toast.error("Unable to create Event");
    reset();
  }

  return { createEvent, isLoading, isSuccess, data };
};

export const useEditEvent = (userId?: string) => {
  const editEventRequest = async (eventData: EventData): Promise<any> => {
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
  } = useMutation(editEventRequest);

  if (isSuccess) {
    toast.success("Event edited!");
    reset();
  }

  if (error) {
    toast.error("Unable to edit Event");
    reset();
  }

  return { editEvent, isLoading, isSuccess };
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
  const createCheckInEventRequest = async (
    eventData: EventData
  ): Promise<any> => {
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
      throw new Error("Failed to check in");
    }

    return response.json();
  };
  const {
    mutateAsync: createCheckInEvent,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(createCheckInEventRequest);

  if (isSuccess) {
    toast.success("Check in successful");
    reset();
  }

  if (error) {
    toast.error("Failed to check in");
    reset();
  }

  return { createCheckInEvent, isLoading, isSuccess };
};

export const useCreateCheckOut = (userId?: string) => {
  const createCheckOutEventRequest = async (
    eventData: EventData
  ): Promise<any> => {
    const response = await fetch(
      `${API_BASE_URL}/api/events/${userId}/checkOut`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(eventData),
        //   credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to check out");
    }
    return response.json();
  };
  const {
    mutateAsync: createCheckOutEvent,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(createCheckOutEventRequest);

  if (isSuccess) {
    toast.success("Check out successful");
    reset();
  }

  if (error) {
    toast.error("Failed to check out");
    reset();
  }

  return { createCheckOutEvent, isLoading, isSuccess };
};

export const useGetHrs = (userId?: string, payrollDate?: string) => {
  const getEventsHrs = async (): Promise<totalHrs> => {
    const response = await fetch(
      `${API_BASE_URL}/api/events/hrs/${userId}/${payrollDate}`,
      {
        //   credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get hrs");
    }

    return response.json();
  };
  const { data: hrs, refetch: refetchHrs } = useQuery(
    ["fetchHrs", userId, payrollDate],
    getEventsHrs,
    {
      enabled: !!userId,
    }
  );

  return { hrs, refetchHrs };
};
