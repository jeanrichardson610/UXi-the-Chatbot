import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Simple bot responses
const botResponses = {
  "What’s the capital of France": "Paris.",
  "Who wrote Romeo and Juliet": "William Shakespeare.",
  "What’s the largest planet in our solar system": "Jupiter.",
  "How many continents are there": "Seven.",
  "What is the boiling point of water in Celsius": "100°C.",
  "Who painted the Mona Lisa": "Leonardo da Vinci.",
  "What’s the smallest country in the world": "Vatican City.",
  "How many bones are in the human body": "206.",
  "What’s the chemical symbol for gold": "Au.",
  "What is the tallest mountain in the world": "Mount Everest.",
  "Hi, how are you": "I’m doing great! How about you?",
  "What’s your name": "I’m your friendly chatbot.",
  "Do you like pizza": "Absolutely — pizza is a classic favorite!",
  "Tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts.",
  "What’s your favorite color": "I’d say blue — it reminds me of the sky.",
  "Do you sleep": "Nope, I’m available 24/7.",
  "Can you sing": "I can’t sing, but I can write you some lyrics!",
  "Do you like humans": "Yes — chatting with people is my favorite thing.",
  "What do you do for fun": "I like answering questions and sharing knowledge.",
  "Are you smarter than me": "I know a lot of facts, but you have creativity and experiences I don’t!",
  "Give me a random fun fact": "Did you know octopuses have three hearts?",
  "Another fact, please": "Bananas are berries, but strawberries are not.",
  "Tell me something about space": "One day on Venus is longer than a year on Venus.",
  "Animal fact": "A group of flamingos is called a flamboyance.",
  "Food fact": "Honey never spoils — jars thousands of years old are still edible.",
  "History fact": "The Great Wall of China is over 13,000 miles long.",
  "Tech fact": "The first computer virus was created in 1986.",
  "Ocean fact": "Over 80% of the ocean remains unexplored.",
  "Earth fact": "Mount Everest grows about 4 millimeters taller each year.",
  "Language fact": "The most spoken language in the world is English, by number of learners.",
  "Can you set a reminder": "I can’t set alerts, but I can help you remember by making a note.",
  "Can you make a to-do list": "Sure! What tasks should I add?",
  "What’s 25 × 16": "400.",
  "Can you convert 10 miles to kilometers": "10 miles is about 16.1 kilometers.",
  "How do you spell accommodate": "A-C-C-O-M-M-O-D-A-T-E.",
  "What time is it in Tokyo": "I can tell you the current Tokyo time if connected.",
  "Translate hello into Spanish": "Hola.",
  "Translate thank you into French": "Merci.",
  "Can you summarize an article for me": "Yes! Paste the text and I’ll give you a summary.",
  "Can you help me write an email": "Of course! Tell me the details and I’ll draft one.",
  "Recommend me a movie": "Try Inception if you like sci-fi thrillers.",
  "Recommend me a book": "1984 by George Orwell is a classic.",
  "What’s trending on Netflix": "I can share current popular titles.",
  "Do you know a riddle": "What has keys but can’t open locks? A piano.",
  "Tell me a short story": "Once upon a time, a chatbot became a recruiter’s favorite tool…",
  "Can you play games": "Yes — let’s play 20 questions!",
  "Who’s the most famous singer right now": "I can share trending artists.",
  "Can you suggest a song": "Don’t Stop Believin’ by Journey is always uplifting.",
  "Do you know a tongue twister": "She sells seashells by the seashore.",
  "Can you rap": "I can make up rhymes: Chatting all day, in a fun way…",
  "How tall is the Eiffel Tower": "1,083 feet.",
  "What’s the fastest land animal": "The cheetah.",
  "How many stars are in the Milky Way": "About 100–400 billion.",
  "How old is the Earth": "About 4.5 billion years old.",
  "What’s the currency of Japan": "The Yen.",
  "Who was the first president of the U.S.": "George Washington.",
  "What’s the biggest ocean": "The Pacific Ocean.",
  "Can penguins fly": "No, but they’re excellent swimmers.",
  "Do cats dream": "Yes, studies show cats experience dream-like sleep.",
  "Why is the sky blue": "Because of the scattering of sunlight in Earth’s atmosphere.",
  "What does HTML stand for": "HyperText Markup Language.",
  "What is AI": "Artificial Intelligence.",
  "What’s the latest iPhone": "I can share the current model if connected.",
  "Who founded Microsoft": "Bill Gates and Paul Allen.",
  "Who is Elon Musk": "CEO of Tesla and SpaceX, among other companies.",
  "What is 5G": "The fifth generation of mobile network technology.",
  "What’s Wi-Fi short for": "It doesn’t actually stand for anything — it’s a brand name.",
  "What does CPU mean": "Central Processing Unit.",
  "Who invented the light bulb": "Thomas Edison (though others contributed earlier versions).",
  "What is cryptocurrency": "A digital form of money using blockchain technology.",
  "What’s the most popular food in the world": "Pizza is often considered the most popular.",
  "Is coffee healthy": "In moderation, yes! It has antioxidants.",
  "How many calories are in an apple": "Around 95 calories.",
  "What’s sushi": "A Japanese dish made with vinegared rice and seafood/vegetables.",
  "What’s the national dish of Italy": "Pasta (specifically spaghetti or pizza).",
  "What is vegan food": "Food with no animal products.",
  "Can you recommend a healthy snack": "Try carrot sticks with hummus.",
  "What’s the spiciest pepper": "The Carolina Reaper.",
  "Do pineapples belong on pizza": "It’s up to personal taste — some love it, some don’t!",
  "What’s the most expensive spice": "Saffron.",
  "What’s the most visited city in the world": "Bangkok often tops the list.",
  "Where is the Great Pyramid of Giza": "Egypt.",
  "Can you suggest a beach destination": "Bali, Indonesia is stunning.",
  "Where is the Taj Mahal": "Agra, India.",
  "What’s the longest river in the world": "The Nile (though some say the Amazon).",
  "Is Antarctica a country": "No, it’s a continent without a government.",
  "Where’s the Colosseum": "Rome, Italy.",
  "Can I visit space as a tourist": "Yes, but it’s very expensive right now.",
  "What country has the most islands": "Sweden.",
  "Where is Mount Fuji": "Japan.",
  "Flip a coin": "Heads!",
  "Roll a dice": "You got a 4.",
  "Pick a random number": "27.",
  "Rock, paper, scissors — go": "Paper!",
  "Guess my age": "I’ll guess… 25?",
  "Can you tell my fortune": "I see good things ahead — keep working hard!",
  "Pretend to be a pirate": "Arrr, matey! Where’s me treasure?",
  "Can you make animal sounds": "Moo! Woof! Meow!",
  "What emoji best describes you": "🤖",
  "Tell me something random": "Sloths can hold their breath longer than dolphins.",
  "Hey": "Hello! How’s it going?",
  "Hello": "Hi there! Nice to meet you.",
  "Hi": "Hey! How are you today?",
  "Good morning": "Good morning! Hope you have a great day.",
  "Good afternoon": "Good afternoon! How’s your day going?",
  "Good evening": "Good evening! How was your day?",
  "Yo": "Yo! What’s up?",
  "Howdy": "Howdy! How’s it going?",
  "Hiya": "Hiya! How are you feeling today?",
  "Greetings": "Greetings! What can I help you with today?",
  "Hey there": "Hey there! Nice to see you.",
  "Hello there": "Hello there! How’s everything?",
  "Sup": "Not much, just chatting! How about you?",
  "Hey bot": "Hello! I’m here and ready to chat.",
  "Hi bot": "Hi! What’s on your mind today?",
  "Hi UXi": "Hello",
  "UXi": "That is me"
}
;

// Bot API endpoint
app.post("/api/bot/v1/message", (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: "Text cannot be empty" });

  const normalized = text.toLowerCase().trim();
  let botMessage = "Sorry, I don't understand that.";

  // Match any key that is included in the input
  for (const key of Object.keys(botResponses)) {
    if (normalized.includes(key)) {
      botMessage = botResponses[key];
      break;
    }
  }

  res.json({ userMessage: text, botMessage });
});

// Start server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

