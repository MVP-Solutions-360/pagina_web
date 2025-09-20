# 📚 **DOCUMENTACIÓN COMPLETA DE LA API - CRM AGENCIA DE VIAJES**

## 🎯 **DESCRIPCIÓN GENERAL**

Esta API permite la integración entre el sitio web público de la agencia de viajes y el sistema CRM interno. Proporciona endpoints para crear cotizaciones, tareas, gestionar clientes y autenticación.

---

## 🌐 **BASE URL**

```
https://mvpsolutions365.com/api
```

**Para desarrollo local:**
```
http://127.0.0.1:8000/api
```

---

## 🔐 **AUTENTICACIÓN**

### **Sanctum Token (Para rutas protegidas)**
- **Header:** `Authorization: Bearer {token}`
- **Header:** `Accept: application/json`
- **Content-Type:** `application/json`

---

## 📋 **ENDPOINTS DISPONIBLES**

### **🔓 RUTAS PÚBLICAS (Sin autenticación)**

#### **1. Información de Agencia**
```
GET /v1/agency/{slug}
```
**Descripción:** Obtiene información detallada de una agencia por su slug.

**Parámetros:**
- `slug` (path): Slug de la agencia (ej: `agencia-principal`)

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Agencia Principal",
        "slug": "agencia-principal",
        "nit": "9000000001",
        "phone": "3506852261",
        "email": "Maicol.londono@mvpsolutions.com",
        "address": "Cl. 98a #65-120, Castilla, Medellín",
        "city": "Medellín",
        "country": "Colombia",
        "description": "Agencia de viajes especializada en el Caribe"
    }
}
```

#### **2. Crear Cotización**
```
POST /v1/quotation
```
**Descripción:** Crea una nueva solicitud de cotización desde el sitio web.

**Body:**
```json
{
    "agency_slug": "agencia-principal",
    "client_name": "Juan Pérez",
    "client_email": "juan@email.com",
    "client_phone": "3001234567",
    "slug": "juan-perez-meytsq98",
    "request_type": "tiquete_aereo",
    "destination_type": "nacional",
    "origin": "Medellín",
    "destination": "Cartagena",
    "departure_date": "2024-06-15",
    "return_date": "2024-06-20",
    "adult": 2,
    "children": 0,
    "infant": 0,
    "description": "Viaje familiar a Cartagena",
    "budget_range": "1000000-2000000",
    "preferred_currency": "COP",
    "special_requirements": "Habitación con vista al mar",
    "task_personnel_id": 1
}
```

**Campos requeridos:**
- `agency_slug`: Slug de la agencia
- `client_name`: Nombre completo del cliente
- `client_email`: Email del cliente
- `client_phone`: Teléfono del cliente
- `slug`: **NUEVO** - Slug único del cliente (ej: "juan-perez-meytsq98")
- `request_type`: Tipo de servicio
- `destination_type`: Tipo de destino
- `origin`: Ciudad de origen
- `destination`: Ciudad de destino
- `departure_date`: Fecha de salida
- `adult`: Número de adultos
- `children`: Número de niños
- `infant`: Número de infantes

**Valores válidos para `request_type`:**
- `"plan_turistico"` - Plan turístico completo
- `"tiquete_aereo"` - Tiquete aéreo
- `"hotel"` - Hotel/alojamiento
- `"paquete_completo"` - Paquete completo
- `"traslado"` - Servicio de traslado
- `"seguro_viaje"` - Seguro de viaje

**Valores válidos para `destination_type`:**
- `"nacional"` - Destino nacional
- `"internacional"` - Destino internacional

**Respuesta exitosa (201):**
```json
{
    "success": true,
    "message": "Cotización creada exitosamente",
    "data": {
        "quotation_id": 123,
        "task_id": 456,
        "reference_number": "COT-2024-001",
        "estimated_response_time": "24-48 horas",
        "next_steps": "Un asesor se pondrá en contacto contigo pronto"
    }
}
```

#### **3. Crear Tarea**
```
POST /v1/task
```
**Descripción:** Crea una nueva tarea o consulta desde el sitio web.

**Body:**
```json
{
    "agency_slug": "agencia-principal",
    "client_name": "María García",
    "client_email": "maria@email.com",
    "client_phone": "3009876543",
    "title": "Consulta sobre paquetes al Caribe",
    "type_task": "consulta",
    "description": "Necesito información sobre paquetes todo incluido al Caribe",
    "priority": "normal",
    "due_date": "2024-06-10",
    "contact_preference": "email",
    "best_time_to_contact": "mañana"
}
```

**Respuesta exitosa (201):**
```json
{
    "success": true,
    "message": "Tarea creada exitosamente",
    "data": {
        "task_id": 789,
        "reference_number": "TAR-2024-001",
        "estimated_response_time": "24-48 horas",
        "next_steps": "Un asesor se pondrá en contacto contigo pronto"
    }
}
```

#### **4. Crear Cliente**
```
POST /v1/client
```
**Descripción:** Crea una nueva cuenta de cliente desde el sitio web.

**Body:**
```json
{
    "name": "Ana López",
    "email": "ana@email.com",
    "phone": "3005551234",
    "address": "Calle 123 #45-67",
    "city": "Medellín",
    "country": "Colombia",
    "password": "miContraseña123"
}
```

**Respuesta exitosa (201):**
```json
{
    "success": true,
    "message": "Client created successfully",
    "data": {
        "client": {
            "id": 10,
            "name": "Ana López",
            "email": "ana@email.com",
            "phone": "3005551234"
        },
        "user": {
            "id": 15,
            "name": "Ana López",
            "email": "ana@email.com"
        }
    }
}
```

#### **5. Buscar Clientes**
```
GET /v1/client/search?query={search_term}
```
**Descripción:** Busca clientes por nombre o email (mínimo 2 caracteres).

**Parámetros:**
- `query` (query): Término de búsqueda (mínimo 2 caracteres)

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Lady Vanessa Paredes Salas",
            "email": "vanessaparedes186@gmail.com",
            "phone": "3001234567"
        }
    ],
    "count": 1
}
```

