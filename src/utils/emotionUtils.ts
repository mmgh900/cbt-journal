import { useTranslation } from "react-i18next";
import { Emotion } from '../store/cbtStore';

// Compatible with shadcn Badge component variants
export type EmotionVariant =
  | 'joy'
  | 'trust'
  | 'fear'
  | 'surprise'
  | 'sadness'
  | 'disgust'
  | 'anger'
  | 'anticipation'
  | 'other';

// Additional emotion-specific categories (not used directly with shadcn badges)
export type EmotionCategory = 'positive' | 'neutral' | 'negative';

// Tailwind color name for consistent theme support
export type TailwindColor =
  | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime'
  | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky'
  | 'blue' | 'indigo' | 'violet' | 'purple'
  | 'fuchsia' | 'pink' | 'rose';

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
    displayName?: string; // Translated name
    // Color information using Tailwind color system
    color: TailwindColor; // Base Tailwind color name
}

// Emotion categories
export const emotionCategories: Record<EmotionCategory, EmotionCategoryMetadata> = {
    positive: {
        name: 'Positive',
        description: 'Emotions that generally feel good',
        variants: ['joy', 'trust', 'anticipation']
    },
    neutral: {
        name: 'Neutral',
        description: 'Emotions that are neither positive nor negative',
        variants: ['surprise']
    },
    negative: {
        name: 'Negative',
        description: 'Emotions that generally feel bad',
        variants: ['fear', 'sadness', 'disgust', 'anger']
    }
};

// Basic emotion colors for categories (fallbacks if specific color not found)
export const categoryColors: Record<EmotionCategory, TailwindColor> = {
    positive: 'green',
    negative: 'red',
    neutral: 'slate'
};

// Common emotions with predefined properties
export const commonEmotions: EmotionData[] = [
    // Joy-based emotions (positive)
    { id: 'joy', name: 'joy', emoji: '😊', variant: 'joy', category: 'positive', color: 'green' },
    { id: 'happy', name: 'happy', emoji: '😄', variant: 'joy', category: 'positive', color: 'emerald' },
    { id: 'content', name: 'content', emoji: '🙂', variant: 'joy', category: 'positive', color: 'teal' },
    { id: 'proud', name: 'proud', emoji: '😌', variant: 'joy', category: 'positive', color: 'cyan' },
    { id: 'excited', name: 'excited', emoji: '🤩', variant: 'joy', category: 'positive', color: 'lime' },
    { id: 'grateful', name: 'grateful', emoji: '🥰', variant: 'joy', category: 'positive', color: 'emerald' },
    { id: 'peaceful', name: 'peaceful', emoji: '😌', variant: 'joy', category: 'positive', color: 'teal' },

    // Trust-based emotions (positive)
    { id: 'trust', name: 'trust', emoji: '🤝', variant: 'trust', category: 'positive', color: 'sky' },
    { id: 'accepted', name: 'accepted', emoji: '🫂', variant: 'trust', category: 'positive', color: 'blue' },
    { id: 'respected', name: 'respected', emoji: '👏', variant: 'trust', category: 'positive', color: 'indigo' },
    { id: 'valued', name: 'valued', emoji: '💎', variant: 'trust', category: 'positive', color: 'blue' },

    // Anticipation-based emotions (positive to neutral)
    { id: 'hopeful', name: 'hopeful', emoji: '🌱', variant: 'anticipation', category: 'positive', color: 'yellow' },
    { id: 'eager', name: 'eager', emoji: '👀', variant: 'anticipation', category: 'positive', color: 'amber' },
    { id: 'optimistic', name: 'optimistic', emoji: '☀️', variant: 'anticipation', category: 'positive', color: 'yellow' },
    { id: 'anxious', name: 'anxious', emoji: '😰', variant: 'anticipation', category: 'negative', color: 'amber' },

    // Surprise-based emotions (neutral)
    { id: 'surprise', name: 'surprise', emoji: '😲', variant: 'surprise', category: 'neutral', color: 'purple' },
    { id: 'confused', name: 'confused', emoji: '🤔', variant: 'surprise', category: 'neutral', color: 'violet' },
    { id: 'amazed', name: 'amazed', emoji: '🤯', variant: 'surprise', category: 'neutral', color: 'fuchsia' },
    { id: 'curious', name: 'curious', emoji: '🧐', variant: 'surprise', category: 'neutral', color: 'purple' },

    // Fear-based emotions (negative)
    { id: 'fear', name: 'fear', emoji: '😨', variant: 'fear', category: 'negative', color: 'violet' },
    { id: 'worried', name: 'worried', emoji: '😟', variant: 'fear', category: 'negative', color: 'purple' },
    { id: 'insecure', name: 'insecure', emoji: '🙁', variant: 'fear', category: 'negative', color: 'fuchsia' },
    { id: 'helpless', name: 'helpless', emoji: '😓', variant: 'fear', category: 'negative', color: 'purple' },
    { id: 'overwhelmed', name: 'overwhelmed', emoji: '😫', variant: 'fear', category: 'negative', color: 'violet' },

    // Sadness-based emotions (negative)
    { id: 'sad', name: 'sad', emoji: '😢', variant: 'sadness', category: 'negative', color: 'blue' },
    { id: 'disappointed', name: 'disappointed', emoji: '😔', variant: 'sadness', category: 'negative', color: 'sky' },
    { id: 'lonely', name: 'lonely', emoji: '💔', variant: 'sadness', category: 'negative', color: 'indigo' },
    { id: 'grief', name: 'grief', emoji: '😭', variant: 'sadness', category: 'negative', color: 'blue' },
    { id: 'regretful', name: 'regretful', emoji: '😞', variant: 'sadness', category: 'negative', color: 'sky' },

    // Disgust-based emotions (negative)
    { id: 'disgust', name: 'disgust', emoji: '🤢', variant: 'disgust', category: 'negative', color: 'lime' },
    { id: 'ashamed', name: 'ashamed', emoji: '😣', variant: 'disgust', category: 'negative', color: 'green' },
    { id: 'embarrassed', name: 'embarrassed', emoji: '😳', variant: 'disgust', category: 'negative', color: 'pink' },
    { id: 'guilty', name: 'guilty', emoji: '🫣', variant: 'disgust', category: 'negative', color: 'green' },

    // Anger-based emotions (negative)
    { id: 'angry', name: 'angry', emoji: '😠', variant: 'anger', category: 'negative', color: 'red' },
    { id: 'frustrated', name: 'frustrated', emoji: '😤', variant: 'anger', category: 'negative', color: 'rose' },
    { id: 'irritated', name: 'irritated', emoji: '😒', variant: 'anger', category: 'negative', color: 'pink' },
    { id: 'resentful', name: 'resentful', emoji: '😑', variant: 'anger', category: 'negative', color: 'red' },
];

