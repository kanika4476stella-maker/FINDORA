import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import { findMatches } from '../services/aiMatcher.js';
import { items as allItems } from './items.js';

/**
 * @route   POST /api/match
 * @desc    Get ranked matches for a lost item query
 * @access  Private
 */
router.post('/match', auth, async (req, res) => {
    try {
        const { query } = req.body;
        
        if (!query || query.trim() === "") {
            return res.status(400).json({ error: "query is required" });
        }

        console.log('🔍 Search Query:', query);
        console.log('📦 Items in database:', allItems.length);
        console.log('Items sample:', allItems.slice(0, 2).map(i => ({ id: i.id, name: i.name, description: i.description })));

        // Use actual items from database instead of mock items
        const result = await findMatches(query, allItems);
        
        console.log('✅ Match results:', result.length, 'matches found');

        if (result.length === 0) {
            return res.status(200).json({ 
                matches: [], 
                message: "No matches found. Try adding more details like colour, brand, or location." 
            });
        }

        res.status(200).json({ 
            matches: result, 
            count: result.length, 
            query: query 
        });

    } catch (err) {
        console.error("Match route error:", err);
        res.status(500).json({ error: "Matching service unavailable. Please try again." });
    }
});

export default router;
