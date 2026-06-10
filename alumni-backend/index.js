const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alumniRoutes = require('./routes/alumni');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/alumni', alumniRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('AlumniConnect Backend is Running!');
});

module.exports = app;