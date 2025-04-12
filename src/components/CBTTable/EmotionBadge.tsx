import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Emotion } from '@/store/cbtStore';
import { getEmotionColor, getEmotionData, getTailwindColorClasses } from '@/utils/emotionUtils';
import { cn } from '@/lib/utils';

interface EmotionBadgeProps {
  emotion: Emotion;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIntensity?: boolean;
}

export const EmotionBadge = ({
  emotion,
  className,
  size = 'md',
  showIntensity = true
}: EmotionBadgeProps) => {
  const { t } = useTranslation();
  const { intensity = 50 } = emotion;

  // Get emotion data with fallbacks
  const emotionData = getEmotionData(emotion);

  // Get emoji for the emotion
  const emoji = emotion.emoji || emotionData.emoji || '😶';

  // Get Tailwind color for the emotion (with fallback)
  const color = getEmotionColor(emotion) || 'blue';

  // Get color classes based on the emotion's color and intensity
  const { bg, text, fill } = getTailwindColorClasses(color, intensity, true);

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  // Emoji size classes
  const emojiSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  // Get translated emotion name
  const translatedName = t(emotion.name.toLowerCase());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center rounded-md font-normal shadow-sm relative overflow-hidden border",
        bg,
        text,
        sizeClasses[size],
        className
      )}
    >
      {/* Intensity fill indicator */}
      {intensity > 0 && (
        <motion.div
          className={cn("absolute top-0 left-0 bottom-0 h-full", fill)}
          style={{ width: `${intensity}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${intensity}%` }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center">
        {emoji && (
          <span className={cn("mr-1", emojiSizeClasses[size])}>{emoji}</span>
        )}
        <span>{translatedName}</span>

        {showIntensity && intensity !== undefined && (
          <span className="ml-1 text-xs opacity-80">{intensity}%</span>
        )}
      </div>
    </motion.div>
  );
};
