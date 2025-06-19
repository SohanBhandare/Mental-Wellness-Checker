  import React, { useMemo } from 'react';
 // @ts-ignore
import { Bar } from 'react-chartjs-2';

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { MoodEntry } from '../types';
  import { EmotionService } from '../services/emotionService';
  import { TrendingUp, Calendar, ArrowLeft, Trash2 } from 'lucide-react';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  interface MoodHistoryProps {
    moods: MoodEntry[];
    onBack: () => void;
    onClearHistory: () => void;
  }

  export const MoodHistory: React.FC<MoodHistoryProps> = ({ moods, onBack, onClearHistory }) => {
    const chartData = useMemo(() => {
      const emotionCounts: Record<string, number> = {};
      const emotionColors: Record<string, string> = {};

      moods.forEach(mood => {
        emotionCounts[mood.emotion] = (emotionCounts[mood.emotion] || 0) + 1;
        const config = EmotionService.getEmotionConfig(mood.emotion);
        if (config) {
          emotionColors[mood.emotion] = config.color.replace('text-', '').replace('-600', '');
        }
      });

      const emotions = Object.keys(emotionCounts);
      const counts = Object.values(emotionCounts);

      const colorMap: Record<string, string> = {
        'yellow': '#d97706',
        'blue': '#2563eb',
        'purple': '#9333ea',
        'red': '#dc2626',
        'orange': '#ea580c',
        'gray': '#6b7280'
      };

      return {
        labels: emotions.map(e => e.charAt(0).toUpperCase() + e.slice(1)),
        datasets: [
          {
            label: 'Mood Frequency',
            data: counts,
            backgroundColor: emotions.map(emotion => {
              const colorKey = emotionColors[emotion];
              return colorMap[colorKey] || colorMap.gray;
            }),
            borderColor: emotions.map(emotion => {
              const colorKey = emotionColors[emotion];
              return colorMap[colorKey] || colorMap.gray;
            }),
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      };
    }, [moods]);

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Your Mood Distribution',
          font: {
            size: 18,
            weight: 'bold' as const,
          },
          color: '#374151',
        },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          borderColor: '#6b7280',
          borderWidth: 1,
          cornerRadius: 8,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: '#6b7280',
          },
          grid: {
            color: '#e5e7eb',
          },
        },
        x: {
          ticks: {
            color: '#6b7280',
          },
          grid: {
            display: false,
          },
        },
      },
    };

    const recentMoods = moods.slice(0, 5);

    return (
      <div className="w-full max-w-4xl mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Check-in
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-500" />
            Mood History
          </h1>
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
            disabled={moods.length === 0}
          >
            <Trash2 className="w-5 h-5" />
            Clear History
          </button>
        </div>

        {moods.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No mood entries yet</h3>
            <p className="text-gray-400">Start tracking your mental wellness by checking in with your feelings!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Check-ins</h3>
              <div className="space-y-4">
                {recentMoods.map((mood, index) => {
                  const config = EmotionService.getEmotionConfig(mood.emotion);
                  return (
                    <div
                      key={mood.id}
                      className={`${config?.bgColor || 'bg-gray-200'} border border-opacity-20 rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{config?.icon || '😊'}</span>
                          <span className={`font-semibold capitalize ${config?.color || 'text-gray-600'}`}>
                            {mood.emotion}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {mood.timestamp.toLocaleDateString()} at {mood.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {mood.text.length > 100 ? `${mood.text.substring(0, 100)}...` : mood.text}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {moods.length > 5 && (
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-500">
                    Showing {recentMoods.length} of {moods.length} total entries
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
