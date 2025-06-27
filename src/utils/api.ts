import { QuoteResponse } from '../types';

// Fallback quotes in case API fails
const fallbackQuotes = [
  {
    content: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once, making it perfect for typing practice. It has been used for decades to test typewriters and keyboards.",
    author: "Traditional Pangram",
    length: 200
  },
  {
    content: "Success is not final, failure is not fatal, it is the courage to continue that counts. In the midst of winter, I found there was, within me, an invincible summer. The only way to do great work is to love what you do.",
    author: "Inspirational Collection",
    length: 210
  },
  {
    content: "Technology is best when it brings people together. The future belongs to those who believe in the beauty of their dreams. Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.",
    author: "Tech Wisdom",
    length: 195
  },
  {
    content: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Life is what happens to you while you're busy making other plans. The journey of a thousand miles begins with one step.",
    author: "Life Philosophy",
    length: 220
  },
  {
    content: "Programming is not about what you know; it's about what you can figure out. Code is like humor. When you have to explain it, it's bad. The best error message is the one that never shows up. Simplicity is the ultimate sophistication.",
    author: "Programming Wisdom",
    length: 225
  }
];

export const fetchTypingText = async (): Promise<QuoteResponse> => {
  try {
    // Try to fetch from Quotable API first
    const response = await fetch('https://api.quotable.io/quotes/random?minLength=150&maxLength=300&limit=1');
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const quote = data[0];
      
      // Extend the quote to ensure we have enough content
      let extendedContent = quote.content;
      
      // If the quote is too short, fetch another one and combine
      if (extendedContent.length < 200) {
        try {
          const secondResponse = await fetch('https://api.quotable.io/quotes/random?minLength=100&limit=1');
          if (secondResponse.ok) {
            const secondData = await secondResponse.json();
            if (secondData && secondData.length > 0) {
              extendedContent += ' ' + secondData[0].content;
            }
          }
        } catch {
          // If second fetch fails, use fallback
          extendedContent += ' ' + fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)].content;
        }
      }
      
      return {
        content: extendedContent,
        author: quote.author || 'Unknown',
        length: extendedContent.length
      };
    }
  } catch (error) {
    console.warn('Failed to fetch from API, using fallback quotes:', error);
  }
  
  // Fallback to local quotes
  const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  return randomQuote;
};