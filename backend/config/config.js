module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/sportsconnect',

  PORT: process.env.PORT || 3333,
  NODE_ENV: process.env.NODE_ENV || 'development',

  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',

  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8081'
};