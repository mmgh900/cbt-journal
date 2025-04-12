import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../lib/i18n';

type LanguageType = 'en' | 'fa';

export interface Direction {
  dir: 'ltr' | 'rtl';
  fontFamily: string;
}

export const getDirectionForLanguage = (language: LanguageType): Direction => {
  switch (language) {
    case 'fa':
      return { dir: 'rtl', fontFamily: 'Vazirmatn, sans-serif' };
    case 'en':
    default:
      return { dir: 'ltr', fontFamily: 'inherit' };
  }
};

interface LanguageState {
  language: LanguageType;
  direction: Direction;
  setLanguage: (language: LanguageType) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en' as LanguageType,
      direction: getDirectionForLanguage('en'),
      setLanguage: (language: LanguageType) => {
        i18n.changeLanguage(language);
        set({ language, direction: getDirectionForLanguage(language) });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
