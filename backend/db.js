const mongoose = require('mongoose');

const connectDB = async () => {
  const dbUri = process.env.MONGO_URI;

  if (!dbUri) {
    console.error('MONGO_URI não definido. Configure a variável de ambiente MONGO_URI.');
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri);
    console.log('Conexão com o MongoDB estabelecida!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;