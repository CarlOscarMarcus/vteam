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

//DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User deleted',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;