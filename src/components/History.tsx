import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { History as HistoryIcon, TrendingUp, Award, Trash2 } from 'lucide-react';
import { TypingResult } from '../types';
import { getResults, clearResults, getAverageWPM, getBestWPM } from '../utils/storage';

export const History: React.FC = () => {
  const [results, setResults] = useState<TypingResult[]>(getResults());
  const [showChart, setShowChart] = useState(false);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all typing history?')) {
      clearResults();
      setResults([]);
    }
  };

  const chartData = results.slice(0, 10).reverse().map((result, index) => ({
    test: index + 1,
    wpm: result.wpm,
    accuracy: result.accuracy,
    date: new Date(result.date).toLocaleDateString()
  }));

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <HistoryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No typing history yet</h3>
        <p className="text-gray-500">Complete some typing tests to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <HistoryIcon className="w-6 h-6 text-purple-600" />
          <span>Typing History</span>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowChart(!showChart)}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
          >
            {showChart ? 'Show List' : 'Show Chart'}
          </button>
          <button
            onClick={handleClearHistory}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-700">Average WPM</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{getAverageWPM()}</div>
        </div>
        
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700">Best WPM</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{getBestWPM()}</div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <HistoryIcon className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-700">Tests Taken</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{results.length}</div>
        </div>
      </div>

      {showChart ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value}${name === 'accuracy' ? '%' : ''}`,
                  name === 'wpm' ? 'WPM' : 'Accuracy'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="wpm" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {results.slice(0, 10).map((result) => (
            <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {new Date(result.date).toLocaleDateString()}
                </div>
                <div className="font-medium text-gray-800">
                  {result.wpm} WPM
                </div>
                <div className="text-sm text-green-600">
                  {result.accuracy}% accuracy
                </div>
                <div className="text-sm text-red-600">
                  {result.mistakes} mistakes
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {result.duration}s
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};