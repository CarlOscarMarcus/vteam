import express from 'express';
const router = express.Router();

import pool from '../db.js';

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name, status, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;