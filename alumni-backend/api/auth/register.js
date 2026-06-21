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

let { username, password, name } = req.body;
username = (username || '').trim();
name = (name || '').trim();
  if (!username || !password || !name) {
    return res.status(400).json({ message: 'Name, username and password are required' });
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single();

  if (existing) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  const { error } = await supabase
    .from('users')
    .insert([{ username, password, name, role: 'student' }]);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: 'Account created successfully' });
};