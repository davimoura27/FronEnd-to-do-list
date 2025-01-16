
const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3001', // Atualizado para a porta correta do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Certifique-se de que isso está antes das suas rotas
app.use(express.json());

// Resto das configurações do seu app... 