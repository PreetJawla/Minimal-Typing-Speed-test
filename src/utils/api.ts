import { QuoteResponse } from '../types';

// Fallback quotes in case API fails
const fallbackQuotes = [
  {
    content: "A curious cat named Whiskers found a magical portal under the old oak tree in her grandmother's backyard. As she stepped through the shimmering gateway, the world transformed into a vibrant land of endless yarn balls and rainbow butterflies. Whiskers explored this whimsical realm joyfully, chasing dreams that materialized as golden threads in the air. She met other magical creatures who taught her the ancient art of dream weaving, where thoughts became reality with a simple purr. Through her adventures, Whiskers discovered that courage and curiosity were the keys to unlocking any door, whether magical or mundane. When she finally returned home, she carried with her the wisdom that every ordinary moment holds extraordinary possibilities for those brave enough to seek them.",
    author: "The Curious Cat",
    length: 683
  },
  {
    content: "Captain Amelia Blackwater, the most adventurous pirate of the seven seas, discovered an ancient map hidden within the binding of a mysterious scroll she had acquired from a traveling merchant. The parchment revealed the location of a legendary island that appeared only during the rarest of celestial alignments. After months of preparation and gathering a loyal crew, Amelia set sail on her ship, The Crimson Dawn. The journey was treacherous, filled with storms that tested their resolve and sea creatures that challenged their courage. When they finally reached the hidden island, they found not just gold and jewels, but ancient artifacts that held the power to control the winds and tides. However, Amelia realized that the greatest treasure was not the riches they discovered, but the unbreakable bonds of friendship forged during their perilous adventure. She decided to share the treasure equally among her crew, knowing that true wealth comes from the hearts of those who stand beside you in times of both triumph and adversity.",
    author: "The Lost Treasure",
    length: 943
  },
  {
    content: "In the dusty attic of his grandmother's Victorian house, young Timothy Chen discovered an ornate grandfather clock that possessed the extraordinary power to transport anyone through time. The clock's brass pendulum glowed with an ethereal light, and its hands could be set to any date in history or future. Intrigued by the possibilities, Timmy carefully adjusted the dials to the year 2080, his heart pounding with anticipation. As the clock chimed midnight, he was whisked away to a breathtaking future where flying cars painted trails of light across neon-lit skies and robotic companions helped humans with daily tasks. He witnessed floating cities among the clouds, underwater metropolises teeming with marine life, and vast gardens that grew in zero gravity. The people of 2080 lived in harmony with nature and technology, having learned to balance progress with environmental stewardship. During his stay, Timmy learned valuable lessons about innovation, sustainability, and the importance of preserving the planet for future generations. When he returned to his own time, he was filled with hope and determination to help create the beautiful future he had witnessed.",
    author: "The Time-Traveling Clock",
    length: 1037
  },
  {
    content: "Ancient legend spoke of an enchanted forest where the trees possessed the ability to whisper secrets of ages past to those pure of heart. One crisp autumn morning, when mist clung to the forest floor like silver veils, young Ella Brightwood ventured into these mystical woods with nothing but her grandmother's compass and an insatiable curiosity. As she walked deeper into the forest, the massive oak and cedar trees began to share their ancient wisdom through gentle rustling sounds that formed words only she could understand. They told her tales of forgotten civilizations, of brave knights and wise queens, of magical creatures that once roamed freely through these very paths. The trees revealed hidden passages that led to crystalline caves filled with luminescent minerals, secret clearings where unicorns once grazed, and babbling brooks that sang lullabies to forest spirits. Each tree she encountered had its own personality and story to tell, from the youngest saplings sharing innocent dreams to the eldest giants recounting centuries of history. Through these mystical conversations, Ella learned that the forest was not just a collection of trees, but a living library of natural wisdom, teaching her about the interconnectedness of all living things and the importance of listening to the quiet voices of nature that surround us every day.",
    author: "The Whispering Woods",
    length: 1141
  },
  {
    content: "Leonardo Artisan, a struggling artist living in a small studio apartment above an old bookshop, discovered a peculiar paintbrush at an antique market that would forever change his understanding of art and reality. The brush, crafted from phoenix feathers and bound with threads of starlight, possessed the magical ability to bring any painting to life with a single stroke. When Leo first tested the brush by painting a simple butterfly, he watched in amazement as the creature fluttered off the canvas and danced around his studio before settling on his windowsill. Emboldened by this miracle, he began creating increasingly elaborate scenes: lush tropical gardens that filled his room with the scent of jasmine, majestic castles whose towers seemed to pierce the ceiling, and fantastic creatures that would emerge from their painted worlds to become his companions. With each masterpiece, Leo discovered that his imagination had no limits, and his tiny studio transformed into a gateway to infinite realms of possibility. He painted flowing rivers that provided fresh water, fruit trees that bore real sustenance, and cozy fireplaces that warmed his home during cold winter nights. However, Leo soon learned that with great power comes great responsibility, as he realized that every creation required a piece of his own life force to maintain. Rather than abandon his gift, he chose to use it wisely, creating art that brought joy and wonder to others while teaching him the profound lesson that true magic lies not in the power to create, but in the wisdom to create with purpose and love.",
    author: "The Enchanted Paintbrush",
    length: 1378
  },
  {
    content: "Hidden behind a tangle of ivy and forgotten by time, in the most secluded corner of the grand Victorian Ashworth Manor, lay a secret garden that held mysteries beyond imagination. Young Emily Rosewood, the manor's newest caretaker, discovered this magical sanctuary while following a trail of luminescent flower petals that appeared only in the moonlight. As she pushed through the heavy wooden door, overgrown with climbing roses that seemed to part at her touch, Emily entered a world where reality blended seamlessly with enchantment. The garden was alive with creatures of myth and legend: delicate fairies with wings like stained glass windows tended to flowers that chimed like bells in the gentle breeze, wise old gnomes carved intricate patterns in the bark of ancient trees, and graceful unicorns grazed peacefully beside a crystal-clear pond that reflected not the sky above, but distant galaxies filled with swirling stars. Every flower in this mystical garden had its own voice and story to tell, from the shy violets who whispered secrets of the earth to the proud sunflowers who sang ballads of the sun's daily journey across the heavens. As Emily spent her days caring for this magical realm, she learned that she had inherited not just a garden, but a sacred trust to protect the bridge between the human world and the realm of magic. Through her gentle stewardship, she discovered that the garden thrived on love, kindness, and the belief that magic exists in every act of nurturing and care. The experience taught her that we all have the power to create our own secret gardens of wonder, whether in our backyards, our hearts, or in the lives of those we touch with compassion.",
    author: "The Secret Garden",
    length: 1449
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
