import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/create/:start/:end/:user_id', async (req, res) => {
  try {
    const { start, end, user_id } = req.params;

    const { rows } = await pool.query(
      `INSERT INTO history (start_location, end_location, user_id)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [start, end, user_id]
    );

    res.send(`
      ✅ History created<br/>
      ID: ${rows[0].id}<br/>
      Start: ${start}<br/>
      End: ${end}
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create history entry');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM history WHERE user_id = $1`,
      [req.params.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch history' });
  }
});


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM history');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/ticket/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM history WHERE id = $1`,
      [req.params.id]
    );

    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

export default router;
