import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import matchRouter from './routes/match.js';
import itemsRouter from './routes/items.js';
import chatsRouter from './routes/chats.js';
import feedRouter from './routes/feed.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', matchRouter);
app.use('/api/items', itemsRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/feed', feedRouter);

// Mock root route
app.get('/', (req, res) => {
  res.send('Findora API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Findora backend running on http://localhost:${PORT}`);
});
