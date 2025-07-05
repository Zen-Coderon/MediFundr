const express = require('express');
const cors = require('cors');
const loanRoutes = require('./routes/loan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const path = require('path');


// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/loan', loanRoutes);


// Fallback: serve index.html only for non-API GET requests (avoid path-to-regexp bug)
app.get(/^((?!\/api\/).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
