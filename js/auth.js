// ===== SISTEMA DE AUTENTICACIÓN DE CLIENTES =====
// Maneja login, logout, gestión de tokens y estado de autenticación

class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.token = null;
        this.tokenExpiry = null;
        
        // Inicializar al cargar
        this.init();
        
        // Eventos globales
        this.setupGlobalEvents();
    }

    // ===== INICIALIZACIÓN =====
    
    init() {
        // Verificar si hay un token válido en localStorage
        this.checkStoredAuth();
        
        // Actualizar UI del header
        this.updateHeaderUI();
        
        console.log('🔐 AuthManager inicializado');
    }

    // ===== VERIFICACIÓN DE AUTENTICACIÓN =====
    
    checkStoredAuth() {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('auth_user');
        const expiry = localStorage.getItem('auth_expiry');

        if (token && userData && expiry) {
            const now = new Date().getTime();
            if (now < parseInt(expiry)) {
                // Token válido
                this.token = token;
                this.currentUser = JSON.parse(userData);
                this.tokenExpiry = parseInt(expiry);
                this.isAuthenticated = true;
                
                console.log('✅ Usuario autenticado desde localStorage:', this.currentUser.name);
                
                // Verificar si el token sigue siendo válido en el servidor
                this.validateToken();
            } else {
                // Token expirado
                this.clearAuth();
                console.log('⚠️ Token expirado, limpiando autenticación');
            }
        }
    }

    async validateToken() {
        try {
            const response = await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/profile`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                // Token inválido
                this.clearAuth();
                console.log('❌ Token inválido, limpiando autenticación');
            }
        } catch (error) {
            console.error('Error validando token:', error);
            // En caso de error de red, mantener la sesión
        }
    }

    // ===== LOGIN =====
    
    async login(email, password) {
        try {
            console.log('🔐 Intentando login para:', email);
            
            // Mostrar estado de carga
            this.showLoadingState();

            const response = await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Login exitoso
                await this.handleSuccessfulLogin(data.data);
                return { success: true, message: 'Login exitoso' };
            } else {
                // Error en login
                throw new Error(data.message || 'Error en el login');
            }

        } catch (error) {
            console.error('❌ Error en login:', error);
            return { 
                success: false, 
                message: error.message || 'Error de conexión. Intenta nuevamente.' 
            };
        } finally {
            this.hideLoadingState();
        }
    }

    async handleSuccessfulLogin(loginData) {
        // Guardar datos de autenticación
        this.token = loginData.token;
        this.currentUser = loginData.client;
        this.isAuthenticated = true;
        
        // Calcular expiración del token (24 horas por defecto)
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
        this.tokenExpiry = expiry;

        // Guardar en localStorage
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
        localStorage.setItem('auth_expiry', expiry.toString());

        console.log('✅ Login exitoso para:', this.currentUser.name);

        // Actualizar UI
        this.updateHeaderUI();
        
        // Redireccionar al dashboard
        this.redirectToDashboard();
    }

    // ===== LOGOUT =====
    
    async logout() {
        try {
            if (this.token) {
                // Llamar a la API para invalidar el token
                await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Error en logout API:', error);
        } finally {
            // Limpiar autenticación local
            this.clearAuth();
            
            // Redireccionar a la página principal
            window.location.href = './index.html';
        }
    }

    clearAuth() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.token = null;
        this.tokenExpiry = null;

        // Limpiar localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_expiry');

        // Actualizar UI
        this.updateHeaderUI();

        console.log('🔓 Sesión cerrada');
    }

    // ===== GESTIÓN DE TOKENS =====
    
    getAuthHeaders() {
        if (this.token) {
            return {
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json'
            };
        }
        return {};
    }

    isTokenValid() {
        if (!this.token || !this.tokenExpiry) {
            return false;
        }
        
        const now = new Date().getTime();
        return now < this.tokenExpiry;
    }

    // ===== NAVEGACIÓN =====
    
    redirectToDashboard() {
        window.location.href = './dashboard.html';
    }

    redirectToLogin() {
        window.location.href = './login.html';
    }

    // ===== UI DEL HEADER =====
    
    updateHeaderUI() {
        const authButton = document.getElementById('auth-button');
        const userMenu = document.getElementById('user-menu');
        
        if (!authButton) return;

        if (this.isAuthenticated && this.currentUser) {
            // Usuario autenticado
            authButton.innerHTML = `
                <span class="auth-user">
                    <i class="fas fa-user-circle"></i>
                    ${this.currentUser.name}
                </span>
                <i class="fas fa-chevron-down"></i>
            `;
            authButton.classList.add('authenticated');
            
            // Mostrar menú de usuario
            if (userMenu) {
                userMenu.style.display = 'block';
                this.updateUserMenu();
            }
        } else {
            // Usuario no autenticado
            authButton.innerHTML = `
                <i class="fas fa-sign-in-alt"></i>
                Login
            `;
            authButton.classList.remove('authenticated');
            
            // Ocultar menú de usuario
            if (userMenu) {
                userMenu.style.display = 'none';
            }
        }
    }

    updateUserMenu() {
        const userMenu = document.getElementById('user-menu');
        if (!userMenu || !this.currentUser) return;

        userMenu.innerHTML = `
            <div class="user-info">
                <div class="user-name">${this.currentUser.name}</div>
                <div class="user-email">${this.currentUser.email}</div>
            </div>
            <ul class="user-actions">
                <li><a href="./dashboard.html"><i class="fas fa-tachometer-alt"></i> Mi Dashboard</a></li>
                <li><a href="./dashboard.html#quotations"><i class="fas fa-file-invoice"></i> Mis Cotizaciones</a></li>
                <li><a href="./dashboard.html#profile"><i class="fas fa-user-cog"></i> Mi Perfil</a></li>
                <li class="divider"></li>
                <li><a href="#" onclick="authManager.logout()"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a></li>
            </ul>
        `;
    }

    // ===== ESTADOS DE CARGA =====
    
    showLoadingState() {
        // Mostrar spinner o indicador de carga
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
    }

    hideLoadingState() {
        // Ocultar spinner o indicador de carga
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    // ===== EVENTOS GLOBALES =====
    
    setupGlobalEvents() {
        // Evento para botón de login
        document.addEventListener('click', (e) => {
            if (e.target.closest('#auth-button') && !this.isAuthenticated) {
                e.preventDefault();
                this.showLoginModal();
            }
        });

        // Evento para cerrar menú de usuario al hacer clic fuera
        document.addEventListener('click', (e) => {
            const userMenu = document.getElementById('user-menu');
            const authButton = document.getElementById('auth-button');
            
            if (userMenu && authButton && !userMenu.contains(e.target) && !authButton.contains(e.target)) {
                userMenu.style.display = 'none';
            }
        });

        // Evento para mostrar/ocultar menú de usuario
        document.addEventListener('click', (e) => {
            if (e.target.closest('#auth-button') && this.isAuthenticated) {
                e.preventDefault();
                const userMenu = document.getElementById('user-menu');
                if (userMenu) {
                    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    }

    // ===== MODAL DE LOGIN =====
    
    showLoginModal() {
        // Crear modal de login si no existe
        if (!document.getElementById('login-modal')) {
            this.createLoginModal();
        }
        
        const modal = document.getElementById('login-modal');
        modal.style.display = 'block';
        
        // Enfocar en el primer campo
        const emailInput = modal.querySelector('#login-email');
        if (emailInput) {
            emailInput.focus();
        }
    }

    createLoginModal() {
        const modalHTML = `
            <div id="login-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</h2>
                        <span class="close" onclick="this.parentElement.parentElement.parentElement.style.display='none'">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form id="login-form">
                            <div class="form-group">
                                <label for="login-email">Email</label>
                                <input type="email" id="login-email" name="email" required 
                                       placeholder="tu@email.com">
                            </div>
                            <div class="form-group">
                                <label for="login-password">Contraseña</label>
                                <input type="password" id="login-password" name="password" required 
                                       placeholder="Tu contraseña">
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                                </button>
                            </div>
                        </form>
                        <div class="login-help">
                            <p>¿No tienes cuenta? <a href="#" onclick="authManager.showRegisterModal()">Regístrate aquí</a></p>
                            <p>¿Olvidaste tu contraseña? <a href="#" onclick="authManager.showForgotPasswordModal()">Recupérala</a></p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Configurar formulario
        this.setupLoginForm();
    }

    setupLoginForm() {
        const form = document.getElementById('login-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = form.querySelector('#login-email').value;
            const password = form.querySelector('#login-password').value;
            
            // Validar campos
            if (!email || !password) {
                this.showError('Por favor completa todos los campos');
                return;
            }

            // Intentar login
            const result = await this.login(email, password);
            
            if (result.success) {
                // Cerrar modal
                document.getElementById('login-modal').style.display = 'none';
                
                // Mostrar mensaje de éxito
                this.showSuccess('Login exitoso. Redirigiendo...');
            } else {
                // Mostrar error
                this.showError(result.message);
            }
        });
    }

    // ===== MENSAJES =====
    
    showSuccess(message) {
        // Implementar notificación de éxito
        console.log('✅', message);
        // Aquí podrías usar SweetAlert2 o crear tu propio sistema de notificaciones
    }

    showError(message) {
        // Implementar notificación de error
        console.error('❌', message);
        // Aquí podrías usar SweetAlert2 o crear tu propio sistema de notificaciones
    }

    // ===== MÉTODOS ADICIONALES =====
    
    showRegisterModal() {
        // TODO: Implementar modal de registro
        console.log('Modal de registro - Por implementar');
    }

    showForgotPasswordModal() {
        // TODO: Implementar modal de recuperación de contraseña
        console.log('Modal de recuperación - Por implementar');
    }
}

// ===== INSTANCIA GLOBAL =====
const authManager = new AuthManager();

// ===== EXPOSICIÓN GLOBAL =====
window.AuthManager = authManager;
window.authManager = authManager;

// ===== INICIALIZACIÓN AL CARGAR =====
document.addEventListener('DOMContentLoaded', () => {
    // El AuthManager ya se inicializa en su constructor
    console.log('🚀 Sistema de autenticación listo');
});
