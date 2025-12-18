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
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET selected scooter
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

// GET selected scooter repairs
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

export default router;
