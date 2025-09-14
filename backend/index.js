const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá! Este é o backend do seu aplicativo React Native.');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});