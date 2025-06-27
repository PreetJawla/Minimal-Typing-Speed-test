import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  duration: number;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, duration, isActive }) => {
  const progress = ((duration - timeLeft) / duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Clock className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
        <span className={`text-2xl font-mono font-bold ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
      
      <div className="flex-1 max-w-xs">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};