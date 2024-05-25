import { EventData } from "@/types";
import { Dialog, DialogContent } from "./ui/dialog";
import EventFrom from "@/forms/event-form/EventForm";

interface EventDialogProps {
  isEventDialogOpen: boolean; // Define the type of isEventDialogOpen
  closeEventDialog: () => void;
  selectedEvent?: EventData;
}

const EventDialog: React.FC<EventDialogProps> = ({
  isEventDialogOpen,
  closeEventDialog,
  selectedEvent,
}) => {
  return (
    <Dialog open={isEventDialogOpen} onOpenChange={closeEventDialog}>
      <DialogContent>
        <EventFrom event={selectedEvent} closeEventDialog={closeEventDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
