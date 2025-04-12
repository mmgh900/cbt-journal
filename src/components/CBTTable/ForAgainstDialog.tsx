import { CBTRecord } from '../../store/cbtStore';
import { ForAgainstModal } from './ForAgainstModal';
import { MotionDialog } from '@/components/ui/motion-dialog';

interface ForAgainstDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: CBTRecord | null;
}

export const ForAgainstDialog = ({ open, onOpenChange, record }: ForAgainstDialogProps) => {
  return (
    <MotionDialog
      open={open}
      onOpenChange={onOpenChange}
      position="center"
      width="half"
      className="max-h-[95vh] p-5 md:max-w-[700px]"
    >
      {record && (
        <ForAgainstModal
          record={record}
          onClose={() => onOpenChange(false)}
        />
      )}
    </MotionDialog>
  );
};
