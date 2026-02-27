import match1 from "@/assets/match-1.jpg";
import match2 from "@/assets/match-2.jpg";
import match3 from "@/assets/match-3.jpg";
import match4 from "@/assets/match-4.jpg";
import match5 from "@/assets/match-5.jpg";
import match6 from "@/assets/match-6.jpg";

export interface MatchProfile {
  id: string;
  image: string;
  name: string;
  score: string;
  role: string;
  location: string;
  age: string;
  bio: string;
  interests: string[];
}

export interface ConversationThread {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

export const matchProfiles: MatchProfile[] = [
  { id: "elara", image: match1, name: "Elara Voss", score: "97.2%", role: "Designer", location: "Munich, DE", age: "26", bio: "Pixel-perfect interfaces and systems thinking. I believe constraints breed creativity.", interests: ["UI Design", "Brutalism", "Typography", "Figma"] },
  { id: "marcus", image: match2, name: "Marcus Chen", score: "94.8%", role: "Engineer", location: "Zurich, CH", age: "31", bio: "Backend architect turned full-stack. I optimize systems for clarity and performance.", interests: ["Distributed Systems", "Rust", "Architecture", "Databases"] },
  { id: "aria", image: match3, name: "Aria Novak", score: "93.1%", role: "Researcher", location: "Vienna, AT", age: "24", bio: "Exploring the intersection of cognitive science and interface design.", interests: ["HCI", "Cognitive Science", "Minimalism", "Data Viz"] },
  { id: "kai", image: match4, name: "Kai Brennan", score: "91.7%", role: "Strategist", location: "Amsterdam, NL", age: "29", bio: "Building frameworks for complex decision-making in uncertain environments.", interests: ["Strategy", "Game Theory", "Systems", "Philosophy"] },
  { id: "vera", image: match5, name: "Vera Tanaka", score: "89.3%", role: "Architect", location: "Tokyo, JP", age: "27", bio: "Physical and digital architecture — spaces that shape behavior.", interests: ["Architecture", "Spatial Design", "Monochrome", "Concrete"] },
  { id: "leo", image: match6, name: "Leo Strand", score: "87.6%", role: "Developer", location: "Stockholm, SE", age: "25", bio: "Terminal enthusiast. I write code that reads like prose.", interests: ["TypeScript", "CLI Tools", "Open Source", "Terminal"] },
  { id: "sable", image: match3, name: "Sable Morin", score: "85.4%", role: "Artist", location: "Paris, FR", age: "28", bio: "Generative art and computational aesthetics.", interests: ["Generative Art", "P5.js", "Monochrome", "Exhibitions"] },
  { id: "reed", image: match2, name: "Reed Calloway", score: "83.9%", role: "Analyst", location: "London, UK", age: "32", bio: "Data narratives and quantitative storytelling.", interests: ["Data Science", "Visualization", "Statistics", "Writing"] },
  { id: "ash", image: match4, name: "Ash Delacroix", score: "82.1%", role: "Designer", location: "Brussels, BE", age: "30", bio: "Dark interfaces and moody aesthetics. Every pixel has purpose.", interests: ["Dark UI", "Brutalism", "Motion", "3D"] },
];

export const conversationThreads: ConversationThread[] = [
  {
    id: "elara",
    avatar: match1,
    name: "Elara Voss",
    lastMessage: "I was thinking about that design system you mentioned — have you tried using a 4px base grid?",
    time: "3m ago",
    messages: [
      { id: "1", sender: "them", text: "Hey, I saw your profile. Love the brutalist aesthetic.", time: "2h ago" },
      { id: "2", sender: "me", text: "Thanks — I've been refining the design system for months. Everything runs on a 4px grid.", time: "1h 55m ago" },
      { id: "3", sender: "them", text: "That's exactly the kind of precision I respect. What fonts are you using?", time: "1h 50m ago" },
      { id: "4", sender: "me", text: "Inter for everything. Weight 900 for headers, 300 for body. JetBrains Mono for metadata.", time: "1h 45m ago" },
      { id: "5", sender: "them", text: "Clean. I've been experimenting with a similar approach for a client project.", time: "1h 30m ago" },
      { id: "6", sender: "me", text: "Show me when it's ready. I'd love to see how you handle the hierarchy.", time: "45m ago" },
      { id: "7", sender: "them", text: "I was thinking about that design system you mentioned — have you tried using a 4px base grid?", time: "3m ago" },
    ],
  },
  {
    id: "marcus",
    avatar: match2,
    name: "Marcus Chen",
    lastMessage: "The new protocol is live. Check the dashboard when you get a chance.",
    time: "1h ago",
    messages: [
      { id: "1", sender: "them", text: "Protocol update pushed to staging.", time: "3h ago" },
      { id: "2", sender: "me", text: "Running tests now. Any breaking changes?", time: "2h 30m ago" },
      { id: "3", sender: "them", text: "None. Backward compatible. Performance is up 40%.", time: "2h ago" },
      { id: "4", sender: "me", text: "Impressive. I'll review the benchmarks tonight.", time: "1h 30m ago" },
      { id: "5", sender: "them", text: "The new protocol is live. Check the dashboard when you get a chance.", time: "1h ago" },
    ],
  },
  {
    id: "aria",
    avatar: match3,
    name: "Aria Novak",
    lastMessage: "Interesting perspective on brutalist interfaces. Let's discuss more over coffee sometime.",
    time: "4h ago",
    messages: [
      { id: "1", sender: "me", text: "Read your paper on cognitive load in dark interfaces. Fascinating work.", time: "6h ago" },
      { id: "2", sender: "them", text: "Thank you! It's still early research but the results are promising.", time: "5h ago" },
      { id: "3", sender: "them", text: "Interesting perspective on brutalist interfaces. Let's discuss more over coffee sometime.", time: "4h ago" },
    ],
  },
  {
    id: "kai",
    avatar: match4,
    name: "Kai Brennan",
    lastMessage: "Sent you the updated configuration files. Let me know if the schema looks right.",
    time: "1d ago",
    messages: [
      { id: "1", sender: "them", text: "Working on the schema migration. Should be ready by EOD.", time: "2d ago" },
      { id: "2", sender: "me", text: "No rush. Make sure the edge cases are covered.", time: "1d 12h ago" },
      { id: "3", sender: "them", text: "Sent you the updated configuration files. Let me know if the schema looks right.", time: "1d ago" },
    ],
  },
  {
    id: "leo",
    avatar: match6,
    name: "Leo Strand",
    lastMessage: "Have you seen the latest update to the rendering engine? Incredible performance gains.",
    time: "2d ago",
    messages: [
      { id: "1", sender: "them", text: "Have you seen the latest update to the rendering engine? Incredible performance gains.", time: "2d ago" },
    ],
  },
  {
    id: "vera",
    avatar: match5,
    name: "Vera Tanaka",
    lastMessage: "Your last article on data normalization was spot on. Would love to collaborate.",
    time: "3d ago",
    messages: [
      { id: "1", sender: "them", text: "Your last article on data normalization was spot on. Would love to collaborate.", time: "3d ago" },
    ],
  },
  {
    id: "sable",
    avatar: match3,
    name: "Sable Morin",
    lastMessage: "The monochrome palette you suggested works perfectly. Shipped it today.",
    time: "5d ago",
    messages: [
      { id: "1", sender: "me", text: "Try limiting the palette to pure black, white, and two zinc grays.", time: "6d ago" },
      { id: "2", sender: "them", text: "The monochrome palette you suggested works perfectly. Shipped it today.", time: "5d ago" },
    ],
  },
];
