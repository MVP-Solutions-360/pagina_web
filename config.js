// ===== CONFIGURACIÓN DEL PROYECTO =====
// Archivo de configuración centralizada para la agencia de viajes

const PROJECT_CONFIG = {
    // ===== INFORMACIÓN DE LA AGENCIA =====
    agency: {
        name: 'Agencia Principal',
        slug: 'agencia-principal',
        description: 'Tu puerta de entrada al paraíso caribeño',
        tagline: 'Descubre la Magia del Caribe',
        email: 'maicol.londono@mvpsolutions.com',
        phone: '+57 350 685 2261',
        address: 'Cl. 98a #65-120, Castilla, Medellín, Antioquia, Colombia',
        workingHours: {
            weekdays: '8:00 AM - 6:00 PM',
            saturdays: '9:00 AM - 2:00 PM',
            sundays: 'Cerrado'
        },
        socialMedia: {
            facebook: '#',
            instagram: '#',
            twitter: '#',
            linkedin: '#'
        }
    },

    // ===== CONFIGURACIÓN DE LA API =====
    api: {
        baseURL: 'http://localhost:8000/api/v1', // URL para desarrollo local (Laravel)
        timeout: 30000,
        retryAttempts: 3,
        endpoints: {
            agency: '/agency',
            quotations: '/quotation',
            tasks: '/task',
            clients: '/client',
            services: '/services',
            destinations: '/destinations'
        }
    },

    // ===== CONFIGURACIÓN DE FORMULARIOS =====
    forms: {
        quotation: {
            steps: [
                {
                    id: 1,
                    title: 'Información Personal',
                    fields: ['client_name', 'client_email', 'client_phone']
                },
                {
                    id: 2,
                    title: 'Detalles del Viaje',
                    fields: ['request_type', 'destination_type', 'origin', 'destination', 'departure_date', 'return_date', 'adult', 'children', 'infant']
                },
                {
                    id: 3,
                    title: 'Información Adicional',
                    fields: ['description', 'budget_range', 'preferred_currency', 'special_requirements']
                }
            ],
            autoSave: {
                enabled: true,
                interval: 30000, // 30 segundos
                maxAttempts: 3
            }
        },
        contact: {
            fields: ['contact_name', 'contact_email', 'contact_subject', 'contact_message'],
            autoSave: {
                enabled: true,
                interval: 30000
            }
        }
    },

    // ===== CONFIGURACIÓN DE VALIDACIÓN =====
    validation: {
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Por favor ingresa un email válido'
        },
        phone: {
            pattern: /^[\+]?[0-9\s\-\(\)]{7,}$/,
            message: 'Por favor ingresa un teléfono válido'
        },
        date: {
            minDate: 'today',
            message: 'La fecha no puede ser anterior a hoy'
        },
        numbers: {
            adult: { min: 1, max: 10 },
            children: { min: 0, max: 10 },
            infant: { min: 0, max: 5 }
        }
    },

    // ===== CONFIGURACIÓN DE DESTINOS =====
    destinations: {
        popular: [
            'Cancún, México',
            'Punta Cana, República Dominicana',
            'Jamaica',
            'Aruba',
            'Puerto Rico',
            'Bahamas',
            'Cuba',
            'Barbados',
            'Medellín, Colombia',
            'Bogotá, Colombia',
            'Cartagena, Colombia'
        ],
        categories: {
            caribbean: 'Caribe',
            mexico: 'México',
            centralAmerica: 'Centroamérica',
            southAmerica: 'Sudamérica',
            europe: 'Europa',
            asia: 'Asia'
        }
    },

    // ===== CONFIGURACIÓN DE SERVICIOS =====
    services: {
        types: [
            { id: 'tiquete_aereo', name: 'Vuelo', icon: 'fas fa-plane' },
            { id: 'hotel', name: 'Hotel', icon: 'fas fa-hotel' },
            { id: 'paquete_completo', name: 'Paquete', icon: 'fas fa-suitcase' },
            { id: 'traslado', name: 'Transfer', icon: 'fas fa-car' },
            { id: 'seguro_viaje', name: 'Asistencia médica', icon: 'fas fa-heartbeat' },
            { id: 'plan_turistico', name: 'Otro', icon: 'fas fa-ellipsis-h' }
        ],
        categories: {
            transportation: 'Transporte',
            accommodation: 'Alojamiento',
            packages: 'Paquetes',
            insurance: 'Seguros',
            assistance: 'Asistencia'
        }
    },

    // ===== CONFIGURACIÓN DE ANIMACIONES =====
    animations: {
        enabled: true,
        duration: 600,
        easing: 'ease-out',
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        elements: [
            '.service-card',
            '.destination-card',
            '.info-card',
            '.contact-item',
            '.testimonial-card',
            '.team-member'
        ]
    },

    // ===== CONFIGURACIÓN DE RESPONSIVE =====
    responsive: {
        breakpoints: {
            mobile: 767,
            tablet: 1023,
            desktop: 1439,
            largeDesktop: 1440
        },
        mobileFirst: true,
        touchOptimized: true
    },

    // ===== CONFIGURACIÓN DE PERFORMANCE =====
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        debounceDelay: 300,
        throttleDelay: 100,
        cacheEnabled: true,
        localStoragePrefix: 'agencia_viajes_'
    },

    // ===== CONFIGURACIÓN DE ANALYTICS =====
    analytics: {
        enabled: true,
        trackingId: 'GA_TRACKING_ID', // Cambiar por tu ID de Google Analytics
        events: {
            formStart: 'form_start',
            formComplete: 'form_complete',
            formSubmit: 'form_submit',
            formError: 'form_error',
            pageView: 'page_view',
            buttonClick: 'button_click'
        }
    },

    // ===== CONFIGURACIÓN DE NOTIFICACIONES =====
    notifications: {
        success: {
            duration: 5000,
            position: 'top-right',
            icon: 'fas fa-check-circle'
        },
        error: {
            duration: 8000,
            position: 'top-right',
            icon: 'fas fa-exclamation-triangle'
        },
        info: {
            duration: 4000,
            position: 'top-right',
            icon: 'fas fa-info-circle'
        }
    },

    // ===== CONFIGURACIÓN DE IDIOMAS =====
    languages: {
        default: 'es',
        supported: ['es', 'en'],
        fallback: 'es',
        translations: {
            es: {
                // Español (por defecto)
            },
            en: {
                // Inglés
            }
        }
    },

    // ===== CONFIGURACIÓN DE ACCESIBILIDAD =====
    accessibility: {
        enabled: true,
        skipLinks: true,
        focusIndicators: true,
        highContrast: false,
        reducedMotion: false,
        screenReader: true
    },

    // ===== CONFIGURACIÓN DE SEO =====
    seo: {
        title: 'Agencia Principal - Tu Experiencia Caribeña',
        description: 'Descubre el Caribe con Agencia Principal. Vuelos, hoteles, tours y paquetes turísticos a los mejores destinos del Caribe.',
        keywords: 'viajes, caribe, vuelos, hoteles, turismo, agencia de viajes, cancun, punta cana, jamaica',
        author: 'Agencia Principal',
        robots: 'index, follow',
        ogImage: '/images/og-image.jpg',
        twitterCard: 'summary_large_image'
    },

    // ===== CONFIGURACIÓN DE DESARROLLO =====
    development: {
        debug: false,
        logLevel: 'error', // 'debug', 'info', 'warn', 'error'
        showPerformanceMetrics: false,
        enableHotReload: false,
        sourceMaps: false
    }
};

