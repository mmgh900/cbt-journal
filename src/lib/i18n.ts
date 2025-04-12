import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      appName: 'CBT Journal',
      lightTheme: 'Light theme',
      darkTheme: 'Dark theme',
      systemTheme: 'System theme',
      language: 'Language',
      back: 'Back',
      next: 'Next',
      close: 'Close',

      // CBT Form
      addEntry: 'Add Entry',
      editEntry: 'Edit Entry',
      situation: 'Situation',
      situationDescription: 'Describe what happened, where you were, and who was there.',
      situationPlaceholder: 'What happened?',

      thoughts: 'Thoughts',
      thoughtsDescription: 'What went through your mind during this situation? What were you thinking?',
      thoughtsPlaceholder: 'What went through your mind?',

      emotions: 'Emotions',
      emotionsDescription: 'What feelings or emotions did you experience during this situation?',
      emotionsPlaceholder: 'How did you feel?',

      behaviours: 'Behaviours',
      behavioursDescription: 'What did you do or how did you react to this situation?',
      behavioursPlaceholder: 'What did you do?',

      alternativeThoughts: 'Alternative Thoughts',
      alternativeThoughtsPlaceholder: 'What else could you think?',
      submit: 'Submit',
      saveChanges: 'Save Changes',
      reset: 'Reset',

      // Emotion Dialog
      addCustom: 'Add custom',
      addCustomEmotion: 'Add Custom Emotion',
      name: 'Name',
      enterEmotionName: 'Enter emotion name',
      add: 'Add',
      clickToAdjustIntensity: 'Click anywhere on the button to adjust intensity',
      mild: 'Mild',
      intense: 'Intense',
      selectedEmotions: 'Selected Emotions',

      // Emotion categories
      positive: 'Positive',
      negative: 'Negative',
      neutral: 'Neutral',
      other: 'Other',

      // Emotion labels - Joy-based
      joy: 'Joy',
      happy: 'Happy',
      content: 'Content',
      proud: 'Proud',
      excited: 'Excited',
      grateful: 'Grateful',
      peaceful: 'Peaceful',

      // Trust-based emotions
      trust: 'Trust',
      accepted: 'Accepted',
      respected: 'Respected',
      valued: 'Valued',

      // Anticipation-based emotions
      hopeful: 'Hopeful',
      eager: 'Eager',
      optimistic: 'Optimistic',

      // Surprise-based emotions
      surprise: 'Surprise',
      confused: 'Confused',
      amazed: 'Amazed',
      curious: 'Curious',

      // Fear-based emotions
      fear: 'Fear',
      worried: 'Worried',
      insecure: 'Insecure',
      helpless: 'Helpless',
      overwhelmed: 'Overwhelmed',
      anxious: 'Anxious',

      // Sadness-based emotions
      sad: 'Sad',
      disappointed: 'Disappointed',
      lonely: 'Lonely',
      grief: 'Grief',
      regretful: 'Regretful',

      // Disgust-based emotions
      disgust: 'Disgust',
      ashamed: 'Ashamed',
      embarrassed: 'Embarrassed',
      guilty: 'Guilty',

      // Anger-based emotions
      angry: 'Angry',
      frustrated: 'Frustrated',
      irritated: 'Irritated',
      resentful: 'Resentful',

      // Legacy emotions for compatibility
      happiness: 'Happiness',
      contentment: 'Contentment',
      gratitude: 'Gratitude',
      love: 'Love',
      calm: 'Calm',
      pensive: 'Pensive',
      shame: 'Shame',
      jealousy: 'Jealousy',
      hopeless: 'Hopeless',

      // Table
      date: 'Date',
      action: 'Action',
      edit: 'Edit',
      delete: 'Delete',
      noEntries: 'No entries available',
      confirmDelete: 'Are you sure you want to delete this entry?',
      cancel: 'Cancel',

      // Records
      addRecord: 'Add Record',
      editRecord: 'Edit Record',
    }
  },
  fa: {
    translation: {
      // Common
      appName: 'دفتر CBT',
      lightTheme: 'تم روشن',
      darkTheme: 'تم تیره',
      systemTheme: 'تم سیستم',
      language: 'زبان',
      back: 'بازگشت',
      next: 'بعدی',
      close: 'بستن',

      // CBT Form
      addEntry: 'افزودن ورودی',
      editEntry: 'ویرایش ورودی',
      situation: 'موقعیت',
      situationDescription: 'توضیح دهید چه اتفاقی افتاد، کجا بودید و چه کسی آنجا بود.',
      situationPlaceholder: 'چه اتفاقی افتاد؟',

      thoughts: 'افکار',
      thoughtsDescription: 'در طول این موقعیت از ذهن شما چه گذشت؟ به چه فکر می‌کردید؟',
      thoughtsPlaceholder: 'چه چیزی از ذهن شما گذشت؟',

      emotions: 'احساسات',
      emotionsDescription: 'چه احساسات یا عواطفی را در طول این موقعیت تجربه کردید؟',
      emotionsPlaceholder: 'چه احساسی داشتید؟',

      behaviours: 'رفتارها',
      behavioursDescription: 'چه کاری انجام دادید یا چگونه به این موقعیت واکنش نشان دادید؟',
      behavioursPlaceholder: 'چه کاری انجام دادید؟',

      alternativeThoughts: 'افکار جایگزین',
      alternativeThoughtsPlaceholder: 'چه فکر دیگری می‌توانید داشته باشید؟',
      submit: 'ثبت',
      saveChanges: 'ذخیره تغییرات',
      reset: 'بازنشانی',

      // Emotion Dialog
      addCustom: 'افزودن سفارشی',
      addCustomEmotion: 'افزودن احساس سفارشی',
      name: 'نام',
      enterEmotionName: 'نام احساس را وارد کنید',
      add: 'افزودن',
      clickToAdjustIntensity: 'برای تنظیم شدت، روی دکمه کلیک کنید',
      mild: 'ملایم',
      intense: 'شدید',
      selectedEmotions: 'احساسات انتخاب شده',

      // Emotion categories
      positive: 'مثبت',
      negative: 'منفی',
      neutral: 'خنثی',
      other: 'سایر',

      // Emotion labels - Joy-based
      joy: 'شادی',
      happy: 'خوشحال',
      content: 'راضی',
      proud: 'مغرور',
      excited: 'هیجان‌زده',
      grateful: 'سپاسگزار',
      peaceful: 'آرامش',

      // Trust-based emotions
      trust: 'اعتماد',
      accepted: 'پذیرفته شده',
      respected: 'محترم',
      valued: 'ارزشمند',

      // Anticipation-based emotions
      hopeful: 'امیدوار',
      eager: 'مشتاق',
      optimistic: 'خوش‌بین',

      // Surprise-based emotions
      surprise: 'تعجب',
      confused: 'سردرگم',
      amazed: 'حیرت‌زده',
      curious: 'کنجکاو',

      // Fear-based emotions
      fear: 'ترس',
      worried: 'نگران',
      insecure: 'ناامن',
      helpless: 'درمانده',
      overwhelmed: 'سرریز',
      anxious: 'مضطرب',

      // Sadness-based emotions
      sad: 'غمگین',
      disappointed: 'ناامید',
      lonely: 'تنها',
      grief: 'سوگوار',
      regretful: 'پشیمان',

      // Disgust-based emotions
      disgust: 'انزجار',
      ashamed: 'شرمنده',
      embarrassed: 'خجالت‌زده',
      guilty: 'گناهکار',

      // Anger-based emotions
      angry: 'عصبانی',
      frustrated: 'ناکام',
      irritated: 'آزرده',
      resentful: 'رنجیده',

      // Legacy emotions for compatibility
      happiness: 'خوشحالی',
      contentment: 'رضایت',
      gratitude: 'قدردانی',
      love: 'عشق',
      calm: 'آرام',
      pensive: 'متفکر',
      shame: 'شرمنده',
      jealousy: 'حسود',
      hopeless: 'ناامید',

      // Table
      date: 'تاریخ',
      action: 'عملیات',
      edit: 'ویرایش',
      delete: 'حذف',
      noEntries: 'ورودی موجود نیست',
      confirmDelete: 'آیا مطمئن هستید که می‌خواهید این ورودی را حذف کنید؟',
      cancel: 'لغو',

      // Records
      addRecord: 'افزودن رکورد',
      editRecord: 'ویرایش رکورد',
    }
  }
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
