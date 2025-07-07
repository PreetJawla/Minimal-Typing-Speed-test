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


export const fetchTypingText = async (): Promise<QuoteResponse> => {
  // Use only local mini-stories for reliable content
  const randomQuote = getRandomFallbackQuote();
  
  return {
    content: randomQuote.content,
    author: randomQuote.author,
    length: randomQuote.length
  };
};
