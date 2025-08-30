// ===== GESTOR DE FORMULARIOS - AGENCIA DE VIAJES =====
// Maneja todos los formularios del sitio web

class FormManager {
    constructor() {
        this.forms = {};
        this.initializeForms();
    }

    initializeForms() {
        // Inicializar formulario de cotización
        const quotationForm = document.getElementById('quotationForm');
        if (quotationForm) {
            this.forms.quotation = new QuotationForm(quotationForm);
        }

        // Inicializar formulario de contacto
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            this.forms.contact = new ContactForm(contactForm);
        }

        // Inicializar autoguardado
        this.initializeAutoSave();
    }

    initializeAutoSave() {
        // Guardar formularios en localStorage cada 5 segundos
        setInterval(() => {
            this.saveFormsToLocalStorage();
        }, 5000);

        // NO restaurar formularios al cargar la página (se limpian al refrescar)
        // this.restoreFormsFromLocalStorage();
    }

    saveFormsToLocalStorage() {
        Object.keys(this.forms).forEach(formKey => {
            const form = this.forms[formKey];
            if (form && form.form) {
                const formData = form.getFormData();
                localStorage.setItem(`form_${formKey}`, JSON.stringify(formData));
            }
        });
    }

    restoreFormsFromLocalStorage() {
        Object.keys(this.forms).forEach(formKey => {
            const form = this.forms[formKey];
            if (form && form.form) {
                const savedData = localStorage.getItem(`form_${formKey}`);
                if (savedData) {
                    try {
                        const data = JSON.parse(savedData);
                        form.restoreFormData(data);
                    } catch (e) {
                        console.error('Error al restaurar formulario:', e);
                    }
                }
            }
        });
    }
}

// ===== FORMULARIO DE COTIZACIÓN =====
class QuotationForm {
    constructor(form) {
        this.form = form;
        this.currentStep = 1;
        this.totalSteps = 3;
        this.initializeForm();
    }

