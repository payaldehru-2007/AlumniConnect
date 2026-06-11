const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) return res.status(401).json({ message: 'Invalid username or password' });

  const validPassword = await bcrypt.compare(password, data.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid username or password' });

  const token = jwt.sign(
    { id: data.id, role: data.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, role: data.role, name: data.name });
};