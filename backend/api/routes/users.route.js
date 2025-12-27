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

//UPDATE
router.put('/update/:id', async (req, res) => {
  try {
    const { name, email, status } = req.body;
    const { id } = req.params;

    const result = await pool.query(`UPDATE users set email = $1, name = $2, status = $3 WHERE id = $4 RETURNING *`, [email, name, status, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//hämta med ID
router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const result = await pool.query('SELECT id, email, name, status FROM users WHERE id = $1', [id]);

    res.json(result.rows[0]);
  } catch (err) {
    // res.status(500).json({ error: 'Server error' });
     console.error("Error fetching user:", err);
      res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;