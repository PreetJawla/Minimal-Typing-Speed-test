import { TypingResult } from '../types';

const STORAGE_KEY = 'typing-test-history';

export const saveResult = (result: TypingResult): void => {
  const existingResults = getResults();
  const updatedResults = [result, ...existingResults];
  
  // Keep only the last 50 results to prevent storage bloat
  const trimmedResults = updatedResults.slice(0, 50);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedResults));
};

export const getResults = (): TypingResult[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearResults = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getAverageWPM = (): number => {
  const results = getResults();
  if (results.length === 0) return 0;
  
  const totalWPM = results.reduce((sum, result) => sum + result.wpm, 0);
  return Math.round(totalWPM / results.length);
};

export const getBestWPM = (): number => {
  const results = getResults();
  if (results.length === 0) return 0;
  
  return Math.max(...results.map(result => result.wpm));
};

