const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const supabase = require('../db/supabase');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, data.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: data.id, role: data.role },
   'alumniconnect_secret_2026',
    { expiresIn: '1d' }
  );

  res.json({ token, role: data.role, name: data.name });
});

// Register student
router.post('/register', async (req, res) => {
  const { username, password, name, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword, name, role }]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: 'User created successfully' });
});

// Get all students
router.get('/students', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'student');

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
});

module.exports = router;