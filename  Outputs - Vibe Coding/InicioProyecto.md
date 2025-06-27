# Sistema de Autenticación Básico - Guía Completa

## 📁 Estructura de Carpetas

```
auth-system/
├── package.json
├── .env
├── server.js
├── data/
│   └── users.json
├── middleware/
│   └── auth.js
├── routes/
│   └── auth.js
├── utils/
│   └── fileHandler.js
└── public/
    ├── index.html
    ├── login.html
    └── dashboard.html
```

## 🚀 Paso 1: Inicialización del Proyecto

```bash
# Crear carpeta del proyecto
mkdir auth-system
cd auth-system

# Inicializar npm
npm init -y

# Instalar dependencias
npm install express bcryptjs jsonwebtoken cors dotenv

# Crear estructura de carpetas
mkdir data middleware routes utils public
```

## 📦 Paso 2: package.json

```json
{
  "name": "auth-system",
  "version": "1.0.0",
  "description": "Sistema de autenticación básico",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  }
}
```

## 🔧 Paso 3: Configuración (.env)

```env
JWT_SECRET=tu_clave_secreta_super_segura_2024
PORT=3000
```

## 📄 Paso 4: Base de Datos Mock (data/users.json)

```json
{
  "users": []
}
```

## 🛠️ Paso 5: Utilidad para Manejo de Archivos (utils/fileHandler.js)

```javascript
const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

class FileHandler {
  static async readUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { users: [] };
    }
  }

  static async writeUsers(data) {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing users:', error);
      return false;
    }
  }

  static async addUser(user) {
    const data = await this.readUsers();
    data.users.push(user);
    return await this.writeUsers(data);
  }

  static async findUserByEmail(email) {
    const data = await this.readUsers();
    return data.users.find(user => user.email === email);
  }

  static async findUserById(id) {
    const data = await this.readUsers();
    return data.users.find(user => user.id === id);
  }
}

module.exports = FileHandler;
```

## 🔐 Paso 6: Middleware de Autenticación (middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');
const FileHandler = require('../utils/fileHandler');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Acceso denegado. Token requerido.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await FileHandler.findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido.' 
      });
    }

    req.user = { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    };
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido.' 
    });
  }
};

module.exports = authMiddleware;
```

## 🛣️ Paso 7: Rutas de Autenticación (routes/auth.js)

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FileHandler = require('../utils/fileHandler');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await FileHandler.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Guardar usuario
    const saved = await FileHandler.addUser(newUser);
    
    if (!saved) {
      return res.status(500).json({
        success: false,
        message: 'Error al guardar el usuario'
      });
    }

    // Generar token
    const token = jwt.sign(
      { userId: newUser.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario
    const user = await FileHandler.findUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta protegida - obtener perfil
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Verificar token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Token válido',
    user: req.user
  });
});

module.exports = router;
```

## 🖥️ Paso 8: Servidor Principal (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
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
```

## 🎨 Paso 9: Frontend Simple (public/index.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Autenticación</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }
        .container { max-width: 400px; margin: 50px auto; padding: 20px; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { text-align: center; margin-bottom: 30px; color: #333; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; color: #555; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; }
        button { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        button:hover { background: #0056b3; }
        .switch { text-align: center; margin-top: 20px; }
        .switch a { color: #007bff; text-decoration: none; }
        .message { padding: 10px; margin-bottom: 20px; border-radius: 5px; text-align: center; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Iniciar Sesión</h1>
            <div id="message"></div>
            
            <form id="authForm">
                <div id="nameGroup" class="form-group" style="display: none;">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" placeholder="Tu nombre completo">
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" placeholder="tu@email.com" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" placeholder="Mínimo 6 caracteres" required>
                </div>
                
                <button type="submit" id="submitBtn">Iniciar Sesión</button>
            </form>
            
            <div class="switch">
                <span id="switchText">¿No tienes cuenta?</span>
                <a href="#" id="switchMode">Regístrate aquí</a>
            </div>
        </div>
    </div>

    <script>
        const form = document.getElementById('authForm');
        const nameGroup = document.getElementById('nameGroup');
        const submitBtn = document.getElementById('submitBtn');
        const switchMode = document.getElementById('switchMode');
        const switchText = document.getElementById('switchText');
        const messageDiv = document.getElementById('message');
        
        let isLogin = true;

        // Cambiar entre login y registro
        switchMode.addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;
            
            if (isLogin) {
                nameGroup.style.display = 'none';
                submitBtn.textContent = 'Iniciar Sesión';
                switchText.textContent = '¿No tienes cuenta?';
                switchMode.textContent = 'Regístrate aquí';
                document.querySelector('h1').textContent = 'Iniciar Sesión';
            } else {
                nameGroup.style.display = 'block';
                submitBtn.textContent = 'Registrarse';
                switchText.textContent = '¿Ya tienes cuenta?';
                switchMode.textContent = 'Inicia sesión aquí';
                document.querySelector('h1').textContent = 'Registro';
            }
            clearMessage();
        });

        // Enviar formulario
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const data = isLogin ? { email, password } : { name, email, password };
            
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    localStorage.setItem('token', result.token);
                    showMessage(result.message, 'success');
                    setTimeout(() => {
                        window.location.href = '/dashboard.html';
                    }, 1500);
                } else {
                    showMessage(result.message, 'error');
                }
            } catch (error) {
                showMessage('Error de conexión', 'error');
            }
        });

        function showMessage(text, type) {
            messageDiv.innerHTML = `<div class="message ${type}">${text}</div>`;
        }

        function clearMessage() {
            messageDiv.innerHTML = '';
        }

        // Verificar si ya está logueado
        if (localStorage.getItem('token')) {
            window.location.href = '/dashboard.html';
        }
    </script>
</body>
</html>
```

