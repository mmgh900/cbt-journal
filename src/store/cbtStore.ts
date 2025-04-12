import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { commonEmotions, getEmotionCategory, getEmotionColor } from '../utils/emotionUtils';

export type Emotion = {
  id: string;
  name: string;
  icon?: string;  // Legacy field for backward compatibility
  emoji?: string; // New field for emojis
  intensity?: number; // Optional intensity level (0-100)
  category?: string; // Category like 'happy', 'sad', etc.
  color?: string; // Tailwind color for the emotion
};

export type CBTRecord = {
  id: string;
  time: string;
  situation: string;
  thought: string;
  emotions: Emotion[];
  action: string;
  forReasons?: string[];
  againstReasons?: string[];
};

interface CBTState {
  records: CBTRecord[];
  customEmotions: Emotion[];
  defaultEmotions: Emotion[];
  addRecord: (record: Omit<CBTRecord, 'id'>) => void;
  deleteRecord: (id: string) => void;
  updateRecord: (record: CBTRecord) => void;
  addCustomEmotion: (emotion: Omit<Emotion, 'id'>) => void;
  deleteCustomEmotion: (id: string) => void;
}

// Convert our common emotions to the format expected by the store
const storeEmotions = commonEmotions.map(emotion => ({
  id: emotion.id,
  name: emotion.name,
  emoji: emotion.emoji,
  icon: 'pi pi-heart', // Legacy fallback
  category: emotion.category || undefined,
  color: emotion.color // Include the color
}));

export const useCBTStore = create<CBTState>()(
  persist(
    (set) => ({
      records: [],
      customEmotions: [],
      defaultEmotions: storeEmotions,
      addRecord: (record) =>
        set((state) => ({
          records: [...state.records, {
            ...record,
            id: crypto.randomUUID(),
            // Make sure all emotions have intensity property
            emotions: record.emotions.map(e => ({
              ...e,
              intensity: e.intensity || 50 // Default to 50% if not set
            }))
          }]
        })),
      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((record) => record.id !== id)
        })),
      updateRecord: (updatedRecord) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === updatedRecord.id ? {
              ...updatedRecord,
              // Make sure all emotions have intensity property
              emotions: updatedRecord.emotions.map(e => ({
                ...e,
                intensity: e.intensity || 50 // Default to 50% if not set
              }))
            } : record
          )
        })),
      addCustomEmotion: (emotion) => {
        // Determine category based on name
        const category = getEmotionCategory(emotion.name);
        // Get appropriate color based on emotion name and category
        const color = getEmotionColor({ name: emotion.name, id: '', emoji: '' });

        set((state) => ({
          customEmotions: [...state.customEmotions, {
            ...emotion,
            id: crypto.randomUUID(),
            emoji: '😶', // Default emoji for custom emotions
            category: category, // Set category based on name analysis
            color: color // Set color based on name and category
          }]
        }));
      },
      deleteCustomEmotion: (id) =>
        set((state) => ({
          customEmotions: state.customEmotions.filter((emotion) => emotion.id !== id)
        })),
    }),
    {
      name: 'cbt-storage',
    }
  )
);
