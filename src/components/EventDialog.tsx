import { EventData } from "@/types";
import { Dialog, DialogContent } from "./ui/dialog";
import EventFrom from "@/forms/event-form/EventForm";

interface EventDialogProps {
  isEventDialogOpen: boolean; // Define the type of isEventDialogOpen
  closeEventDialog: () => void;
  selectedEvent?: EventData;
  userId?: string;
}

const EventDialog: React.FC<EventDialogProps> = ({
  isEventDialogOpen,
  closeEventDialog,
  selectedEvent,
  userId,
}) => {
  return (
    <Dialog open={isEventDialogOpen} onOpenChange={closeEventDialog}>
      <DialogContent>
        <EventFrom event={selectedEvent} userId={userId} />
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
