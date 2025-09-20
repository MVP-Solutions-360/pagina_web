// ===== CONTACT FUNCTIONALITY =====
// Funcionalidades para la página de contacto

class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Formulario de contacto
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Validación en tiempo real
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validar formulario
        if (this.validateForm(data)) {
            this.submitForm(data);
        }
    }

    validateForm(data) {
        let isValid = true;
        
        // Validar nombre
        if (!data.name || data.name.trim().length < 2) {
            this.showFieldError('name', 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            this.showFieldError('email', 'Ingresa un email válido');
            isValid = false;
        }
        
        // Validar teléfono (opcional pero si se ingresa debe ser válido)
        if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
            this.showFieldError('phone', 'Ingresa un teléfono válido');
            isValid = false;
        }
        
        // Validar asunto
        if (!data.subject) {
            this.showFieldError('subject', 'Selecciona un asunto');
            isValid = false;
        }
        
        // Validar mensaje
        if (!data.message || data.message.trim().length < 10) {
            this.showFieldError('message', 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    this.showFieldError(fieldName, 'El nombre debe tener al menos 2 caracteres');
                    return false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showFieldError(fieldName, 'Ingresa un email válido');
                    return false;
                }
                break;
            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    this.showFieldError(fieldName, 'Ingresa un teléfono válido');
                    return false;
                }
                break;
            case 'subject':
                if (!value) {
                    this.showFieldError(fieldName, 'Selecciona un asunto');
                    return false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    this.showFieldError(fieldName, 'El mensaje debe tener al menos 10 caracteres');
                    return false;
                }
                break;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.add('error');
            
            // Remover error anterior
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Agregar nuevo error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async submitForm(data) {
        try {
            // Mostrar loading
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (en producción sería una llamada real a la API)
            await this.simulateApiCall();
            
            // Mostrar éxito
            this.showSuccessMessage();
            
            // Resetear formulario
            document.getElementById('contact-form').reset();
            
        } catch (error) {
            this.showErrorMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            // Restaurar botón
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    showSuccessMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
        `;
        
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.appendChild(messageDiv);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'error-message';
        messageDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <h3>Error</h3>
            <p>${message}</p>
        `;
        
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.appendChild(messageDiv);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});
