import React from 'react';
import { Trophy, RotateCcw, Download } from 'lucide-react';
import { TypingStats } from '../types';

interface ResultsProps {
  stats: TypingStats;
  onRestart: () => void;
  onNewText: () => void;
}

export const Results: React.FC<ResultsProps> = ({ stats, onRestart, onNewText }) => {
  const getPerformanceMessage = (wpm: number) => {
    if (wpm >= 60) return { message: "Excellent! You're a typing master!", color: "text-green-600" };
    if (wpm >= 40) return { message: "Great job! Your typing is above average.", color: "text-blue-600" };
    if (wpm >= 25) return { message: "Good work! Keep practicing to improve.", color: "text-yellow-600" };
    return { message: "Nice start! Practice makes perfect.", color: "text-gray-600" };
  };

  const performance = getPerformanceMessage(stats.wpm);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="mb-6">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Complete!</h2>
        <p className={`text-lg ${performance.color} font-medium`}>
          {performance.message}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-50 rounded-xl p-6">
          <div className="text-4xl font-bold text-purple-600 mb-2">{stats.wpm}</div>
          <div className="text-purple-700 font-medium">Words Per Minute</div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6">
          <div className="text-4xl font-bold text-green-600 mb-2">{stats.accuracy}%</div>
          <div className="text-green-700 font-medium">Accuracy</div>
        </div>
        
        <div className="bg-red-50 rounded-xl p-6">
          <div className="text-4xl font-bold text-red-600 mb-2">{stats.mistakes}</div>
          <div className="text-red-700 font-medium">Mistakes</div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">{stats.correctChars}</div>
          <div className="text-blue-700 font-medium">Correct Characters</div>
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          onClick={onRestart}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Try Again</span>
        </button>
        
        <button
          onClick={onNewText}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="w-5 h-5" />
          <span>New Text</span>
        </button>
      </div>
    </div>
  );
};