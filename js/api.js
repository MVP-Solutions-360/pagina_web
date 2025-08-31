// ===== CONFIGURACIÓN DE LA API =====
const API_CONFIG = {
    baseURL: window.PROJECT_CONFIG?.api?.baseURL || 'http://localhost:8000/api/v1', // Usar config.js o fallback local
    timeout: window.PROJECT_CONFIG?.api?.timeout || 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

// ===== CLASE PRINCIPAL DE LA API =====
class AgenciaAPI {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.timeout = API_CONFIG.timeout;
        this.headers = API_CONFIG.headers;
        this.agencySlug = window.PROJECT_CONFIG?.agency?.slug || 'agencia-principal'; // Usar config.js o fallback
    }

    // ===== MÉTODOS HTTP =====
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'GET',
            headers: { ...this.headers, ...options.headers },
            timeout: this.timeout,
            ...options
        };

        console.log('🔍 Request config:', {
            url,
            method: config.method,
            headers: config.headers,
            body: config.body
        });

        try {
            // Crear AbortController para timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);
            
            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('📡 Response status:', response.status);
            console.log('📡 Response headers:', response.headers);

            if (!response.ok) {
                // Intentar leer el body del error para más detalles
                let errorBody = '';
                try {
                    errorBody = await response.text();
                    console.log('❌ Error response body:', errorBody);
                } catch (e) {
                    console.log('❌ No se pudo leer el body del error');
                }
                
                throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
            }

            const data = await response.json();
            console.log('✅ Response data:', data);
            return { success: true, data };

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('La solicitud tardó demasiado tiempo');
            }
            
            console.error('❌ Error en la API:', error);
            throw error;
        }
    }

    // ===== ENDPOINTS DE LA AGENCIA =====
    
    /**
     * Obtener información de la agencia
     */
    async getAgencyInfo() {
        try {
            const response = await this.request(`/agency/${this.agencySlug}`);
            return response;
        } catch (error) {
            console.error('Error al obtener información de la agencia:', error);
            throw error;
        }
    }

    /**
     * Obtener tipos de servicios disponibles
     */
    async getServiceTypes() {
        try {
            const response = await this.request('/services/types');
            return response;
        } catch (error) {
            console.error('Error al obtener tipos de servicios:', error);
            throw error;
        }
    }

    /**
     * Obtener destinos populares
     */
    async getPopularDestinations() {
        try {
            const response = await this.request('/destinations/popular');
            return response;
        } catch (error) {
            console.error('Error al obtener destinos populares:', error);
            throw error;
        }
    }

    // ===== ENDPOINTS DE COTIZACIONES =====
    
    /**
     * Crear una nueva cotización
     */
    async createQuotation(quotationData) {
        try {
            console.log('🚀 Datos originales recibidos:', JSON.stringify(quotationData, null, 2));
            
            // Validar datos requeridos
            this.validateQuotationData(quotationData);

            // Preparar datos para la API
            const apiData = this.prepareQuotationData(quotationData);
            console.log('📤 Datos preparados para la API:', JSON.stringify(apiData, null, 2));

            // Log del request completo
            console.log('🌐 Enviando request a:', `${this.baseURL}/quotation`);
            console.log('📋 Headers:', this.headers);
            console.log('📦 Body:', JSON.stringify(apiData, null, 2));

            const response = await this.request('/quotation', {
                method: 'POST',
                body: JSON.stringify(apiData)
            });

            console.log('✅ Respuesta exitosa:', response);
            return response;
        } catch (error) {
            console.error('❌ Error al crear cotización:', error);
            throw error;
        }
    }

    /**
     * Obtener cotizaciones del cliente
     */
    async getClientQuotations(clientEmail) {
        try {
            const response = await this.request(`/quotation/client/${encodeURIComponent(clientEmail)}`);
            return response;
        } catch (error) {
            console.error('Error al obtener cotizaciones del cliente:', error);
            throw error;
        }
    }

    /**
     * Obtener estado de una cotización
     */
    async getQuotationStatus(quotationId) {
        try {
            const response = await this.request(`/quotation/${quotationId}/status`);
            return response;
        } catch (error) {
            console.error('Error al obtener estado de la cotización:', error);
            throw error;
        }
    }

    // ===== ENDPOINTS DE TAREAS =====
    
    /**
     * Crear una nueva tarea/consulta
     */
    async createTask(taskData) {
        try {
            // Validar datos requeridos
            this.validateTaskData(taskData);

            const response = await this.request('/task', {
                method: 'POST',
                body: JSON.stringify(taskData)
            });

            return response;
        } catch (error) {
            console.error('Error al crear tarea:', error);
            throw error;
        }
    }

    /**
     * Obtener tareas del cliente
     */
    async getClientTasks(clientEmail) {
        try {
            const response = await this.request(`/task/client/${encodeURIComponent(clientEmail)}`);
            return response;
        } catch (error) {
            console.error('Error al obtener tareas del cliente:', error);
            throw error;
        }
    }

    // ===== ENDPOINTS DE PAQUETES TURÍSTICOS =====
    
    /**
     * Obtener lista de paquetes turísticos
     * GET /api/v1/agency/agencia-principal/packages
     */
    async getPackages(filters = {}) {
        try {
            console.log('📦 Obteniendo paquetes con filtros:', filters);
            
            // Construir query string con filtros
            const queryParams = new URLSearchParams();
            
            if (filters.destination) queryParams.append('destination', filters.destination);
            if (filters.state) queryParams.append('state', filters.state);
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.page) queryParams.append('page', filters.page);
            if (filters.limit) queryParams.append('limit', filters.limit);
            if (filters.minPrice) queryParams.append('min_price', filters.minPrice);
            if (filters.maxPrice) queryParams.append('max_price', filters.maxPrice);
            if (filters.departureDate) queryParams.append('departure_date', filters.departureDate);
            if (filters.returnDate) queryParams.append('return_date', filters.returnDate);
            
            const queryString = queryParams.toString();
            const endpoint = `/agency/${this.agencySlug}/packages${queryString ? `?${queryString}` : ''}`;
            
            const response = await this.request(endpoint);
            console.log('✅ Paquetes obtenidos exitosamente:', response);
            return response;
        } catch (error) {
            console.error('❌ Error al obtener paquetes:', error);
            throw error;
        }
    }

    /**
     * Obtener paquete específico por ID
     * GET /api/v1/agency/agencia-principal/packages/{id}
     */
    async getPackageById(packageId) {
        try {
            console.log('🔍 Obteniendo paquete con ID:', packageId);
            
            const response = await this.request(`/agency/${this.agencySlug}/packages/${packageId}`);
            console.log('✅ Paquete obtenido exitosamente:', response);
            return response;
        } catch (error) {
            console.error('❌ Error al obtener paquete:', error);
            throw error;
        }
    }

    /**
     * Obtener destinos disponibles
     * GET /api/v1/agency/agencia-principal/packages/destinations
     */
    async getPackageDestinations() {
        try {
            console.log('🌍 Obteniendo destinos de paquetes');
            
            const response = await this.request(`/agency/${this.agencySlug}/packages/destinations`);
            console.log('✅ Destinos obtenidos exitosamente:', response);
            return response;
        } catch (error) {
            console.error('❌ Error al obtener destinos:', error);
            throw error;
        }
    }

    /**
     * Obtener paquetes destacados
     * GET /api/v1/agency/agencia-principal/packages/featured
     */
    async getFeaturedPackages(limit = 6) {
        try {
            console.log('⭐ Obteniendo paquetes destacados, límite:', limit);
            
            const response = await this.request(`/agency/${this.agencySlug}/packages/featured?limit=${limit}`);
            console.log('✅ Paquetes destacados obtenidos exitosamente:', response);
            return response;
        } catch (error) {
            console.error('❌ Error al obtener paquetes destacados:', error);
            throw error;
        }
    }

    // ===== ENDPOINTS DE CLIENTES =====
    
    /**
     * Crear un nuevo cliente
     */
    async createClient(clientData) {
        try {
            console.log('👤 Creando cliente con datos:', clientData);
            
            const response = await this.request('/client', {
                method: 'POST',
                body: JSON.stringify(clientData)
            });

            console.log('✅ Cliente creado exitosamente:', response);
            return response;
        } catch (error) {
            console.error('❌ Error al crear cliente:', error);
            throw error;
        }
    }
    
    /**
     * Crear o actualizar cliente
     */
    async upsertClient(clientData) {
        try {
            // Validar datos requeridos
            this.validateClientData(clientData);

            const response = await this.request('/client', {
                method: 'POST',
                body: JSON.stringify(clientData)
            });

            return response;
        } catch (error) {
            console.error('Error al crear/actualizar cliente:', error);
            throw error;
        }
    }

    /**
     * Buscar cliente por email
     */
    async findClientByEmail(email) {
        try {
            const response = await this.request(`/client/search?email=${encodeURIComponent(email)}`);
            return response;
        } catch (error) {
            console.error('Error al buscar cliente:', error);
            throw error;
        }
    }

    // ===== VALIDACIONES =====
    
    validateQuotationData(data) {
        console.log('🔍 Validando datos:', data);
        
        // Verificar campos requeridos con fallbacks
        const name = data.client_name || data.name;
        const email = data.client_email || data.email;
        const phone = data.client_phone || data.phone;
        const serviceType = data.request_type || data.service_type;
        const destinationType = data.destination_type;
        const origin = data.origin;
        const destination = data.destination;
        const departureDate = data.departure_date;
        const adults = data.adult || data.adults;
        
        // Validar campos requeridos
        if (!name || name.toString().trim() === '') {
            throw new Error('Campo requerido faltante: name (client_name)');
        }
        
        if (!email || email.toString().trim() === '') {
            throw new Error('Campo requerido faltante: email (client_email)');
        }
        
        if (!phone || phone.toString().trim() === '') {
            throw new Error('Campo requerido faltante: phone (client_phone)');
        }
        
        if (!serviceType || serviceType.toString().trim() === '') {
            throw new Error('Campo requerido faltante: service_type (request_type)');
        }
        
        if (!destinationType || destinationType.toString().trim() === '') {
            throw new Error('Campo requerido faltante: destination_type');
        }
        
        if (!origin || origin.toString().trim() === '') {
            throw new Error('Campo requerido faltante: origin');
        }
        
        if (!destination || destination.toString().trim() === '') {
            throw new Error('Campo requerido faltante: destination');
        }
        
        if (!departureDate || departureDate.toString().trim() === '') {
            throw new Error('Campo requerido faltante: departure_date');
        }
        
        if (!adults || parseInt(adults) < 1) {
            throw new Error('Campo requerido faltante: adults (adult)');
        }

        // Validar email
        if (!this.isValidEmail(email)) {
            throw new Error('Email inválido');
        }

        // Validar teléfono
        if (!this.isValidPhone(phone)) {
            throw new Error('Teléfono inválido');
        }

        // Validar fechas
        console.log(`🔍 Validando fecha de salida: ${departureDate}`);
        if (!this.isValidDate(departureDate)) {
            throw new Error('Fecha de salida inválida');
        }

        if (data.return_date) {
            console.log(`🔍 Validando fecha de regreso: ${data.return_date}`);
            if (!this.isValidReturnDate(data.departure_date, data.return_date)) {
                throw new Error('Fecha de regreso debe ser posterior a la fecha de salida');
            }
        }

        // Validar números
        if (data.adults < 1 || data.adults > 10) {
            throw new Error('Número de adultos debe estar entre 1 y 10');
        }

        if (data.children && (data.children < 0 || data.children > 10)) {
            throw new Error('Número de niños debe estar entre 0 y 10');
        }

        if (data.infants && (data.infants < 0 || data.infants > 5)) {
            throw new Error('Número de infantes debe estar entre 0 y 5');
        }
        
        console.log('✅ Validación exitosa');
    }

    validateTaskData(data) {
        const requiredFields = ['name', 'email', 'message'];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].toString().trim() === '') {
                throw new Error(`Campo requerido faltante: ${field}`);
            }
        });

        if (!this.isValidEmail(data.email)) {
            throw new Error('Email inválido');
        }
    }

    validateClientData(data) {
        const requiredFields = ['name', 'email', 'phone'];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].toString().trim() === '') {
                throw new Error(`Campo requerido faltante: ${field}`);
            }
        });

        if (!this.isValidEmail(data.email)) {
            throw new Error('Email inválido');
        }

        if (!this.isValidPhone(data.phone)) {
            throw new Error('Teléfono inválido');
        }
    }

    // ===== UTILIDADES =====
    
    generateSlug(name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 30) + '-' + Date.now().toString(36);
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\+]?[0-9\s\-\(\)]{7,}$/.test(phone);
    }

    isValidDate(date) {
        if (!date) return false;
        
        const selectedDate = new Date(date);
        
        // Verificar que la fecha sea válida
        if (isNaN(selectedDate.getTime())) {
            console.log('❌ Fecha inválida:', date);
            return false;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const isValid = selectedDate >= today;
        console.log(`🔍 Validando fecha: ${date} -> ${selectedDate.toISOString()} >= ${today.toISOString()} = ${isValid}`);
        
        return isValid;
    }

    isValidReturnDate(departureDate, returnDate) {
        if (!departureDate || !returnDate) return false;
        
        const departure = new Date(departureDate);
        const returnDateObj = new Date(returnDate);
        
        // Verificar que ambas fechas sean válidas
        if (isNaN(departure.getTime()) || isNaN(returnDateObj.getTime())) {
            console.log('❌ Fecha inválida en validación de regreso:', { departureDate, returnDate });
            return false;
        }
        
        const isValid = returnDateObj > departure;
        console.log(`🔍 Validando fecha de regreso: ${returnDate} > ${departureDate} = ${isValid}`);
        
        return isValid;
    }

    // ===== PREPARACIÓN DE DATOS =====
    
    prepareQuotationData(formData) {
        console.log('🔧 Preparando datos del formulario:', formData);
        
        // Generar slug único para el cliente
        const clientSlug = this.generateSlug(formData.client_name || formData.name);
        
        // Mapeo de tipos de servicio del frontend al backend
        const requestTypeMapping = {
            'Vuelo': 'tiquete_aereo',
            'Hotel': 'hotel',
            'Paquete': 'paquete_completo',
            'Transfer': 'traslado',
            'Asistencia médica': 'seguro_viaje',
            'Otro': 'plan_turistico'
        };
        
        // Mapeo de tipos de destino del frontend al backend
        const destinationTypeMapping = {
            'Nacional': 'nacional',
            'Internacional': 'internacional'
        };
        
        // Convertir valores usando el mapeo
        const mappedRequestType = requestTypeMapping[formData.request_type] || formData.request_type;
        const mappedDestinationType = destinationTypeMapping[formData.destination_type] || formData.destination_type;
        
        console.log(`🔄 Mapeo de valores: ${formData.request_type} → ${mappedRequestType}, ${formData.destination_type} → ${mappedDestinationType}`);
        
        // Estructura EXACTA que espera tu API Laravel según el error
        const preparedData = {
            // Campos del cliente (requeridos por la tabla clients)
            slug: clientSlug, // Campo 'slug' requerido por la tabla clients
            name: formData.client_name || formData.name,
            email: formData.client_email || formData.email,
            phone: formData.client_phone || formData.phone,
            
            // Campos de la agencia
            agency_slug: "agencia-principal",
            
            // Campos del cliente (alias para compatibilidad)
            client_name: formData.client_name || formData.name,
            client_email: formData.client_email || formData.email,
            client_phone: formData.client_phone || formData.phone,
            client_slug: clientSlug,
            
            // Campos del viaje
            request_type: mappedRequestType, // Usar valor mapeado
            destination_type: mappedDestinationType, // Usar valor mapeado
            origin: formData.origin,
            destination: formData.destination,
            departure_date: formData.departure_date,
            return_date: formData.return_date || null,
            adult: parseInt(formData.adult || formData.adults || 1),
            children: parseInt(formData.children || 0),
            infant: parseInt(formData.infant || formData.infants || 0),
            budget_range: formData.budget_range || "1000000-2000000",
            description: formData.description || formData.special_requirements || "Viaje solicitado desde el sitio web", // ← NUEVO CAMPO REQUERIDO
            special_requirements: formData.description || formData.special_requirements || null,
            contact_preference: formData.contact_preference || 'email',
            best_time_to_contact: formData.best_time_to_contact || formData.best_contact_time || null,
            personnel_id: 1, // ← ASIGNAR PERSONAL POR DEFECTO (ID del primer asesor)
            task_personnel_id: 1 // ← PERSONAL PARA LA TAREA (campo adicional)
        };
        
        console.log('📋 Datos preparados (estructura EXACTA API Laravel):', preparedData);
        console.log('🔍 Verificando campo slug:', preparedData.slug);
        console.log('🔍 Verificando campo client_slug:', preparedData.client_slug);
        console.log('✅ Campo slug listo para enviar a Laravel:', preparedData.slug);
        console.log('👤 Campo personnel_id:', preparedData.personnel_id);
        console.log('👥 Campo task_personnel_id:', preparedData.task_personnel_id);
        return preparedData;
    }

    // ===== MANEJO DE ERRORES =====
    
    handleAPIError(error) {
        let userMessage = 'Ha ocurrido un error. Por favor intenta nuevamente.';
        let logMessage = error.message;

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            userMessage = 'Error de conexión. Verifica tu conexión a internet.';
            logMessage = 'Error de red: ' + error.message;
        } else if (error.message.includes('timeout')) {
            userMessage = 'La solicitud tardó demasiado tiempo. Por favor intenta nuevamente.';
            logMessage = 'Timeout: ' + error.message;
        } else if (error.message.includes('HTTP error')) {
            if (error.message.includes('401')) {
                userMessage = 'Error de autenticación.';
                logMessage = 'Error 401: No autorizado';
            } else if (error.message.includes('403')) {
                userMessage = 'Acceso denegado.';
                logMessage = 'Error 403: Acceso denegado';
            } else if (error.message.includes('404')) {
                userMessage = 'Recurso no encontrado.';
                logMessage = 'Error 404: Recurso no encontrado';
            } else if (error.message.includes('500')) {
                userMessage = 'Error del servidor. Por favor intenta más tarde.';
                logMessage = 'Error 500: Error interno del servidor';
            }
        }

        // Log del error para debugging
        console.error('Error de la API:', logMessage);

        return {
            success: false,
            message: userMessage,
            error: logMessage
        };
    }

    // ===== MÉTODOS DE CONVENIENCIA =====
    
    /**
     * Proceso completo de envío de cotización
     */
    async processQuotationSubmission(formData) {
        try {
            // 1. Validar datos de entrada
            this.validateQuotationData(formData);

            // 2. Crear cotización directamente (que debería manejar la creación del cliente)
            const quotationResponse = await this.createQuotation(formData);

            if (!quotationResponse.success) {
                throw new Error('Error al crear la cotización');
            }

            return {
                success: true,
                data: {
                    quotation_id: quotationResponse.data.id,
                    reference_number: quotationResponse.data.reference_number || `COT-${Date.now()}`,
                    message: 'Cotización enviada exitosamente'
                }
            };

        } catch (error) {
            return this.handleAPIError(error);
        }
    }

    /**
     * Proceso completo de envío de consulta
     */
    async processContactSubmission(formData) {
        try {
            // 1. Validar datos de entrada
            this.validateTaskData(formData);

            // 2. Por ahora, solo simulamos el envío exitoso
            // (cuando implementes el endpoint de tareas, descomenta el código de abajo)
            
            /*
            const taskResponse = await this.createTask({
                client_name: formData.name,
                client_email: formData.email,
                subject: 'Consulta desde el sitio web',
                message: formData.message,
                priority: 'medium',
                type: 'general_inquiry'
            });
            */

            return {
                success: true,
                data: {
                    message: 'Consulta enviada exitosamente (modo simulación)'
                }
            };

        } catch (error) {
            return this.handleAPIError(error);
        }
    }
}

