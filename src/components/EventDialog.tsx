import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

interface EventDialogProps {
  isEventDialogOpen: boolean; // Define the type of isEventDialogOpen
  closeEventDialog: () => void;
}

const EventDialog: React.FC<EventDialogProps> = ({
  isEventDialogOpen,
  closeEventDialog,
}) => {
  return (
    <Dialog open={isEventDialogOpen} onOpenChange={closeEventDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>11111</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
