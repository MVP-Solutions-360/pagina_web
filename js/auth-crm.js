/* ========================================
   SISTEMA DE AUTENTICACIÓN CRM - NUEVO
   ======================================== */

class AuthSystemCRM {
    constructor() {
        this.baseUrl = 'https://mvpsolutions365.com/api/v1';
        this.token = localStorage.getItem('auth_token');
        this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.setupNavigationProtection();
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
        const protectedPages = ['muro-agencias.html', 'packages.html'];
        
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
            // Sistema de verificación de prueba
            if (this.token.startsWith('test_token_')) {
                // Verificar que el usuario existe en localStorage
                const userData = localStorage.getItem('user_data');
                if (userData) {
                    this.user = JSON.parse(userData);
                    this.isAuthenticated = true;
                    this.updateUIForAuthenticated();
                    console.log('✅ Usuario autenticado (modo prueba):', this.user.name);
                    return true;
                }
            }
            
            // Código original para cuando el CRM esté disponible
            /*
            const response = await fetch(`${this.baseUrl}/auth/check`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.authenticated) {
                    this.isAuthenticated = true;
                    this.updateUIForAuthenticated();
                    return true;
                }
            }
            
            // Si la verificación falla (401, 403, etc.), limpiar datos
            if (response.status === 401 || response.status === 403) {
                console.log('Token inválido o expirado, limpiando sesión');
                this.logout(false);
                this.updateUIForUnauthenticated();
                return false;
            }
            
            // Para otros errores, mantener el estado actual
            this.updateUIForUnauthenticated();
            return false;
            */
            
            // Si no es un token de prueba válido, limpiar sesión
            this.logout(false);
            this.updateUIForUnauthenticated();
            return false;
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            this.logout();
            return false;
        }
    }

    async login(email, password) {
        try {
            console.log('Intentando login con:', email);
            
            // Sistema de autenticación de prueba
            if (email === 'maicol.londono@mvpsolutions.com' && password === '12345678') {
                // Simular respuesta exitosa
                this.token = 'test_token_' + Date.now();
                this.user = {
                    id: 1,
                    name: 'Maicol Londono',
                    email: 'maicol.londono@mvpsolutions.com',
                    agency: {
                        id: 1,
                        name: 'MVP Solutions',
                        nit: '900123456-1'
                    },
                    role: 'admin'
                };
                
                this.isAuthenticated = true;
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(this.user));
                localStorage.setItem('is_authenticated', 'true');
                
                console.log('✅ Login exitoso (modo prueba):', this.user);
                this.updateUIForAuthenticated();
                this.hideLoginModal();
                
                // Mostrar notificación de éxito
                this.showNotification(`¡Bienvenido, ${this.user.name}!`, 'success');
                
                // Redireccionar al inicio después del login exitoso
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
                return { success: true, user: this.user };
            } else {
                throw new Error('Credenciales incorrectas');
            }
            
            // Código original para cuando el CRM esté disponible
            /*
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
                this.isAuthenticated = true;
                
                localStorage.setItem('auth_token', this.token);
                localStorage.setItem('user_data', JSON.stringify(this.user));
                localStorage.setItem('is_authenticated', 'true');
                
                console.log('Login exitoso:', this.user);
                this.updateUIForAuthenticated();
                this.hideLoginModal();
                
                // Mostrar notificación de éxito
                this.showNotification(`¡Bienvenido, ${this.user.name}!`, 'success');
                
                return { success: true, user: this.user };
            } else {
                throw new Error(data.message || 'Error en el login');
            }
            */
        } catch (error) {
            console.error('Error en login:', error);
            this.isAuthenticated = false;
            
            // Mostrar notificación de error
            this.showNotification(error.message || 'Error al iniciar sesión', 'error');
            
            throw error;
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

        // Limpiar datos locales
        this.token = null;
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('is_authenticated');
        
        this.updateUIForUnauthenticated();
        this.showNotification('Sesión cerrada exitosamente', 'info');
    }

    isAuthenticated() {
        return this.isAuthenticated && !!this.token && !!this.user;
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }

    // UI Methods
    updateUIForAuthenticated() {
        const loginButtons = document.querySelectorAll('.auth-button, .login-btn');
        const logoutButtons = document.querySelectorAll('.logout-btn');
        const userInfo = document.querySelectorAll('.user-info, .user-profile');

        if (this.user) {
            // Ocultar botones de login
            loginButtons.forEach(btn => {
                btn.style.display = 'none';
            });

            // Mostrar botones de logout
            logoutButtons.forEach(btn => {
                btn.style.display = 'block';
            });

            // Actualizar información del usuario
            userInfo.forEach(info => {
                info.innerHTML = `
                    <div class="user-profile-info" style="display: flex; align-items: center; gap: 10px; position: relative;">
                        <img src="${this.getUserAvatar()}" alt="Avatar" class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;" onclick="this.nextElementSibling.classList.toggle('show')">
                        <div class="user-details">
                            <div class="user-name" style="font-weight: 600; color: #1f2937; cursor: pointer;" onclick="this.parentElement.nextElementSibling.classList.toggle('show')">${this.user.name}</div>
                            ${this.hasAgency() ? `<div class="user-agency" style="font-size: 0.8rem; color: #3b82f6;">${this.getAgencyName()}</div>` : ''}
                        </div>
                        <div class="user-dropdown" style="position: absolute; top: 100%; right: 0; background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); min-width: 200px; z-index: 1000; display: none;">
                            <div class="dropdown-header" style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                                <div class="user-name" style="font-weight: 600; color: #1f2937;">${this.user.name}</div>
                                ${this.hasAgency() ? `<div class="user-agency" style="font-size: 0.8rem; color: #3b82f6;">${this.getAgencyName()}</div>` : ''}
                            </div>
                            <div class="dropdown-menu" style="padding: 8px 0;">
                                <a href="dashboard.html" class="dropdown-item" style="display: block; padding: 8px 16px; color: #374151; text-decoration: none; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='transparent'">
                                    <i class="fas fa-tachometer-alt" style="margin-right: 8px; width: 16px;"></i>Dashboard
                                </a>
                                <a href="packages.html" class="dropdown-item" style="display: block; padding: 8px 16px; color: #374151; text-decoration: none; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='transparent'">
                                    <i class="fas fa-suitcase" style="margin-right: 8px; width: 16px;"></i>Mis Paquetes
                                </a>
                                <div class="dropdown-divider" style="height: 1px; background: #e5e7eb; margin: 8px 0;"></div>
                                <button onclick="authSystem.logout()" class="dropdown-item" style="display: block; width: 100%; padding: 8px 16px; color: #dc2626; text-decoration: none; background: none; border: none; text-align: left; cursor: pointer; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#fef2f2'" onmouseout="this.style.backgroundColor='transparent'">
                                    <i class="fas fa-sign-out-alt" style="margin-right: 8px; width: 16px;"></i>Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                info.style.display = 'block';
            });

            // Agregar event listener para cerrar dropdown al hacer clic fuera
            this.setupUserDropdownListeners();
        }
    }

    setupUserDropdownListeners() {
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', (e) => {
            const userDropdowns = document.querySelectorAll('.user-dropdown');
            const userProfiles = document.querySelectorAll('.user-profile-info');
            
            userDropdowns.forEach(dropdown => {
                const profileInfo = dropdown.closest('.user-profile-info');
                if (profileInfo && !profileInfo.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
        });
    }

    updateUIForUnauthenticated() {
        const loginButtons = document.querySelectorAll('.auth-button, .login-btn');
        const logoutButtons = document.querySelectorAll('.logout-btn');
        const userInfo = document.querySelectorAll('.user-info, .user-profile');

        // Mostrar botones de login
        loginButtons.forEach(btn => {
            btn.style.display = 'block';
        });

        // Ocultar botones de logout
        logoutButtons.forEach(btn => {
            btn.style.display = 'none';
        });

        // Ocultar información del usuario
        userInfo.forEach(info => {
            info.style.display = 'none';
        });
    }

    // Helper methods
    hasAgency() {
        return this.user && this.user.has_agency && this.user.agency;
    }

    getAgencyName() {
        return this.user && this.user.agency ? this.user.agency.name : null;
    }

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

    // Modal methods
    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'flex';
        } else {
            this.createLoginModal();
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    createLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'loginModal';
        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            ">
                <div class="modal-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                ">
                    <h3 style="margin: 0; color: #1f2937;">Iniciar Sesión</h3>
                    <button onclick="authSystem.hideLoginModal()" style="
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #6b7280;
                    ">&times;</button>
                </div>
                
                <form id="loginForm" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="form-group">
                        <label for="loginEmail" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Email:</label>
                        <input type="email" id="loginEmail" required style="
                            width: 100%;
                            padding: 0.75rem;
                            border: 1px solid #d1d5db;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    
                    <div class="form-group">
                        <label for="loginPassword" style="display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500;">Contraseña:</label>
                        <input type="password" id="loginPassword" required style="
                            width: 100%;
                            padding: 0.75rem;
                            border: 1px solid #d1d5db;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    
                    <button type="submit" style="
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
                        Iniciar Sesión
                    </button>
                </form>
                
                <div id="loginError" style="
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    color: #dc2626;
                    display: none;
                "></div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // Configurar formulario
        const form = modal.querySelector('#loginForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const errorDiv = document.getElementById('loginError');
            
            try {
                errorDiv.style.display = 'none';
                await this.login(email, password);
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            }
        });
    }

    // Notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            background: ${colors[type] || colors.info};
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }
}

// Crear instancia global
window.authSystem = new AuthSystemCRM();
