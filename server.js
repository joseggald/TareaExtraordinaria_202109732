require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📝 Documentación de API:`);
  console.log(`   POST /api/auth/register - Registrar usuario`);
  console.log(`   POST /api/auth/login - Iniciar sesión`);
  console.log(`   GET /api/auth/profile - Obtener perfil (protegida)`);
  console.log(`   GET /api/auth/verify - Verificar token (protegida)`);
});
