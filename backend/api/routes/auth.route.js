// routes/auth.route.js
import express from 'express';
const router = express.Router();

import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import { OAuth2Client } from "google-auth-library";
import crypto from 'crypto';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// logga in med google/oauth
router.post("/oauth", async (req,res) => {
  const { credential } = req.body;
   console.log("Credential received:", credential);

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload();
    console.log("Payload:", payload);
    const email = payload.email;
    const name = payload.name;

    let result = await db.query("SELECT * FROM users WHERE email = $1", [email]) 
    let user;

    if (result.rows.length === 0) {
      const password = crypto.randomBytes(15).toString("hex");
      const password_hash = await bcrypt.hash(password, 10)
      const newUser = await db.query("INSERT INTO users (email, name, password_hash, salt) VALUES ($1, $2, $3, $4) RETURNING id, email" , [email, name, password_hash, 10])
      user = newUser.rows[0]
    } else {
      user = result.rows[0]
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({token})
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ error: "Server error "})
  }
})

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const result = await db.query('SELECT id, email, name FROM users WHERE id = $1', [
      req.user.id,
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body

        const hashpassword = await bcrypt.hash(password, 10)

        await db.query(`INSERT into users (email, name, password_hash, salt)
           VALUES ($1, $2, $3, $4)`, [email, name, hashpassword, 10]);

        console.log("registrering ok från backend!")
        return res.status(201).json({
        message: "Lyckad registrering",
        });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
    
});

export default router;
