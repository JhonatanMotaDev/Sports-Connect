const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://jhonatanmotadev_db_user:<db_password>@cluster0.cpks0ds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('Conexão com o MongoDB estabelecida!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;