# API de Autenticación - CRM

## Descripción General

Esta API permite a los usuarios autenticarse en el sistema CRM utilizando sus credenciales. La API valida que los usuarios estén activos en la base de datos antes de permitir el acceso.

## Características Principales

- ✅ Validación de usuarios activos únicamente
- ✅ Autenticación basada en tokens (Laravel Sanctum)
- ✅ Verificación de email (opcional)
- ✅ Respuestas estandarizadas
- ✅ Manejo de errores detallado
- ✅ Soporte para diferentes tipos de usuarios

## Base URL

```
https://tu-dominio.com/api/v1
```

## Endpoints Disponibles

### 1. Login de Usuario

**Endpoint:** `POST /api/login`

**Descripción:** Permite a un usuario autenticarse en el sistema.

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Body:**
```json
{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
}
```

**Respuesta Exitosa (200):**
```json
{
    "success": true,
    "message": "Inicio de sesión exitoso",
    "data": {
        "user": {
            "id": 1,
            "name": "Juan Pérez",
            "email": "usuario@ejemplo.com",
            "phone": "+1234567890",
            "avatar": null,
            "status": "activo",
            "type": "client",
            "user_type": "client",
            "email_verified_at": "2024-01-15T10:30:00.000000Z",
            "created_at": "2024-01-01T00:00:00.000000Z",
            "updated_at": "2024-01-15T10:30:00.000000Z",
            "agency": null,
            "personnel": null,
            "client": {
                "id": 1,
                "slug": "juan-perez-12345678",
                "document_type": "DNI",
                "document_number": "12345678",
                "client_type": "individual",
                "address": "Calle Principal 123",
                "city": "Lima",
                "country": "Perú"
            },
            "permissions": [],
            "roles": ["client"]
        },
        "token": "1|abcdef1234567890...",
        "token_type": "Bearer",
        "expires_in": 10080
    }
}
```

**Errores Posibles:**

**401 - Credenciales Incorrectas:**
```json
{
    "success": false,
    "message": "Credenciales incorrectas o usuario inactivo",
    "error_code": "INVALID_CREDENTIALS"
}
```

**403 - Email No Verificado:**
```json
{
    "success": false,
    "message": "Debe verificar su email antes de iniciar sesión",
    "error_code": "EMAIL_NOT_VERIFIED"
}
```

**422 - Error de Validación:**
```json
{
    "success": false,
    "message": "Los datos proporcionados no son válidos",
    "errors": {
        "email": ["El campo email es obligatorio."],
        "password": ["El campo password debe tener al menos 6 caracteres."]
    },
    "error_code": "VALIDATION_ERROR"
}
```

### 2. Verificar Autenticación

**Endpoint:** `GET /api/check`

**Descripción:** Verifica si el usuario está autenticado sin requerir token.

**Headers:**
```
Accept: application/json
```

**Respuesta Exitosa (200):**
```json
{
    "success": true,
    "authenticated": true,
    "data": {
        "id": 1,
        "name": "Juan Pérez",
        "email": "usuario@ejemplo.com",
        "status": "activo",
        "user_type": "client"
    }
}
```

**Respuesta No Autenticado (401):**
```json
{
    "success": false,
    "authenticated": false,
    "message": "Usuario no autenticado"
}
```

### 3. Obtener Información del Usuario

**Endpoint:** `GET /api/me`

**Descripción:** Obtiene la información completa del usuario autenticado.

**Headers:**
```
Authorization: Bearer {token}
Accept: application/json
```