#### **6. Tipos de Servicios**
```
GET /v1/services/types
```
**Descripción:** Obtiene la lista de tipos de servicios disponibles.

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": [
        "vuelos",
        "hoteles",
        "tours",
        "traslados",
        "paquetes",
        "asistencia médica",
        "otros servicios"
    ]
}
```

#### **7. Destinos Populares**
```
GET /v1/destinations/popular
```
**Descripción:** Obtiene la lista de destinos más populares.

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": [
        "Cartagena",
        "San Andrés",
        "Santa Marta",
        "Tayrona",
        "Capurganá",
        "Providencia"
    ]
}
```

#### **8. Login de Cliente**
```
POST /v1/client/login
```
**Descripción:** Autentica a un cliente y genera un token de acceso.

**Body:**
```json
{
    "email": "vanessaparedes186@gmail.com",
    "password": "12345678"
}
```

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "message": "Login exitoso",
    "data": {
        "client": {
            "id": 1,
            "name": "Lady Vanessa Paredes Salas",
            "email": "vanessaparedes186@gmail.com"
        },
        "token": "1|abc123def456...",
        "token_type": "Bearer"
    }
}
```

#### **9. Listar Paquetes de una Agencia**
```
GET /v1/agency/{slug}/packages
```
**Descripción:** Obtiene la lista de paquetes turísticos de una agencia específica.

**Parámetros de consulta:**
- `search` (opcional): Búsqueda por título, origen o destino
- `destination` (opcional): Filtrar por destino específico
- `status` (opcional): Filtrar por estado (active, inactive)
- `limit` (opcional): Número de resultados por página (default: 20)

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "title": "Paquete Caribe Completo",
                "origin": "Medellín",
                "destination": "Cartagena",
                "include": "Hotel, vuelo, traslados, desayuno",
                "no_include": "Almuerzos, cenas, bebidas",
                "itinerary": "Día 1: Llegada y check-in...",
                "details": "Paquete turístico completo...",
                "main_image": "http://127.0.0.1:8000/storage/packages/main-1.jpg",
                "gallery_images": ["http://127.0.0.1:8000/storage/packages/gallery-1.jpg"],
                "document_file": "http://127.0.0.1:8000/storage/packages/doc-1.pdf",
                "min_price": 1500000,
                "max_price": 2500000,
                "schedules_count": 3,
                "active_schedules_count": 2,
                "created_at": "2024-01-15T10:30:00Z",
                "updated_at": "2024-01-16T14:20:00Z"
            }
        ],
        "total": 1,
        "per_page": 20
    },
    "agency": {
        "id": 1,
        "name": "Agencia Principal",
        "slug": "agencia-principal"
    }
}
```

