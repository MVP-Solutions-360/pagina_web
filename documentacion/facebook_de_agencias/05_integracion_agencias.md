# Guía de Integración para Agencias - Facebook de Agencias

## 🏢 Bienvenido a la Plataforma

Esta guía está diseñada para ayudar a las agencias de viajes a integrarse exitosamente con la plataforma "Facebook de Agencias". Aquí encontrarás toda la información necesaria para comenzar a publicar paquetes, gestionar interacciones sociales y maximizar tu presencia en la plataforma.

## 🚀 Inicio Rápido

### **Paso 1: Registro de Agencia**

1. **Solicitar Acceso**
   - Contacta a nuestro equipo: `integracion@facebookdeagencias.com`
   - Proporciona información básica de tu agencia
   - Recibe credenciales de acceso

2. **Configuración Inicial**
   - Accede al panel de administración
   - Completa el perfil de tu agencia
   - Configura métodos de pago y contacto

3. **Verificación**
   - Envía documentación legal de la agencia
   - Espera aprobación (24-48 horas)
   - Recibe notificación de activación

### **Paso 2: Configuración de API**

```bash
# Instalar SDK de JavaScript
npm install facebook-de-agencias-api

# O instalar SDK de PHP
composer require facebook-de-agencias/api-client
```

### **Paso 3: Primera Publicación**

```javascript
// Ejemplo básico de publicación
const AgenciaAPI = require('facebook-de-agencias-api');

const api = new AgenciaAPI({
    baseURL: 'https://api.facebookdeagencias.com/api/v1',
    token: 'tu-token-de-acceso'
});

// Crear primer paquete
const paquete = await api.packages.create({
    title: "Paquete Caribe 7 días",
    description: "Descripción del paquete",
    destination: "Cancún, México",
    price: 2500000,
    currency: "COP",
    duration_days: 7,
    departure_date: "2025-12-01",
    return_date: "2025-12-08",
    includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas"],
    excludes: ["Almuerzos y cenas"],
    images: ["https://tu-sitio.com/imagen1.jpg"]
});
```

## 🔑 Autenticación y Seguridad

### **Obtención de Token de Acceso**

```http
POST https://api.facebookdeagencias.com/api/v1/auth/login
Content-Type: application/json

{
    "email": "tu-email@agencia.com",
    "password": "tu-password"
}
```

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "token_type": "Bearer",
        "expires_in": 3600,
        "agency": {
            "id": 1,
            "slug": "tu-agencia",
            "name": "Tu Agencia de Viajes"
        }
    }
}
```

### **Uso del Token**

```javascript
// Configurar token en todas las peticiones
const api = new AgenciaAPI({
    baseURL: 'https://api.facebookdeagencias.com/api/v1',
    token: 'tu-token-aqui'
});

