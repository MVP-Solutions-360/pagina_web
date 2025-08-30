// ===== DASHBOARD DEL CLIENTE =====
// Maneja la funcionalidad del dashboard, tabs, cotizaciones y perfil

class DashboardManager {
    constructor() {
        this.currentTab = 'quotations';
        this.quotations = [];
        this.filters = {
            search: '',
            status: ''
        };
        
        // Inicializar al cargar
        this.init();
        
        // Eventos
        this.setupEventListeners();
    }

    // ===== INICIALIZACIÓN =====
    
    init() {
        console.log('🚀 Dashboard inicializado');
        
        // Verificar autenticación
        this.checkAuthentication();
        
        // Cargar datos iniciales
        this.loadDashboardData();
        
        // Mostrar tab activo
        this.showTab(this.currentTab);
    }

    // ===== VERIFICACIÓN DE AUTENTICACIÓN =====
    
    checkAuthentication() {
        if (!window.authManager || !window.authManager.isAuthenticated) {
            console.log('❌ Usuario no autenticado, redirigiendo al login');
            window.location.href = './index.html';
            return;
        }
        
        console.log('✅ Usuario autenticado:', window.authManager.currentUser.name);
    }

    // ===== CARGA DE DATOS =====
    
    async loadDashboardData() {
        try {
            // Cargar cotizaciones del cliente
            await this.loadQuotations();
            
            // Cargar perfil del cliente
            await this.loadProfile();
            
            // Actualizar estadísticas
            this.updateStats();
            
        } catch (error) {
            console.error('❌ Error cargando datos del dashboard:', error);
            this.showError('Error cargando datos del dashboard');
        }
    }

    async loadQuotations() {
        try {
            console.log('📋 Cargando cotizaciones...');
            
            const response = await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/quotations`, {
                headers: {
                    'Authorization': `Bearer ${window.authManager.token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.quotations = data.data || [];
                console.log('✅ Cotizaciones cargadas:', this.quotations.length);
                this.renderQuotations();
            } else {
                throw new Error(data.message || 'Error cargando cotizaciones');
            }

        } catch (error) {
            console.error('❌ Error cargando cotizaciones:', error);
            this.showEmptyState('Error cargando cotizaciones', 'No se pudieron cargar tus cotizaciones. Intenta nuevamente.');
        }
    }

    async loadProfile() {
        try {
            console.log('👤 Cargando perfil...');
            
            const response = await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/profile`, {
                headers: {
                    'Authorization': `Bearer ${window.authManager.token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.populateProfileForm(data.data);
                console.log('✅ Perfil cargado:', data.data);
            } else {
                throw new Error(data.message || 'Error cargando perfil');
            }

        } catch (error) {
            console.error('❌ Error cargando perfil:', error);
            this.showError('Error cargando perfil del usuario');
        }
    }

    // ===== NAVEGACIÓN DE TABS =====
    