#### **10. Mostrar Paquete Específico**
```
GET /v1/agency/{slug}/packages/{id}
```
**Descripción:** Obtiene los detalles completos de un paquete específico.

**Parámetros:**
- `slug` (path): Slug de la agencia
- `id` (path): ID del paquete

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Paquete Caribe Completo",
        "origin": "Medellín",
        "destination": "Cartagena",
        "include": "Hotel, vuelo, traslados, desayuno",
        "no_include": "Almuerzos, cenas, bebidas",
        "itinerary": "Día 1: Llegada y check-in...",
        "details": "Paquete turístico completo...",
        "main_image": "http://127.0.0.1:8000/storage/packages/main-1.jpg",
        "gallery_images": ["http://127.0.0.1:8000/storage/packages/gallery-1.jpg"],
        "document_file": "http://127.0.0.1:8000/storage/packages/doc-1.pdf",
        "min_price": 1500000,
        "max_price": 2500000,
        "schedules": [
            {
                "id": 1,
                "start_date": "2024-06-15",
                "end_date": "2024-06-20",
                "status": "active",
                "status_label": "Activa",
                "notes": "Salida confirmada",
                "fares": [
                    {
                        "id": 1,
                        "passenger_type": "Adulto",
                        "accommodation_type": "Doble",
                        "fare": 1500000,
                        "description": "Precio por persona"
                    }
                ],
                "min_fare": 1500000,
                "max_fare": 1500000
            }
        ],
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-16T14:20:00Z"
    },
    "agency": {
        "id": 1,
        "name": "Agencia Principal",
        "slug": "agencia-principal"
    }
}
```

#### **11. Obtener Destinos de Paquetes**
```
GET /v1/agency/{slug}/packages/destinations
```
**Descripción:** Obtiene la lista de destinos únicos disponibles en los paquetes de una agencia.

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": [
        "Cartagena",
        "San Andrés",
        "Santa Marta",
        "Medellín",
        "Bogotá"
    ],
    "agency": {
        "id": 1,
        "name": "Agencia Principal",
        "slug": "agencia-principal"
    }
}
```

#### **12. Obtener Paquetes Destacados**
```
GET /v1/agency/{slug}/packages/featured
```
**Descripción:** Obtiene los paquetes destacados (con salidas activas) de una agencia.

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "Paquete Caribe Completo",
            "origin": "Medellín",
            "destination": "Cartagena",
            "main_image": "http://127.0.0.1:8000/storage/packages/main-1.jpg",
            "min_price": 1500000,
            "max_price": 2500000,
            "active_schedules_count": 2
        }
    ],
    "agency": {
        "id": 1,
        "name": "Agencia Principal",
        "slug": "agencia-principal"
    }
}
```

---

### **🔒 RUTAS PROTEGIDAS (Requieren autenticación)**

#### **1. Perfil del Cliente**
```
GET /v1/client/profile
```
**Headers requeridos:**
- `Authorization: Bearer {token}`
- `Accept: application/json`

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Lady Vanessa Paredes Salas",
        "email": "vanessaparedes186@gmail.com",
        "phone": "3001234567",
        "address": "Medellín, Colombia"
    }
}
```

#### **2. Cotizaciones del Cliente**
```
GET /v1/client/quotations
```
**Headers requeridos:**
- `Authorization: Bearer {token}`
- `Accept: application/json`

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "reference_number": "COT-2024-001",
            "service_type": "vuelos",
            "destination": "Cartagena",
            "departure_date": "2024-06-15",
            "return_date": "2024-06-20",
            "passengers": 2,
            "budget_range": "1000000-2000000",
            "status": "En proceso",
            "created_at": "2024-01-15T10:30:00Z"
        }
    ]
}
```

#### **3. Detalle de Cotización**
```
GET /v1/client/quotations/{id}
```
**Headers requeridos:**
- `Authorization: Bearer {token}`
- `Accept: application/json`

**Parámetros:**
- `id` (path): ID de la cotización

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "reference_number": "COT-2024-001",
        "service_type": "vuelos",
        "destination": "Cartagena",
        "departure_date": "2024-06-15",
        "return_date": "2024-06-20",
        "passengers": 2,
        "budget_range": "1000000-2000000",
        "special_requirements": "Habitación con vista al mar",
        "status": "En proceso",
        "notes": "Cotización en revisión por asesor",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-16T14:20:00Z"
    }
}
```

