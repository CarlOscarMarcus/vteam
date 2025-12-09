import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scootersRouter from './routes/scooters.route.js';
import usersRouter from './routes/users.route.js';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/users', usersRouter);
app.use('/api/scooters', scootersRouter);

// --- Starta server ---
const PORT = process.env.PORT || 3000;

// 0.0.0.0 gör att servern lyssnar på alla nätverksadresser
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
