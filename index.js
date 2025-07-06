const express = require('express');
const cors = require('cors');
const loanRoutes = require('./routes/loan');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS for Vercel frontend and localhost
app.use(cors({
  origin: [
    'https://medi-fundr.vercel.app',
    'http://localhost:5000',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
const path = require('path');

// ... existing code
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/api/loan', loanRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
