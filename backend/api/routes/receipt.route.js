// routes/receipt.route.js
import express from "express";
import auth from "../middleware/auth.js";
import pool from "../db.js";

const router = express.Router();

// GET all receipts for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT *,
       (payment >= cost) AS paid
       FROM receipt
       WHERE user_id = $1
       ORDER BY due_date`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch receipts" });
  }
});

// GET one receipt
router.get("/:id", auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT *,
       (payment >= cost) AS paid
       FROM receipt
       WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );

    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch receipt" });
  }
});

// PAY (full or partial, depending on remaining amount)
router.post("/:id/pay", auth, async (req, res) => {
  const userId = req.user.id;
  const receiptId = req.params.id;

  try {
    // Hämta kvitto
    const { rows: receiptRows } = await pool.query(
      "SELECT cost, payment FROM receipt WHERE id = $1 AND user_id = $2",
      [receiptId, userId]
    );
    if (!receiptRows.length)
      return res.status(404).json({ error: "Receipt not found" });

    const receipt = receiptRows[0];
    const remaining = receipt.cost - receipt.payment;

    if (remaining <= 0)
      return res.status(400).json({ error: "Receipt already paid" });

    // Hämta användarens saldo
    const { rows: userRows } = await pool.query(
      "SELECT balance FROM users WHERE id = $1",
      [userId]
    );
    const userBalance = userRows[0].balance;

    if (userBalance < remaining)
      return res.status(400).json({ error: "Insufficient balance" });

    // Dra av saldo
    await pool.query(
      "UPDATE users SET balance = balance - $1 WHERE id = $2",
      [remaining, userId]
    );

    // Uppdatera kvitto
    const { rows: updatedRows } = await pool.query(
      "UPDATE receipt SET payment = payment + $1 WHERE id = $2 RETURNING *",
      [remaining, receiptId]
    );

    res.json({
      message: "Payment successful",
      paid: remaining,
      receipt: updatedRows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;
