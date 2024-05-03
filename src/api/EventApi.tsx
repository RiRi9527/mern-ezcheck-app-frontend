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
    const formattedEventData = eventData.map((event: any) => ({
      ...event,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
    }));
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
