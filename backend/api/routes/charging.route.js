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

//UPDATE
router.put('/update/:id/:scooter_id', async (req, res) => {
  try {
    // const { scooter_id } = req.body;
    const { id, scooter_id } = req.params;

    const result = await pool.query(`UPDATE charging set scooter_id = $1 WHERE id = $2 RETURNING *`, [scooter_id, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Could not park scooter at charging station." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;