# API REST Completa - Facebook de Agencias

## 🌐 Visión General

La API REST del sistema "Facebook de Agencias" proporciona endpoints completos para la gestión de agencias, paquetes turísticos, interacciones sociales y usuarios. Está diseñada siguiendo los principios REST y las mejores prácticas de desarrollo de APIs.

## 🔗 Base URL

```
Producción: https://api.facebookdeagencias.com/api/v1
Desarrollo: http://localhost:8000/api/v1
```

## 🔐 Autenticación

### Headers Requeridos
```http
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
```

### Obtener Token
```http
POST /auth/login
Content-Type: application/json

{
    "email": "usuario@ejemplo.com",
    "password": "password123"
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
        "user": {
            "id": 1,
            "name": "Usuario Ejemplo",
            "email": "usuario@ejemplo.com",
            "role": "user"
        }
    }
}
```

## 📋 Endpoints por Módulo

### 1. 🏢 Módulo de Agencias

#### **Obtener Información de Agencia**
```http
GET /agency/{slug}
```

**Parámetros:**
- `slug` (string, requerido): Slug único de la agencia

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "slug": "agencia-principal",
        "name": "Agencia Principal",
        "description": "Descripción de la agencia",
        "logo": "https://cdn.ejemplo.com/logo.png",
        "website": "https://agencia.com",
        "phone": "+57 300 123 4567",
        "email": "contacto@agencia.com",
        "address": "Calle 123 #45-67, Medellín",
        "rating": 4.8,
        "total_packages": 150,
        "verified": true,
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-09-19T10:30:00Z"
    }
}
```

#### **Listar Agencias**
```http
GET /agencies
```

**Query Parameters:**
- `page` (int, opcional): Número de página (default: 1)
- `limit` (int, opcional): Elementos por página (default: 20)
- `search` (string, opcional): Búsqueda por nombre
- `verified` (boolean, opcional): Filtrar por verificación
- `rating_min` (float, opcional): Rating mínimo

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "agencies": [
            {
                "id": 1,
                "slug": "agencia-principal",
                "name": "Agencia Principal",
                "rating": 4.8,
                "total_packages": 150,
                "verified": true
            }
        ],
        "pagination": {
            "current_page": 1,
            "per_page": 20,
            "total": 1,
            "last_page": 1
        }
    }
}
```

#### **Crear Agencia**
```http
POST /agencies
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Nueva Agencia",
    "description": "Descripción de la nueva agencia",
    "email": "nueva@agencia.com",
    "phone": "+57 300 123 4567",
    "website": "https://nueva-agencia.com",
    "address": "Calle 456 #78-90, Bogotá"
}
```

### 2. 📦 Módulo de Paquetes

#### **Listar Paquetes**
```http
GET /agency/{agency_slug}/packages
```

**Query Parameters:**
- `page` (int, opcional): Número de página
- `limit` (int, opcional): Elementos por página
- `destination` (string, opcional): Filtrar por destino
- `state` (string, opcional): Filtrar por estado (active, inactive, draft)
- `search` (string, opcional): Búsqueda en título y descripción
- `min_price` (float, opcional): Precio mínimo
- `max_price` (float, opcional): Precio máximo
- `departure_date` (date, opcional): Fecha de salida
- `return_date` (date, opcional): Fecha de regreso
- `sort` (string, opcional): Ordenar por (price, created_at, rating)

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "packages": [
            {
                "id": 1,
                "title": "Paquete Caribe 7 días",
                "description": "Descripción del paquete",
                "destination": "Cancún, México",
                "price": 2500000,
                "currency": "COP",
                "duration_days": 7,
                "departure_date": "2025-12-01",
                "return_date": "2025-12-08",
                "images": [
                    "https://cdn.ejemplo.com/paquete1-1.jpg",
                    "https://cdn.ejemplo.com/paquete1-2.jpg"
                ],
                "rating": 4.5,
                "likes_count": 23,
                "comments_count": 8,
                "agency": {
                    "id": 1,
                    "name": "Agencia Principal",
                    "slug": "agencia-principal"
                },
                "created_at": "2025-09-19T10:30:00Z"
            }
        ],
        "pagination": {
            "current_page": 1,
            "per_page": 20,
            "total": 1,
            "last_page": 1
        }
    }
}
```

#### **Obtener Paquete Específico**
```http
GET /agency/{agency_slug}/packages/{package_id}
```

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Paquete Caribe 7 días",
        "description": "Descripción detallada del paquete",
        "destination": "Cancún, México",
        "price": 2500000,
        "currency": "COP",
        "duration_days": 7,
        "departure_date": "2025-12-01",
        "return_date": "2025-12-08",
        "includes": [
            "Vuelo ida y vuelta",
            "Hotel 4 estrellas",
            "Desayuno incluido",
            "Traslados aeropuerto-hotel"
        ],
        "excludes": [
            "Almuerzos y cenas",
            "Actividades opcionales",
            "Seguro de viaje"
        ],
        "images": [
            "https://cdn.ejemplo.com/paquete1-1.jpg",
            "https://cdn.ejemplo.com/paquete1-2.jpg"
        ],
        "rating": 4.5,
        "likes_count": 23,
        "comments_count": 8,
        "agency": {
            "id": 1,
            "name": "Agencia Principal",
            "slug": "agencia-principal",
            "phone": "+57 300 123 4567",
            "email": "contacto@agencia.com"
        },
        "reviews": [
            {
                "id": 1,
                "user_name": "María García",
                "rating": 5,
                "comment": "Excelente paquete, muy recomendado",
                "created_at": "2025-09-15T14:30:00Z"
            }
        ],
        "created_at": "2025-09-19T10:30:00Z"
    }
}
```

