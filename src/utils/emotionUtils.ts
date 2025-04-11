import { Emotion } from '../store/cbtStore';

// Compatible with shadcn Badge component variants
export type EmotionVariant = 'default' | 'secondary' | 'destructive' | 'outline';

// Additional emotion-specific categories (not used directly with shadcn badges)
export type EmotionCategory = 'positive' | 'negative' | 'neutral';

interface EmotionCategoryMetadata {
  name: string;
  description: string;
  variants: EmotionVariant[];
}

export interface EmotionData {
  id: string;
  name: string;
  emoji: string;
  variant: EmotionVariant;
  category: EmotionCategory;
  intensity: number; // 1-5 scale, 5 being most intense
  // Custom colors for badges
  bgColor: string; // Light pale background color (CSS variable or hex)
  textColor: string; // More saturated text color (CSS variable or hex)
}

// Emotion categories
export const emotionCategories: Record<EmotionCategory, EmotionCategoryMetadata> = {
  positive: {
    name: 'Positive',
    description: 'Emotions that generally feel good',
    variants: ['default']
  },
  neutral: {
    name: 'Neutral',
    description: 'Emotions that are neither positive nor negative',
    variants: ['outline']
  },
  negative: {
    name: 'Negative',
    description: 'Emotions that generally feel bad',
    variants: ['destructive', 'secondary']
  }
};

// Common emotions with predefined properties
export const commonEmotions: EmotionData[] = [
  // Positive emotions
  { id: 'joy', name: 'Joy', emoji: '😊', variant: 'default', category: 'positive', intensity: 4, bgColor: '#e7f9dd', textColor: '#2e7b32' },
  { id: 'happiness', name: 'Happiness', emoji: '😄', variant: 'default', category: 'positive', intensity: 4, bgColor: '#e7f9dd', textColor: '#2e7b32' },
  { id: 'contentment', name: 'Contentment', emoji: '😌', variant: 'default', category: 'positive', intensity: 3, bgColor: '#e0f5ea', textColor: '#00796b' },
  { id: 'gratitude', name: 'Gratitude', emoji: '🙏', variant: 'default', category: 'positive', intensity: 3, bgColor: '#e4f1fa', textColor: '#0277bd' },
  { id: 'love', name: 'Love', emoji: '❤️', variant: 'default', category: 'positive', intensity: 5, bgColor: '#fce4ec', textColor: '#c2185b' },
  { id: 'excited', name: 'Excited', emoji: '🤩', variant: 'default', category: 'positive', intensity: 5, bgColor: '#fff8e1', textColor: '#ff8f00' },
  { id: 'hopeful', name: 'Hopeful', emoji: '🌟', variant: 'default', category: 'positive', intensity: 3, bgColor: '#e4f1fa', textColor: '#0288d1' },
  { id: 'proud', name: 'Proud', emoji: '🦚', variant: 'default', category: 'positive', intensity: 4, bgColor: '#e8eaf6', textColor: '#3949ab' },

  // Neutral emotions
  { id: 'surprise', name: 'Surprise', emoji: '😲', variant: 'outline', category: 'neutral', intensity: 3, bgColor: '#f3e5f5', textColor: '#8e24aa' },
  { id: 'curious', name: 'Curious', emoji: '🧐', variant: 'outline', category: 'neutral', intensity: 2, bgColor: '#e8f5e9', textColor: '#388e3c' },
  { id: 'calm', name: 'Calm', emoji: '😐', variant: 'outline', category: 'neutral', intensity: 1, bgColor: '#e0f7fa', textColor: '#0097a7' },
  { id: 'pensive', name: 'Pensive', emoji: '🤔', variant: 'outline', category: 'neutral', intensity: 2, bgColor: '#f5f5f5', textColor: '#616161' },

  // Negative emotions
  { id: 'sadness', name: 'Sadness', emoji: '😢', variant: 'secondary', category: 'negative', intensity: 3, bgColor: '#e3f2fd', textColor: '#1565c0' },
  { id: 'loneliness', name: 'Loneliness', emoji: '🕸️', variant: 'secondary', category: 'negative', intensity: 3, bgColor: '#eceff1', textColor: '#455a64' },
  { id: 'anxiety', name: 'Anxiety', emoji: '😰', variant: 'secondary', category: 'negative', intensity: 4, bgColor: '#e0f2f1', textColor: '#00695c' },
  { id: 'fear', name: 'Fear', emoji: '😨', variant: 'destructive', category: 'negative', intensity: 4, bgColor: '#ede7f6', textColor: '#4527a0' },
  { id: 'anger', name: 'Anger', emoji: '😡', variant: 'destructive', category: 'negative', intensity: 5, bgColor: '#ffebee', textColor: '#c62828' },
  { id: 'guilt', name: 'Guilt', emoji: '😔', variant: 'secondary', category: 'negative', intensity: 3, bgColor: '#f1f8e9', textColor: '#558b2f' },
  { id: 'shame', name: 'Shame', emoji: '🙈', variant: 'secondary', category: 'negative', intensity: 4, bgColor: '#fff3e0', textColor: '#ef6c00' },
  { id: 'jealousy', name: 'Jealousy', emoji: '💚', variant: 'destructive', category: 'negative', intensity: 4, bgColor: '#e8f5e9', textColor: '#2e7d32' },
  { id: 'frustration', name: 'Frustration', emoji: '😤', variant: 'destructive', category: 'negative', intensity: 3, bgColor: '#fbe9e7', textColor: '#d84315' },
  { id: 'disappointment', name: 'Disappointment', emoji: '😞', variant: 'secondary', category: 'negative', intensity: 3, bgColor: '#e0f2f1', textColor: '#00796b' },
];

