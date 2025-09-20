# Guía de Integración - Landing Page con API de Autenticación

## 📋 Resumen de Integración

Esta guía te ayudará a integrar la API de autenticación del CRM con tu landing page. La API está funcionando correctamente y lista para ser utilizada.

## 🔗 Información de la API

### **URL Base:**
```
http://127.0.0.1:8000/api/v1
```

### **Endpoints Principales:**
- **Login Web:** `POST /auth/login`
- **Login Clientes:** `POST /client/login`
- **Verificar Auth:** `GET /auth/check`
- **Info Usuario:** `GET /auth/me`
- **Logout:** `POST /auth/logout`
- **Refresh Token:** `POST /auth/refresh`

## 🚀 Implementación en JavaScript

### **1. Configuración Base**

```javascript
// Configuración de la API
const API_CONFIG = {
    baseUrl: 'http://127.0.0.1:8000/api/v1',
    endpoints: {
        login: '/auth/login',
        clientLogin: '/client/login',
        check: '/auth/check',
        me: '/auth/me',
        logout: '/auth/logout',
        refresh: '/auth/refresh'
    }
};

// Clase para manejar la autenticación
class AuthAPI {
    constructor() {
        this.baseUrl = API_CONFIG.baseUrl;
        this.token = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
    }

    // Método para hacer requests
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        // Agregar token si existe
        if (this.token) {
            defaultOptions.headers['Authorization'] = `Bearer ${this.token}`;
        }

        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, finalOptions);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error en la solicitud');
            }
            
            return data;
        } catch (error) {
            console.error('Error en API:', error);
            throw error;
        }
    }
}
```

### **2. Métodos de Autenticación**

```javascript
// Extender la clase AuthAPI
class AuthService extends AuthAPI {
    
    // Login de usuario web
    async login(email, password) {
        try {
            const data = await this.request(API_CONFIG.endpoints.login, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.success) {
                this.token = data.data.token;
                this.user = data.data.user;
                
                // Guardar en localStorage
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(this.user));
                
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    // Login de cliente
    async clientLogin(email, password) {
        try {
            const data = await this.request(API_CONFIG.endpoints.clientLogin, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.success) {
                this.token = data.data.token;
                this.user = data.data.user;
                
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(this.user));
                
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error en client login:', error);
            throw error;
        }
    }

    // Verificar si está autenticado
    async checkAuth() {
        try {
            const data = await this.request(API_CONFIG.endpoints.check);
            return data;
        } catch (error) {
            console.error('Error verificando auth:', error);
            return { success: false, authenticated: false };
        }
    }

    // Obtener información del usuario
    async getMe() {
        try {
            const data = await this.request(API_CONFIG.endpoints.me);
            return data;
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            throw error;
        }
    }

    // Logout
    async logout() {
        try {
            const data = await this.request(API_CONFIG.endpoints.logout, {
                method: 'POST'
            });

            // Limpiar datos locales
            this.token = null;
            this.user = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');

            return data;
        } catch (error) {
            console.error('Error en logout:', error);
            // Limpiar datos locales aunque haya error
            this.token = null;
            this.user = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            throw error;
        }
    }

    // Refrescar token
    async refreshToken() {
        try {
            const data = await this.request(API_CONFIG.endpoints.refresh, {
                method: 'POST'
            });

            if (data.success) {
                this.token = data.data.token;
                localStorage.setItem('auth_token', this.token);
            }

            return data;
        } catch (error) {
            console.error('Error refrescando token:', error);
            throw error;
        }
    }

    // Verificar si está logueado
    isLoggedIn() {
        return !!this.token && !!this.user;
    }

    // Obtener token
    getToken() {
        return this.token;
    }

    // Obtener usuario
    getUser() {
        return this.user;
    }
}
```

### **3. Uso en tu Landing Page**