#### **Crear Paquete**
```http
POST /agency/{agency_slug}/packages
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "Nuevo Paquete",
    "description": "Descripción del paquete",
    "destination": "Punta Cana, República Dominicana",
    "price": 3000000,
    "currency": "COP",
    "duration_days": 5,
    "departure_date": "2025-12-15",
    "return_date": "2025-12-20",
    "includes": [
        "Vuelo ida y vuelta",
        "Hotel todo incluido"
    ],
    "excludes": [
        "Actividades opcionales"
    ],
    "images": [
        "https://cdn.ejemplo.com/nuevo-paquete.jpg"
    ]
}
```

#### **Actualizar Paquete**
```http
PUT /agency/{agency_slug}/packages/{package_id}
Authorization: Bearer {token}
Content-Type: application/json

{
    "title": "Paquete Actualizado",
    "price": 2800000
}
```

#### **Eliminar Paquete**
```http
DELETE /agency/{agency_slug}/packages/{package_id}
Authorization: Bearer {token}
```

#### **Obtener Paquetes Destacados**
```http
GET /agency/{agency_slug}/packages/featured
```

**Query Parameters:**
- `limit` (int, opcional): Número de paquetes (default: 6)

#### **Obtener Destinos Disponibles**
```http
GET /agency/{agency_slug}/packages/destinations
```

**Respuesta:**
```json
{
    "success": true,
    "data": [
        {
            "destination": "Cancún, México",
            "packages_count": 15,
            "min_price": 2000000,
            "max_price": 5000000
        },
        {
            "destination": "Punta Cana, República Dominicana",
            "packages_count": 12,
            "min_price": 1800000,
            "max_price": 4500000
        }
    ]
}
```

### 3. 👥 Módulo Social

#### **Dar Like a Paquete**
```http
POST /packages/{package_id}/like
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "liked": true,
        "likes_count": 24
    }
}
```

#### **Quitar Like de Paquete**
```http
DELETE /packages/{package_id}/like
Authorization: Bearer {token}
```

#### **Comentar Paquete**
```http
POST /packages/{package_id}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
    "comment": "¡Excelente paquete! Muy recomendado"
}
```

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "comment": "¡Excelente paquete! Muy recomendado",
        "user": {
            "id": 1,
            "name": "Usuario Ejemplo"
        },
        "created_at": "2025-09-19T15:30:00Z"
    }
}
```

#### **Obtener Comentarios**
```http
GET /packages/{package_id}/comments
```

**Query Parameters:**
- `page` (int, opcional): Número de página
- `limit` (int, opcional): Elementos por página

#### **Eliminar Comentario**
```http
DELETE /comments/{comment_id}
Authorization: Bearer {token}
```

#### **Reportar Paquete**
```http
POST /packages/{package_id}/report
Authorization: Bearer {token}
Content-Type: application/json

