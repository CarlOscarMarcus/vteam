const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scooter');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    const result = await pool.query('SELECT * FROM scooter WHERE id = $1', [id]); // pass id as parameter
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/repairs', async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    const result = await pool.query('SELECT * FROM repair WHERE scooter_id = $1', [id]); // pass id as parameter
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