// El token se incluye automáticamente en los headers
const paquetes = await api.packages.list();
```

### **Renovación de Token**

```javascript
// Renovar token antes de que expire
const refreshToken = async () => {
    try {
        const response = await api.auth.refresh();
        api.setToken(response.data.token);
        return response.data.token;
    } catch (error) {
        // Redirigir a login
        window.location.href = '/login';
    }
};
```

## 📦 Gestión de Paquetes

### **Crear Paquete**

```javascript
const crearPaquete = async (datosPaquete) => {
    try {
        const paquete = await api.packages.create({
            title: datosPaquete.titulo,
            description: datosPaquete.descripcion,
            destination: datosPaquete.destino,
            price: datosPaquete.precio,
            currency: "COP",
            duration_days: datosPaquete.duracion,
            departure_date: datosPaquete.fechaSalida,
            return_date: datosPaquete.fechaRegreso,
            includes: datosPaquete.incluye,
            excludes: datosPaquete.noIncluye,
            images: datosPaquete.imagenes
        });
        
        console.log('Paquete creado:', paquete.data);
        return paquete.data;
    } catch (error) {
        console.error('Error al crear paquete:', error);
        throw error;
    }
};
```

### **Actualizar Paquete**

```javascript
const actualizarPaquete = async (idPaquete, datosActualizados) => {
    try {
        const paquete = await api.packages.update(idPaquete, {
            title: datosActualizados.titulo,
            price: datosActualizados.precio,
            // Solo incluir campos que quieres actualizar
        });
        
        return paquete.data;
    } catch (error) {
        console.error('Error al actualizar paquete:', error);
        throw error;
    }
};
```

### **Eliminar Paquete**

```javascript
const eliminarPaquete = async (idPaquete) => {
    try {
        await api.packages.delete(idPaquete);
        console.log('Paquete eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar paquete:', error);
        throw error;
    }
};
```

### **Listar Paquetes de tu Agencia**

```javascript
const obtenerPaquetes = async (filtros = {}) => {
    try {
        const paquetes = await api.packages.list({
            agency_slug: 'tu-agencia',
            status: 'active',
            page: 1,
            limit: 20,
            ...filtros
        });
        
        return paquetes.data;
    } catch (error) {
        console.error('Error al obtener paquetes:', error);
        throw error;
    }
};
```

## 📊 Monitoreo y Analytics

### **Obtener Estadísticas de tu Agencia**

```javascript
const obtenerEstadisticas = async () => {
    try {
        const stats = await api.analytics.getAgencyStats('tu-agencia');
        
        console.log('Estadísticas:', {
            totalPaquetes: stats.data.total_packages,
            totalLikes: stats.data.total_likes,
            totalComentarios: stats.data.total_comments,
            ratingPromedio: stats.data.average_rating
        });
        
        return stats.data;
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        throw error;
    }
};
```

### **Obtener Paquetes Más Populares**

```javascript
const obtenerPaquetesPopulares = async () => {
    try {
        const paquetes = await api.packages.getPopular({
            agency_slug: 'tu-agencia',
            limit: 10,
            sort: 'likes_count'
        });
        
        return paquetes.data;
    } catch (error) {
        console.error('Error al obtener paquetes populares:', error);
        throw error;
    }
};
```

## 💬 Gestión de Interacciones Sociales

### **Obtener Comentarios de Paquetes**

```javascript
const obtenerComentarios = async (idPaquete) => {
    try {
        const comentarios = await api.social.getComments(idPaquete);
        return comentarios.data;
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        throw error;
    }
};
```

### **Responder a Comentarios**

```javascript
const responderComentario = async (idComentario, respuesta) => {
    try {
        const respuestaComentario = await api.social.replyToComment(idComentario, {
            comment: respuesta
        });
        
        return respuestaComentario.data;
    } catch (error) {
        console.error('Error al responder comentario:', error);
        throw error;
    }
};
```

### **Obtener Notificaciones**

```javascript
const obtenerNotificaciones = async () => {
    try {
        const notificaciones = await api.notifications.list({
            unread_only: true,
            limit: 50
        });
        
        return notificaciones.data;
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        throw error;
    }
};
```

## 🔔 Sistema de Notificaciones

### **Configurar Webhooks**

```javascript
// Configurar webhook para recibir notificaciones en tiempo real
const configurarWebhook = async (urlWebhook) => {
    try {
        const webhook = await api.webhooks.create({
            url: urlWebhook,
            events: [
                'package.liked',
                'package.commented',
                'package.reviewed',
                'quotation.created'
            ]
        });
        
        console.log('Webhook configurado:', webhook.data);
        return webhook.data;
    } catch (error) {
        console.error('Error al configurar webhook:', error);
        throw error;
    }
};
```

### **Procesar Notificaciones Webhook**

```javascript
// Endpoint para recibir webhooks
app.post('/webhook/facebook-agencias', (req, res) => {
    const { event, data } = req.body;
    
    switch (event) {
        case 'package.liked':
            console.log('Nuevo like en paquete:', data.package_id);
            // Procesar like
            break;
            
        case 'package.commented':
            console.log('Nuevo comentario en paquete:', data.package_id);
            // Procesar comentario
            break;
            
        case 'quotation.created':
            console.log('Nueva cotización:', data.quotation_id);
            // Procesar cotización
            break;
    }
    
    res.status(200).json({ success: true });
});
```

## 📱 Integración con Sistemas Existentes

### **Sincronización con CRM**

```javascript
// Ejemplo de sincronización con CRM existente
const sincronizarConCRM = async () => {
    try {
        // Obtener paquetes del CRM
        const paquetesCRM = await crmAPI.getPackages();
        
        // Sincronizar con Facebook de Agencias
        for (const paqueteCRM of paquetesCRM) {
            const paqueteExistente = await api.packages.findByExternalId(paqueteCRM.id);
            
            if (paqueteExistente) {
                // Actualizar paquete existente
                await api.packages.update(paqueteExistente.id, {
                    price: paqueteCRM.precio,
                    departure_date: paqueteCRM.fechaSalida,
                    // Otros campos actualizables
                });
            } else {
                // Crear nuevo paquete
                await api.packages.create({
                    external_id: paqueteCRM.id,
                    title: paqueteCRM.titulo,
                    description: paqueteCRM.descripcion,
                    destination: paqueteCRM.destino,
                    price: paqueteCRM.precio,
                    // Otros campos
                });
            }
        }
        
        console.log('Sincronización completada');
    } catch (error) {
        console.error('Error en sincronización:', error);
        throw error;
    }
};
```

### **Integración con Sistema de Pagos**

```javascript
// Procesar pagos de cotizaciones
const procesarPago = async (cotizacionId, datosPago) => {
    try {
        // Procesar pago con tu gateway
        const resultadoPago = await paymentGateway.process({
            amount: datosPago.monto,
            currency: 'COP',
            customer: datosPago.cliente,
            description: `Pago cotización ${cotizacionId}`
        });
        
        // Actualizar estado en Facebook de Agencias
        await api.quotations.updateStatus(cotizacionId, {
            status: 'paid',
            payment_reference: resultadoPago.reference,
            paid_at: new Date().toISOString()
        });
        
        return resultadoPago;
    } catch (error) {
        console.error('Error al procesar pago:', error);
        throw error;
    }
};
```

## 🛠️ Herramientas de Desarrollo

### **SDK de JavaScript Completo**

```javascript
// facebook-de-agencias-api.js
class AgenciaAPI {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.token = config.token;
        this.headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'GET',
            headers: this.headers,
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error en la API');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Métodos de paquetes
    async createPackage(data) {
        return await this.request('/packages', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updatePackage(id, data) {
        return await this.request(`/packages/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deletePackage(id) {
        return await this.request(`/packages/${id}`, {
            method: 'DELETE'
        });
    }

    async getPackages(filters = {}) {
        const queryParams = new URLSearchParams(filters);
        return await this.request(`/packages?${queryParams}`);
    }

    // Métodos de analytics
    async getStats() {
        return await this.request('/analytics/stats');
    }

    // Métodos de notificaciones
    async getNotifications(filters = {}) {
        const queryParams = new URLSearchParams(filters);
        return await this.request(`/notifications?${queryParams}`);
    }
}

module.exports = AgenciaAPI;
```

### **Script de Sincronización Automática**

```javascript
// sync-script.js
const AgenciaAPI = require('./facebook-de-agencias-api');
const cron = require('node-cron');

const api = new AgenciaAPI({
    baseURL: 'https://api.facebookdeagencias.com/api/v1',
    token: process.env.AGENCY_TOKEN
});

// Sincronizar cada hora
cron.schedule('0 * * * *', async () => {
    console.log('Iniciando sincronización automática...');
    
    try {
        await sincronizarPaquetes();
        await sincronizarCotizaciones();
        console.log('Sincronización completada');
    } catch (error) {
        console.error('Error en sincronización:', error);
    }
});

const sincronizarPaquetes = async () => {
    // Lógica de sincronización de paquetes
    const paquetesCRM = await obtenerPaquetesDelCRM();
    
    for (const paquete of paquetesCRM) {
        await api.createPackage(paquete);
    }
};

const sincronizarCotizaciones = async () => {
    // Lógica de sincronización de cotizaciones
    const cotizaciones = await api.quotations.list();
    
    for (const cotizacion of cotizaciones.data) {
        await procesarCotizacion(cotizacion);
    }
};
```

## 📋 Checklist de Integración

### **Pre-Integración**
- [ ] Solicitar acceso a la plataforma
- [ ] Recibir credenciales de API
- [ ] Configurar entorno de desarrollo
- [ ] Instalar SDK correspondiente

### **Configuración Inicial**
- [ ] Completar perfil de agencia
- [ ] Configurar métodos de pago
- [ ] Establecer webhooks
- [ ] Probar conexión API

### **Desarrollo**
- [ ] Implementar autenticación
- [ ] Crear funciones de paquetes
- [ ] Configurar sincronización
- [ ] Implementar manejo de errores

### **Testing**
- [ ] Probar creación de paquetes
- [ ] Verificar actualizaciones
- [ ] Probar notificaciones
- [ ] Validar sincronización

### **Producción**
- [ ] Configurar tokens de producción
- [ ] Activar webhooks
- [ ] Monitorear logs
- [ ] Configurar alertas

## 🆘 Soporte y Recursos

### **Documentación Adicional**
- [API Reference](./02_api_rest.md) - Documentación completa de la API
- [Ejemplos de Código](./ejemplos/) - Código de ejemplo para diferentes lenguajes
- [Changelog](./changelog.md) - Historial de cambios y actualizaciones

### **Canales de Soporte**
- **Email**: `soporte@facebookdeagencias.com`
- **Slack**: `#agencias-support`
- **Teléfono**: `+57 1 234 5678`
- **Horario**: Lunes a Viernes, 8:00 AM - 6:00 PM

### **Recursos de Aprendizaje**
- [Video Tutoriales](https://youtube.com/facebookdeagencias)
- [Webinars Semanales](https://facebookdeagencias.com/webinars)
- [Comunidad de Desarrolladores](https://github.com/facebook-de-agencias/community)

### **Estado del Servicio**
- [Status Page](https://status.facebookdeagencias.com)
- [Incidentes](https://status.facebookdeagencias.com/incidents)
- [Mantenimientos](https://status.facebookdeagencias.com/maintenance)

---

**Documento actualizado**: 19 de Septiembre de 2025  
**Versión Integración**: 1.0.0  
**Próxima actualización**: Nuevas funcionalidades de API