// Helper function to get badge variant for an emotion
export const getEmotionBadgeVariant = (emotionInput: Emotion | string): EmotionVariant => {
  // If we got a full emotion object
  if (typeof emotionInput !== 'string' && 'name' in emotionInput) {
    // Try to find a predefined emotion
    const predefined = commonEmotions.find(e =>
      e.name.toLowerCase() === emotionInput.name.toLowerCase() ||
      e.id.toLowerCase() === emotionInput.name.toLowerCase()
    );

    if (predefined) {
      return predefined.variant;
    }

    // Fallback to analyzing the name
    return getEmotionBadgeVariant(emotionInput.name);
  }

  // String-based analysis
  const lowercased = emotionInput.toLowerCase();

  // Check for positive emotions
  if (lowercased.includes('joy') ||
      lowercased.includes('happy') ||
      lowercased.includes('content') ||
      lowercased.includes('love') ||
      lowercased.includes('excite') ||
      lowercased.includes('hope') ||
      lowercased.includes('proud')) {
    return 'default';
  }

  // Check for negative emotions (high intensity)
  else if (lowercased.includes('anger') ||
           lowercased.includes('fear') ||
           lowercased.includes('jealous') ||
           lowercased.includes('rage') ||
           lowercased.includes('hate') ||
           lowercased.includes('disgust')) {
    return 'destructive';
  }

  // Check for negative emotions (medium intensity)
  else if (lowercased.includes('anxiety') ||
           lowercased.includes('sad') ||
           lowercased.includes('lonely') ||
           lowercased.includes('guilt') ||
           lowercased.includes('shame') ||
           lowercased.includes('disappoint')) {
    return 'secondary';
  }

  // Default to outline for neutral or unknown emotions
  return 'outline';
};

// Helper function to get an emoji for an emotion
export const getEmotionEmoji = (emotionInput: Emotion | string): string => {
  // If we got a full emotion object
  if (typeof emotionInput !== 'string' && 'name' in emotionInput) {
    // Try to find a predefined emotion
    const predefined = commonEmotions.find(e =>
      e.name.toLowerCase() === emotionInput.name.toLowerCase() ||
      e.id.toLowerCase() === emotionInput.name.toLowerCase()
    );

    if (predefined) {
      return predefined.emoji;
    }

    return getEmotionEmoji(emotionInput.name);
  }

  // String-based fallback
  const lowercased = emotionInput.toLowerCase();

  // Simple mapping for common emotions not in our predefined list
  if (lowercased.includes('joy')) return '😊';
  if (lowercased.includes('happy')) return '😄';
  if (lowercased.includes('sad')) return '😢';
  if (lowercased.includes('angry')) return '😡';
  if (lowercased.includes('fear')) return '😨';
  if (lowercased.includes('love')) return '❤️';
  if (lowercased.includes('surprise')) return '😲';

  // Default emoji for unknown emotions
  return '😶';
};

