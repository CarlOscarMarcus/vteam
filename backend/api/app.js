const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routes/users.route');
const authRoutes = require("./routes/auth.route");
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', usersRouter);
app.use("/api/auth", authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