// ===== INSTANCIA GLOBAL =====
const agenciaAPI = new AgenciaAPI();

// ===== FUNCIONES PÚBLICAS =====
window.AgenciaAPI = {
    // Procesar cotización
    processQuotation: async function(formData) {
        return await agenciaAPI.processQuotationSubmission(formData);
    },

    // Procesar consulta de contacto
    processContact: async function(formData) {
        return await agenciaAPI.processContactSubmission(formData);
    },

    // Obtener información de la agencia
    getAgencyInfo: async function() {
        return await agenciaAPI.getAgencyInfo();
    },

    // Obtener tipos de servicios
    getServiceTypes: async function() {
        return await agenciaAPI.getServiceTypes();
    },

    // Obtener destinos populares
    getPopularDestinations: async function() {
        return await agenciaAPI.getPopularDestinations();
    },

    // Buscar cliente por email
    findClient: async function(email) {
        return await agenciaAPI.findClientByEmail(email);
    },

    // ===== FUNCIONES DE PAQUETES =====
    
    // Obtener lista de paquetes
    getPackages: async function(filters = {}) {
        return await agenciaAPI.getPackages(filters);
    },

    // Obtener paquete específico
    getPackageById: async function(packageId) {
        return await agenciaAPI.getPackageById(packageId);
    },

    // Obtener destinos de paquetes
    getPackageDestinations: async function() {
        return await agenciaAPI.getPackageDestinations();
    },

    // Obtener paquetes destacados
    getFeaturedPackages: async function(limit = 6) {
        return await agenciaAPI.getFeaturedPackages(limit);
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargar información de la agencia al iniciar
        const agencyInfo = await agenciaAPI.getAgencyInfo();
        if (agencyInfo.success) {
            // Aquí podrías actualizar la UI con la información de la agencia
            console.log('Información de la agencia cargada:', agencyInfo.data);
        }

        // Cargar tipos de servicios
        const serviceTypes = await agenciaAPI.getServiceTypes();
        if (serviceTypes.success) {
            // Aquí podrías actualizar los selects con los tipos de servicios
            console.log('Tipos de servicios cargados:', serviceTypes.data);
        }

        // Cargar destinos populares
        const popularDestinations = await agenciaAPI.getPopularDestinations();
        if (popularDestinations.success) {
            // Aquí podrías actualizar la lista de destinos populares
            console.log('Destinos populares cargados:', popularDestinations.data);
        }

    } catch (error) {
        console.error('Error al inicializar la API:', error);
    }
});

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promesa rechazada no manejada:', event.reason);
    
    // Aquí podrías mostrar un mensaje de error al usuario
    if (window.AgenciaViajes && window.AgenciaViajes.showErrorMessage) {
        window.AgenciaViajes.showErrorMessage('Ha ocurrido un error inesperado. Por favor recarga la página.');
    }
});