```javascript
// Inicializar el servicio de autenticación
const authService = new AuthService();

// Ejemplo de formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // Mostrar loading
                showLoading();
                
                // Intentar login
                const result = await authService.login(email, password);
                
                // Login exitoso
                showSuccess('Login exitoso!');
                console.log('Usuario logueado:', result.user);
                
                // Redirigir o actualizar UI
                handleSuccessfulLogin(result.user);
                
            } catch (error) {
                // Mostrar error
                showError(error.message);
                console.error('Error en login:', error);
            } finally {
                hideLoading();
            }
        });
    }
});

// Función para manejar login exitoso
function handleSuccessfulLogin(user) {
    // Ocultar formulario de login
    const loginSection = document.getElementById('loginSection');
    if (loginSection) {
        loginSection.style.display = 'none';
    }
    
    // Mostrar información del usuario
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.innerHTML = `
            <div class="user-welcome">
                <h3>¡Bienvenido, ${user.name}!</h3>
                <p>Email: ${user.email}</p>
                <p>Tipo: ${user.user_type}</p>
                ${user.agency ? `<p>Agencia: ${user.agency.name}</p>` : ''}
                <button onclick="logout()" class="btn btn-danger">Cerrar Sesión</button>
            </div>
        `;
        userInfo.style.display = 'block';
    }
    
    // Redirigir si es necesario
    // window.location.href = '/dashboard';
}

// Función de logout
async function logout() {
    try {
        await authService.logout();
        showSuccess('Sesión cerrada exitosamente');
        
        // Mostrar formulario de login
        const loginSection = document.getElementById('loginSection');
        if (loginSection) {
            loginSection.style.display = 'block';
        }
        
        // Ocultar información del usuario
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.style.display = 'none';
        }
        
    } catch (error) {
        showError('Error al cerrar sesión');
        console.error('Error en logout:', error);
    }
}

// Verificar autenticación al cargar la página
async function checkInitialAuth() {
    try {
        const authStatus = await authService.checkAuth();
        
        if (authStatus.success && authStatus.authenticated) {
            // Usuario ya está logueado
            const userData = await authService.getMe();
            handleSuccessfulLogin(userData.data);
        }
    } catch (error) {
        console.log('Usuario no autenticado');
    }
}

// Ejecutar verificación al cargar
checkInitialAuth();
```

### **4. Funciones de UI Helper**

```javascript
// Funciones para mostrar mensajes y loading
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'block';
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

function showSuccess(message) {
    // Implementar tu sistema de notificaciones
    console.log('Success:', message);
    // Ejemplo: mostrar toast o alert
    alert('✅ ' + message);
}

function showError(message) {
    // Implementar tu sistema de notificaciones
    console.error('Error:', message);
    // Ejemplo: mostrar toast o alert
    alert('❌ ' + message);
}
```

### **5. HTML de Ejemplo**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page - Login</title>
    <style>
        .container { max-width: 400px; margin: 50px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; }
        .form-group input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .btn { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-primary { background: #007bff; color: white; }
        .btn-danger { background: #dc3545; color: white; }
        .user-welcome { background: #f8f9fa; padding: 20px; border-radius: 4px; margin-top: 20px; }
        #loading { display: none; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Iniciar Sesión</h2>
        
        <!-- Loading -->
        <div id="loading">
            <p>Cargando...</p>
        </div>
        
        <!-- Formulario de Login -->
        <div id="loginSection">
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
        
        <!-- Información del Usuario -->
        <div id="userInfo" style="display: none;">
            <!-- Se llena dinámicamente -->
        </div>
    </div>

    <script src="auth-service.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

## 🔧 Configuración para Producción

### **1. Cambiar URL Base**

```javascript
// Para producción, cambiar la URL base
const API_CONFIG = {
    baseUrl: 'https://tu-dominio.com/api/v1', // Cambiar aquí
    endpoints: {
        // ... resto de endpoints
    }
};
```

### **2. Configurar CORS**

Asegúrate de que el servidor Laravel tenga configurado CORS para permitir requests desde tu dominio:

```php
// config/cors.php
'allowed_origins' => [
    'https://tu-landing-page.com',
    'http://localhost:3000', // Para desarrollo
],
```

### **3. Variables de Entorno**

```javascript
// Usar variables de entorno
const API_CONFIG = {
    baseUrl: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/v1',
    // ... resto de configuración
};
```

## 📝 Notas Importantes

1. **Tokens:** Los tokens expiran en 7 días, implementa refresh automático si es necesario
2. **Seguridad:** Siempre usa HTTPS en producción
3. **Manejo de Errores:** Implementa manejo robusto de errores
4. **Validación:** Valida los datos antes de enviarlos a la API
5. **Loading States:** Muestra estados de carga para mejor UX

## 🧪 Testing

```javascript
// Función para probar la API
async function testAPI() {
    const authService = new AuthService();
    
    try {
        // Test login
        const result = await authService.login('maicol.londono@mvpsolutions.com', '12345678');
        console.log('Login test passed:', result);
        
        // Test getMe
        const userInfo = await authService.getMe();
        console.log('GetMe test passed:', userInfo);
        
        // Test logout
        const logoutResult = await authService.logout();
        console.log('Logout test passed:', logoutResult);
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Ejecutar test
testAPI();
```

## 📞 Soporte

Si tienes problemas con la integración, verifica:

1. ✅ Que el servidor Laravel esté corriendo
2. ✅ Que la URL base sea correcta
3. ✅ Que los headers estén configurados correctamente
4. ✅ Que el usuario tenga email verificado
5. ✅ Que las credenciales sean correctas

---

**Versión:** 1.0  
**Última actualización:** Septiembre 2025  
**Estado:** ✅ Funcionando correctamente
