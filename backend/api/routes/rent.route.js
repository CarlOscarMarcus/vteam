// routes/rent.route.js
import express from 'express';
import pool from '../db.js';
import auth from '../middleware/auth.js';
const router = express.Router();

/**
 * POST /api/rent/start
 * Body: { scooterId }
 * Kräver inloggad användare
 */
router.post('/start', auth, async (req, res) => {
  const userId = req.user.id;
  const { scooterId } = req.body;

  if (!scooterId) {
    return res.status(400).json({ error: 'Missing scooterId' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Säkerställ att användaren inte redan har en aktiv resa
    const userActive = await client.query(
      'SELECT id FROM rental WHERE user_id = $1 AND active = true',
      [userId]
    );

    if (userActive.rowCount > 0) {
      throw new Error('User already has an active rental');
    }

    // 2. Lås scootern
    const scooterResult = await client.query(
      'SELECT is_available, battery FROM scooter WHERE id = $1 FOR UPDATE',
      [scooterId]
    );

    if (!scooterResult.rowCount) {
      throw new Error('Scooter not found');
    }

    if (!scooterResult.rows[0].is_available) {
      throw new Error('Scooter is not available');
    }

    // 3. Skapa rental
    await client.query(
      `
      INSERT INTO rental (user_id, scooter_id, active)
      VALUES ($1, $2, true)
      `,
      [userId, scooterId]
    );

    // 4. Markera scooter som upptagen
    await client.query(
      'UPDATE scooter SET is_available = false WHERE id = $1',
      [scooterId]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Rental started',
      scooter: {
        id: scooterId,
        battery: scooterResult.rows[0].battery
      }
    });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});


/**
 * POST /api/rent/end
 * Kräver inloggad användare
 */
router.post("/end", auth, async (req, res) => {
  const userId = req.user.id;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Hitta aktiv rental för användaren
    const rentalRes = await client.query(
      `
      SELECT r.*, s.battery
      FROM rental r
      JOIN scooter s ON s.id = r.scooter_id
      WHERE r.user_id = $1 AND r.active = true
      FOR UPDATE
      `,
      [userId]
    );

    if (rentalRes.rowCount === 0) {
      throw new Error("No active rental found");
    }

    const rental = rentalRes.rows[0];

    // 2. Beräkna restid i minuter
    const minutes = Math.ceil(
      (Date.now() - new Date(rental.start_time)) / 60000
    );

    // 3. Avsluta rental
    await client.query(
      `
      UPDATE rental
      SET end_time = NOW(),
          active = false
      WHERE id = $1
      `,
      [rental.id]
    );

    // 4. Beräkna nytt batteri (utifrån DB-värde)
    const batteryDrainPerMinute = 1; // enkel modell
    const batteryLeft = Math.max(
      0,
      rental.battery - minutes * batteryDrainPerMinute
    );

    // 5. Uppdatera scooter
    await client.query(
      `
      UPDATE scooter
      SET is_available = true,
          battery = $1
      WHERE id = $2
      `,
      [batteryLeft, rental.scooter_id]
    );

    // 6. Skapa kvitto
    const pricePerMinute = 5;
    const cost = minutes * pricePerMinute;

    const receiptRes = await client.query(
      `
      INSERT INTO receipt (user_id, cost, payment)
      VALUES ($1, $2, 0)
      RETURNING *
      `,
      [userId, cost]
    );

    await client.query("COMMIT");

    // 7. Svar till frontend
    res.json({
      receipt: {
        ...receiptRes.rows[0],
        minutes,
        batteryLeft,
      },
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("End ride error:", err.message);
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;