**Respuesta Exitosa (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Juan Pérez",
        "email": "usuario@ejemplo.com",
        "phone": "+1234567890",
        "avatar": null,
        "status": "activo",
        "type": "client",
        "user_type": "client",
        "email_verified_at": "2024-01-15T10:30:00.000000Z",
        "created_at": "2024-01-01T00:00:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z",
        "agency": null,
        "personnel": null,
        "client": {
            "id": 1,
            "slug": "juan-perez-12345678",
            "document_type": "DNI",
            "document_number": "12345678",
            "client_type": "individual",
            "address": "Calle Principal 123",
            "city": "Lima",
            "country": "Perú"
        },
        "permissions": [],
        "roles": ["client"]
    }
}
```

### 4. Cerrar Sesión

**Endpoint:** `POST /api/logout`

**Descripción:** Cierra la sesión del usuario y revoca el token.

**Headers:**
```
Authorization: Bearer {token}
Accept: application/json
```

**Respuesta Exitosa (200):**
```json
{
    "success": true,
    "message": "Sesión cerrada exitosamente"
}
```

### 5. Refrescar Token

**Endpoint:** `POST /api/refresh`

**Descripción:** Refresca el token de autenticación del usuario.

**Headers:**
```
Authorization: Bearer {token}
Accept: application/json
```

**Respuesta Exitosa (200):**
```json
{
    "success": true,
    "message": "Token refrescado exitosamente",
    "data": {
        "token": "2|nuevo_token_abcdef1234567890...",
        "token_type": "Bearer",
        "expires_in": 10080
    }
}
```

## Tipos de Usuario

La API identifica diferentes tipos de usuarios:

- `system_admin`: Administrador del sistema
- `agency_admin`: Administrador de agencia
- `agency_manager`: Gerente de agencia
- `agency_agent`: Agente de agencia
- `agency_personnel`: Personal de agencia
- `client`: Cliente
- `basic_user`: Usuario básico

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| `INVALID_CREDENTIALS` | Credenciales incorrectas o usuario inactivo |
| `EMAIL_NOT_VERIFIED` | Email no verificado |
| `VALIDATION_ERROR` | Error de validación de datos |
| `LOGIN_ERROR` | Error interno en el login |
| `UNAUTHENTICATED` | Usuario no autenticado |
| `LOGOUT_ERROR` | Error al cerrar sesión |
| `USER_INFO_ERROR` | Error al obtener información del usuario |
| `AUTH_CHECK_ERROR` | Error al verificar autenticación |
| `REFRESH_ERROR` | Error al refrescar token |

## Ejemplos de Uso

### JavaScript (Fetch API)

```javascript
// Login
const login = async (email, password) => {
    const response = await fetch('/api/v1/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        // Guardar token
        localStorage.setItem('token', data.data.token);
        return data.data.user;
    } else {
        throw new Error(data.message);
    }
};

// Obtener información del usuario
const getMe = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/v1/api/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });
    
    const data = await response.json();
    return data;
};

// Logout
const logout = async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/v1/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });
    
    const data = await response.json();
    
    if (data.success) {
        localStorage.removeItem('token');
    }
    
    return data;
};
```

### PHP (cURL)

```php
<?php
// Login
function login($email, $password) {
    $url = 'https://tu-dominio.com/api/v1/api/login';
    
    $data = [
        'email' => $email,
        'password' => $password
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

// Obtener información del usuario
function getMe($token) {
    $url = 'https://tu-dominio.com/api/v1/api/me';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $token,
        'Accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
```

### Python (requests)

```python
import requests
import json

# Login
def login(email, password):
    url = 'https://tu-dominio.com/api/v1/api/login'
    
    data = {
        'email': email,
        'password': password
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()

# Obtener información del usuario
def get_me(token):
    url = 'https://tu-dominio.com/api/v1/api/me'
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json'
    }
    
    response = requests.get(url, headers=headers)
    return response.json()

# Logout
def logout(token):
    url = 'https://tu-dominio.com/api/v1/api/logout'
    
    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json'
    }
    
    response = requests.post(url, headers=headers)
    return response.json()
```

## Consideraciones de Seguridad

1. **Tokens de Acceso**: Los tokens tienen una duración de 7 días por defecto.
2. **HTTPS**: Siempre use HTTPS en producción.
3. **Validación de Usuarios**: Solo usuarios con estado "activo" pueden autenticarse.
4. **Verificación de Email**: Opcional pero recomendada para mayor seguridad.
5. **Rate Limiting**: Implementado para prevenir ataques de fuerza bruta.

## Configuración del Servidor

Asegúrese de que su servidor tenga configurado:

1. **Laravel Sanctum**: Para la autenticación basada en tokens.
2. **CORS**: Configurado para permitir requests desde su frontend.
3. **Rate Limiting**: Para proteger contra ataques de fuerza bruta.

## Soporte

Para soporte técnico o preguntas sobre la API, contacte al equipo de desarrollo.

---

**Versión:** 1.0  
**Última actualización:** Enero 2024
