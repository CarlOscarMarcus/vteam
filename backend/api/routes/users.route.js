import express from "express";
import auth from "../middleware/auth.js";
import pool from "../db.js";

const router = express.Router();

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

export default router;