{
    "reason": "información_falsa",
    "description": "El precio no coincide con lo publicado"
}
```

### 4. 👤 Módulo de Usuarios

#### **Obtener Perfil de Usuario**
```http
GET /user/profile
Authorization: Bearer {token}
```

#### **Actualizar Perfil**
```http
PUT /user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "Nuevo Nombre",
    "phone": "+57 300 987 6543"
}
```

#### **Obtener Paquetes Favoritos**
```http
GET /user/favorites
Authorization: Bearer {token}
```

#### **Agregar a Favoritos**
```http
POST /packages/{package_id}/favorite
Authorization: Bearer {token}
```

#### **Obtener Historial de Likes**
```http
GET /user/likes
Authorization: Bearer {token}
```

### 5. 📊 Módulo de Analytics

#### **Obtener Estadísticas de Agencia**
```http
GET /agency/{agency_slug}/analytics
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "total_packages": 150,
        "total_likes": 1250,
        "total_comments": 340,
        "total_views": 5600,
        "average_rating": 4.5,
        "popular_packages": [
            {
                "id": 1,
                "title": "Paquete Caribe 7 días",
                "likes_count": 45,
                "views_count": 320
            }
        ],
        "monthly_stats": {
            "2025-09": {
                "packages_created": 12,
                "likes_received": 89,
                "comments_received": 23
            }
        }
    }
}
```

### 6. 📧 Módulo de Cotizaciones

#### **Crear Cotización**
```http
POST /quotation
Content-Type: application/json

{
    "client_name": "Juan Pérez",
    "client_email": "juan@ejemplo.com",
    "client_phone": "+57 300 123 4567",
    "request_type": "paquete_completo",
    "destination_type": "internacional",
    "origin": "Medellín, Colombia",
    "destination": "Cancún, México",
    "departure_date": "2025-12-01",
    "return_date": "2025-12-08",
    "adult": 2,
    "children": 1,
    "infant": 0,
    "budget_range": "2000000-3000000",
    "description": "Viaje familiar con niños",
    "special_requirements": "Habitación comunicada"
}
```

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "reference_number": "COT-20250919-001",
        "status": "pending",
        "message": "Cotización enviada exitosamente"
    }
}
```

#### **Obtener Estado de Cotización**
```http
GET /quotation/{quotation_id}/status
```

## 🔧 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o faltante |
| 403 | Forbidden - Sin permisos para la acción |
| 404 | Not Found - Recurso no encontrado |
| 422 | Unprocessable Entity - Error de validación |
| 429 | Too Many Requests - Límite de rate excedido |
| 500 | Internal Server Error - Error del servidor |

## 📝 Formato de Respuestas

### Respuesta Exitosa
```json
{
    "success": true,
    "data": {
        // Datos del recurso
    },
    "message": "Operación exitosa"
}
```

### Respuesta con Error
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Los datos proporcionados no son válidos",
        "details": {
            "email": ["El campo email es requerido"],
            "phone": ["El formato del teléfono no es válido"]
        }
    }
}
```

### Respuesta Paginada
```json
{
    "success": true,
    "data": {
        "items": [
            // Array de elementos
        ],
        "pagination": {
            "current_page": 1,
            "per_page": 20,
            "total": 100,
            "last_page": 5,
            "from": 1,
            "to": 20
        }
    }
}
```

## 🚀 Rate Limiting

- **Límite general**: 1000 requests por hora por IP
- **Límite de autenticación**: 5 intentos por minuto por IP
- **Límite de creación**: 100 requests por hora por usuario autenticado

## 📚 SDKs y Librerías

### JavaScript/Node.js
```bash
npm install facebook-de-agencias-api
```

```javascript
const AgenciaAPI = require('facebook-de-agencias-api');

const api = new AgenciaAPI({
    baseURL: 'https://api.facebookdeagencias.com/api/v1',
    token: 'your-token-here'
});

// Obtener paquetes
const packages = await api.packages.list('agencia-principal');
```

### PHP
```bash
composer require facebook-de-agencias/api-client
```

```php
use FacebookDeAgencias\ApiClient\AgenciaAPI;

$api = new AgenciaAPI([
    'base_url' => 'https://api.facebookdeagencias.com/api/v1',
    'token' => 'your-token-here'
]);

// Obtener paquetes
$packages = $api->packages->list('agencia-principal');
```

## 🔍 Testing de la API

### Postman Collection
Descarga la colección completa de Postman: [API Collection](./postman/facebook-de-agencias-api.json)

### cURL Examples
```bash
# Obtener paquetes
curl -X GET "https://api.facebookdeagencias.com/api/v1/agency/agencia-principal/packages" \
  -H "Accept: application/json"

# Crear paquete
curl -X POST "https://api.facebookdeagencias.com/api/v1/agency/agencia-principal/packages" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{"title": "Nuevo Paquete", "price": 2000000}'
```

---

**Documento actualizado**: 19 de Septiembre de 2025  
**Versión API**: 1.0.0  
**Próxima versión**: 1.1.0 (Enero 2026)
