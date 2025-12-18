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

// PUT changing battery for charging or consumption
router.put('/:id/battery/:value', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const delta = Number(req.params.value);

    // Optional safety check
    if (!Number.isInteger(delta)) {
      return res.status(400).json({ error: 'Battery change must be an integer' });
    }

    const result = await pool.query(
      `
      UPDATE scooter
      SET battery = LEAST(100, GREATEST(0, battery + $1))
      WHERE scooter_id = $2
      RETURNING battery;
      `,
      [delta, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Scooter not found' });
    }

    res.json({
      scooter_id: id,
      battery: result.rows[0].battery
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
