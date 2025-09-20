// ===== PROTECCIÓN DE PÁGINAS =====
// Middleware para proteger páginas que requieren autenticación

class PageProtection {
    constructor() {
        this.protectedPages = [
            'muro-agencias.html',
            'paquetes-destacados-nuevos.html'
        ];
        this.init();
    }

    init() {
        // Verificar si la página actual está protegida
        const currentPage = this.getCurrentPage();
        if (this.protectedPages.includes(currentPage)) {
            this.protectPage();
        }
    }

    getCurrentPage() {
        return window.location.pathname.split('/').pop();
    }

    async protectPage() {
        // Esperar a que el sistema de autenticación esté disponible
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos máximo
        
        while (!window.authSystem && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.authSystem) {
            console.error('Sistema de autenticación no disponible');
            this.redirectToLogin();
            return;
        }

        // Verificar si el usuario está autenticado
        const isAuthenticated = await window.authSystem.checkAuthStatus();
        
        if (!isAuthenticated) {
            this.showAccessDenied();
        } else {
            this.showProtectedContent();
        }
    }

    showAccessDenied() {
        // Ocultar contenido principal
        const mainContent = document.querySelector('main, .main-layout, .main-content');
        if (mainContent) {
            mainContent.style.display = 'none';
        }

        // Crear mensaje de acceso denegado
        const accessDeniedDiv = document.createElement('div');
        accessDeniedDiv.className = 'access-denied-container';
        accessDeniedDiv.innerHTML = `
            <div class="access-denied-content">
                <div class="access-denied-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h1>Acceso Restringido</h1>
                <p>Esta sección es solo para usuarios autenticados. Por favor, inicia sesión para continuar.</p>
                <div class="access-denied-actions">
                    <button class="btn btn-primary" onclick="authSystem.showLoginModal()">
                        <i class="fas fa-sign-in-alt"></i>
                        Iniciar Sesión
                    </button>
                    <a href="index.html" class="btn btn-secondary">
                        <i class="fas fa-home"></i>
                        Volver al Inicio
                    </a>
                </div>
            </div>
        `;

        // Insertar antes del footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.parentNode.insertBefore(accessDeniedDiv, footer);
        } else {
            document.body.appendChild(accessDeniedDiv);
        }

        // Agregar estilos si no existen
        this.addAccessDeniedStyles();
    }

    showProtectedContent() {
        // Mostrar contenido principal
        const mainContent = document.querySelector('main, .main-layout, .main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
        }

        // Remover mensaje de acceso denegado si existe
        const accessDeniedDiv = document.querySelector('.access-denied-container');
        if (accessDeniedDiv) {
            accessDeniedDiv.remove();
        }
    }

    redirectToLogin() {
        // Redirigir a la página principal con modal de login
        window.location.href = 'index.html#login';
    }

    addAccessDeniedStyles() {
        // Verificar si los estilos ya existen
        if (document.querySelector('#access-denied-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'access-denied-styles';
        style.textContent = `
            .access-denied-container {
                min-height: 80vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            }

            .access-denied-content {
                text-align: center;
                background: white;
                padding: 3rem;
                border-radius: 1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                width: 100%;
            }

            .access-denied-icon {
                font-size: 4rem;
                color: #e74c3c;
                margin-bottom: 1.5rem;
            }

            .access-denied-content h1 {
                color: #2c3e50;
                margin-bottom: 1rem;
                font-size: 2rem;
            }

            .access-denied-content p {
                color: #7f8c8d;
                margin-bottom: 2rem;
                font-size: 1.1rem;
                line-height: 1.6;
            }

            .access-denied-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .access-denied-actions .btn {
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            }

            .access-denied-actions .btn-primary {
                background: #3498db;
                color: white;
                border: none;
                cursor: pointer;
            }

            .access-denied-actions .btn-primary:hover {
                background: #2980b9;
                transform: translateY(-2px);
            }

            .access-denied-actions .btn-secondary {
                background: #95a5a6;
                color: white;
            }

            .access-denied-actions .btn-secondary:hover {
                background: #7f8c8d;
                transform: translateY(-2px);
            }

            @media (max-width: 480px) {
                .access-denied-content {
                    padding: 2rem 1.5rem;
                }

                .access-denied-actions {
                    flex-direction: column;
                }

                .access-denied-actions .btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Inicializar protección de páginas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new PageProtection();
});
