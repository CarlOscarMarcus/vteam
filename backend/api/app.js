const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routes/users.route');
const scootersRouter = require("./routes/scooters.route");
const authRoutes = require("./routes/auth.route");

app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use("/api/scooters", scootersRouter);
app.use("/api/auth", authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

