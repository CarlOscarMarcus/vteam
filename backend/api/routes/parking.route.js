// routes/users.route.js
import express from 'express';
const router = express.Router();

import pool from '../db.js';

// GET all parking spots
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parking');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching parking spots:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add parking spots
router.post('/add', async (req, res) => {
  try {
    const {position_lat, position_long} = req.body

    const result = await pool.query('INSERT INTO parking position_lat, position_long VALUES ($1. $2) RETURNING *', [position_lat, position_long]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching parking spots:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
