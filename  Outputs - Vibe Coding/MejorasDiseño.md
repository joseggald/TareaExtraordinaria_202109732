# 🎨 COMANDOS PARA CREAR PÁGINAS CON DISEÑO SÚPER ESTÉTICO

# ========================================
# PÁGINA DE LOGIN MODERNA (public/index.html)
# ========================================

cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Autenticación</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow-x: hidden;
        }

        /* Animated Background */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
        }

        @keyframes backgroundShift {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        /* Floating Particles */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }

        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 15s infinite linear;
        }

        .particle:nth-child(1) { width: 4px; height: 4px; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 6px; height: 6px; left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { width: 3px; height: 3px; left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { width: 5px; height: 5px; left: 40%; animation-delay: 6s; }
        .particle:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-delay: 8s; }
        .particle:nth-child(6) { width: 6px; height: 6px; left: 60%; animation-delay: 10s; }
        .particle:nth-child(7) { width: 3px; height: 3px; left: 70%; animation-delay: 12s; }
        .particle:nth-child(8) { width: 5px; height: 5px; left: 80%; animation-delay: 14s; }

        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        .container {
            position: relative;
            z-index: 10;
            max-width: 420px;
            margin: 0 auto;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .auth-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 50px 40px;
            border-radius: 24px;
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.05);
            width: 100%;
            animation: slideUp 0.8s ease-out;
            position: relative;
            overflow: hidden;
        }

        .auth-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #667eea, transparent);
            animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .logo {
            text-align: center;
            margin-bottom: 40px;
        }

        .logo i {
            font-size: 48px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 16px;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        h1 {
            color: #2d3748;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            text-align: center;
        }

        .subtitle {
            color: #718096;
            text-align: center;
            margin-bottom: 40px;
            font-size: 16px;
        }

        .form-group {
            margin-bottom: 24px;
            position: relative;
        }

        .form-group.hidden {
            display: none;
            animation: fadeIn 0.3s ease-in-out;
        }

        .form-group.visible {
            display: block;
            animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #4a5568;
            font-weight: 500;
            font-size: 14px;
        }

        .input-group {
            position: relative;
        }

        .input-group i {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
            font-size: 16px;
            transition: color 0.3s ease;
        }

        input {
            width: 100%;
            padding: 16px 16px 16px 48px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            background: #ffffff;
            transition: all 0.3s ease;
            outline: none;
        }

        input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            transform: translateY(-1px);
        }

        input:focus + i {
            color: #667eea;
        }

        .btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            margin-top: 8px;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        .switch {
            text-align: center;
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
        }

        .switch-text {
            color: #718096;
            font-size: 14px;
            margin-bottom: 8px;
        }

        .switch-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .switch-link:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateY(-1px);
        }

        .message {
            padding: 16px;
            margin-bottom: 24px;
            border-radius: 12px;
            text-align: center;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .success {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            border: none;
        }

        .error {
            background: linear-gradient(135deg, #f56565, #e53e3e);
            color: white;
            border: none;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 480px) {
            .container {
                padding: 16px;
            }
            
            .auth-card {
                padding: 32px 24px;
                border-radius: 20px;
            }
            
            h1 {
                font-size: 24px;
            }
        }

        /* Dark mode toggle effect */
        .theme-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            cursor: pointer;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }

        .theme-toggle i {
            color: white;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <button class="theme-toggle" onclick="toggleTheme()">
        <i class="fas fa-moon"></i>
    </button>

    <div class="container">
        <div class="auth-card">
            <div class="logo">
                <i class="fas fa-shield-alt"></i>
            </div>
            
            <h1 id="formTitle">Iniciar Sesión</h1>
            <p class="subtitle" id="formSubtitle">Accede a tu cuenta de forma segura</p>
            
            <div id="message"></div>
            
            <form id="authForm">
                <div id="nameGroup" class="form-group hidden">
                    <label for="name">Nombre Completo</label>
                    <div class="input-group">
                        <input type="text" id="name" placeholder="Ingresa tu nombre completo">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <div class="input-group">
                        <input type="email" id="email" placeholder="tu@email.com" required>
                        <i class="fas fa-envelope"></i>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <div class="input-group">
                        <input type="password" id="password" placeholder="Mínimo 6 caracteres" required>
                        <i class="fas fa-lock"></i>
                    </div>
                </div>
                
                <button type="submit" class="btn" id="submitBtn">
                    <span id="btnText">Iniciar Sesión</span>
                </button>
            </form>
            
            <div class="switch">
                <div class="switch-text" id="switchText">¿No tienes una cuenta?</div>
                <a href="#" class="switch-link" id="switchMode">Crear cuenta nueva</a>
            </div>
        </div>
    </div>

    <script>
        const form = document.getElementById('authForm');
        const nameGroup = document.getElementById('nameGroup');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const switchMode = document.getElementById('switchMode');
        const switchText = document.getElementById('switchText');
        const formTitle = document.getElementById('formTitle');
        const formSubtitle = document.getElementById('formSubtitle');
        const messageDiv = document.getElementById('message');
        
        let isLogin = true;
        let isLoading = false;

        // Cambiar entre login y registro
        switchMode.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLoading) return;
            
            isLogin = !isLogin;
            
            if (isLogin) {
                nameGroup.className = 'form-group hidden';
                btnText.textContent = 'Iniciar Sesión';
                switchText.textContent = '¿No tienes una cuenta?';
                switchMode.textContent = 'Crear cuenta nueva';
                formTitle.textContent = 'Iniciar Sesión';
                formSubtitle.textContent = 'Accede a tu cuenta de forma segura';
            } else {
                nameGroup.className = 'form-group visible';
                btnText.textContent = 'Crear Cuenta';
                switchText.textContent = '¿Ya tienes una cuenta?';
                switchMode.textContent = 'Iniciar sesión aquí';
                formTitle.textContent = 'Crear Cuenta';
                formSubtitle.textContent = 'Únete a nuestra plataforma';
            }
            clearMessage();
        });

        // Enviar formulario
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (isLoading) return;
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            
            // Validaciones del frontend
            if (!isLogin && !name.trim()) {
                showMessage('El nombre es requerido', 'error');
                return;
            }
            
            if (!email.trim()) {
                showMessage('El email es requerido', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }
            
            setLoading(true);
            
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
                showMessage('Error de conexión. Intenta nuevamente.', 'error');
            } finally {
                setLoading(false);
            }
        });

        function setLoading(loading) {
            isLoading = loading;
            if (loading) {
                btnText.innerHTML = '<div class="loading"></div>Procesando...';
                submitBtn.disabled = true;
            } else {
                btnText.textContent = isLogin ? 'Iniciar Sesión' : 'Crear Cuenta';
                submitBtn.disabled = false;
            }
        }

        function showMessage(text, type) {
            messageDiv.innerHTML = `<div class="message ${type}">${text}</div>`;
            setTimeout(() => {
                if (type === 'error') {
                    clearMessage();
                }
            }, 5000);
        }

        function clearMessage() {
            messageDiv.innerHTML = '';
        }

        function toggleTheme() {
            // Placeholder para funcionalidad de tema
            const toggle = document.querySelector('.theme-toggle i');
            toggle.classList.toggle('fa-moon');
            toggle.classList.toggle('fa-sun');
        }

        // Verificar si ya está logueado
        if (localStorage.getItem('token')) {
            window.location.href = '/dashboard.html';
        }

        // Animación de entrada para inputs
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.style.transform = 'scale(1)';
            });
        });
    </script>
