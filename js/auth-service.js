/* ========================================
   SERVICIO DE AUTENTICACIÓN - CRM INTEGRATION
   ======================================== */

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

// Clase principal para manejar la autenticación
class AuthService {
    constructor() {
        this.baseUrl = API_CONFIG.baseUrl;
        this.token = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
        this.isAuthenticated = false;
        
        // Verificar autenticación al inicializar
        this.checkInitialAuth();
    }

    // Método para hacer requests a la API
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

    // Login de usuario web
    async login(email, password) {
        try {
            console.log('Intentando login con:', email);
            
            const data = await this.request(API_CONFIG.endpoints.login, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.success) {
                this.token = data.data.token;
                this.user = data.data.user;
                this.isAuthenticated = true;
                
                // Guardar en localStorage
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(this.user));
                localStorage.setItem('is_authenticated', 'true');
                
                console.log('Login exitoso:', this.user);
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error en login:', error);
            this.isAuthenticated = false;
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
                this.isAuthenticated = true;
                
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(this.user));
                localStorage.setItem('is_authenticated', 'true');
                
                return data.data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error en client login:', error);
            this.isAuthenticated = false;
            throw error;
        }
    }

    // Verificar si está autenticado
    async checkAuth() {
        try {
            const data = await this.request(API_CONFIG.endpoints.check);
            this.isAuthenticated = data.success && data.authenticated;
            return data;
        } catch (error) {
            console.error('Error verificando auth:', error);
            this.isAuthenticated = false;
            return { success: false, authenticated: false };
        }
    }

    // Obtener información del usuario
    async getMe() {
        try {
            const data = await this.request(API_CONFIG.endpoints.me);
            if (data.success) {
                this.user = data.data;
                localStorage.setItem('user_data', JSON.stringify(this.user));
            }
            return data;
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            throw error;
        }
    }

    // Logout
    async logout() {
        try {
            if (this.token) {
                await this.request(API_CONFIG.endpoints.logout, {
                    method: 'POST'
                });
            }
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            // Limpiar datos locales siempre
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('is_authenticated');
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
            // Si falla el refresh, hacer logout
            await this.logout();
            throw error;
        }
    }

    // Verificar autenticación inicial
    async checkInitialAuth() {
        try {
            const authStatus = await this.checkAuth();
            if (authStatus.success && authStatus.authenticated) {
                this.isAuthenticated = true;
                // Cargar datos del usuario si no están en localStorage
                if (!this.user) {
                    const userData = await this.getMe();
                    this.user = userData.data;
                }
            }
        } catch (error) {
            console.log('Usuario no autenticado inicialmente');
            this.isAuthenticated = false;
        }
    }

    // Getters
    isLoggedIn() {
        return this.isAuthenticated && !!this.token && !!this.user;
    }

    getToken() {
        return this.token;
    }

    getUser() {
        return this.user;
    }

    // Verificar si el usuario tiene agencia
    hasAgency() {
        return this.user && this.user.has_agency && this.user.agency;
    }

    // Obtener nombre de la agencia
    getAgencyName() {
        return this.user && this.user.agency ? this.user.agency.name : null;
    }

    // Obtener avatar del usuario
    getUserAvatar() {
        if (this.user && this.user.avatar) {
            return this.user.avatar;
        }
        // Generar avatar con iniciales
        if (this.user && this.user.name) {
            const initials = this.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
            return `https://via.placeholder.com/50x50/3B82F6/FFFFFF?text=${initials}`;
        }
        return 'https://via.placeholder.com/50x50/6B7280/FFFFFF?text=U';
    }
}

// Instancia global del servicio de autenticación
window.authService = new AuthService();

// Funciones de utilidad para la UI
window.AuthUtils = {
    // Mostrar loading
    showLoading(elementId = 'loading') {
        const loading = document.getElementById(elementId);
        if (loading) {
            loading.style.display = 'block';
        }
    },

    // Ocultar loading
    hideLoading(elementId = 'loading') {
        const loading = document.getElementById(elementId);
        if (loading) {
            loading.style.display = 'none';
        }
    },

    // Mostrar mensaje de éxito
    showSuccess(message, duration = 3000) {
        this.showNotification(message, 'success', duration);
    },

    // Mostrar mensaje de error
    showError(message, duration = 5000) {
        this.showNotification(message, 'error', duration);
    },

    // Mostrar notificación
    showNotification(message, type = 'info', duration = 3000) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;

        // Colores según tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Agregar animación CSS si no existe
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remover después del tiempo especificado
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, duration);
    },

    // Actualizar UI de autenticación
    updateAuthUI() {
        const isLoggedIn = authService.isLoggedIn();
        const user = authService.getUser();

        // Actualizar botones de login/logout
        const loginButtons = document.querySelectorAll('.auth-button, .login-btn');
        const logoutButtons = document.querySelectorAll('.logout-btn');
        const userInfo = document.querySelectorAll('.user-info, .user-profile');

        if (isLoggedIn && user) {
            // Usuario logueado
            loginButtons.forEach(btn => btn.style.display = 'none');
            logoutButtons.forEach(btn => btn.style.display = 'block');
            userInfo.forEach(info => {
                info.innerHTML = `
                    <div class="user-profile-info">
                        <img src="${authService.getUserAvatar()}" alt="Avatar" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                        <div class="user-details">
                            <div class="user-name">${user.name}</div>
                            <div class="user-email">${user.email}</div>
                            ${authService.hasAgency() ? `<div class="user-agency">${authService.getAgencyName()}</div>` : ''}
                        </div>
                    </div>
                `;
                info.style.display = 'block';
            });
        } else {
            // Usuario no logueado
            loginButtons.forEach(btn => btn.style.display = 'block');
            logoutButtons.forEach(btn => btn.style.display = 'none');
            userInfo.forEach(info => info.style.display = 'none');
        }
    }
};

// Exportar para uso global
window.AuthService = AuthService;
