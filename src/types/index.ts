export interface TypingResult {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  mistakes: number;
  duration: number;
  text: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  mistakes: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

export interface QuoteResponse {
  content: string;
  author: string;
  length: number;
}