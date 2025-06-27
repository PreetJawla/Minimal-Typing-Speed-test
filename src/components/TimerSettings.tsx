import React from 'react';
import { Settings } from 'lucide-react';

interface TimerSettingsProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  disabled: boolean;
}

export const TimerSettings: React.FC<TimerSettingsProps> = ({
  duration,
  onDurationChange,
  disabled
}) => {
  const durations = [30, 60, 120];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Duration:</span>
      </div>
      
      <div className="flex space-x-2">
        {durations.map((dur) => (
          <button
            key={dur}
            onClick={() => onDurationChange(dur)}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              duration === dur
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {dur}s
          </button>
        ))}
      </div>
    </div>
  );
};