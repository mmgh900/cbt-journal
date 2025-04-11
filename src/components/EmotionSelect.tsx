import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Emotion, useCBTStore } from '../store/cbtStore';
import { PlusCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getEmotionBgColor, getEmotionData, getEmotionTextColor } from '../utils/emotionUtils';

interface EmotionSelectProps {
    value: Emotion[];
    onChange: (emotions: Emotion[]) => void;
}

export const EmotionSelect: React.FC<EmotionSelectProps> = ({ value, onChange }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [customEmotion, setCustomEmotion] = useState<{ name: string; icon: string }>({
        name: '',
        icon: 'pi pi-heart'
    });

    const store = useCBTStore();
    const defaultEmotions = store.defaultEmotions || [];
    const customEmotions = store.customEmotions || [];
    const addCustomEmotion = store.addCustomEmotion;

    const allEmotions = [...defaultEmotions, ...customEmotions];

    const handleAddCustomEmotion = () => {
        if (customEmotion.name.trim()) {
            addCustomEmotion(customEmotion);
            setCustomEmotion({ name: '', icon: 'pi pi-heart' });
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
            onChange([...value, emotion]);
        }
    };

    return (
        <div className="w-full space-y-3">
            {/* Emotions list with checkboxes */}
            <div className="rounded-md border border-input overflow-hidden p-3">
                <div className="flex flex-wrap gap-2.5">
                    {allEmotions.map(emotion => {
                        const isSelected = value.some(e => e.id === emotion.id);
                        const emotionData = getEmotionData(emotion);
                        const bgColor = emotionData.bgColor || getEmotionBgColor(emotion);
                        const textColor = emotionData.textColor || getEmotionTextColor(emotion);

                        return (
                            <button
                                key={emotion.id}
                                type="button"
                                onClick={(e) => toggleEmotion(emotion, e)}
                                className={cn(
                                    "text-xs rounded-md px-2.5 py-1.5 transition-colors flex items-center",
                                    isSelected ? "ring-1 ring-offset-1 ring-primary" : "opacity-80 hover:opacity-100"
                                )}
                                style={{
                                    backgroundColor: bgColor,
                                    color: textColor
                                }}
                            >
                                {isSelected && <Check className="h-3 w-3 mr-1" />}
                                <span className="mr-1">{emotionData.emoji}</span>
                                {emotion.name}
                            </button>
                        );
                    })}
                </div>

                {/* Add custom emotion button */}
                <div className="border-t border-input/30 mt-3 pt-3 flex justify-end">
                    <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowDialog(true);
                        }}
                    >
                        <PlusCircle className="h-3 w-3" />
                        <span>Add custom</span>
                    </button>
                </div>
            </div>

            {/* Custom emotion dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-[320px] border-minimal shadow-sm">
                    <DialogHeader>
                        <DialogTitle className="text-sm">Add Custom Emotion</DialogTitle>
                    </DialogHeader>
                    <div className="py-2">
                        <label htmlFor="emotionName" className="text-xs font-medium block mb-1">Name</label>
                        <Input
                            id="emotionName"
                            value={customEmotion.name}
                            onChange={(e) => setCustomEmotion(prev => ({ ...prev, name: e.target.value }))}
                            autoFocus
                            className="h-7 text-xs"
                            placeholder="Enter emotion name"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowDialog(false)}
                            size="sm"
                            className="h-7 text-xs"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleAddCustomEmotion}
                            size="sm"
                            disabled={!customEmotion.name.trim()}
                            className="h-7 text-xs"
                        >
                            Add
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
