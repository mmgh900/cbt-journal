import { AnimatePresence, motion } from 'framer-motion';
import { CBTRecord } from '../../store/cbtStore';
import { EmotionBadge } from './EmotionBadge';

interface EmotionBadgeGroupProps {
  record: CBTRecord;
}

export const EmotionBadgeGroup = ({ record }: EmotionBadgeGroupProps) => {
  if (!record || !record.emotions || !Array.isArray(record.emotions) || record.emotions.length === 0) {
    return <div>-</div>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      <AnimatePresence>
        {record.emotions.slice(0, 2).map(emotion => (
          emotion && <EmotionBadge key={emotion.id} emotion={emotion} />
        ))}
      </AnimatePresence>

      {record.emotions.length > 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-normal bg-muted/60 text-muted-foreground shadow-sm"
        >
          +{record.emotions.length - 2}
        </motion.div>
      )}
    </div>
  );
};
