import express from "express";
import auth from "../middleware/auth.js";
import pool from "../db.js";

const router = express.Router();

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

router.get("/me", auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [req.user.id]
    );

    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/balance", auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT balance FROM users WHERE id = $1",
      [req.user.id]
    );

    if (!rows.length) return res.sendStatus(404);
    res.json({ balance: rows[0].balance });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/balance/topup", auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) return res.status(400).json({ error: "Ogiltigt belopp" });

    const result = await pool.query(
      "UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance",
      [amount, userId]
    );

    res.json({ balance: result.rows[0].balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
