<<<<<<< HEAD
# 🔍 Findora - Campus Lost & Found Platform

A modern, AI-powered campus lost and found platform that helps students quickly locate and recover their lost items using intelligent matching and community-driven reporting.

## ✨ Features

### Core Features
- 🤖 **AI-Powered Search** - Describe your lost item in plain language, and our AI finds matches with percentage accuracy
- 💬 **Direct Messaging** - Contact item finders securely through the built-in chat system
- 🗺️ **Campus Map** - Interactive map showing all lost/found items across campus locations
- 🔔 **Smart Notifications** - Get alerts for unrecovered items you've reported
- 📝 **Item Feed** - Community comments and discussion on each item
- 🛡️ **Verification Questions** - Verify item ownership through security questions

### User Features
- 🌙 **Dark/Light Theme** - Complete theme toggle support
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔐 **Authentication** - Secure login system with token management
- ⚡ **Real-time Updates** - Live item feed with instant notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- An Anthropic API key for Claude AI

### Installation

1. **Clone the repository**
```bash
cd Findora
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** in the project root
```bash
# .env
ANTHROPIC_API_KEY=your-actual-api-key-here
```

Get your API key from [Anthropic Console](https://console.anthropic.com)

4. **Start the backend server**
```bash
node server/index.js
```
The server will run on `http://localhost:3000`

5. **Start the frontend** (in a new terminal)
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Findora/
├── server/
│   ├── index.js                 # Express server
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── routes/
│   │   ├── items.js            # Items CRUD endpoints
│   │   ├── match.js            # AI matching endpoint
│   │   ├── chats.js            # Messaging endpoints
│   │   └── feed.js             # Comments/feed endpoints
│   └── services/
│       └── aiMatcher.js        # Claude AI matching logic
├── src/
│   ├── App.jsx                 # Main app component
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation
│   │   ├── Hero.jsx            # Hero section
│   │   ├── ItemFeed.jsx        # Items list
│   │   ├── ItemDetailModal.jsx # Item details & chat
│   │   ├── ReportModal.jsx     # Report form
│   │   ├── CampusMap.jsx       # Interactive map
│   │   ├── AboutSection.jsx    # About/How it works
│   │   ├── NotificationCenter.jsx
│   │   └── common/
│   │       ├── AISearchAssistant.jsx
│   │       └── Toast.jsx
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state
│   │   └── ThemeContext.jsx    # Theme state
│   ├── services/
│   │   ├── api.js              # Axios instance
│   │   └── matchService.js     # AI search service
│   └── styles/
│       └── index.css           # Global styles
├── index.html
├── vite.config.js
├── package.json
├── .env                        # Environment variables
└── README.md
```

## 🔑 API Key Setup

### Getting Your Anthropic API Key

1. Visit [Anthropic Console](https://console.anthropic.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Click "Create Key"
5. Copy the generated key

### Setting Up in Findora

1. Create `.env` file in project root:
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

2. The application automatically reads from this file (via `dotenv`)

3. Restart the server:
```bash
node server/index.js
```

## 🎯 How It Works

### 3-Step Process

**1. 📝 Report Item**
- User reports a lost or found item with details
- Include description, location, category, and verification question

**2. 🤖 AI Matches**
- AI analyzes the query against all campus items
- Returns ranked matches with percentage accuracy
- Shows why each item matched the description

**3. ✅ Get Item Back**
- User contacts the finder via secure messaging
- Verify ownership using the security question
- Arrange item recovery on campus

## 🛠️ API Endpoints

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Report a new item

### Search
- `POST /api/match` - AI-powered search for items

### Messaging
- `GET /api/chats/:name` - Get chat history
- `POST /api/chats/:name` - Send a message

### Feed/Comments
- `GET /api/feed/:itemId` - Get item comments
- `POST /api/feed/:itemId` - Add a comment
- `POST /api/feed/:itemId/:commentId/like` - Like a comment

## 🎨 Technologies Used

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Express.js** - Web framework
- **Node.js** - JavaScript runtime
- **Claude Sonnet 4** - AI matching engine
- **JWT** - Authentication tokens
- **dotenv** - Environment variables

### Styling
- CSS custom properties (variables)
- Responsive design with Flexbox/Grid
- Dark mode support

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Protected API endpoints
- ✅ Item verification questions
- ✅ Secure messaging system
- ✅ User isolation in chat histories

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🐛 Troubleshooting

### API Key Issues
**Error**: "Matching service unavailable"
- Verify `.env` file exists in project root
- Check API key format: should start with `sk-ant-`
- Ensure server is restarted after adding `.env`

### No Matches Found
- Make sure items are reported first
- Try with more specific search terms
- Check the browser console for error messages

### Server Won't Start
```bash
# Kill any existing Node processes
taskkill /IM node.exe /F

