import { QuoteResponse } from '../types';

// Fallback quotes in case API fails
const fallbackQuotes = [
  {
    content: "A curious cat named Whiskers found a magical portal under the old oak tree. As it stepped through, the world turned into a vibrant land of yarn and butterflies. Whiskers explored joyfully, chasing dreams in a whimsical world.",
    author: "The Curious Cat",
    length: 174
  },
  {
    content: "Amelia, an adventurous pirate, discovered a map hidden in an ancient scroll. It led her to a hidden island filled with treasures and mysteries. Her heart raced with excitement as she unearthed gems of forgotten legends.",
    author: "The Lost Treasure",
    length: 186
  },
  {
    content: "An old clock in Grandma's attic had the power to take anyone to the past or future. Intrigued, young Timmy set the dials to 2080. He marveled at flying cars and robotic companions, dreaming of adventures yet to come.",
    author: "The Time-Traveling Clock",
    length: 191
  },
  {
    content: "Legend spoke of a forest where trees could whisper ancient secrets. One misty morning, Ella ventured into the woods. The trees whispered tales of forgotten magic and hidden paths leading to realms unseen.",
    author: "The Whispering Woods",
    length: 184
  },
  {
    content: "An artist named Leo discovered a paintbrush that brought his paintings to life. He painted lush gardens and towering castles, each stroke unveiling new adventures in his vivid imagination.",
    author: "The Enchanted Paintbrush",
    length: 172
  },
  {
    content: "In a forgotten corner of the Victorian mansion lay a secret garden. As Emily tended the blooming roses, she unlocked a world of fairies and mystical creatures, where every flower told a story.",
    author: "The Secret Garden",
    length: 172
  }
];

// Helper to get a random fallback quote
function getRandomFallbackQuote() {
  return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
}

// Helper to combine fallback quotes until minimum length is reached
function getLongFallbackContent(minLength = 300) {
  let content = '';
  const usedIndexes = new Set<number>();
  while (content.length < minLength && usedIndexes.size < fallbackQuotes.length) {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * fallbackQuotes.length);
    } while (usedIndexes.has(idx));
    usedIndexes.add(idx);
    content += (content ? ' ' : '') + fallbackQuotes[idx].content;
  }
  return content;
}

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

  // Fallback to local quotes, but ensure minimum length
  const minLength = 300;
  const content = getLongFallbackContent(minLength);
  return {
    content,
    author: 'Various',
    length: content.length
  };
};
