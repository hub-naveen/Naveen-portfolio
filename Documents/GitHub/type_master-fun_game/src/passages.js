const passages = [
    "quick brown fox jumps over lazy dog near sparkling river under bright summer sun today",
    
    "technology helps people communicate and work together in amazing ways around the world",
    
    "reading books expands imagination and knowledge while providing endless hours of fun",
    
    "beautiful garden bloomed with colorful flowers that attracted butterflies and busy bees",
    
    "music has power to heal hearts inspire minds and bring people together across cultures",
    
    "cooking delicious meals brings families together and creates lasting memories at dinner",
    
    "exercise and healthy eating habits help improve physical and mental wellbeing every day",
    
    "traveling to new places opens minds to different cultures and creates fun adventures",
    
    "ocean waves crashed against rocky shore while seagulls soared overhead in blue sky",
    
    "learning new skills throughout life keeps minds sharp and opens doors to opportunities",
    
    "friendship provides support laughter and shared experiences that make life more meaningful",
    
    "morning sunrise painted sky in brilliant shades of orange pink and gold across horizon",
    
    "art allows people to express emotions and thoughts in creative and meaningful ways",
    
    "science continues to unlock mysteries of universe and improve life for all humanity",
    
    "old oak tree stood majestically in meadow with branches reaching toward endless sky",
    
    "education helps people build dreams and create better future for everyone around world",
    
    "gentle rain fell softly on roof creating peaceful symphony that helped everyone sleep",
    
    "innovation drives progress and helps solve complex problems facing global community",
    
    "mountain peak offered breathtaking views of valleys below filled with wildflowers",
    
    "kindness is universal language that transcends barriers and brings light to dark days",
    
    "library was filled with countless stories waiting to transport readers to magical worlds",
    
    "photography captures precious moments in time preserving memories for future generations",
    
    "warm fireplace crackled softly while snow fell gently outside cozy cabin window",
    
    "dreams inspire people to reach beyond limitations and strive for greatness in life",
    
    "bustling marketplace was alive with vendors selling fresh fruits vegetables and crafts",
    
    "adventure awaits those brave enough to step outside comfort zone and explore unknown",
    
    "star filled night sky reminds people of infinite possibilities beyond our world",
    
    "patience helps people navigate life challenges with grace and understanding every day",
    
    "forest path wound through tall trees whose leaves whispered secrets in gentle breeze",
    
    "creativity flourishes when people give themselves permission to think differently",
    
    "lighthouse stood as beacon of hope guiding ships safely through dangerous storms",
    
    "memories are treasures that people carry in hearts bringing comfort during hard times",
    
    "busy bee collected nectar from flowers playing vital role in nature delicate ecosystem",
    
    "perseverance helps people overcome obstacles and achieve ambitious goals in life",
    
    "ancient castle told stories of knights princesses and epic battles from past centuries",
    
    "laughter is medicine for soul bringing joy and healing to people everywhere around",
    
    "peaceful lake reflected surrounding mountains like perfect mirror on calm sunny day",
    
    "growth happens when people embrace challenges as opportunities to become stronger",
    
    "farmer worked tirelessly in fields nurturing crops that would feed families everywhere",
    
    "hope is light that guides people through darkness and gives strength to continue",
    
    "butterfly emerged from cocoon as beautiful symbol of transformation and new beginnings",
    
    "wisdom comes not from age alone but from experiences people gather throughout journey",
    
    "river flowed steadily toward sea carrying with it dreams of distant magical lands",
    
    "courage is not absence of fear but decision to act despite being afraid sometimes",
    
    "garden required daily care and attention but rewarded gardener with abundant harvests",
    
    "time is precious resource so people must use it wisely to create meaningful lives",
    
    "eagle soared high above mountains free and majestic against vast blue summer sky",
    
    "love is force that connects all living things and gives meaning to human existence",
    
    "old wise owl sat quietly in tree observing world with ancient knowledge and wisdom",
    
    "excellence is not destination but journey of continuous improvement and dedication"
];

class PassageGenerator {
    constructor() {
        this.passages = passages;
        this.usedIndices = new Set();
    }
    
    getRandomPassage() {
        // If all passages have been used, reset the used indices
        if (this.usedIndices.size >= this.passages.length) {
            this.usedIndices.clear();
        }
        
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.passages.length);
        } while (this.usedIndices.has(randomIndex));
        
        this.usedIndices.add(randomIndex);
        return this.passages[randomIndex];
    }
    
    // Get passage of specific difficulty based on length and complexity
    getPassageByDifficulty(difficulty) {
        let filteredPassages;
        
        switch (difficulty) {
            case 'easy':
                // Shorter passages with common words
                filteredPassages = this.passages.filter(p => p.length <= 80);
                break;
            case 'medium':
                // Medium length passages
                filteredPassages = this.passages.filter(p => p.length > 80 && p.length <= 120);
                break;
            case 'hard':
                // Longer, more complex passages
                filteredPassages = this.passages.filter(p => p.length > 120);
                break;
            default:
                filteredPassages = this.passages;
        }
        
        if (filteredPassages.length === 0) {
            return this.getRandomPassage();
        }
        
        const randomIndex = Math.floor(Math.random() * filteredPassages.length);
        return filteredPassages[randomIndex];
    }
    
    // Get a custom passage with specific word count
    generateCustomPassage(wordCount = 15) {
        const words = [
            'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'and', 'runs',
            'through', 'forest', 'near', 'river', 'under', 'bright', 'sun', 'while', 'birds',
            'sing', 'beautiful', 'songs', 'in', 'tall', 'trees', 'with', 'green', 'leaves',
            'that', 'dance', 'gentle', 'breeze', 'across', 'peaceful', 'meadow', 'where',
            'flowers', 'bloom', 'colorful', 'garden', 'beside', 'crystal', 'clear', 'water',
            'flowing', 'towards', 'distant', 'mountains', 'covered', 'white', 'snow'
        ];
        
        let passage = '';
        for (let i = 0; i < wordCount; i++) {
            if (i > 0) passage += ' ';
            passage += words[Math.floor(Math.random() * words.length)];
        }
        
        // Capitalize first letter and add period
        return passage.charAt(0).toUpperCase() + passage.slice(1) + '.';
    }
}

// Global passage generator instance
window.passageGenerator = new PassageGenerator();