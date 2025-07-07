import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { TypingArea } from './components/TypingArea';
import { Stats } from './components/Stats';
import { TimerSettings } from './components/TimerSettings';
import { Results } from './components/Results';
import { History } from './components/History';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useTypingTest } from './hooks/useTypingTest';
import { fetchTypingText } from './utils/api';
import { saveResult } from './utils/storage';
import { QuoteResponse, TypingResult } from './types';
import { RefreshCw, BarChart3 } from 'lucide-react';

function App() {
  const [currentText, setCurrentText] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [duration, setDuration] = useState(60);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const {
    userInput,
    isActive,
    timeLeft,
    isFinished,
    currentIndex,
    mistakes,
    capsLockOn,
    stats,
    handleInput,
    resetTest,
    startTest
  } = useTypingTest(currentText, duration);

  const loadNewText = async () => {
    setIsLoading(true);
    try {
      const quote: QuoteResponse = await fetchTypingText();
      setCurrentText(quote.content);
      setCurrentAuthor(quote.author);
    } catch (error) {
      console.error('Failed to load text:', error);
      // Fallback text
      setCurrentText("The quick brown fox jumps over the lazy dog. This sentence is perfect for typing practice as it contains every letter of the alphabet.");
      setCurrentAuthor("Traditional Pangram");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewText();
  }, []);

  useEffect(() => {
    if (isFinished && stats.timeElapsed > 0) {
      const result: TypingResult = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        mistakes: stats.mistakes,
        duration: duration,
        text: currentText.substring(0, 50) + '...'
      };
      saveResult(result);
    }
  }, [isFinished]); // Only depend on isFinished to prevent multiple saves

  const handleRestart = () => {
    resetTest();
  };

  const handleNewText = () => {
    loadNewText();
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Test Your Typing Speed
          </h2>
          <p className="text-gray-600">
            Improve your typing skills with real-time feedback and progress tracking
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <Timer timeLeft={timeLeft} duration={duration} isActive={isActive} />
            
            <div className="flex items-center space-x-4">
              <TimerSettings
                duration={duration}
                onDurationChange={handleDurationChange}
                disabled={isActive || isFinished}
              />
              
              <button
                onClick={handleNewText}
                disabled={isActive}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Text</span>
              </button>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {showHistory ? 'Hide History' : 'Show History'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Text Source */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Source:</span> {currentAuthor}
              </p>
            </div>

            {/* Typing Area */}
            <TypingArea
              text={currentText}
              userInput={userInput}
              currentIndex={currentIndex}
              onInputChange={handleInput}
              isFinished={isFinished}
              capsLockOn={capsLockOn}
            />

            {/* Results */}
            {isFinished && (
              <Results
                stats={stats}
                onRestart={handleRestart}
                onNewText={handleNewText}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Stats stats={stats} isActive={isActive} isFinished={isFinished} />
            
            {showHistory && <History />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;