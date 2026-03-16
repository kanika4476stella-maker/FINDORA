import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

// Mock Feed/Comments Database
let feedComments = {
    "1": [ // Student ID Card
        { id: '1', user: 'Kanika Singh', text: 'I saw this near the library entrance yesterday!', timestamp: new Date(Date.now() - 3600000), likes: 2 },
        { id: '2', user: 'Priya T.', text: 'Is this the one with the yellow lanyard?', timestamp: new Date(Date.now() - 1800000), likes: 1 }
    ],
    "2": [ // Sony Earphones
        { id: '1', user: 'Neha M.', text: 'Still available? I really need these!', timestamp: new Date(Date.now() - 7200000), likes: 3 },
        { id: '2', user: 'Dev P.', text: 'These are mine! Contact me asap', timestamp: new Date(Date.now() - 5400000), likes: 5 }
    ],
    "3": [], // Blue Notebook - no comments
    "4": [ // Key Ring
        { id: '1', user: 'Riya S.', text: 'The keys are still here if you want them', timestamp: new Date(Date.now() - 86400000), likes: 1 }
    ]
};

/**
 * @route   GET /api/feed/:itemId
 * @desc    Get comments/feed for a specific item
 * @access  Public
 */
router.get('/:itemId', (req, res) => {
    const { itemId } = req.params;
    const comments = feedComments[itemId] || [];
    res.json(comments);
});

/**
 * @route   POST /api/feed/:itemId
 * @desc    Add a comment to an item's feed
 * @access  Private
 */
router.post('/:itemId', auth, (req, res) => {
    const { itemId } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    if (!feedComments[itemId]) {
        feedComments[itemId] = [];
    }

    const newComment = {
        id: Date.now().toString(),
        user: req.user.name || 'Anonymous',
        text: text.trim(),
        timestamp: new Date(),
        likes: 0
    };

    feedComments[itemId].push(newComment);
    res.status(201).json(newComment);
});

/**
 * @route   POST /api/feed/:itemId/:commentId/like
 * @desc    Like a comment
 * @access  Private
 */
router.post('/:itemId/:commentId/like', auth, (req, res) => {
    const { itemId, commentId } = req.params;
    
    if (feedComments[itemId]) {
        const comment = feedComments[itemId].find(c => c.id === commentId);
        if (comment) {
            comment.likes = (comment.likes || 0) + 1;
            return res.json(comment);
        }
    }

    res.status(404).json({ error: 'Comment not found' });
});

export default router;
