import {
  Card,
  //   CardContent,
  //   CardDescription,
  //   CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useAppContext } from "@/content/AppContext";
import { useCreateCheckIn, useCreateCheckOut } from "@/api/EventApi";
import { useEffect, useState } from "react";

const CheckInfo = () => {
  const { user, refetchEvents, events } = useAppContext();
  const { createCheckInEvent } = useCreateCheckIn(user?._id);
  const { createCheckOutEvent } = useCreateCheckOut(user?._id);

  const [filteredEvent, setFilteredEvent] = useState<any>();

  useEffect(() => {
    const today = new Date().toDateString();
    const filtered = events?.filter((event) => {
      if (event?.start) {
        const eventDate = new Date(event.start).toDateString();
        return event.title === "Working Time" && eventDate === today;
      }
      return false; // Explicitly return false if the condition is not met
    });

    const lastCheckEvent = { ...filtered?.[filtered.length - 1] }; // Access the last element or set it to null if the array is empty

    if (lastCheckEvent?.start) {
      // Extract the time part from the start date
      const eventStartTime = new Date(lastCheckEvent.start).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Include AM or PM
        }
      );
      lastCheckEvent.start = eventStartTime;
    }

    if (lastCheckEvent?.end) {
      // Extract the time part from the start date
      const eventEndTime = new Date(lastCheckEvent.end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Include AM or PM
      });
      lastCheckEvent.end = eventEndTime;
    }

    setFilteredEvent(lastCheckEvent);
  }, [events]);

  const handleCheckInClick = async () => {
    const title = "Working Time";
    const currentTimeString = new Date().toString();

    await createCheckInEvent({ title, start: currentTimeString });
    refetchEvents();
  };

  const handleCheckOutClick = async () => {
    const title = "Working Time";
    const currentTimeString = new Date().toString();
    await createCheckOutEvent({ title, end: currentTimeString });
    refetchEvents();
  };

  return (
    <Card className="h-full w-full grid grid-rows-2">
      <div className=" relative flex flex-col items-center justify-center border-b">
        {filteredEvent?.start && !filteredEvent?.end ? (
          <Button onClick={handleCheckOutClick} className=" w-28 ">
            Check out
          </Button>
        ) : (
          <Button onClick={handleCheckInClick} className=" w-28 ">
            Check in
          </Button>
        )}

        {/* <div className=" absolute right-0 bottom-0">
          {filteredEvent.end ? (
            <Button
              onClick={handleCheckInClick}
              variant="link"
              className=" w-20 "
            >
              Check in
            </Button>
          ) : (
            <Button
              onClick={handleCheckOutClick}
              variant="link"
              className=" w-20 "
            >
              Check out
            </Button>
          )}
        </div> */}
      </div>
      <div className="flex flex-col justify-center items-center border-t">
        <div>
          <p>Total Hrs: 40hr</p>
          <p>Check in at: {filteredEvent?.start}</p>
          <p>Check out at: {filteredEvent?.end}</p>
        </div>
      </div>
    </Card>
  );
};

export default CheckInfo;