    initializeForm() {
        this.createProgressBar();
        this.setupStepNavigation();
        this.setupFormValidation();
        this.setupAutoCalculation();
        this.setupDestinationAutocomplete();
        this.bindEvents();
    }

    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-steps">
                <span class="step active" data-step="1">Información Personal</span>
                <span class="step" data-step="2">Detalles del Viaje</span>
                <span class="step" data-step="3">Información Adicional</span>
            </div>
        `;

        this.form.insertBefore(progressContainer, this.form.firstChild);
        this.updateProgress();
    }

    setupStepNavigation() {
        // Agrupar campos por pasos
        this.stepFields = {
            1: ['client_name', 'client_email', 'client_phone', 'contact_preference', 'best_contact_time'],
            2: ['request_type', 'destination_type', 'origin', 'destination', 'departure_date', 'return_date', 'adult', 'children', 'infant'],
            3: ['description', 'budget_range', 'preferred_currency', 'special_requirements', 'deadline']
        };

        // Determinar paso inicial basado en autenticación
        const initialStep = this.getInitialStep();
        this.currentStep = initialStep;
        
        // Ocultar campos de pasos posteriores
        this.showStep(initialStep);
    }

    getInitialStep() {
        // Verificar si el usuario está autenticado
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (authToken && userData) {
            try {
                const user = JSON.parse(userData);
                // Si tenemos datos del usuario, iniciar en paso 2
                if (user.name && user.email) {
                    console.log('👤 Usuario autenticado detectado, iniciando en paso 2');
                    return 2;
                }
            } catch (e) {
                console.error('Error al parsear datos del usuario:', e);
            }
        }
        
        // Si no está autenticado, iniciar en paso 1
        console.log('👤 Usuario no autenticado, iniciando en paso 1');
        return 1;
    }

    showStep(step) {
        // Ocultar todos los campos
        Object.values(this.stepFields).flat().forEach(fieldId => {
            const field = this.form.querySelector(`[name="${fieldId}"]`);
            if (field) {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.style.display = 'none';
                }
            }
        });

        // Mostrar campos del paso actual
        this.stepFields[step].forEach(fieldId => {
            const field = this.form.querySelector(`[name="${fieldId}"]`);
            if (field) {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.style.display = 'block';
                }
            }
        });

        // Si es el paso 1 y el usuario está autenticado, pre-llenar datos
        if (step === 1) {
            this.preFillUserData();
        }

        // Actualizar botones de navegación
        this.updateNavigationButtons();
        this.updateProgress();
    }

    preFillUserData() {
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (authToken && userData) {
            try {
                const user = JSON.parse(userData);
                
                // Pre-llenar campos con datos del usuario autenticado
                const nameField = this.form.querySelector('[name="client_name"]');
                const emailField = this.form.querySelector('[name="client_email"]');
                const phoneField = this.form.querySelector('[name="client_phone"]');
                
                if (nameField && user.name) {
                    nameField.value = user.name;
                    nameField.setAttribute('readonly', 'readonly');
                    nameField.classList.add('pre-filled');
                }
                
                if (emailField && user.email) {
                    emailField.value = user.email;
                    emailField.setAttribute('readonly', 'readonly');
                    emailField.classList.add('pre-filled');
                }
                
                if (phoneField && user.phone) {
                    phoneField.value = user.phone;
                    phoneField.setAttribute('readonly', 'readonly');
                    phoneField.classList.add('pre-filled');
                }
                
                console.log('✅ Datos del usuario pre-llenados automáticamente');
                
            } catch (e) {
                console.error('Error al pre-llenar datos del usuario:', e);
            }
        }
    }

    updateNavigationButtons() {
        // Crear o actualizar botones de navegación
        let navContainer = this.form.querySelector('.form-navigation');
        if (!navContainer) {
            navContainer = document.createElement('div');
            navContainer.className = 'form-navigation';
            this.form.appendChild(navContainer);
        }

        navContainer.innerHTML = `
            ${this.currentStep > 1 ? `<button type="button" class="btn btn-secondary" onclick="window.formManager.forms.quotation.previousStep()">Anterior</button>` : ''}
            ${this.currentStep < this.totalSteps ? `<button type="button" class="btn btn-primary" onclick="window.formManager.forms.quotation.nextStep()">Siguiente</button>` : ''}
            ${this.currentStep === this.totalSteps ? `<button type="submit" class="btn btn-primary">Enviar Cotización</button>` : ''}
        `;
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    validateCurrentStep() {
        const currentFields = this.stepFields[this.currentStep];
        let isValid = true;

        currentFields.forEach(fieldId => {
            const field = this.form.querySelector(`[name="${fieldId}"]`);
            if (field && field.hasAttribute('required')) {
                if (!field.value.trim()) {
                    this.showFieldError(field, 'Este campo es requerido');
                    isValid = false;
                } else {
                    this.clearFieldError(field);
                }
            }
        });

        return isValid;
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const steps = this.form.querySelectorAll('.step');
        
        if (progressFill) {
            const percentage = (this.currentStep / this.totalSteps) * 100;
            progressFill.style.width = `${percentage}%`;
        }

        steps.forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    setupFormValidation() {
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Este campo es requerido');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Por favor ingresa un email válido');
                return false;
            }
        }

        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'Por favor ingresa un teléfono válido');
                return false;
            }
        }

        if (field.type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.showFieldError(field, 'La fecha no puede ser anterior a hoy');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.id = `error-${field.id || field.name}`;
        
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.appendChild(errorDiv);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorDiv = field.parentNode.querySelector(`#error-${field.id || field.name}`);
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }

    setupAutoCalculation() {
        // Calcular total de viajeros automáticamente
        const travelerInputs = ['adult', 'children', 'infant'];
        travelerInputs.forEach(inputId => {
            const input = this.form.querySelector(`[name="${inputId}"]`);
            if (input) {
                input.addEventListener('input', () => this.updateTotalTravelers());
            }
        });
    }

    updateTotalTravelers() {
        const totalElement = this.form.querySelector('#total-travelers');
        if (totalElement) {
            const total = this.calculateTotalTravelers();
            totalElement.textContent = total;
        }
    }

    calculateTotalTravelers() {
        const adult = parseInt(this.form.querySelector('[name="adult"]')?.value || 0);
        const children = parseInt(this.form.querySelector('[name="children"]')?.value || 0);
        const infant = parseInt(this.form.querySelector('[name="infant"]')?.value || 0);
        return adult + children + infant;
    }

    setupDestinationAutocomplete() {
        // Autocompletado para destinos populares
        const destinationInputs = ['origin', 'destination'];
        const popularDestinations = [
            'Cancún, México', 'Punta Cana, República Dominicana', 'Jamaica',
            'Aruba', 'Puerto Rico', 'Bahamas', 'Cuba', 'Barbados',
            'Medellín, Colombia', 'Bogotá, Colombia', 'Cartagena, Colombia'
        ];

        destinationInputs.forEach(inputId => {
            const input = this.form.querySelector(`[name="${inputId}"]`);
            if (input) {
                this.createAutocomplete(input, popularDestinations);
            }
        });
    }

    createAutocomplete(input, options) {
        const autocompleteContainer = document.createElement('div');
        autocompleteContainer.className = 'autocomplete-container';
        autocompleteContainer.style.display = 'none';
        
        input.parentNode.appendChild(autocompleteContainer);
        
        input.addEventListener('input', () => {
            const value = input.value.toLowerCase();
            if (value.length < 2) {
                autocompleteContainer.style.display = 'none';
                return;
            }
            
            const filteredOptions = options.filter(option => 
                option.toLowerCase().includes(value)
            );
            
            if (filteredOptions.length > 0) {
                this.showAutocompleteOptions(autocompleteContainer, filteredOptions, input);
            } else {
                autocompleteContainer.style.display = 'none';
            }
        });
        
        // Ocultar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !autocompleteContainer.contains(e.target)) {
                autocompleteContainer.style.display = 'none';
            }
        });
    }

    showAutocompleteOptions(container, options, input) {
        container.innerHTML = '';
        container.style.display = 'block';
        
        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'autocomplete-option';
            optionDiv.textContent = option;
            optionDiv.onclick = () => {
                input.value = option;
                container.style.display = 'none';
            };
            container.appendChild(optionDiv);
        });
    }

    restoreFormData(data) {
        if (!data) return;
        
        Object.keys(data).forEach(key => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = data[key];
                } else if (input.type === 'radio') {
                    const radio = this.form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = data[key];
                }
            }
        });
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Escuchar cambios en el estado de autenticación
        this.setupAuthListener();
    }

    setupAuthListener() {
        // Escuchar cambios en localStorage para detectar login/logout
        window.addEventListener('storage', (e) => {
            if (e.key === 'authToken' || e.key === 'userData') {
                console.log('🔐 Cambio detectado en autenticación, actualizando formulario...');
                this.updateFormForAuthState();
            }
        });
        
        // También escuchar eventos personalizados de autenticación
        window.addEventListener('authStateChanged', () => {
            console.log('🔐 Evento de cambio de autenticación recibido, actualizando formulario...');
            this.updateFormForAuthState();
        });
    }

    updateFormForAuthState() {
        const newInitialStep = this.getInitialStep();
        
        if (newInitialStep !== this.currentStep) {
            console.log(`🔄 Cambiando de paso ${this.currentStep} a ${newInitialStep}`);
            this.currentStep = newInitialStep;
            this.showStep(newInitialStep);
        } else if (newInitialStep === 1) {
            // Si seguimos en paso 1, actualizar campos pre-llenados
            this.preFillUserData();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        try {
            window.AgenciaViajes.showLoading();
            
            const formData = this.getFormData();
            const response = await this.submitForm(formData);
            
            if (response.success) {
                this.showSuccessMessage(response.data);
                this.clearForm();
                this.resetToStep1();
            } else {
                this.showErrorMessage(response.message || 'Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showErrorMessage('Error de conexión. Por favor intenta nuevamente.');
        } finally {
            window.AgenciaViajes.hideLoading();
        }
    }

    validateForm() {
        let isValid = true;
        
        Object.values(this.stepFields).flat().forEach(fieldId => {
            const field = this.form.querySelector(`[name="${fieldId}"]`);
            if (field && field.hasAttribute('required')) {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Agregar información adicional
        data.submission_date = new Date().toISOString();
        data.form_type = 'quotation';
        data.total_travelers = this.calculateTotalTravelers();
        
        return data;
    }

    async submitForm(data) {
        try {
            // Usar la API real del CRM
            const response = await window.AgenciaAPI.processQuotation(data);
            return response;
        } catch (error) {
            console.error('Error en submitForm:', error);
            throw error;
        }
    }

    showSuccessMessage(data) {
        window.AgenciaViajes.showSuccessModal(data.reference_number);
    }

    showErrorMessage(message) {
        // Mostrar mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                ${message}
            </div>
        `;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    clearForm() {
        this.form.reset();
        
        // Limpiar clases de estado
        this.form.querySelectorAll('.error, .success, .pre-filled').forEach(field => {
            field.classList.remove('error', 'success', 'pre-filled');
        });
        
        // Remover atributo readonly de campos pre-llenados
        this.form.querySelectorAll('[readonly]').forEach(field => {
            field.removeAttribute('readonly');
        });
        
        // Limpiar mensajes de error y éxito
        this.form.querySelectorAll('.error-message, .success-message').forEach(msg => {
            if (msg.parentNode) {
                msg.parentNode.removeChild(msg);
            }
        });
        
        // Resetear al paso inicial
        this.currentStep = this.getInitialStep();
        this.showStep(this.currentStep);
    }

    resetToStep1() {
        this.currentStep = 1;
        this.showStep(1);
    }
}

// ===== FORMULARIO DE CONTACTO =====
class ContactForm {
    constructor(form) {
        this.form = form;
        this.initializeForm();
    }

    initializeForm() {
        this.setupFormValidation();
        this.bindEvents();
    }

    setupFormValidation() {
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Este campo es requerido');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Por favor ingresa un email válido');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.id = `error-${field.id || field.name}`;
        
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.appendChild(errorDiv);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorDiv = field.parentNode.querySelector(`#error-${field.id || field.name}`);
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }

    restoreFormData(data) {
        if (!data) return;
        
        Object.keys(data).forEach(key => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = data[key];
                } else if (input.type === 'radio') {
                    const radio = this.form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = data[key];
                }
            }
        });
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        try {
            window.AgenciaViajes.showLoading();
            
            const formData = this.getFormData();
            const response = await this.submitForm(formData);
            
            if (response.success) {
                this.showSuccessMessage();
                this.clearForm();
            } else {
                this.showErrorMessage(response.message || 'Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showErrorMessage('Error de conexión. Por favor intenta nuevamente.');
        } finally {
            window.AgenciaViajes.hideLoading();
        }
    }

    validateForm() {
        let isValid = true;
        
        this.form.querySelectorAll('[required]').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        data.submission_date = new Date().toISOString();
        data.form_type = 'contact';
        
        return data;
    }

    async submitForm(data) {
        try {
            const response = await window.AgenciaAPI.processContact(data);
            return response;
        } catch (error) {
            console.error('Error en submitForm:', error);
            throw error;
        }
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                Mensaje enviado exitosamente. Te responderemos pronto.
            </div>
        `;
        
        this.form.insertBefore(successDiv, this.form.firstChild);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 5000);
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                ${message}
            </div>
        `;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    clearForm() {
        this.form.reset();
        this.form.querySelectorAll('.error, .success').forEach(field => {
            field.classList.remove('error', 'success');
        });
        
        this.form.querySelectorAll('.error-message, .success-message').forEach(msg => {
            if (msg.parentNode) {
                msg.parentNode.removeChild(msg);
            }
        });
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gestor de formularios
    window.formManager = new FormManager();
    
    // Limpiar formularios al cargar la página (refrescar)
    if (window.formManager && window.formManager.forms.quotation) {
        window.formManager.forms.quotation.clearForm();
    }
});
