// ===== VARIABLES GLOBALES =====
let header, navToggle, navMenu, navLinks;

// Función para inicializar elementos del DOM
function initializeDOMElements() {
    header = document.getElementById('header');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos del DOM
    initializeDOMElements();
    
    // Solo inicializar funcionalidades si los elementos existen
    if (header && navToggle && navMenu) {
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
    }
    
    // Inicializar validación de formularios si existen
    if (document.querySelectorAll('input, select, textarea').length > 0) {
        initializeFormValidation();
    }
});

// ===== NAVEGACIÓN =====
function initializeNavigation() {
    // Verificar que los elementos existan
    if (!navToggle || !navMenu || !navLinks) return;
    
    // Toggle del menú móvil
    navToggle.addEventListener('click', toggleMobileMenu);

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (!navMenu || !navToggle) return;
    
    navMenu.classList.toggle('active');
    
    // Animación del botón hamburguesa
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

function closeMobileMenu() {
    if (!navMenu || !navToggle) return;
    
    navMenu.classList.remove('active');
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
    });
}

// ===== EFECTOS DE SCROLL =====
function initializeScrollEffects() {
    if (!header || !navLinks) return;
    
    // Header con scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target && header) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== ANIMACIONES =====
function initializeAnimations() {
    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.service-card, .destination-card, .info-card, .contact-item');
    if (animateElements.length > 0) {
        animateElements.forEach(el => observer.observe(el));
    }

    // Contador animado para estadísticas
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Iniciar animación cuando el elemento sea visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// ===== VALIDACIÓN DE FORMULARIOS =====
function initializeFormValidation() {
    // Validación en tiempo real para campos de email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    if (emailInputs.length > 0) {
        emailInputs.forEach(input => {
            input.addEventListener('blur', validateEmail);
            input.addEventListener('input', clearValidation);
        });
    }

    // Validación en tiempo real para campos de teléfono
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    if (phoneInputs.length > 0) {
        phoneInputs.forEach(input => {
            input.addEventListener('blur', validatePhone);
            input.addEventListener('input', clearValidation);
        });
    }

    // Validación de fechas
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        dateInputs.forEach(input => {
            input.addEventListener('change', validateDate);
        });
    }

    // Validación de números
    const numberInputs = document.querySelectorAll('input[type="number"]');
    if (numberInputs.length > 0) {
        numberInputs.forEach(input => {
            input.addEventListener('blur', validateNumber);
            input.addEventListener('input', clearValidation);
        });
    }
}

function validateEmail(input) {
    if (!input || !input.value) return false;
    
    const email = input.value.trim();
    if (!email) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(input, 'Por favor ingresa un email válido');
        return false;
    }
    
    showSuccess(input);
    return true;
}

function validatePhone(input) {
    if (!input || !input.value) return false;
    
    const phone = input.value.trim();
    if (!phone) return false;
    
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
    
    if (!phoneRegex.test(phone)) {
        showError(input, 'Por favor ingresa un teléfono válido');
        return false;
    }
    
    if (phone.length < 7) {
        showError(input, 'El teléfono debe tener al menos 7 dígitos');
        return false;
    }
    
    showSuccess(input);
    return true;
}

function validateDate(input) {
    if (!input || !input.value) return false;
    
    const selectedDate = new Date(input.value);
    if (isNaN(selectedDate.getTime())) {
        showError(input, 'Por favor ingresa una fecha válida');
        return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError(input, 'La fecha no puede ser anterior a hoy');
        return false;
    }
    
    showSuccess(input);
    return true;
}

function validateNumber(input) {
    if (!input || !input.value) return false;
    
    const value = parseInt(input.value);
    if (isNaN(value)) {
        showError(input, 'Por favor ingresa un número válido');
        return false;
    }
    
    const min = parseInt(input.getAttribute('min')) || 0;
    const max = parseInt(input.getAttribute('max')) || 999;
    
    if (value < min || value > max) {
        showError(input, `El valor debe estar entre ${min} y ${max}`);
        return false;
    }
    
    showSuccess(input);
    return true;
}

