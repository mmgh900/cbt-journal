import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MotionDialog } from '@/components/ui/motion-dialog';
import { cn } from '@/lib/utils';
import { PlusCircle, X } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Emotion, useCBTStore } from '../store/cbtStore';
import {
    getEmotionColor,
    getEmotionData,
    getTailwindColorClasses
} from '../utils/emotionUtils';
import { AnimatePresence, motion } from 'framer-motion';

interface EmotionWithIntensity extends Emotion {
    intensity: number;
}

interface EmotionSelectProps {
    value: Array<EmotionWithIntensity | Emotion>;
    onChange: (emotions: Array<EmotionWithIntensity | Emotion>) => void;
}

// Helper to get border classes based on color and selection state
const getBorderClasses = (color: string, isSelected: boolean, isRemoveButton = false): string => {
    if (!isSelected) return "border-transparent hover:border-neutral-300 dark:hover:border-neutral-600";

    // Valid Tailwind colors
    const validColors = [
        'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange',
        'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
        'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
    ];

    // Default fallback
    if (!color || !validColors.includes(color)) {
        color = 'blue';
    }

    const baseClass = isRemoveButton ? "" : "border-r-0 rounded-r-none";

    // Use a switch statement to generate valid classes
    switch(color) {
        case 'slate': return `border-slate-500 dark:border-slate-400 ${baseClass}`;
        case 'gray': return `border-gray-500 dark:border-gray-400 ${baseClass}`;
        case 'zinc': return `border-zinc-500 dark:border-zinc-400 ${baseClass}`;
        case 'neutral': return `border-neutral-500 dark:border-neutral-400 ${baseClass}`;
        case 'stone': return `border-stone-500 dark:border-stone-400 ${baseClass}`;
        case 'red': return `border-red-500 dark:border-red-400 ${baseClass}`;
        case 'orange': return `border-orange-500 dark:border-orange-400 ${baseClass}`;
        case 'amber': return `border-amber-500 dark:border-amber-400 ${baseClass}`;
        case 'yellow': return `border-yellow-500 dark:border-yellow-400 ${baseClass}`;
        case 'lime': return `border-lime-500 dark:border-lime-400 ${baseClass}`;
        case 'green': return `border-green-500 dark:border-green-400 ${baseClass}`;
        case 'emerald': return `border-emerald-500 dark:border-emerald-400 ${baseClass}`;
        case 'teal': return `border-teal-500 dark:border-teal-400 ${baseClass}`;
        case 'cyan': return `border-cyan-500 dark:border-cyan-400 ${baseClass}`;
        case 'sky': return `border-sky-500 dark:border-sky-400 ${baseClass}`;
        case 'blue': return `border-blue-500 dark:border-blue-400 ${baseClass}`;
        case 'indigo': return `border-indigo-500 dark:border-indigo-400 ${baseClass}`;
        case 'violet': return `border-violet-500 dark:border-violet-400 ${baseClass}`;
        case 'purple': return `border-purple-500 dark:border-purple-400 ${baseClass}`;
        case 'fuchsia': return `border-fuchsia-500 dark:border-fuchsia-400 ${baseClass}`;
        case 'pink': return `border-pink-500 dark:border-pink-400 ${baseClass}`;
        case 'rose': return `border-rose-500 dark:border-rose-400 ${baseClass}`;
        default: return `border-blue-500 dark:border-blue-400 ${baseClass}`;
    }
};

