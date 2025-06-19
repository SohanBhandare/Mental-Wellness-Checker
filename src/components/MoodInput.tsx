import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const MoodInput: React.FC<MoodInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today? Share your thoughts, emotions, or what's on your mind..."
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {text.length}/500
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:from-primary-600 hover:to-primary-700 focus:ring-2 focus:ring-primary-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing your feelings...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Analyze My Mood
            </>
          )}
        </button>
      </form>
    </div>
  );
};