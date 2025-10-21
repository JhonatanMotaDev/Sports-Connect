module.exports = {
  // MongoDB Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/sportsconnect',
  
  // Server Configuration
  PORT: process.env.PORT || 3333,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // JWT Secret (for future authentication)
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  
  // CORS Configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8081'
};