export const EmotionSelect: React.FC<EmotionSelectProps> = ({ value, onChange }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [customEmotion, setCustomEmotion] = useState<{ name: string; icon: string }>({
        name: '',
        icon: '😶'
    });
    const { t } = useTranslation();

    const store = useCBTStore();
    const defaultEmotions = store.defaultEmotions || [];
    const customEmotions = store.customEmotions || [];
    const addCustomEmotion = store.addCustomEmotion;

    const allEmotions = useMemo(() => [...defaultEmotions, ...customEmotions],
        [defaultEmotions, customEmotions]);

    const handleAddCustomEmotion = () => {
        if (customEmotion.name.trim()) {
            addCustomEmotion(customEmotion);
            setCustomEmotion({ name: '', icon: '😶' });
            setShowDialog(false);
        }
    };

    const toggleEmotion = (emotion: Emotion, e: React.MouseEvent) => {
        // Prevent the event from bubbling up to form submission
        e.preventDefault();
        e.stopPropagation();

        const isSelected = value.some(e => e.id === emotion.id);

        if (isSelected) {
            onChange(value.filter(e => e.id !== emotion.id));
        } else {
            // Add emotion with default intensity
            onChange([...value, { ...emotion, intensity: 50 }]);
        }
    };

    const removeEmotion = (emotionId: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        onChange(value.filter(e => e.id !== emotionId));
    };

    const updateIntensity = (emotionId: string, intensity: number) => {
        onChange(
            value.map(e =>
                e.id === emotionId
                    ? { ...e, intensity }
                    : e
            )
        );
    };

    // For handling direct click on slider to update intensity
    const handleSliderClick = (emotion: Emotion, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Get button dimensions
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();

        // Calculate width excluding the remove button (approx 40px)
        const adjustedWidth = rect.width - 40;

        // Calculate percentage based on click position
        const clickX = e.clientX - rect.left;

        // Only process click if not in the remove button area
        if (clickX < adjustedWidth) {
            const percentage = Math.round((clickX / adjustedWidth) * 100);

            // Ensure the value is between 1 and 100 (never zero)
            const intensity = Math.max(1, Math.min(100, percentage));

            // Update the intensity
            updateIntensity(emotion.id, intensity);
        }
    };

    // Group emotions into categories (based on primary emotions)
    const groupedEmotions = useMemo(() => ({
        positive: allEmotions.filter(e => getEmotionData(e).category === 'positive'),
        neutral: allEmotions.filter(e => getEmotionData(e).category === 'neutral'),
        negative: allEmotions.filter(e => getEmotionData(e).category === 'negative'),
        other: allEmotions.filter(e => !getEmotionData(e).category)
    }), [allEmotions]);

    return (
        <div className="w-full space-y-6">
            {/* Emotions grid organized by category */}
            <div className="space-y-6">
                {Object.entries(groupedEmotions).map(([category, emotions]) =>
                    emotions.length > 0 && (
                        <motion.div
                            key={category}
                            className="space-y-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-sm font-medium text-muted-foreground capitalize">
                                {t(category)}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <AnimatePresence mode="popLayout">
                                    {emotions.map(emotion => {
                                        const isSelected = value.some(e => e.id === emotion.id);
                                        const emotionData = getEmotionData(emotion);
                                        const selectedEmotion = value.find(e => e.id === emotion.id) as EmotionWithIntensity;
                                        const intensity = selectedEmotion?.intensity || 50;

                                        // Get emotion tailwind color - with fallback for missing colors
                                        const emotionColor = getEmotionColor(emotion) || 'blue';
                                        const colorClasses = getTailwindColorClasses(emotionColor, intensity, isSelected);

                                        // Get border classes
                                        const mainBorderClasses = getBorderClasses(emotionColor, isSelected);
                                        const removeBorderClasses = getBorderClasses(emotionColor, isSelected, true);

                                        return (
                                            <motion.div
                                                key={emotion.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeInOut"
                                                }}
                                                layout
                                                className="space-y-2"
                                            >
                                                {/* Emotion button that acts as a slider when selected */}
                                                <div className="relative flex w-full">
                                                    {/* Main button */}
                                                    <motion.button
                                                        type="button"
                                                        onClick={(e) => isSelected ? handleSliderClick(emotion, e) : toggleEmotion(emotion, e)}
                                                        className={cn(
                                                            "w-full text-base rounded-l-md py-3 transition-all relative overflow-hidden border-2 flex items-center text-start pl-4",
                                                            colorClasses.bg,
                                                            colorClasses.text,
                                                            mainBorderClasses
                                                        )}
                                                        whileHover={{ scale: isSelected ? 1 : 1.02, transition: { duration: 0.2 } }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {/* Filled portion indicating intensity (only for selected emotions) */}
                                                        {isSelected && (
                                                            <motion.div
                                                                className={cn(
                                                                    "absolute top-0 left-0 bottom-0 h-full",
                                                                    colorClasses.fill
                                                                )}
                                                                style={{ width: `${intensity}%` }}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${intensity}%` }}
                                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                            />
                                                        )}

                                                        {/* Content positioned above the fill */}
                                                        <div className="relative z-10 flex items-center">
                                                            <span className="text-2xl mr-3">{emotionData.emoji || '😶'}</span>
                                                            <span className="font-medium">{t(emotion.name.toLowerCase())}</span>
                                                        </div>

                                                        {/* Intensity percentage indicator (only for selected emotions) */}
                                                        {isSelected && intensity > 0 && (
                                                            <motion.div
                                                                className="absolute top-1 right-2 text-xs bg-black/30 dark:bg-white/30 px-1.5 rounded text-white dark:text-white font-medium"
                                                                initial={{ opacity: 0, scale: 0.5 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                {intensity}%
                                                            </motion.div>
                                                        )}
                                                    </motion.button>

                                                    {/* Remove button - only visible when selected */}
                                                    {isSelected && (
                                                        <motion.button
                                                            type="button"
                                                            className={cn(
                                                                "w-10 flex items-center justify-center rounded-r-md border-2 border-l-0",
                                                                removeBorderClasses,
                                                                "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50"
                                                            )}
                                                            onClick={(e) => removeEmotion(emotion.id, e)}
                                                            initial={{ opacity: 0, width: 0 }}
                                                            animate={{ opacity: 1, width: 40 }}
                                                            exit={{ opacity: 0, width: 0 }}
                                                            whileHover={{
                                                                backgroundColor: "rgba(239, 68, 68, 0.3)",
                                                                transition: { duration: 0.15 }
                                                            }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <X size={16} />
                                                        </motion.button>
                                                    )}
                                                </div>

                                                {/* Help text when selected */}
                                                <AnimatePresence>
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="px-2 text-xs text-muted-foreground text-center overflow-hidden"
                                                        >
                                                            {t('clickToAdjustIntensity')}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )
                )}
            </div>

            {/* Selected emotions summary */}
            <AnimatePresence>
                {value.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border pt-4 mt-4"
                    >
                        <h3 className="text-sm font-medium mb-2">{t('selectedEmotions')}</h3>
                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence mode="popLayout">
                                {value.map((emotion) => {
                                    const emotionWithIntensity = emotion as EmotionWithIntensity;
                                    const emotionColor = getEmotionColor(emotion) || 'blue';
                                    const colorClasses = getTailwindColorClasses(emotionColor, emotionWithIntensity.intensity, true);
                                    const intensity = emotionWithIntensity.intensity || 50;

                                    // Get border classes
                                    const badgeBorderClasses = getBorderClasses(emotionColor, true, true);

                                    return (
                                        <motion.div
                                            key={emotion.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            layout
                                            className={cn(
                                                "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium border relative overflow-hidden cursor-pointer",
                                                colorClasses.bg,
                                                colorClasses.text,
                                                badgeBorderClasses
                                            )}
                                            onClick={() => removeEmotion(emotion.id)}
                                        >
                                            {/* Filled portion for intensity */}
                                            <motion.div
                                                className={cn("absolute top-0 left-0 bottom-0 h-full", colorClasses.fill)}
                                                style={{ width: `${intensity}%` }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${intensity}%` }}
                                                transition={{ duration: 0.3 }}
                                            />

                                            {/* Content */}
                                            <div className="relative z-10 flex items-center">
                                                <span className="mr-1">{getEmotionData(emotion).emoji || '😶'}</span>
                                                <span>{t(emotion.name.toLowerCase())}</span>
                                                <span className="ml-1 text-xs opacity-80">
                                                    {intensity}%
                                                </span>
                                                <X size={12} className="ml-1 opacity-70" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add custom emotion button */}
            <div className="border-t border-input/30 pt-4 flex justify-end">
                <motion.button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowDialog(true);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <PlusCircle size={20} />
                    <span>{t('addCustom')}</span>
                </motion.button>
            </div>

            {/* Custom emotion dialog */}
            <MotionDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                position="center"
                width="half"
                title={t('addCustomEmotion')}
            >
                <div className="p-6">
                    <div className="py-4">
                        <label htmlFor="emotionName" className="text-base font-medium block mb-2">{t('name')}</label>
                        <Input
                            id="emotionName"
                            value={customEmotion.name}
                            onChange={(e) => setCustomEmotion(prev => ({ ...prev, name: e.target.value }))}
                            autoFocus
                            className="h-10 text-base"
                            placeholder={t('enterEmotionName')}
                        />
                    </div>
                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowDialog(false)}
                            size="lg"
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type="button"
                            onClick={handleAddCustomEmotion}
                            size="lg"
                            disabled={!customEmotion.name.trim()}
                        >
                            {t('add')}
                        </Button>
                    </div>
                </div>
            </MotionDialog>
        </div>
    );
};
