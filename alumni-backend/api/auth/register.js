const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://uzgzetsuxbwwibcklpea.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6Z3pldHN1eGJ3d2liY2tscGVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDAyMzU4OSwiZXhwIjoyMDk1NTk5NTg5fQ.XOqVUGBV1T9Mp6MsUsVqy8PpoMqldv3XQsFoES5aFEI'
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password, name, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword, name, role }]);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: 'User created successfully' });
};