const express = require('express');
const cors = require('cors');
const loanRoutes = require('./routes/loan');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS for Vercel frontend and localhost
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      'https://medi-fundr.vercel.app',
      'http://localhost:5000',
      'http://localhost:3000',
      undefined // allow Postman, curl, or direct server-to-server
    ];
    if (allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint for uptime monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/loan', loanRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