</body>
</html>
EOF

# ========================================
# DASHBOARD MODERNO (public/dashboard.html)
# ========================================

cat > public/dashboard.html << 'EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sistema de Autenticación</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f7fafc;
            min-height: 100vh;
            color: #2d3748;
        }

        /* Animated gradient background */
        .bg-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            opacity: 0.05;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Navbar */
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 20px 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .nav-brand i {
            font-size: 32px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-brand h1 {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #2d3748, #4a5568);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .user-info:hover {
            background: rgba(102, 126, 234, 0.15);
            transform: translateY(-1px);
        }

        .user-avatar {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
        }

        .user-name {
            font-weight: 600;
            color: #2d3748;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-danger {
            background: linear-gradient(135deg, #fc8181, #f56565);
            color: white;
            box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
        }

        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(245, 101, 101, 0.4);
        }

        .btn-secondary {
            background: rgba(74, 85, 104, 0.1);
            color: #4a5568;
            border: 1px solid rgba(74, 85, 104, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(74, 85, 104, 0.15);
            transform: translateY(-1px);
        }

        /* Main Content */
        .main-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        .welcome-section {
            text-align: center;
            margin-bottom: 48px;
            animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .welcome-title {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #2d3748, #4a5568);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .welcome-subtitle {
            font-size: 20px;
            color: #718096;
            max-width: 600px;
            margin: 0 auto;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 48px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            padding: 32px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            animation: slideInLeft 0.8s ease-out;
        }

        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.4s; }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 24px;
            color: white;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .stat-value {
            font-size: 32px;
            font-weight: 800;
            color: #2d3748;
            margin-bottom: 8px;
        }

        .stat-label {
            color: #718096;
            font-size: 16px;
            font-weight: 500;
        }

        .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            margin-bottom: 48px;
        }

        .action-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeIn 1s ease-out;
        }

        .action-card:nth-child(2) { animation-delay: 0.3s; }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .action-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
        }

        .action-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #48bb78, #38a169);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
        }

        .action-title {
            font-size: 24px;
            font-weight: 700;
            color: #2d3748;
        }

        .action-description {
            color: #718096;
            margin-bottom: 24px;
            line-height: 1.6;
        }

        .test-result {
            margin-top: 20px;
            padding: 16px;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .test-result.success {
            background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
            color: #22543d;
            border: 1px solid #9ae6b4;
        }

        .test-result.error {
            background: linear-gradient(135deg, #fed7d7, #feb2b2);
            color: #742a2a;
            border: 1px solid #feb2b2;
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.3s ease;
        }

        .spinner {
            width: 60px;
            height: 60px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 24px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-text {
            font-size: 18px;
            color: #4a5568;
            font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 16px;
                flex-direction: column;
                gap: 16px;
            }

            .nav-actions {
                width: 100%;
                justify-content: space-between;
            }

            .main-container {
                padding: 24px 16px;
            }

            .welcome-title {
                font-size: 36px;
            }

            .welcome-subtitle {
                font-size: 18px;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .actions-grid {
                grid-template-columns: 1fr;
            }

            .user-info {
                flex: 1;
                justify-content: center;
            }
        }

        /* Floating action button */
        .fab {
            position: fixed;
            bottom: 32px;
            right: 32px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .fab:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
        }
    </style>
</head>
<body>
    <div class="bg-animation"></div>

    <!-- Loading Overlay -->
    <div id="loadingOverlay" class="loading-overlay">
        <div class="spinner"></div>
        <div class="loading-text">Cargando tu dashboard...</div>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <i class="fas fa-shield-alt"></i>
                <h1>AuthDash</h1>
            </div>
            <div class="nav-actions">
                <div class="user-info" id="userInfo">
                    <div class="user-avatar" id="userAvatar">U</div>
                    <div class="user-name" id="userNameNav">Usuario</div>
                </div>
                <button class="btn btn-danger" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="main-container">
        <!-- Welcome Section -->
        <div class="welcome-section">
            <h1 class="welcome-title">¡Bienvenido de vuelta!</h1>
            <p class="welcome-subtitle">Tu dashboard está listo. Explora las funcionalidades y gestiona tu cuenta de forma segura.</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="stat-value" id="userId">-</div>
                <div class="stat-label">ID de Usuario</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-value" id="sessionTime">00:00</div>
                <div class="stat-label">Tiempo de Sesión</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-shield-check"></i>
                </div>
                <div class="stat-value">100%</div>
                <div class="stat-label">Seguridad</div>
            </div>
        </div>

        <!-- Actions Grid -->
        <div class="actions-grid">
            <div class="action-card">
                <div class="action-header">
                    <div class="action-icon">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h3 class="action-title">Información Personal</h3>
                </div>
                <p class="action-description">
                    Revisa y gestiona tu información personal registrada en el sistema.
                </p>
                <div class="user-details">
                    <div style="margin-bottom: 16px;">
                        <strong style="color: #4a5568;">Nombre:</strong>
                        <div style="color: #2d3748; font-size: 18px;" id="userName">-</div>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <strong style="color: #4a5568;">Email:</strong>
                        <div style="color: #2d3748; font-size: 18px;" id="userEmail">-</div>
                    </div>
                    <div>
                        <strong style="color: #4a5568;">Estado:</strong>
                        <span style="color: #38a169; font-weight: 600;">
                            <i class="fas fa-check-circle"></i> Activo
                        </span>
                    </div>
                </div>
            </div>

            <div class="action-card">
                <div class="action-header">
                    <div class="action-icon">
                        <i class="fas fa-cog"></i>
                    </div>
                    <h3 class="action-title">Pruebas del Sistema</h3>
                </div>
                <p class="action-description">
                    Verifica que todas las funcionalidades de autenticación estén funcionando correctamente.
                </p>
                <button class="btn btn-primary" onclick="testProtectedRoute()">
                    <i class="fas fa-flask"></i>
                    Probar Ruta Protegida
                </button>
                <button class="btn btn-secondary" onclick="refreshProfile()" style="margin-left: 12px;">
                    <i class="fas fa-sync-alt"></i>
                    Actualizar Perfil
                </button>
                <div id="testResult"></div>
            </div>
        </div>
    </div>

    <!-- Floating Action Button -->
    <div class="fab" onclick="showQuickActions()">
        <i class="fas fa-plus"></i>
    </div>

    <script>
        let sessionStartTime = Date.now();
        let sessionTimer;

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
                    // Actualizar información del usuario
                    document.getElementById('userName').textContent = result.user.name;
                    document.getElementById('userNameNav').textContent = result.user.name;
                    document.getElementById('userEmail').textContent = result.user.email;
                    document.getElementById('userId').textContent = result.user.id;
                    
                    // Actualizar avatar con inicial del nombre
                    const initial = result.user.name.charAt(0).toUpperCase();
                    document.getElementById('userAvatar').textContent = initial;
                    
                    // Ocultar loading y mostrar contenido
                    setTimeout(() => {
                        document.getElementById('loadingOverlay').style.opacity = '0';
                        setTimeout(() => {
                            document.getElementById('loadingOverlay').style.display = 'none';
                        }, 300);
                    }, 1000); // Delay para mostrar el loading bonito
                    
                    // Iniciar contador de sesión
                    startSessionTimer();
                } else {
                    throw new Error('Usuario no válido');
                }
            } catch (error) {
                console.error('Error:', error);
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        }

        function startSessionTimer() {
            sessionTimer = setInterval(() => {
                const elapsed = Date.now() - sessionStartTime;
                const minutes = Math.floor(elapsed / 60000);
                const seconds = Math.floor((elapsed % 60000) / 1000);
                document.getElementById('sessionTime').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        async function testProtectedRoute() {
            const token = localStorage.getItem('token');
            const resultDiv = document.getElementById('testResult');
            const btn = event.target;
            
            // Cambiar botón a estado de carga
            const originalText = btn.innerHTML;
            btn.innerHTML = '<div class="loading" style="width: 16px; height: 16px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; display: inline-block; margin-right: 8px;"></div>Probando...';
            btn.disabled = true;

            try {
                const response = await fetch('/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();
                
                if (result.success) {
                    resultDiv.innerHTML = '<div class="test-result success"><i class="fas fa-check-circle"></i> ¡Perfecto! Ruta protegida accesible - Token válido</div>';
                } else {
                    resultDiv.innerHTML = '<div class="test-result error"><i class="fas fa-times-circle"></i> Error: ' + result.message + '</div>';
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="test-result error"><i class="fas fa-exclamation-triangle"></i> Error de conexión con el servidor</div>';
            } finally {
                // Restaurar botón
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1000);
            }
        }

        async function refreshProfile() {
            const btn = event.target;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<div class="loading" style="width: 16px; height: 16px; border: 2px solid #4a5568; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; display: inline-block; margin-right: 8px;"></div>Actualizando...';
            btn.disabled = true;
            
            await loadUserProfile();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        }

        function logout() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                clearInterval(sessionTimer);
                localStorage.removeItem('token');
                
                // Animación de salida
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    window.location.href = '/';
                }, 300);
            }
        }

        function showQuickActions() {
            alert('🚀 Próximamente: Menú de acciones rápidas');
        }

        // Cargar perfil al cargar la página
        loadUserProfile();

        // Efectos de interacción
        document.addEventListener('DOMContentLoaded', function() {
            // Efecto parallax sutil
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.bg-animation');
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            });

            // Animación de las tarjetas al hacer hover
            document.querySelectorAll('.stat-card, .action-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });

        // Atajos de teclado
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey || event.metaKey) {
                switch(event.key) {
                    case 'q':
                        event.preventDefault();
                        logout();
                        break;
                    case 'r':
                        event.preventDefault();
                        refreshProfile();
                        break;
                    case 't':
                        event.preventDefault();
                        testProtectedRoute();
                        break;
                }
            }
        });
    </script>
</body>
</html>
EOF

echo ""
echo "🎨 ¡DISEÑO SÚPER ESTÉTICO CREADO!"
echo ""
echo "✨ Características del nuevo diseño:"
echo "   🌈 Gradientes animados y colores vibrantes"
echo "   🌟 Efectos glassmorphism y backdrop blur"
echo "   ⚡ Animaciones suaves y micro-interacciones"
echo "   🎯 Partículas flotantes en el login"
echo "   💫 Efectos hover y estados de carga"
echo "   📱 Diseño completamente responsive"
echo "   🎨 Iconos de Font Awesome"
echo "   🚀 Loading states y transiciones fluidas"
echo ""
echo "🎯 Para ver el resultado:"
echo "   npm start"
echo "   http://localhost:3000"
echo ""
echo "💎 ¡Prepárate para el WOW factor!"