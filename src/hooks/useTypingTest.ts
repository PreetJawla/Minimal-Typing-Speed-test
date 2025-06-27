import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingStats } from '../types';

export const useTypingTest = (text: string, duration: number) => {
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [capsLockOn, setCapsLockOn] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  const calculateStats = useCallback((): TypingStats => {
    const correctChars = userInput.split('').filter((char, index) => char === text[index]).length;
    const totalChars = userInput.length;
    const timeElapsed = duration - timeLeft;
    const minutes = timeElapsed / 60;
    
    const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    return {
      wpm,
      accuracy,
      mistakes,
      correctChars,
      totalChars,
      timeElapsed
    };
  }, [userInput, text, timeLeft, duration, mistakes]);

  const startTest = useCallback(() => {
    setIsActive(true);
    setTimeLeft(duration);
    setIsFinished(false);
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration]);

  const resetTest = useCallback(() => {
    setUserInput('');
    setIsActive(false);
    setTimeLeft(duration);
    setIsFinished(false);
    setCurrentIndex(0);
    setMistakes(0);
    setCapsLockOn(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [duration]);

  const handleInput = useCallback((value: string) => {
    if (!isActive && !isFinished) {
      startTest();
    }
    
    if (!isActive || isFinished) return;

    const newIndex = value.length;
    
    // Check for mistakes
    if (value.length > userInput.length) {
      const newChar = value[value.length - 1];
      const expectedChar = text[value.length - 1];
      
      if (newChar !== expectedChar) {
        setMistakes(prev => prev + 1);
      }
    }
    
    setUserInput(value);
    setCurrentIndex(newIndex);
    
    // Check if test is complete
    if (value.length >= text.length) {
      setIsActive(false);
      setIsFinished(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isActive, isFinished, userInput, text, startTest]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Detect caps lock
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleKeyDown]);

  useEffect(() => {
    resetTest();
  }, [text, duration, resetTest]);

  return {
    userInput,
    isActive,
    timeLeft,
    isFinished,
    currentIndex,
    mistakes,
    capsLockOn,
    stats: calculateStats(),
    handleInput,
    resetTest,
    startTest
  };
};