    setupEventListeners() {
        // Eventos de tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Eventos de búsqueda y filtros
        const searchInput = document.getElementById('quotation-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value;
                this.filterQuotations();
            });
        }

        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.filterQuotations();
            });
        }

        // Eventos de formularios
        this.setupFormEventListeners();
    }

    switchTab(tabName) {
        // Ocultar todos los tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Desactivar todos los botones de tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Mostrar tab seleccionado
        const targetTab = document.getElementById(`${tabName}-tab`);
        const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab && targetButton) {
            targetTab.classList.add('active');
            targetButton.classList.add('active');
            this.currentTab = tabName;
            
            console.log('🔄 Tab cambiado a:', tabName);
            
            // Cargar datos específicos del tab si es necesario
            if (tabName === 'quotations') {
                this.loadQuotations();
            }
        }
    }

    showTab(tabName) {
        this.switchTab(tabName);
    }

    // ===== RENDERIZADO DE COTIZACIONES =====
    
    renderQuotations() {
        const container = document.getElementById('quotations-list');
        if (!container) return;

        if (this.quotations.length === 0) {
            this.showEmptyState('No tienes cotizaciones', 'Cuando solicites cotizaciones, aparecerán aquí para que puedas hacer seguimiento.');
            return;
        }

        const filteredQuotations = this.filterQuotations();
        
        container.innerHTML = filteredQuotations.map(quotation => 
            this.createQuotationHTML(quotation)
        ).join('');
    }

    createQuotationHTML(quotation) {
        const statusClass = this.getStatusClass(quotation.status);
        const statusText = this.getStatusText(quotation.status);
        const date = new Date(quotation.created_at).toLocaleDateString('es-ES');
        
        return `
            <div class="quotation-item" data-id="${quotation.id}">
                <div class="quotation-header">
                    <h3 class="quotation-title">
                        ${quotation.request_type || 'Cotización'} - ${quotation.destination || 'Destino'}
                    </h3>
                    <span class="quotation-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="quotation-details">
                    <div class="quotation-detail">
                        <span class="detail-label">Referencia</span>
                        <span class="detail-value">${quotation.reference_number || 'N/A'}</span>
                    </div>
                    <div class="quotation-detail">
                        <span class="detail-label">Fecha de Solicitud</span>
                        <span class="detail-value">${date}</span>
                    </div>
                    <div class="quotation-detail">
                        <span class="detail-label">Destino</span>
                        <span class="detail-value">${quotation.destination || 'N/A'}</span>
                    </div>
                    <div class="quotation-detail">
                        <span class="detail-label">Presupuesto</span>
                        <span class="detail-value">${quotation.budget_range || 'N/A'}</span>
                    </div>
                </div>
                
                <div class="quotation-actions">
                    <button class="btn btn-primary btn-sm" onclick="dashboardManager.viewQuotation(${quotation.id})">
                        <i class="fas fa-eye"></i> Ver Detalles
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="dashboardManager.contactAdvisor(${quotation.id})">
                        <i class="fas fa-comments"></i> Contactar
                    </button>
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const statusMap = {
            'pending': 'pending',
            'in_progress': 'in_progress',
            'completed': 'completed',
            'cancelled': 'cancelled'
        };
        return statusMap[status] || 'pending';
    }

    getStatusText(status) {
        const statusMap = {
            'pending': 'Pendiente',
            'in_progress': 'En Proceso',
            'completed': 'Completada',
            'cancelled': 'Cancelada'
        };
        return statusMap[status] || 'Pendiente';
    }

    filterQuotations() {
        let filtered = [...this.quotations];
        
        // Filtro de búsqueda
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(quotation => 
                quotation.destination?.toLowerCase().includes(searchTerm) ||
                quotation.request_type?.toLowerCase().includes(searchTerm) ||
                quotation.reference_number?.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filtro de estado
        if (this.filters.status) {
            filtered = filtered.filter(quotation => 
                quotation.status === this.filters.status
            );
        }
        
        return filtered;
    }

    // ===== ESTADÍSTICAS =====
    
    updateStats() {
        const total = this.quotations.length;
        const pending = this.quotations.filter(q => q.status === 'pending').length;
        const completed = this.quotations.filter(q => q.status === 'completed').length;
        
        // Actualizar contadores
        const totalElement = document.getElementById('total-quotations');
        const pendingElement = document.getElementById('pending-quotations');
        const completedElement = document.getElementById('completed-quotations');
        
        if (totalElement) totalElement.textContent = total;
        if (pendingElement) pendingElement.textContent = pending;
        if (completedElement) completedElement.textContent = completed;
        
        console.log('📊 Estadísticas actualizadas:', { total, pending, completed });
    }

    // ===== FORMULARIOS =====
    
    setupFormEventListeners() {
        // Formulario de perfil
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile();
            });
        }

        // Formulario de contraseña
        const passwordForm = document.getElementById('password-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updatePassword();
            });
        }
    }

    populateProfileForm(profileData) {
        const nameInput = document.getElementById('profile-name');
        const emailInput = document.getElementById('profile-email');
        const phoneInput = document.getElementById('profile-phone');
        const preferenceSelect = document.getElementById('profile-preference');
        
        if (nameInput) nameInput.value = profileData.name || '';
        if (emailInput) emailInput.value = profileData.email || '';
        if (phoneInput) phoneInput.value = profileData.phone || '';
        if (preferenceSelect) preferenceSelect.value = profileData.contact_preference || 'email';
    }

    async updateProfile() {
        try {
            const formData = new FormData(document.getElementById('profile-form'));
            const profileData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                contact_preference: formData.get('contact_preference')
            };

            console.log('📝 Actualizando perfil:', profileData);

            const response = await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${window.authManager.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.showSuccess('Perfil actualizado exitosamente');
                console.log('✅ Perfil actualizado:', data.data);
            } else {
                throw new Error(data.message || 'Error actualizando perfil');
            }

        } catch (error) {
            console.error('❌ Error actualizando perfil:', error);
            this.showError('Error actualizando perfil. Intenta nuevamente.');
        }
    }

    async updatePassword() {
        try {
            const formData = new FormData(document.getElementById('password-form'));
            const passwordData = {
                current_password: formData.get('current_password'),
                new_password: formData.get('new_password'),
                confirm_password: formData.get('confirm_password')
            };

            // Validar contraseñas
            if (passwordData.new_password !== passwordData.confirm_password) {
                this.showError('Las contraseñas nuevas no coinciden');
                return;
            }

            if (passwordData.new_password.length < 8) {
                this.showError('La nueva contraseña debe tener al menos 8 caracteres');
                return;
            }

            console.log('🔐 Actualizando contraseña...');

            const response = await fetch(`${window.PROJECT_CONFIG.api.baseURL}/client/password`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${window.authManager.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    current_password: passwordData.current_password,
                    new_password: passwordData.new_password
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.showSuccess('Contraseña actualizada exitosamente');
                document.getElementById('password-form').reset();
                console.log('✅ Contraseña actualizada');
            } else {
                throw new Error(data.message || 'Error actualizando contraseña');
            }

        } catch (error) {
            console.error('❌ Error actualizando contraseña:', error);
            this.showError('Error actualizando contraseña. Verifica tu contraseña actual.');
        }
    }

    // ===== ACCIONES DE COTIZACIONES =====
    
    viewQuotation(quotationId) {
        console.log('👁️ Ver cotización:', quotationId);
        // TODO: Implementar vista detallada de cotización
        this.showInfo('Vista detallada de cotización - Por implementar');
    }

    contactAdvisor(quotationId) {
        console.log('💬 Contactar asesor para cotización:', quotationId);
        // TODO: Implementar chat o contacto con asesor
        this.showInfo('Contacto con asesor - Por implementar');
    }

    // ===== ESTADOS VACÍOS =====
    
    showEmptyState(title, message) {
        const container = document.getElementById('quotations-list');
        if (!container) return;

        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>${title}</h3>
                <p>${message}</p>
                <a href="./index.html#cotizacion" class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Solicitar Cotización
                </a>
            </div>
        `;
    }

    // ===== NOTIFICACIONES =====
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Agregar al DOM
        document.body.appendChild(notification);

        // Remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);

        console.log(`${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} ${message}`);
    }

    // ===== UTILIDADES =====
    
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatCurrency(amount, currency = 'COP') {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
}

// ===== INSTANCIA GLOBAL =====
const dashboardManager = new DashboardManager();

// ===== EXPOSICIÓN GLOBAL =====
window.DashboardManager = DashboardManager;
window.dashboardManager = dashboardManager;

// ===== FUNCIONES GLOBALES =====

function confirmDeleteAccount() {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
        console.log('🗑️ Eliminando cuenta...');
        // TODO: Implementar eliminación de cuenta
        dashboardManager.showInfo('Eliminación de cuenta - Por implementar');
    }
}

// ===== INICIALIZACIÓN AL CARGAR =====
document.addEventListener('DOMContentLoaded', () => {
    // El DashboardManager ya se inicializa en su constructor
    console.log('🚀 Dashboard listo');
});
