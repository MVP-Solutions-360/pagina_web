// ===== SISTEMA DE AUTENTICACIÓN REAL =====
// Integración con la API de autenticación del CRM

class AuthSystem {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/api/v1';
        this.token = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.testApiConnection();
    }

    setupEventListeners() {
        // Verificar autenticación en cada carga de página
        document.addEventListener('DOMContentLoaded', () => {
            this.checkAuthStatus();
        });

        // Interceptar navegación a páginas protegidas
        this.setupNavigationProtection();
    }

    setupNavigationProtection() {
        const protectedPages = ['muro-agencias.html', 'paquetes-destacados-nuevos.html'];
        
        protectedPages.forEach(page => {
            const links = document.querySelectorAll(`a[href="${page}"]`);
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (!this.isAuthenticated()) {
                        e.preventDefault();
                        this.showLoginModal();
                    }
                });
            });
        });
    }

    async checkAuthStatus() {
        if (!this.token) {
            this.updateUIForUnauthenticated();
            return false;
        }

        try {
            const response = await fetch(`${this.baseUrl}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                this.user = data.data;
                this.updateUIForAuthenticated();
                return true;
            } else {
                this.logout();
                return false;
            }
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            this.logout();
            return false;
        }
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.data.token;
                this.user = data.data.user;
                localStorage.setItem('auth_token', this.token);
                this.updateUIForAuthenticated();
                return { success: true, user: this.user };
            } else {
                return { 
                    success: false, 
                    error: this.getErrorMessage(data.error_code, data.message) 
                };
            }
        } catch (error) {
            console.error('Error en login:', error);
            
            // Manejo específico de errores de CORS
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                return { 
                    success: false, 
                    error: 'Error de conexión: Verifica que la API esté disponible y configurada para CORS' 
                };
            }
            
            return { 
                success: false, 
                error: 'Error de conexión con el servidor: ' + error.message 
            };
        }
    }

    async logout() {
        if (this.token) {
            try {
                await fetch(`${this.baseUrl}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Accept': 'application/json'
                    }
                });
            } catch (error) {
                console.error('Error en logout:', error);
            }
        }

        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
        this.updateUIForUnauthenticated();
        
        // Redirigir a la página principal si está en una página protegida
        const currentPage = window.location.pathname.split('/').pop();
        const protectedPages = ['muro-agencias.html', 'paquetes-destacados-nuevos.html'];
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
    }

    isAuthenticated() {
        return !!this.user && !!this.token;
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }

    getErrorMessage(errorCode, defaultMessage) {
        const errorMessages = {
            'INVALID_CREDENTIALS': 'Email o contraseña incorrectos',
            'EMAIL_NOT_VERIFIED': 'Debe verificar su email antes de continuar',
            'VALIDATION_ERROR': 'Datos inválidos',
            'LOGIN_ERROR': 'Error interno en el login',
            'UNAUTHENTICATED': 'Usuario no autenticado'
        };

        return errorMessages[errorCode] || defaultMessage || 'Error desconocido';
    }

    updateUIForAuthenticated() {
        // Actualizar botón de login
        const loginButtons = document.querySelectorAll('.auth-button, .nav-item[href*="login"]');
        loginButtons.forEach(button => {
            if (button.textContent.includes('Ingreso') || button.textContent.includes('Sign in')) {
                button.innerHTML = `
                    <i class="fas fa-user"></i>
                    ${this.user.name}
                `;
                button.onclick = (e) => {
                    e.preventDefault();
                    this.showUserMenu();
                };
            }
        });

        // Mostrar opciones de usuario autenticado
        this.showAuthenticatedOptions();
    }

    updateUIForUnauthenticated() {
        // Restaurar botón de login
        const loginButtons = document.querySelectorAll('.auth-button, .nav-item[href*="login"]');
        loginButtons.forEach(button => {
            if (button.textContent.includes(this.user?.name)) {
                button.innerHTML = `
                    <i class="fas fa-sign-in-alt"></i>
                    Ingreso
                `;
                button.onclick = (e) => {
                    e.preventDefault();
                    this.showLoginModal();
                };
            }
        });

        // Ocultar opciones de usuario autenticado
        this.hideAuthenticatedOptions();
    }

    showAuthenticatedOptions() {
        // Mostrar enlaces a páginas protegidas
        const protectedLinks = document.querySelectorAll('a[href*="muro-agencias"], a[href*="paquetes-destacados"]');
        protectedLinks.forEach(link => {
            link.style.display = 'block';
        });
    }

    hideAuthenticatedOptions() {
        // Ocultar enlaces a páginas protegidas
        const protectedLinks = document.querySelectorAll('a[href*="muro-agencias"], a[href*="paquetes-destacados"]');
        protectedLinks.forEach(link => {
            link.style.display = 'none';
        });
    }

    showLoginModal() {
        // Crear modal de login
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="login-modal-content">
                <div class="login-header">
                    <h2>Iniciar Sesión</h2>
                    <button class="close-modal" onclick="this.closest('.login-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Contraseña</label>
                        <input type="password" id="login-password" name="password" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="login-btn">
                            <i class="fas fa-sign-in-alt"></i>
                            Iniciar Sesión
                        </button>
                    </div>
                    <div class="login-error" id="login-error" style="display: none;"></div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Configurar formulario
        const form = document.getElementById('login-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLoginForm(e);
        });

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    async handleLoginForm(e) {
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const errorDiv = document.getElementById('login-error');
        const submitBtn = e.target.querySelector('.login-btn');

        // Mostrar loading
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        submitBtn.disabled = true;
        errorDiv.style.display = 'none';

        try {
            const result = await this.login(email, password);
            
            if (result.success) {
                // Cerrar modal
                e.target.closest('.login-modal').remove();
                
                // Mostrar mensaje de éxito
                this.showNotification('¡Bienvenido! Sesión iniciada correctamente', 'success');
            } else {
                // Mostrar error
                errorDiv.textContent = result.error;
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            errorDiv.textContent = 'Error de conexión. Inténtalo de nuevo.';
            errorDiv.style.display = 'block';
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showUserMenu() {
        // Crear menú de usuario
        const menu = document.createElement('div');
        menu.className = 'user-menu-dropdown';
        menu.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${this.user.name.charAt(0).toUpperCase()}</div>
                <div class="user-details">
                    <span class="user-name">${this.user.name}</span>
                    <span class="user-email">${this.user.email}</span>
                </div>
            </div>
            <div class="menu-actions">
                <a href="#" class="menu-item">
                    <i class="fas fa-user"></i>
                    Mi Perfil
                </a>
                <a href="#" class="menu-item">
                    <i class="fas fa-cog"></i>
                    Configuración
                </a>
                <hr>
                <button class="menu-item logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Cerrar Sesión
                </button>
            </div>
        `;

        // Posicionar menú
        const userButton = document.querySelector('.auth-button, .nav-item[href*="login"]');
        const rect = userButton.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = (rect.bottom + 5) + 'px';
        menu.style.right = '20px';
        menu.style.zIndex = '1000';

        document.body.appendChild(menu);

        // Configurar logout
        const logoutBtn = menu.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', () => {
            this.logout();
            menu.remove();
        });

        // Cerrar menú al hacer clic fuera
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !userButton.contains(e.target)) {
                    menu.remove();
                }
            });
        }, 100);
    }

    async testApiConnection() {
        try {
            // Probar conexión básica a la API
            const response = await fetch(`${this.baseUrl}/auth/check`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('API Status:', response.status);
            console.log('API Response:', await response.text());
            
        } catch (error) {
            console.error('Error de conexión con la API:', error);
            console.log('URL probada:', `${this.baseUrl}/auth/check`);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 100);

        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar sistema de autenticación
window.authSystem = new AuthSystem();
