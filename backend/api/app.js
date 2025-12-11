import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// --- Importera routers ---
import scootersRouter from './routes/scooters.route.js';
import usersRouter from './routes/users.route.js';
import parkingRouter from './routes/parking.route.js';
import chargingRouter from './routes/charging.route.js';

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/users', usersRouter);
app.use('/api/scooters', scootersRouter);
app.use('/api/parking', parkingRouter);
app.use('/api/charging', chargingRouter);

// --- Starta server ---
const PORT = process.env.PORT || 3000;

// 0.0.0.0 gör att servern lyssnar på alla nätverksadresser
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
