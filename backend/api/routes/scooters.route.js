// routes/scooters.route.js
import express from 'express';
const router = express.Router();

import pool from '../db.js';

// GET all scooters
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scooter');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching scooters:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
