import React from 'react';
import { EmotionAnalysis } from '../types';
import { EmotionService } from '../services/emotionService';
import { Heart, Quote, Lightbulb, BarChart3 } from 'lucide-react';

interface MoodResultProps {
  analysis: EmotionAnalysis;
  onViewHistory: () => void;
}

export const MoodResult: React.FC<MoodResultProps> = ({ analysis, onViewHistory }) => {
  const config = EmotionService.getEmotionConfig(analysis.emotion);
  const confidencePercentage = Math.round(analysis.confidence * 100);

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <div className={`${config.bgColor} border-2 border-opacity-20 rounded-2xl p-6 shadow-lg`}>
        {/* Emotion Detection Result */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{config.icon}</div>
          <h2 className={`text-2xl font-bold ${config.color} capitalize mb-2`}>
            {analysis.emotion}
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="w-4 h-4" />
            <span className="text-sm">
              {confidencePercentage}% confidence
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${confidencePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mb-6 p-4 bg-white bg-opacity-50 rounded-xl">
          <div className="flex items-start gap-3">
            <Quote className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 italic font-medium leading-relaxed">
                "{analysis.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* Self-Care Tip */}
        <div className="mb-6 p-4 bg-white bg-opacity-50 rounded-xl">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Self-Care Tip:</h3>
              <p className="text-gray-700 leading-relaxed">
                {analysis.tip}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onViewHistory}
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
          >
            <BarChart3 className="w-5 h-5" />
            View Mood History
          </button>
        </div>
      </div>
    </div>
  );
};