// Default safe colors to use in case of undefined values
const defaultColors: Record<string, TailwindColor> = {
    default: 'blue',
    positive: 'green',
    negative: 'red',
    neutral: 'slate',
    other: 'gray'
};

// Get Tailwind color classes based on emotion color and usage context
export function getTailwindColorClasses(
  color: TailwindColor | string,
  intensity: number = 50,
  isSelected: boolean = false
): { bg: string; text: string; fill: string } {
  // Ensure we have a valid Tailwind color - fallback to blue if not found
  const validColors: TailwindColor[] = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime',
    'green', 'emerald', 'teal', 'cyan', 'sky',
    'blue', 'indigo', 'violet', 'purple',
    'fuchsia', 'pink', 'rose'
  ];

  // Validate and use fallback if needed
  const safeColor = validColors.includes(color as TailwindColor)
    ? color as TailwindColor
    : 'blue';

  // Base background opacity based on selected state
  const baseOpacity = isSelected ? '20' : '10';

  // For dark mode adjustments
  const darkBgOpacity = isSelected ? '30' : '20';

  return {
    // Background based on selection state and color
    bg: `bg-${safeColor}-${baseOpacity} dark:bg-${safeColor}-900/${darkBgOpacity}`,

    // Text color based on color
    text: `text-${safeColor}-700 dark:text-${safeColor}-300`,

    // Fill color for slider (higher opacity when selected)
    fill: `bg-${safeColor}-200 dark:bg-${safeColor}-800/50`
  };
}

// Helper function to check if a string is a valid Tailwind color
function isTailwindColor(color: string): color is TailwindColor {
    const validColors = [
        'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange',
        'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
        'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
    ];
    return validColors.includes(color);
}

// Translate an emotion name using i18n
export function getTranslatedEmotionName(emotion: Emotion): string {
  const { t } = useTranslation();
  const emotionName = emotion.name.toLowerCase();
  return t(emotionName);
}

// Helper function to get badge variant for an emotion
export function getEmotionBadgeVariant(emotionInput: Emotion | string): EmotionVariant {
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
        return 'joy';
    }

    // Check for negative emotions (high intensity)
    else if (lowercased.includes('anger') ||
        lowercased.includes('fear') ||
        lowercased.includes('jealous') ||
        lowercased.includes('rage') ||
        lowercased.includes('hate') ||
        lowercased.includes('disgust')) {
        return 'anger';
    }

    // Check for negative emotions (medium intensity)
    else if (lowercased.includes('anxiety') ||
        lowercased.includes('sad') ||
        lowercased.includes('lonely') ||
        lowercased.includes('guilt') ||
        lowercased.includes('shame') ||
        lowercased.includes('disappoint')) {
        return 'sadness';
    }

    // Default to outline for neutral or unknown emotions
    return 'other';
}

// Helper function to get an emoji for an emotion
export function getEmotionEmoji(emotionInput: Emotion | string): string {
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
}

// Helper function to get Tailwind color for an emotion
export function getEmotionColor(emotion: Emotion): TailwindColor | undefined {
  const data = getEmotionData(emotion);
  if (!data || !data.color) return 'blue'; // Fallback
  return data.color;
}

// Helper function to get the category of an emotion
export function getEmotionCategory(emotionInput: Emotion | string): EmotionCategory {
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

    if (variant === 'joy') return 'positive';
    if (variant === 'surprise') return 'neutral';
    return 'negative';
}

// Helper to get all properties for an emotion
export function getEmotionData(emotion: Emotion): EmotionData {
    // Find matching emotion in common emotions list
    const match = commonEmotions.find(e => e.id === emotion.id);

    // Return the match if found, otherwise create a basic emotionData object
    if (match) return match;

    // Basic fallback data for custom emotions
    return {
        id: emotion.id,
        name: emotion.name,
        emoji: emotion.icon || '😶', // Default emoji if none provided
        variant: 'other',
        category: 'neutral',
        color: 'blue' // Default color
    };
}
