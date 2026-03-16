import Anthropic from '@anthropic-ai/sdk';

// Initialize client if key is present
let client = null;
if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_api_key_here') {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

/**
 * Keyword-based fallback matching logic
 */
function keywordMatcher(query, items) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\W+/).filter(w => w.length > 2);
    
    return items.map(item => {
        const title = (item.title || item.name || '').toLowerCase();
        const desc = (item.description || item.desc || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        const loc = (item.location || item.loc || '').toLowerCase();

        let score = 0;
        
        // Exact title/name matches are high value
        if (title.includes(queryLower)) score += 85;
        
        // Word matches
        queryWords.forEach(word => {
            if (title.includes(word)) score += 20;
            if (desc.includes(word)) score += 10;
            if (cat.includes(word)) score += 15;
            if (loc.includes(word)) score += 5;
        });

        // Cap score at 95 for mock matches
        score = Math.min(score, 95);

        return {
            ...item,
            score,
            reason: score > 0 ? "Found matching keywords in the report." : "No significant overlap found."
        };
    })
    .filter(item => item.score >= 25)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/**
 * Finds ranked matches for a lost item description using Claude AI or Fallback.
 */
async function findMatches(userQuery, itemsArray) {
    // If no client, use fallback immediately
    if (!client) {
        console.warn("AI service not configured. Using keyword matching fallback.");
        return keywordMatcher(userQuery, itemsArray);
    }

    try {
        const systemPromptString = `You are Findora's AI matching engine. Analyze the lost item description and return a JSON array of top matches from the database. Each match must have {id, score (0-100), reason}. Only return the JSON array.`;

        const userMessageString = `Query: ${userQuery}\n\nDatabase: ${JSON.stringify(itemsArray.map(i => ({id: i.id, name: i.name, description: i.description, category: i.category, location: i.location})), null, 2)}`;

        const message = await client.messages.create({
            model: "claude-3-5-sonnet-20241022", // Use a valid current model ID
            max_tokens: 500,
            messages: [{ role: "user", content: userMessageString }],
            system: systemPromptString
        });

        const responseText = message.content[0].text;
        const parsedMatches = JSON.parse(responseText.trim());

        if (!Array.isArray(parsedMatches)) throw new Error("Invalid response format");

        return parsedMatches
            .map(match => {
                const fullItem = itemsArray.find(item => item.id === match.id);
                if (!fullItem) return null;
                return { ...fullItem, score: match.score, reason: match.reason };
            })
            .filter(item => item !== null)
            .sort((a, b) => b.score - a.score);

    } catch (err) {
        console.error("AI Match Error, using fallback:", err.message);
        return keywordMatcher(userQuery, itemsArray);
    }
}

export { findMatches };
