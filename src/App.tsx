import React, { useState, useEffect } from 'react';
import { Brain, Heart } from 'lucide-react';
import { MoodInput } from './components/MoodInput';
import { MoodResult } from './components/MoodResult';
import { MoodHistory } from './components/MoodHistory';
import { EmotionService } from './services/emotionService';
import { StorageService } from './services/storageService';
import { MoodEntry, EmotionAnalysis } from './types';

type AppState = 'input' | 'result' | 'history';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<EmotionAnalysis | null>(null);
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    // Load mood history on app start
    setMoods(StorageService.getAllMoods());
  }, []);

  const handleMoodSubmit = async (text: string) => {
    setIsLoading(true);
    
    // Simulate API call delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = EmotionService.analyzeEmotion(text);
    
    // Create mood entry
    const moodEntry: MoodEntry = {
      id: Date.now().toString(),
      text,
      emotion: analysis.emotion,
      confidence: analysis.confidence,
      timestamp: new Date(),
      quote: analysis.quote,
      tip: analysis.tip
    };
    
    // Save to storage
    StorageService.saveMood(moodEntry);
    
    // Update state
    setCurrentAnalysis(analysis);
    setMoods(StorageService.getAllMoods());
    setCurrentState('result');
    setIsLoading(false);
  };

  const handleViewHistory = () => {
    setCurrentState('history');
  };

  const handleBackToInput = () => {
    setCurrentState('input');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all mood history? This action cannot be undone.')) {
      StorageService.clearAllMoods();
      setMoods([]);
    }
  };

  const handleNewCheckIn = () => {
    setCurrentState('input');
    setCurrentAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Mental Wellness Checker</h1>
                <p className="text-gray-600 text-sm">Track and understand your emotional well-being</p>
              </div>
            </div>
            
            {currentState !== 'input' && (
              <button
                onClick={handleNewCheckIn}
                className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Heart className="w-4 h-4" />
                New Check-in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentState === 'input' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">How are you feeling today?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Share your thoughts and emotions. Our AI will help you understand your mental state and provide personalized wellness tips.
              </p>
            </div>
            
            {/* Mood Input */}
            <MoodInput onSubmit={handleMoodSubmit} isLoading={isLoading} />
            
            {/* Stats Preview */}
            {moods.length > 0 && (
              <div className="text-center pt-8">
                <button
                  onClick={handleViewHistory}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  View your mood history ({moods.length} entries)
                </button>
              </div>
            )}
          </div>
        )}

        {currentState === 'result' && currentAnalysis && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Mood Analysis</h2>
               <p className="text-gray-600">Here's what we found about your emotional state</p>
            </div>
            <MoodResult 
              analysis={currentAnalysis} 
              onViewHistory={handleViewHistory}
            />
          </div>
        )}

        {currentState === 'history' && (
          <MoodHistory 
            moods={moods} 
            onBack={handleBackToInput}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            Remember: This tool is for wellness tracking and not a substitute for professional mental health care.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            If you're experiencing serious mental health concerns, please reach out to a qualified professional.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;