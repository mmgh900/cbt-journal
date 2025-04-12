import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CBTRecord } from '../../store/cbtStore';
import { EmotionBadge } from './EmotionBadge';

interface EmotionBadgeGroupProps {
  record: CBTRecord;
  showIntensity?: boolean;
  limit?: number;
}

export const EmotionBadgeGroup = ({
  record,
  showIntensity = true,
  limit = 2
}: EmotionBadgeGroupProps) => {
  const { t } = useTranslation();

  if (!record || !record.emotions || !Array.isArray(record.emotions) || record.emotions.length === 0) {
    return <div className="text-xs text-muted-foreground">-</div>;
  }

  // Sort emotions by intensity (highest first) if intensity is available
  const sortedEmotions = [...record.emotions].sort((a, b) => {
    const intensityA = a.intensity ?? 50;
    const intensityB = b.intensity ?? 50;
    return intensityB - intensityA;
  });

  return (
    <div className="flex flex-wrap gap-1">
      <AnimatePresence mode="popLayout">
        {sortedEmotions.slice(0, limit).map(emotion => (
          <EmotionBadge
            key={emotion.id}
            emotion={emotion}
            size="sm"
            showIntensity={showIntensity}
          />
        ))}
      </AnimatePresence>

      {sortedEmotions.length > limit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-normal bg-muted/60 text-muted-foreground shadow-sm"
          title={sortedEmotions.slice(limit).map(e => `${t(e.name.toLowerCase())} ${e.intensity ?? 50}%`).join(', ')}
        >
          +{sortedEmotions.length - limit}
        </motion.div>
      )}
    </div>
  );
};
