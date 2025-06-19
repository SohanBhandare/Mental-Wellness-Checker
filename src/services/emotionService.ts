import { EmotionAnalysis, EmotionConfig } from '../types';

// Emotion configurations with quotes and tips
const emotionConfigs: Record<string, EmotionConfig> = {
  happy: {
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    icon: '😊',
    quotes: [
      "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
      "The best way to cheer yourself up is to try to cheer somebody else up. - Mark Twain",
      "Happiness is when what you think, what you say, and what you do are in harmony. - Mahatma Gandhi"
    ],
    tips: [
      "Share your joy with someone you care about",
      "Take a moment to appreciate what made you happy",
      "Practice gratitude by writing down three good things from today"
    ]
  },
  sad: {
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: '😢',
    quotes: [
      "The sun will rise and we will try again. - Twenty One Pilots",
      "It's okay to not be okay, as long as you don't give up. - Unknown",
      "Every storm eventually runs out of rain. - Maya Angelou"
    ],
    tips: [
      "Reach out to a friend or family member for support",
      "Try gentle movement like a short walk or stretching",
      "Practice self-compassion - treat yourself with kindness"
    ]
  },
  anxious: {
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: '😰',
    quotes: [
      "You are braver than you believe, stronger than you seem, and smarter than you think. - A.A. Milne",
      "Anxiety is the dizziness of freedom. - Søren Kierkegaard",
      "Nothing can bring you peace but yourself. - Ralph Waldo Emerson"
    ],
    tips: [
      "Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8",
      "Ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear",
      "Consider talking to a mental health professional"
    ]
  },
  stressed: {
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: '😤',
    quotes: [
      "You have been assigned this mountain to show others it can be moved. - Mel Robbins",
      "Stress is caused by being 'here' but wanting to be 'there'. - Eckhart Tolle",
      "Take time to make your soul happy. - Unknown"
    ],
    tips: [
      "Take short breaks every hour to prevent burnout",
      "Practice progressive muscle relaxation",
      "Prioritize your tasks and focus on one thing at a time"
    ]
  },
  angry: {
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    icon: '😠',
    quotes: [
      "Holding onto anger is like grasping a hot coal with the intent of throwing it at someone else. - Buddha",
      "The best fighter is never angry. - Lao Tzu",
      "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured. - Mark Twain"
    ],
    tips: [
      "Take 10 deep breaths before responding to the situation",
      "Try physical exercise to release tension",
      "Write down your feelings in a journal to process them"
    ]
  },
  neutral: {
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    icon: '😐',
    quotes: [
      "Sometimes the most productive thing you can do is relax. - Mark Black",
      "Peace comes from within. Do not seek it without. - Buddha",
      "In the midst of movement and chaos, keep stillness inside of you. - Deepak Chopra"
    ],
    tips: [
      "This is a good time for reflection and planning",
      "Consider setting small, achievable goals for the day",
      "Practice mindfulness meditation for 5-10 minutes"
    ]
  }
};

// Keywords associated with each emotion
const emotionKeywords: Record<string, string[]> = {
  happy: ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic', 'good', 'positive', 'cheerful', 'delighted', 'pleased'],
  sad: ['sad', 'depressed', 'down', 'blue', 'upset', 'disappointed', 'heartbroken', 'melancholy', 'gloomy', 'unhappy'],
  anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panicked', 'uneasy', 'restless', 'apprehensive', 'tense'],
  stressed: ['stressed', 'overwhelmed', 'pressure', 'busy', 'exhausted', 'burned out', 'frazzled', 'strained', 'tense'],
  angry: ['angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 'livid', 'outraged', 'bitter'],
  neutral: ['okay', 'fine', 'alright', 'normal', 'average', 'meh', 'nothing', 'same', 'usual']
};

export class EmotionService {
  // Simulated AI emotion analysis
  static analyzeEmotion(text: string): EmotionAnalysis {
    const lowerText = text.toLowerCase();
    let detectedEmotion = 'neutral';
    let maxScore = 0;

    // Simple keyword-based emotion detection
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (lowerText.includes(keyword) ? 1 : 0);
      }, 0);

      if (score > maxScore) {
        maxScore = score;
        detectedEmotion = emotion;
      }
    }

    const config = emotionConfigs[detectedEmotion];
    const confidence = Math.min(0.95, Math.max(0.6, maxScore * 0.15 + 0.6));

    return {
      emotion: detectedEmotion,
      confidence,
      quote: this.getRandomItem(config.quotes),
      tip: this.getRandomItem(config.tips)
    };
  }

  static getEmotionConfig(emotion: string): EmotionConfig {
    return emotionConfigs[emotion] || emotionConfigs.neutral;
  }

  private static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}