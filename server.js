const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files including index.html

// In-memory Database
let items = [
    {id:'1', emoji:'🪪', title:'Student ID Card', type:'lost', cat:'ID Card', loc:'Library, 2nd Floor', time:'8 min ago', by:'Riya S.', desc:'White card with blue lanyard, student photo visible', match:'94%', q:'What is written on the back of your ID card?', urgent:true},
    {id:'2', emoji:'🎧', title:'Sony Earphones', type:'found', cat:'Electronics', loc:'Canteen, Block A', time:'22 min ago', by:'Dev P.', desc:'Black Sony WI-C100, small scratch on left earbud', match:'94%', q:'What colour is the carrying case?', urgent:false},
    {id:'3', emoji:'📓', title:'Blue Notebook', type:'lost', cat:'Books', loc:'CSE Dept., Corridor', time:'1 hr ago', by:'Arjun K.', desc:'A5 size, blue cover, ruled pages, name inside', match:'', q:'What is written on the first page?', urgent:false},
    {id:'4', emoji:'🔑', title:'Key Ring (3 keys)', type:'found', cat:'Keys', loc:'Hostel Entrance', time:'2 hr ago', by:'Neha M.', desc:'3 keys on a blue ring with a small whistle keychain', match:'78%', q:'How many keys are on the ring?', urgent:false},
    {id:'5', emoji:'🔌', title:'Dell Laptop Charger', type:'found', cat:'Electronics', loc:'Lab 3, Block B', time:'3 hr ago', by:'Priya T.', desc:'Dell 65W adapter, black, slightly frayed near tip', match:'', q:'What wattage is printed on the charger?', urgent:false},
    {id:'6', emoji:'🧥', title:'Navy Blue Jacket', type:'lost', cat:'Clothing', loc:'Seminar Hall', time:'Yesterday', by:'Rahul V.', desc:'Navy windbreaker, size M, Puma logo on chest', match:'', q:'What is in the left pocket?', urgent:false},
    {id:'7', emoji:'👛', title:'Brown Leather Wallet', type:'lost', cat:'Wallet', loc:'Sports Complex', time:'Yesterday', by:'Mira S.', desc:'Brown bifold, initials AK engraved inside', match:'61%', q:'What cards are inside the wallet?', urgent:false},
    {id:'8', emoji:'🍶', title:'Steel Water Bottle', type:'found', cat:'Other', loc:'Gym, Ground Floor', time:'2 days ago', by:'Dev K.', desc:'Grey Milton 750ml with a sticker on the side', match:'', q:'What sticker is on the bottle?', urgent:false}
];

let chats = {
    "Riya S.": [{from:"them", text:"Hey! I found an ID card near the library."}, {from:"them", text:"Does it have a yellow lanyard?"}],
    "Arjun K.": [{from:"them", text:"Hi, I lost a notebook near CSE dept."}, {from:"me", text:"Can you describe the cover?"}, {from:"them", text:"It has my name on it — Aman"}],
    "Neha M.": [{from:"them", text:"Found your keys at the hostel entrance!"}, {from:"me", text:"OMG yes those are mine! Thank you so much!"}]
};

const autoReplies = ["Got it! Come to the library entrance.", "Sure, I will be at Block A gate.", "Great, see you soon!", "Thanks for reaching out!"];

// Endpoints
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {
    const newItem = {
        id: Date.now().toString(),
        time: 'Just now',
        by: 'Aman Sharma', // Hardcoded logged in user
        ...req.body
    };
    // Mock simple AI match logic
    if (newItem.type === 'found' && newItem.cat === 'Electronics') newItem.match = '82%';
    if (newItem.type === 'lost' && newItem.cat === 'ID Card') newItem.match = '95%';
    
    // Add to front of list
    items.unshift(newItem);
    res.status(201).json(newItem);
});

app.get('/api/chats/:name', (req, res) => {
    const { name } = req.params;
    if (!chats[name]) {
        chats[name] = [];
    }
    res.json(chats[name]);
});

app.post('/api/chats/:name', (req, res) => {
    const { name } = req.params;
    const { text, autoReply } = req.body;
    
    if (!chats[name]) {
        chats[name] = [];
    }
    
    chats[name].push({ from: 'me', text });

    // Simulate auto-reply if requested
    if (autoReply) {
        setTimeout(() => {
            const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
            chats[name].push({ from: 'them', text: reply });
        }, 1100);
    }
    
    res.status(201).json({ success: true });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Findora backend running on http://localhost:${PORT}`);
});
