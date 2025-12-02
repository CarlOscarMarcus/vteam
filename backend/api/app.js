const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routes/users.route');

app.use(express.json());

// Routes
app.use('/api/users', usersRouter);

// Root route
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
