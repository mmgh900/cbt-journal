import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { commonEmotions } from '../utils/emotionUtils';

export type Emotion = {
  id: string;
  name: string;
  icon?: string;  // Legacy field for backward compatibility
  emoji?: string; // New field for emojis
};

export type CBTRecord = {
  id: string;
  time: string;
  situation: string;
  thought: string;
  emotions: Emotion[];
  action: string;
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
  icon: 'pi pi-heart' // Legacy fallback
}));

export const useCBTStore = create<CBTState>()(
  persist(
    (set) => ({
      records: [],
      customEmotions: [],
      defaultEmotions: storeEmotions,
      addRecord: (record) =>
        set((state) => ({
          records: [...state.records, { ...record, id: crypto.randomUUID() }]
        })),
      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((record) => record.id !== id)
        })),
      updateRecord: (updatedRecord) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === updatedRecord.id ? updatedRecord : record
          )
        })),
      addCustomEmotion: (emotion) =>
        set((state) => ({
          customEmotions: [...state.customEmotions, {
            ...emotion,
            id: crypto.randomUUID(),
            emoji: '😶' // Default emoji for custom emotions
          }]
        })),
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