# Start fresh
node server/index.js
```

### Frontend Not Loading
- Ensure frontend dev server is running: `npm run dev`
- Check if port 5173 is available
- Clear browser cache: Ctrl+Shift+Del

## 📝 Example Usage

### Reporting an Item
1. Click "Report Found" button in navbar
2. Fill in item details:
   - Item name (e.g., "Blue Notebook")
   - Category (Books, Electronics, etc.)
   - Location (e.g., "CSE Dept., Corridor")
   - Description with specific details
   - Type (Lost/Found)
   - Verification question for item owner
3. Submit - item appears in feed instantly

### Searching with AI
1. Click the search icon (bottom-right) or "Start Searching" button
2. Describe your lost item naturally:
   - "I lost my Sony headphones near the canteen"
   - "Can't find my blue notebook from CSE"
3. AI shows ranked matches with scores
4. Click "Contact Finder" to start messaging

### Using Campus Map
1. Click "Campus Map" in navbar
2. View all items in interactive grid
3. Click item to see location and details
4. Items grouped by campus location

## 📊 Database Schema

### Items
```javascript
{
  id: string,
  emoji: string,
  name: string,
  type: 'lost' | 'found',
  category: string,
  location: string,
  description: string,
  by: string (reporter name),
  time: string,
  q: string (verification question),
  recovered: boolean
}
```

### Chats
```javascript
{
  id: string,
  from: 'me' | other person,
  text: string,
  timestamp: date
}
```

### Feed/Comments
```javascript
{
  id: string,
  itemId: string,
  text: string,
  author: string,
  timestamp: date,
  likes: number
}
```

## 🌟 Key UI Components

- **Hero Section** - Introduction with quick actions
- **Item Feed** - Grid/list of all reported items
- **Item Detail Modal** - Full item info, messages, and comments
- **AI Search Assistant** - Floating chat interface
- **Campus Map** - Interactive grid view of items by location
- **About Section** - How it works with 3-step process
- **Notification Center** - Alerts for unrecovered items

## 🎓 Campus Features

- 📍 School-specific location tracking
- 👥 Student-to-student community
- 🏫 Campus building recognition
- 📚 Category-based organization
- ⏱️ Time tracking for items

## 🚀 Future Enhancements

- [ ] MongoDB integration for persistence
- [ ] Email notifications
- [ ] Photo upload for items
- [ ] Admin dashboard
- [ ] Item recovery tracking
- [ ] User reputation system
- [ ] Advanced filters and search
- [ ] Mobile app version

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review console logs (F12)
3. Verify `.env` file configuration
4. Restart both server and frontend

## 📄 License

This project is part of the Findora Campus Network.

## 🎉 Credits

Built with ❤️ for campus community recovery.

---

**Happy Searching! 🔍**

If you found this helpful, consider contributing back to make Findora even better!
=======
# FINDORA
Students often lose important items on campus such as ID cards, wallets, earphones, or notebooks. In most cases, there is no proper system that helps students report or recover these belongings easily. Findora is a simple and smart web platform designed to solve this everyday problem by creating a centralized campus lost and found system.
>>>>>>> a77dc3b8398f455a8905ae3059679f32a8c4589b
