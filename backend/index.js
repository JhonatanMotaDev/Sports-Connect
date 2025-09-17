const express = require('express');
const app = express();
const connectDB = require('./db');
const eventsRoutes = require('./routes/events');

const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

app.use('/api/events', eventsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});