## 📊 Paso 10: Dashboard (public/dashboard.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sistema de Autenticación</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }
        .navbar { background: #007bff; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 800px; margin: 50px auto; padding: 20px; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .user-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .info-item { padding: 15px; background: #f8f9fa; border-radius: 5px; }
        .btn { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; margin: 5px; }
        .btn-danger { background: #dc3545; color: white; }
        .btn-primary { background: #007bff; color: white; }
        .loading { text-align: center; padding: 50px; }
    </style>
</head>
<body>
    <nav class="navbar">
        <h1>Mi Dashboard</h1>
        <button class="btn btn-danger" onclick="logout()">Cerrar Sesión</button>
    </nav>

    <div class="container">
        <div id="loading" class="loading">
            <p>Cargando...</p>
        </div>

        <div id="content" style="display: none;">
            <div class="card">
                <h2>Bienvenido, <span id="userName"></span>!</h2>
                <p>Has iniciado sesión exitosamente en el sistema.</p>
            </div>

            <div class="card">
                <h3>Información del Usuario</h3>
                <div class="user-info">
                    <div class="info-item">
                        <strong>ID:</strong>
                        <div id="userId"></div>
                    </div>
                    <div class="info-item">
                        <strong>Email:</strong>
                        <div id="userEmail"></div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3>Acciones</h3>
                <button class="btn btn-primary" onclick="testProtectedRoute()">
                    Probar Ruta Protegida
                </button>
                <div id="testResult" style="margin-top: 15px;"></div>
            </div>
        </div>
    </div>

    <script>
        async function loadUserProfile() {
            const token = localStorage.getItem('token');
            
            if (!token) {
                window.location.href = '/';
                return;
            }

            try {
                const response = await fetch('/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (result.success) {
                    document.getElementById('userName').textContent = result.user.name;
                    document.getElementById('userId').textContent = result.user.id;
                    document.getElementById('userEmail').textContent = result.user.email;
                    
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('content').style.display = 'block';
                } else {
                    throw new Error('Usuario no válido');
                }
            } catch (error) {
                console.error('Error:', error);
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        }

        async function testProtectedRoute() {
            const token = localStorage.getItem('token');
            const resultDiv = document.getElementById('testResult');

            try {
                const response = await fetch('/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();
                
                if (result.success) {
                    resultDiv.innerHTML = '<div style="color: green;">✅ Ruta protegida accesible - Token válido</div>';
                } else {
                    resultDiv.innerHTML = '<div style="color: red;">❌ Error: ' + result.message + '</div>';
                }
            } catch (error) {
                resultDiv.innerHTML = '<div style="color: red;">❌ Error de conexión</div>';
            }
        }

        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/';
        }

        // Cargar perfil al cargar la página
        loadUserProfile();
    </script>
</body>
</html>
```

## 🚀 Paso 11: Ejecutar el Sistema

```bash
# Instalar dependencias (si no lo hiciste antes)
npm install

# Ejecutar el servidor
npm start
```

## 📡 Endpoints de la API

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil | Sí |
| GET | `/api/auth/verify` | Verificar token | Sí |

## 🧪 Pruebas con cURL

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@email.com","password":"123456"}'

# Iniciar sesión
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@email.com","password":"123456"}'

# Acceder a ruta protegida
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## ✨ Características Implementadas

- ✅ Registro de usuarios con validaciones
- ✅ Login con autenticación JWT
- ✅ Hasheo seguro de contraseñas con bcrypt
- ✅ Middleware de autenticación
- ✅ Rutas protegidas
- ✅ Persistencia en JSON
- ✅ Frontend funcional
- ✅ Manejo de errores
- ✅ Validaciones de entrada
- ✅ Tokens con expiración

## 🔧 Personalización Rápida

Para adaptar el sistema:

1. **Cambiar puerto**: Modifica `.env`
2. **Añadir campos**: Edita el modelo de usuario en `routes/auth.js`
3. **Cambiar duración del token**: Modifica `expiresIn` en JWT
4. **Añadir más rutas**: Crea nuevos archivos en `routes/`
5. **Cambiar diseño**: Edita los archivos HTML en `public/`

¡Tu sistema de autenticación está listo para usar! 🎉