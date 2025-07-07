import React from 'react';
import { Zap, Target, AlertCircle, Clock } from 'lucide-react';
import { TypingStats } from '../types';

interface StatsProps {
  stats: TypingStats;
  isActive: boolean;
  isFinished: boolean;
}

export const Stats: React.FC<StatsProps> = ({ stats, isActive, isFinished }) => {
  const statItems = [
    {
      icon: Zap,
      label: 'WPM',
      value: stats.wpm,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${stats.accuracy}%`,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: AlertCircle,
      label: 'Mistakes',
      value: stats.mistakes,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Clock,
      label: 'Time',
      value: `${stats.timeElapsed}s`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div 
            key={index}
            className={`${item.bgColor} rounded-xl p-4 transition-all duration-300 ${
              isActive || isFinished ? 'scale-105 shadow-md' : 'shadow-sm'
            } flex flex-col items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${item.color} mb-2`} />
            <p className="text-sm font-medium text-gray-600">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};