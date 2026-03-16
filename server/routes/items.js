import express from 'express';
const router = express.Router();

// Mock Items Database
export let items = [
    {id:'1', emoji:'🪪', name:'Student ID Card', type:'lost', category:'id_cards', location:'Library, 2nd Floor', time:'8 min ago', by:'Riya S.', description:'White card with blue lanyard, student photo visible', match:'94%'},
    {id:'2', emoji:'🎧', name:'Sony Earphones', type:'found', category:'electronics', location:'Canteen, Block A', time:'22 min ago', by:'Dev P.', description:'Black Sony WI-C100, small scratch on left earbud', match:'94%'},
    {id:'3', emoji:'📓', name:'Blue Notebook', type:'lost', category:'books', location:'CSE Dept., Corridor', time:'1 hr ago', by:'Arjun K.', description:'A5 size, blue cover, ruled pages, name inside', match:''},
    {id:'4', emoji:'🔑', name:'Key Ring (3 keys)', type:'found', category:'keys', location:'Hostel Entrance', time:'2 hr ago', by:'Neha M.', description:'3 keys on a blue ring with a small whistle keychain', match:'78%'},
    {id:'5', emoji:'🔌', name:'Dell Laptop Charger', type:'found', category:'electronics', location:'Lab 3, Block B', time:'3 hr ago', by:'Priya T.', description:'Dell 65W adapter, black, slightly frayed near tip', match:''},
    {id:'6', emoji:'🧥', name:'Navy Blue Jacket', type:'lost', category:'clothing', location:'Seminar Hall', time:'Yesterday', by:'Rahul V.', description:'Navy windbreaker, size M, Puma logo on chest', match:''},
    {id:'7', emoji:'👛', name:'Brown Leather Wallet', type:'lost', category:'wallet', location:'Sports Complex', time:'Yesterday', by:'Mira S.', description:'Brown bifold, initials AK engraved inside', match:'61%'},
    {id:'8', emoji:'🍶', name:'Steel Water Bottle', type:'found', category:'other', location:'Gym, Ground Floor', time:'2 days ago', by:'Dev K.', description:'Grey Milton 750ml with a sticker on the side', match:''}
];

/**
 * @route   GET /api/items
 * @desc    Get all items
 */
router.get('/', (req, res) => {
    res.json(items);
});

/**
 * @route   POST /api/items
 * @desc    Add a new item
 */
router.post('/', (req, res) => {
    const newItem = {
        id: Date.now().toString(),
        time: 'Just now',
        by: 'Kanika Singh',
        ...req.body
    };
    items.unshift(newItem);
    res.status(201).json(newItem);
});

export default router;
