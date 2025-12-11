const express = require('express');
const router = express.Router();
const pool = require('../db');

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

module.exports = router;
