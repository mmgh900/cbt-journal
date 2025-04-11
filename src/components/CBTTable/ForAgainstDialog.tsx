import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CBTRecord } from '../../store/cbtStore';
import { ForAgainstModal } from './ForAgainstModal';

interface ForAgainstDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: CBTRecord | null;
}

export const ForAgainstDialog = ({ open, onOpenChange, record }: ForAgainstDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] border-minimal p-5 max-h-[95vh] overflow-y-auto w-full">
        {record && (
          <ForAgainstModal
            record={record}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
