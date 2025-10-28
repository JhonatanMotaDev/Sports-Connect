const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); 

const connectDB = require('./config/db');
const config = require('./config/config');
const { generalLimiter } = require('./middleware/rateLimiter');

connectDB();

const app = express();

app.use(helmet());

app.use(generalLimiter);

app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({
    message: 'Sports Connect API is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV
  });
});

app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: config.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${config.NODE_ENV} mode on port ${PORT}`);
  console.log(`📊 MongoDB URI: ${config.MONGODB_URI}`);
  console.log(`🌐 CORS Origin: ${config.CORS_ORIGIN}`);
});
