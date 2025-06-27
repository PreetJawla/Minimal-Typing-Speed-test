import React, { useRef, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface TypingAreaProps {
  text: string;
  userInput: string;
  currentIndex: number;
  onInputChange: (value: string) => void;
  isFinished: boolean;
  capsLockOn: boolean;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  userInput,
  currentIndex,
  onInputChange,
  isFinished,
  capsLockOn
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [isFinished]);

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-lg leading-relaxed ';
      
      if (index < userInput.length) {
        // Character has been typed
        if (userInput[index] === char) {
          className += 'bg-green-200 text-green-800';
        } else {
          className += 'bg-red-200 text-red-800';
        }
      } else if (index === currentIndex) {
        // Current character to type
        className += 'bg-blue-300 text-blue-900 animate-pulse';
      } else {
        // Not yet typed
        className += 'text-gray-600';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="relative">
      {capsLockOn && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-800 font-medium">Caps Lock is ON</span>
        </div>
      )}
      
      <div className="relative bg-white rounded-xl border-2 border-gray-200 focus-within:border-purple-300 shadow-sm">
        <div className="p-6 font-mono text-lg leading-loose overflow-hidden">
          {renderText()}
        </div>
        
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 resize-none cursor-text"
          disabled={isFinished}
          placeholder="Start typing to begin the test..."
          spellCheck={false}
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-500 text-center">
        {isFinished ? 'Test completed!' : 'Click here and start typing to begin'}
      </div>
    </div>
  );
};