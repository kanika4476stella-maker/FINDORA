import { findMatches } from './server/services/aiMatcher.js';
import 'dotenv/config';

const mockItems = [
  { id: "earphones", name: "Sony Earphones", category: "electronics", location: "Canteen, Block A", description: "Black Sony WI-C100, small scratch on left earbud", type: "found", emoji: "🎧" },
  { id: "id_card", name: "Student ID Card", category: "id_cards", location: "Library", description: "White card with blue lanyard", type: "found", emoji: "🪪" }
];

async function test() {
    console.log("Testing AI Matcher with query: 'black sony earphones'...");
    const results = await findMatches("black sony earphones", mockItems);
    console.log("Results:", JSON.stringify(results, null, 2));
}

if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
    console.log("SKIP: No real API key configured in .env. Cannot verify live Claude response.");
} else {
    test();
}
