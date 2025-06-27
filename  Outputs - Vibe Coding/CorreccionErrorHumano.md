# 🚨 Solución Error CORS - Guía Paso a Paso

## 🔍 **Problema Detectado**

Estás abriendo el archivo directamente desde el sistema de archivos:
```
❌ file:///Users/joseggald/Documents/others/sa/clase/auth-system/public/index.html
```

**Esto NO va a funcionar** porque el navegador bloquea las peticiones HTTP desde archivos `file://` por seguridad (política de CORS).

## ✅ **Solución Correcta**

Debes ejecutar el servidor Express y acceder a través de `http://localhost:3000`.

### **Paso 1: Verificar que estés en la carpeta correcta**
```bash
cd /Users/joseggald/Documents/others/sa/clase/auth-system
pwd  # Debe mostrar la ruta completa del proyecto
```

### **Paso 2: Verificar que tengas todos los archivos**
```bash
ls -la
# Deberías ver:
# server.js
# package.json
# .env
# carpetas: data, middleware, routes, utils, public
```

### **Paso 3: Instalar dependencias (si no lo hiciste)**
```bash
npm install
```

### **Paso 4: Ejecutar el servidor**
```bash
npm start
# O alternativamente:
node server.js
```

### **Paso 5: Verificar que el servidor esté corriendo**
Deberías ver algo como:
```
🚀 Servidor ejecutándose en http://localhost:3000
📝 Documentación de API:
   POST /api/auth/register - Registrar usuario
   POST /api/auth/login - Iniciar sesión
   GET /api/auth/profile - Obtener perfil (protegida)
   GET /api/auth/verify - Verificar token (protegida)
```

### **Paso 6: Acceder correctamente**
Abre tu navegador y ve a:
```
✅ http://localhost:3000
```

**NO** a `file://...`

## 🛠️ **Troubleshooting**

### **Si el puerto 3000 está ocupado:**
```bash
# Cambiar puerto en .env
echo "PORT=3001" >> .env
npm start
# Luego accede a http://localhost:3001
```

### **Si no tienes el archivo .env:**
```bash
cat > .env << 'EOF'
JWT_SECRET=tu_clave_secreta_super_segura_2024
PORT=3000
EOF
```

### **Si no tienes package.json:**
```bash
npm init -y
npm install express bcryptjs jsonwebtoken cors dotenv
```

### **Si falta la carpeta data:**
```bash
mkdir -p data
echo '{"users": []}' > data/users.json
```

## 🔧 **Verificar que todo funcione**

### **1. Servidor ejecutándose:**
```bash
curl http://localhost:3000
# Debería devolver la página HTML
```

### **2. API funcionando:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'
```

### **3. Frontend accesible:**
Ve a `http://localhost:3000` en tu navegador

## 📋 **Checklist Completo**

- [ ] Estoy en la carpeta correcta del proyecto
- [ ] Tengo todos los archivos (server.js, package.json, etc.)
- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm start` o `node server.js`
- [ ] Veo el mensaje "Servidor ejecutándose en http://localhost:3000"
- [ ] Accedo a `http://localhost:3000` (NO file://)
- [ ] La página se carga sin errores de CORS

## 🎯 **Comando Rápido para Verificar Todo**

```bash
# Ir a la carpeta del proyecto
cd /Users/joseggald/Documents/others/sa/clase/auth-system

# Verificar archivos
ls server.js package.json .env

# Instalar e iniciar
npm install && npm start
```

## 🚀 **Una vez que funcione**

Deberías poder:
1. ✅ Registrar usuarios
2. ✅ Iniciar sesión
3. ✅ Ver el dashboard
4. ✅ Probar rutas protegidas

## 💡 **Nota Importante**

**SIEMPRE** accede a aplicaciones web a través del servidor (http://) no directamente a archivos (file://). Esto es fundamental para el desarrollo web moderno.

## 🆘 **Si sigue sin funcionar**

Comparte conmigo:
1. La salida de `npm start`
2. Cualquier error que veas en la consola
3. La URL exacta que estás usando en el navegador