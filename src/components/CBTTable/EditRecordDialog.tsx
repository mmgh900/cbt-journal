import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CBTRecord } from '../../store/cbtStore';
import { CBTForm } from '../CBTForm';

interface EditRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recordToEdit: CBTRecord | null;
}

export const EditRecordDialog = ({ open, onOpenChange, recordToEdit }: EditRecordDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-minimal p-4 max-h-[95vh] overflow-y-auto">
        {recordToEdit && (
          <CBTForm
            editMode={true}
            recordToEdit={recordToEdit}
            onEditComplete={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
