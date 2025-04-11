import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';
import { Scale, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CBTRecord, useCBTStore } from '../../store/cbtStore';

interface ForAgainstModalProps {
  record: CBTRecord;
  onClose: () => void;
}

export const ForAgainstModal = ({ record, onClose }: ForAgainstModalProps) => {
  const { updateRecord } = useCBTStore();
  const [forReasons, setForReasons] = useState<string[]>(
    record.forReasons?.length ? record.forReasons : ['']
  );
  const [againstReasons, setAgainstReasons] = useState<string[]>(
    record.againstReasons?.length ? record.againstReasons : ['']
  );

  const addForReason = () => {
    setForReasons([...forReasons, '']);
  };

  const addAgainstReason = () => {
    setAgainstReasons([...againstReasons, '']);
  };

  const updateForReason = (index: number, value: string) => {
    const updated = [...forReasons];
    updated[index] = value;
    setForReasons(updated);
  };

  const updateAgainstReason = (index: number, value: string) => {
    const updated = [...againstReasons];
    updated[index] = value;
    setAgainstReasons(updated);
  };

  const removeForReason = (index: number) => {
    if (forReasons.length === 1) {
      setForReasons(['']); // Keep at least one empty field
    } else {
      setForReasons(forReasons.filter((_, i) => i !== index));
    }
  };

  const removeAgainstReason = (index: number) => {
    if (againstReasons.length === 1) {
      setAgainstReasons(['']); // Keep at least one empty field
    } else {
      setAgainstReasons(againstReasons.filter((_, i) => i !== index));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'for' | 'against', index: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (type === 'for') {
        addForReason();
      } else {
        addAgainstReason();
      }
      // Focus on the new textarea after a brief delay to allow rendering
      setTimeout(() => {
        const textareas = document.querySelectorAll(`[data-type="${type}"]`);
        const newTextarea = textareas[textareas.length - 1] as HTMLTextAreaElement;
        if (newTextarea) newTextarea.focus();
      }, 10);
    }
  };

  const handleSave = () => {
    // Filter out empty reasons
    const filteredForReasons = forReasons.filter(reason => reason.trim() !== '');
    const filteredAgainstReasons = againstReasons.filter(reason => reason.trim() !== '');

    updateRecord({
      ...record,
      forReasons: filteredForReasons,
      againstReasons: filteredAgainstReasons
    });

    toast.success("Evidence updated successfully");
    onClose();
  };

  return (
    <div className="w-full">
      <motion.div
        className="w-full flex items-center gap-2 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Scale />
        <h2 className="text-lg font-semibold">
          Evidence For and Against:
          <span className="font-normal ml-1">"{record.thought}"</span>
        </h2>
      </motion.div>

      <div className="w-full flex flex-col md:flex-row gap-4">
        {/* For Reasons */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="font-medium mb-3">Evidence FOR This Thought</h3>
          <div className="flex flex-col gap-3">
            {forReasons.map((reason, index) => (
              <motion.div
                key={`for-${index}`}
                className="relative group"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 + (index * 0.05) }}
              >
                <Textarea
                  value={reason}
                  onChange={(e) => updateForReason(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'for', index)}
                  placeholder="Enter supporting evidence..."
                  className="w-full text-sm min-h-[60px] resize-none border border-input p-2 pr-8 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                  data-type="for"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeForReason(index)}
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addForReason}
            className="w-full mt-2"
          >
            Add Supporting Evidence
          </Button>
        </motion.div>

        {/* Against Reasons */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="font-medium mb-3">Evidence AGAINST This Thought</h3>
          <div className="flex flex-col gap-3">
            {againstReasons.map((reason, index) => (
              <motion.div
                key={`against-${index}`}
                className="relative group"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 + (index * 0.05) }}
              >
                <Textarea
                  value={reason}
                  onChange={(e) => updateAgainstReason(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'against', index)}
                  placeholder="Enter challenging evidence..."
                  className="w-full text-sm min-h-[60px] resize-none border border-input p-2 pr-8 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                  data-type="against"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAgainstReason(index)}
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addAgainstReason}
            className="w-full mt-2"
          >
            Add Challenging Evidence
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="flex justify-end gap-2 mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button variant="outline" size="sm" onClick={onClose} className="h-9">
          Cancel
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          className="bg-wise-forest-green hover:bg-wise-forest-green/90 h-9"
        >
          Save Evidence
        </Button>
      </motion.div>
    </div>
  );
};
