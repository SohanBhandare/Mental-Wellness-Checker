export interface MoodEntry {
  id: string;
  text: string;
  emotion: string;
  confidence: number;
  timestamp: Date;
  quote: string;
  tip: string;
}

export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  quote: string;
  tip: string;
}

export interface EmotionConfig {
  color: string;
  bgColor: string;
  icon: string;
  quotes: string[];
  tips: string[];
}