// Helper function to get the category of an emotion
export const getEmotionCategory = (emotionInput: Emotion | string): EmotionCategory => {
  // If we got a full emotion object
  if (typeof emotionInput !== 'string' && 'name' in emotionInput) {
    // Try to find a predefined emotion
    const predefined = commonEmotions.find(e =>
      e.name.toLowerCase() === emotionInput.name.toLowerCase() ||
      e.id.toLowerCase() === emotionInput.name.toLowerCase()
    );

    if (predefined) {
      return predefined.category;
    }

    return getEmotionCategory(emotionInput.name);
  }

  const variant = getEmotionBadgeVariant(emotionInput);

  if (variant === 'default') return 'positive';
  if (variant === 'outline') return 'neutral';
  return 'negative';
};

// Helper function to get background color for an emotion badge
export const getEmotionBgColor = (emotionInput: Emotion | string): string => {
  // If we got a full emotion object
  if (typeof emotionInput !== 'string' && 'name' in emotionInput) {
    // Try to find a predefined emotion
    const predefined = commonEmotions.find(e =>
      e.name.toLowerCase() === emotionInput.name.toLowerCase() ||
      e.id.toLowerCase() === emotionInput.name.toLowerCase()
    );

    if (predefined) {
      return predefined.bgColor;
    }

    // Fallback to analyzing the name
    return getEmotionBgColor(emotionInput.name);
  }

  // Default colors based on category
  const category = getEmotionCategory(emotionInput);

  if (category === 'positive') return '#e7f9dd'; // Light green
  if (category === 'neutral') return '#f5f5f5'; // Light gray
  return '#ffebee'; // Light red for negative
};

// Helper function to get text color for an emotion badge
export const getEmotionTextColor = (emotionInput: Emotion | string): string => {
  // If we got a full emotion object
  if (typeof emotionInput !== 'string' && 'name' in emotionInput) {
    // Try to find a predefined emotion
    const predefined = commonEmotions.find(e =>
      e.name.toLowerCase() === emotionInput.name.toLowerCase() ||
      e.id.toLowerCase() === emotionInput.name.toLowerCase()
    );

    if (predefined) {
      return predefined.textColor;
    }

    // Fallback to analyzing the name
    return getEmotionTextColor(emotionInput.name);
  }

  // Default colors based on category
  const category = getEmotionCategory(emotionInput);

  if (category === 'positive') return '#2e7b32'; // Dark green
  if (category === 'neutral') return '#616161'; // Dark gray
  return '#c62828'; // Dark red for negative
};

// Helper to get all properties for an emotion
export const getEmotionData = (emotionInput: Emotion | string): Partial<EmotionData> => {
  // If we got a full emotion object
  if (typeof emotionInput !== 'string' && 'name' in emotionInput) {
    // Try to find a predefined emotion
    const predefined = commonEmotions.find(e =>
      e.name.toLowerCase() === emotionInput.name.toLowerCase() ||
      e.id.toLowerCase() === emotionInput.name.toLowerCase()
    );

    if (predefined) {
      return predefined;
    }

    // Create a custom emotion data object
    const name = emotionInput.name;
    const variant = getEmotionBadgeVariant(name);
    const category = getEmotionCategory(name);
    const emoji = getEmotionEmoji(name);
    const bgColor = getEmotionBgColor(name);
    const textColor = getEmotionTextColor(name);

    return {
      id: emotionInput.id || name.toLowerCase().replace(/\s+/g, '-'),
      name,
      emoji,
      variant,
      category,
      bgColor,
      textColor,
      // Default to medium intensity for custom emotions
      intensity: 3
    };
  }

  // Handle string input
  const name = emotionInput;
  const variant = getEmotionBadgeVariant(name);
  const category = getEmotionCategory(name);
  const emoji = getEmotionEmoji(name);
  const bgColor = getEmotionBgColor(name);
  const textColor = getEmotionTextColor(name);

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    emoji,
    variant,
    category,
    bgColor,
    textColor,
    // Default to medium intensity for custom emotions
    intensity: 3
  };
};
