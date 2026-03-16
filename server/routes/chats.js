import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

// Mock Chats Database
let chats = {
    "Riya S.": [
        { id: '1', from: "them", text: "Hey! I found an ID card near the library.", timestamp: new Date(Date.now() - 3600000) },
        { id: '2', from: "them", text: "Does it have a yellow lanyard?", timestamp: new Date(Date.now() - 3500000) }
    ],
    "Arjun K.": [
        { id: '1', from: "them", text: "Hi, I lost a notebook near CSE dept.", timestamp: new Date(Date.now() - 7200000) },
        { id: '2', from: "me", text: "Can you describe the cover?", timestamp: new Date(Date.now() - 7100000) },
        { id: '3', from: "them", text: "It has my name on it — Aman", timestamp: new Date(Date.now() - 7000000) }
    ],
    "Neha M.": [
        { id: '1', from: "them", text: "Found your keys at the hostel entrance!", timestamp: new Date(Date.now() - 86400000) },
        { id: '2', from: "me", text: "OMG yes those are mine! Thank you so much!", timestamp: new Date(Date.now() - 86300000) }
    ]
};

const autoReplies = [
    "Got it! Come to the library entrance.",
    "Sure, I will be at Block A gate.",
    "Great, see you soon!",
    "Thanks for reaching out!",
    "I'm usually available between 2-4 PM.",
    "Let me know what works best for you!"
];

/**
 * @route   GET /api/chats/:name
 * @desc    Get chat history with a specific person
 * @access  Private
 */
router.get('/:name', auth, (req, res) => {
    const { name } = req.params;
    if (!chats[name]) {
        chats[name] = [];
    }
    res.json(chats[name]);
});

/**
 * @route   POST /api/chats/:name
 * @desc    Send a message to a person
 * @access  Private
 */
router.post('/:name', auth, (req, res) => {
    const { name } = req.params;
    const { text, autoReply } = req.body;
    
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (!chats[name]) {
        chats[name] = [];
    }
    
    const messageId = Date.now().toString();
    const newMessage = {
        id: messageId,
        from: 'me',
        text: text.trim(),
        timestamp: new Date()
    };

    chats[name].push(newMessage);

    // Simulate auto-reply if requested
    if (autoReply) {
        setTimeout(() => {
            const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
            chats[name].push({
                id: (Date.now() + 1).toString(),
                from: 'them',
                text: reply,
                timestamp: new Date()
            });
        }, 1000 + Math.random() * 500);
    }
    
    res.status(201).json({ success: true, message: newMessage });
});

/**
 * @route   GET /api/chats
 * @desc    Get all chat conversations
 * @access  Private
 */
router.get('/', auth, (req, res) => {
    const conversations = Object.entries(chats).map(([name, messages]) => ({
        name,
        lastMessage: messages[messages.length - 1] || null,
        messageCount: messages.length
    }));
    res.json(conversations);
});

export default router;
