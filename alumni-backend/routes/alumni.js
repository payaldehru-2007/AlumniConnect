const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');

// Get all alumni
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
});

// Get single alumni by id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
});

// Add new alumni
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('alumni')
    .insert([req.body]);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: 'Alumni added successfully', data });
});

// Update alumni
router.put('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('alumni')
    .update(req.body)
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: 'Alumni updated successfully', data });
});

// Delete alumni
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('alumni')
    .delete()
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: 'Alumni deleted successfully' });
});

module.exports = router;