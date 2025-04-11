import { motion } from 'framer-motion';
import { getEmotionBgColor, getEmotionData, getEmotionTextColor } from '../../utils/emotionUtils';

interface EmotionBadgeProps {
  emotion: {
    id: string;
    name: string;
  };
}

export const EmotionBadge = ({ emotion }: EmotionBadgeProps) => {
  const emotionData = getEmotionData(emotion);
  const bgColor = emotionData.bgColor || getEmotionBgColor(emotion);
  const textColor = emotionData.textColor || getEmotionTextColor(emotion);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-normal shadow-sm"
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <span className="mr-1">{emotionData.emoji}</span>
      <span>{emotion.name}</span>
    </motion.div>
  );
};
