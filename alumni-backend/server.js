const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alumniRoutes = require('./routes/alumni');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

app.use('/alumni', alumniRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('AlumniConnect Backend is Running!');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel
module.exports = app;