function showError(input, message) {
    if (!input || !input.parentNode) return;
    
    // Remover mensajes previos
    clearValidation(input);
    
    // Agregar clase de error
    input.classList.add('error');
    
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.id = `error-${input.id || input.name || 'unknown'}`;
    
    // Insertar después del input
    input.parentNode.appendChild(errorDiv);
}

function showSuccess(input) {
    if (!input || !input.parentNode) return;
    
    clearValidation(input);
    input.classList.add('success');
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = '✓ Válido';
    successDiv.id = `success-${input.id || input.name || 'unknown'}`;
    
    input.parentNode.appendChild(successDiv);
}

function clearValidation(input) {
    if (!input || !input.parentNode) return;
    
    // Remover clases de estado
    input.classList.remove('error', 'success');
    
    // Remover mensajes
    const inputId = input.id || input.name || 'unknown';
    const errorMsg = input.parentNode.querySelector(`#error-${inputId}`);
    const successMsg = input.parentNode.querySelector(`#success-${inputId}`);
    
    if (errorMsg && errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
    }
    if (successMsg && successMsg.parentNode) {
        successMsg.parentNode.removeChild(successMsg);
    }
}

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== MANEJO DE IMÁGENES =====
function initializeImageOptimization() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    console.error('Archivo:', e.filename);
    console.error('Línea:', e.lineno);
    console.error('Columna:', e.colno);
    // Aquí podrías enviar el error a un servicio de monitoreo
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada no manejada:', e.reason);
    // Aquí podrías enviar el error a un servicio de monitoreo
});

// ===== FUNCIONES PÚBLICAS =====
window.AgenciaViajes = {
    // Función para mostrar loading
    showLoading: function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
    },

    // Función para ocultar loading
    hideLoading: function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    },

    // Función para mostrar modal de éxito
    showSuccessModal: function(referenceNumber) {
        const modal = document.getElementById('successModal');
        const referenceSpan = document.getElementById('referenceNumber');
        
        if (modal && referenceSpan) {
            referenceSpan.textContent = referenceNumber;
            modal.style.display = 'flex';
        }
    },

    // Función para cerrar modal
    closeModal: function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Función para validar formulario completo
    validateForm: function(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;

        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        if (inputs.length === 0) return true;
        
        let isValid = true;

        inputs.forEach(input => {
            try {
                if (input.type === 'email') {
                    if (!validateEmail(input)) isValid = false;
                } else if (input.type === 'tel') {
                    if (!validatePhone(input)) isValid = false;
                } else if (input.type === 'date') {
                    if (!validateDate(input)) isValid = false;
                } else if (input.type === 'number') {
                    if (!validateNumber(input)) isValid = false;
                } else {
                    if (!input.value || !input.value.trim()) {
                        showError(input, 'Este campo es requerido');
                        isValid = false;
                    }
                }
            } catch (error) {
                console.error('Error validando campo:', input, error);
                isValid = false;
            }
        });

        return isValid;
    }
};

// ===== INICIALIZACIÓN ADICIONAL =====
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Inicializar optimización de imágenes
        initializeImageOptimization();
        
        // Agregar clase de carga al body
        document.body.classList.add('loaded');
        
        // Prevenir envío de formularios vacíos
        const forms = document.querySelectorAll('form');
        if (forms.length > 0) {
            forms.forEach(form => {
                if (form && form.id) {
                    form.addEventListener('submit', function(e) {
                        try {
                            if (!AgenciaViajes.validateForm(form.id)) {
                                e.preventDefault();
                                // Scroll al primer error
                                const firstError = form.querySelector('.error');
                                if (firstError) {
                                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }
                        } catch (error) {
                            console.error('Error en validación del formulario:', error);
                            e.preventDefault();
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error en inicialización:', error);
    }
});
