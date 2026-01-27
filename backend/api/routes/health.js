import express from 'express';
const router = express.Router();

import pool from '../db.js';

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
export default router;