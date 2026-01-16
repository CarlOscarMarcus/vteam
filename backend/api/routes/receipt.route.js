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

// PAY
router.post("/:id/pay", auth, async (req, res) => {
  const userId = req.user.id;
  const receiptId = req.params.id;

  try {
    // Hämta kvitto
    const { rows } = await pool.query(
      "SELECT cost, payment FROM receipt WHERE id = $1 AND user_id = $2",
      [receiptId, userId]
    );

    if (!rows.length)
      return res.status(404).json({ error: "Receipt not found" });

    const receipt = rows[0];

    if (receipt.payment >= receipt.cost)
      return res.status(400).json({ error: "Receipt already paid" });

    // Hämta saldo
    const { rows: userRows } = await pool.query(
      "SELECT balance FROM users WHERE id = $1",
      [userId]
    );

    const balance = userRows[0].balance;

    if (balance < receipt.cost)
      return res.status(400).json({ error: "Insufficient balance" });

    // Transaktion
    await pool.query("BEGIN");

    await pool.query(
      "UPDATE users SET balance = balance - $1 WHERE id = $2",
      [receipt.cost, userId]
    );

    await pool.query(
      "UPDATE receipt SET payment = cost WHERE id = $1",
      [receiptId]
    );

    await pool.query("COMMIT");

    res.json({
      message: "Payment successful",
      paid: receipt.cost,
    });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;