#### **4. Logout del Cliente**
```
POST /v1/client/logout
```
**Headers requeridos:**
- `Authorization: Bearer {token}`
- `Accept: application/json`

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "message": "Logout exitoso"
}
```

---

### **👨‍💼 RUTAS DE ADMINISTRADOR (Requieren autenticación)**

#### **1. Listar Cotizaciones (Admin)**
```
GET /v1/admin/quotations
```
**Headers requeridos:**
- `Authorization: Bearer {token}`
- `Accept: application/json`

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "reference_number": "COT-2024-001",
                "client_name": "Lady Vanessa Paredes Salas",
                "service_type": "vuelos",
                "destination": "Cartagena",
                "status": "En proceso",
                "created_at": "2024-01-15T10:30:00Z"
            }
        ],
        "total": 1,
        "per_page": 20
    }
}
```

#### **2. Listar Tareas (Admin)**
```
GET /v1/admin/tasks
```
**Headers requeridos:**
- `Authorization: Bearer {token}`
- `Accept: application/json`

**Respuesta exitosa (200):**
```json
{
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "title": "Consulta sobre paquetes al Caribe",
                "client_name": "María García",
                "type_task": "consulta",
                "state": "Asignado",
                "priority": "normal",
                "created_at": "2024-01-15T10:30:00Z"
            }
        ],
        "total": 1,
        "per_page": 20
    }
}
```

---

## 📝 **CÓDIGOS DE ERROR COMUNES**

### **400 - Bad Request**
```json
{
    "success": false,
    "message": "Datos de validación incorrectos",
    "errors": {
        "email": ["El campo email es obligatorio"],
        "password": ["La contraseña debe tener al menos 8 caracteres"]
    }
}
```

### **401 - Unauthorized**
```json
{
    "success": false,
    "message": "Token de autenticación inválido o expirado"
}
```

### **404 - Not Found**
```json
{
    "success": false,
    "message": "Recurso no encontrado"
}
```

### **422 - Validation Error**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": ["El email ya está registrado"]
    }
}
```

### **500 - Internal Server Error**
```json
{
    "success": false,
    "message": "Error interno del servidor",
    "error": "Detalles del error (solo en desarrollo)"
}
```

---

## 🧪 **CREDENCIALES DE PRUEBA**

### **Cliente de Prueba:**
- **Email:** vanessaparedes186@gmail.com
- **Contraseña:** 12345678

### **Agencia de Prueba:**
- **Slug:** agencia-principal

---

## 🔧 **CONFIGURACIÓN DE POSTMAN**

### **1. Crear Environment "Local Development":**
- `base_url`: `http://127.0.0.1:8000`
- `auth_token`: (se llena automáticamente después del login)

### **2. Headers Globales:**
- `Accept`: `application/json`
- `Content-Type`: `application/json`

### **3. Headers de Autenticación:**
- `Authorization`: `Bearer {{auth_token}}`

---

## 📱 **EJEMPLOS DE USO**

### **Flujo Completo de Cotización:**
1. **Crear Cliente** → `POST /v1/client`
2. **Crear Cotización** → `POST /v1/quotation`
3. **Login del Cliente** → `POST /v1/client/login`
4. **Ver Cotizaciones** → `GET /v1/client/quotations`
5. **Ver Detalle** → `GET /v1/client/quotations/{id}`

### **Flujo de Tarea:**
1. **Crear Tarea** → `POST /v1/task`
2. **Login del Cliente** → `POST /v1/client/login`
3. **Ver Perfil** → `GET /v1/client/profile`

---

## 🚀 **PRÓXIMOS PASOS**

1. ✅ **API completa implementada**
2. ✅ **Endpoints de cliente funcionando**
3. ✅ **Autenticación con Sanctum**
4. 🔄 **Desarrollo del frontend**
5. 🔄 **Integración completa**
6. 🔄 **Testing y optimización**

---

**¿Necesitas ayuda con algún endpoint específico o quieres que te ayude con la implementación del frontend?**
