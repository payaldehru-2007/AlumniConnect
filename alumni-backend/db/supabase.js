const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  'https://uzgzetsuxbwwibcklpea.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6Z3pldHN1eGJ3d2liY2tscGVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDAyMzU4OSwiZXhwIjoyMDk1NTk5NTg5fQ.XOqVUGBV1T9Mp6MsUsVqy8PpoMqldv3XQsFoES5aFEI'
);

module.exports = supabase;
