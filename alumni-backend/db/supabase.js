const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabase = createClient(
  'https://pkjidofzjzmluoglporl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBramlkb2Z6anptbHVvZ2xwb3JsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzMyMTU5MiwiZXhwIjoyMDk4ODk3NTkyfQ.drGqYbzI6J2NXLB8n4zNceDwfg9bcr8hCJ_Ua-Yu5gs'
);
module.exports = supabase;