// ===== FUNCIONES DE CONFIGURACIÓN =====
const Config = {
    // Obtener configuración completa
    getAll: () => PROJECT_CONFIG,

    // Obtener configuración específica
    get: (path) => {
        const keys = path.split('.');
        let value = PROJECT_CONFIG;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return undefined;
            }
        }
        
        return value;
    },

    // Establecer configuración
    set: (path, value) => {
        const keys = path.split('.');
        let current = PROJECT_CONFIG;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
    },

    // Verificar si una configuración existe
    has: (path) => Config.get(path) !== undefined,

    // Obtener configuración con valor por defecto
    getOrDefault: (path, defaultValue) => {
        const value = Config.get(path);
        return value !== undefined ? value : defaultValue;
    },

    // Obtener configuración de la agencia
    getAgency: () => PROJECT_CONFIG.agency,

    // Obtener configuración de la API
    getAPI: () => PROJECT_CONFIG.api,

    // Obtener configuración de formularios
    getForms: () => PROJECT_CONFIG.forms,

    // Obtener configuración de validación
    getValidation: () => PROJECT_CONFIG.validation,

    // Obtener configuración de destinos
    getDestinations: () => PROJECT_CONFIG.destinations,

    // Obtener configuración de servicios
    getServices: () => PROJECT_CONFIG.services,

    // Obtener configuración de animaciones
    getAnimations: () => PROJECT_CONFIG.animations,

    // Obtener configuración responsive
    getResponsive: () => PROJECT_CONFIG.responsive,

    // Obtener configuración de performance
    getPerformance: () => PROJECT_CONFIG.performance,

    // Obtener configuración de analytics
    getAnalytics: () => PROJECT_CONFIG.analytics,

    // Obtener configuración de notificaciones
    getNotifications: () => PROJECT_CONFIG.notifications,

    // Obtener configuración de idiomas
    getLanguages: () => PROJECT_CONFIG.languages,

    // Obtener configuración de accesibilidad
    getAccessibility: () => PROJECT_CONFIG.accessibility,

    // Obtener configuración de SEO
    getSEO: () => PROJECT_CONFIG.seo,

    // Obtener configuración de desarrollo
    getDevelopment: () => PROJECT_CONFIG.development,

    // Verificar si estamos en modo desarrollo
    isDevelopment: () => PROJECT_CONFIG.development.debug,

    // Verificar si las animaciones están habilitadas
    areAnimationsEnabled: () => PROJECT_CONFIG.animations.enabled,

    // Verificar si el lazy loading está habilitado
    isLazyLoadingEnabled: () => PROJECT_CONFIG.performance.lazyLoading,

    // Verificar si el analytics está habilitado
    isAnalyticsEnabled: () => PROJECT_CONFIG.analytics.enabled,

    // Verificar si la accesibilidad está habilitada
    isAccessibilityEnabled: () => PROJECT_CONFIG.accessibility.enabled,

    // Obtener breakpoint actual
    getCurrentBreakpoint: () => {
        const width = window.innerWidth;
        const breakpoints = PROJECT_CONFIG.responsive.breakpoints;
        
        if (width <= breakpoints.mobile) return 'mobile';
        if (width <= breakpoints.tablet) return 'tablet';
        if (width <= breakpoints.desktop) return 'desktop';
        return 'largeDesktop';
    },

    // Verificar si es dispositivo móvil
    isMobile: () => Config.getCurrentBreakpoint() === 'mobile',

    // Verificar si es dispositivo táctil
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,

    // Obtener configuración específica para el dispositivo actual
    getDeviceConfig: () => {
        const breakpoint = Config.getCurrentBreakpoint();
        const isTouch = Config.isTouchDevice();
        
        return {
            breakpoint,
            isTouch,
            isMobile: breakpoint === 'mobile',
            isTablet: breakpoint === 'tablet',
            isDesktop: breakpoint === 'desktop' || breakpoint === 'largeDesktop'
        };
    }
};

// ===== EXPORTACIÓN =====
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = { PROJECT_CONFIG, Config };
} else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports'], function(exports) {
        exports.PROJECT_CONFIG = PROJECT_CONFIG;
        exports.Config = Config;
    });
} else {
    // Browser
    window.PROJECT_CONFIG = PROJECT_CONFIG;
    window.Config = Config;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Configurar analytics si está habilitado
    if (Config.isAnalyticsEnabled()) {
        console.log('Analytics habilitado');
        // Aquí iría la inicialización de Google Analytics
    }

    // Configurar accesibilidad si está habilitado
    if (Config.isAccessibilityEnabled()) {
        console.log('Accesibilidad habilitada');
        // Aquí irían las configuraciones de accesibilidad
    }

    // Configurar performance si está habilitado
    if (Config.getPerformance().lazyLoading) {
        console.log('Lazy loading habilitado');
        // Aquí iría la configuración de lazy loading
    }

    // Log de configuración en desarrollo
    if (Config.isDevelopment()) {
        console.log('Configuración del proyecto:', PROJECT_CONFIG);
        console.log('Configuración del dispositivo:', Config.getDeviceConfig());
    }
});
