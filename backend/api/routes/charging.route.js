import express from 'express';
const router = express.Router();

import pool from '../db.js';

// GET all charging stations
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM charging');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching charging stations:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;