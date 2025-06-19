import { MoodEntry } from '../types';

export class StorageService {
  private static STORAGE_KEY = 'mental_wellness_moods';

  static saveMood(entry: MoodEntry): void {
    const moods = this.getAllMoods();
    moods.unshift(entry); // Add to beginning
    
    // Keep only the last 50 entries
    const trimmedMoods = moods.slice(0, 50);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedMoods));
  }

  static getAllMoods(): MoodEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const moods = JSON.parse(stored);
      return moods.map((mood: any) => ({
        ...mood,
        timestamp: new Date(mood.timestamp)
      }));
    } catch (error) {
      console.error('Error loading moods from storage:', error);
      return [];
    }
  }

  static getRecentMoods(count: number = 5): MoodEntry[] {
    return this.getAllMoods().slice(0, count);
  }

  static clearAllMoods(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getMoodStats(): Record<string, number> {
    const moods = this.getAllMoods();
    const stats: Record<string, number> = {};
    
    moods.forEach(mood => {
      stats[mood.emotion] = (stats[mood.emotion] || 0) + 1;
    });
    
    return stats;
  }
}