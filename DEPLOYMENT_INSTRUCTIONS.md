# Instrucciones de Despliegue - Red de Agencias 360

## Estado Actual del Proyecto

### Branches Creados:
- **`api-server`**: Contiene el código con rutas locales (127.0.0.1:8000)
- **`master`**: Contiene el código con rutas de producción (mvpsolutions365.com)

### Archivos Actualizados para Producción:
- `js/auth-crm.js`
- `js/auth-system.js` 
- `js/auth-service.js`
- `js/api.js`
- `config.js`

## Pasos para Desplegar al Servidor

### 1. Subir Código al Servidor
```bash
# El código actual en master ya está listo para producción
# Subir toda la carpeta al servidor mvpsolutions365.com
```

### 2. Verificar APIs en el Servidor
- Asegurarse de que las APIs estén funcionando en `https://mvpsolutions365.com/api/v1`
- Endpoints necesarios:
  - `/auth/login`
  - `/auth/check`
  - `/auth/me`
  - `/auth/logout`
  - `/agency/agencia-principal`

### 3. Probar la Aplicación
- Acceder a `https://mvpsolutions365.com`
- Probar el login con las credenciales del CRM
- Verificar que la red social funcione correctamente

## Regresar a Desarrollo Local

### Opción 1: Usar Script Automático (Recomendado)
```powershell
# En Windows PowerShell
.\revert-to-local.ps1
```

```bash
# En Linux/Mac
chmod +x revert-to-local.sh
./revert-to-local.sh
```

### Opción 2: Cambiar a Branch Local
```bash
git checkout api-server
```

### Opción 3: Revertir Manualmente
Cambiar en todos los archivos:
- `https://mvpsolutions365.com/api/v1` → `http://127.0.0.1:8000/api/v1`
- `https://mvpsolutions365.com/api/v1` → `http://localhost:8000/api/v1`

## Estructura del Proyecto Lista para Producción

```
pagina_web/
├── index.html                 # Página principal
├── packages.html             # Página de paquetes
├── muro-agencias.html        # Red social
├── css/
│   ├── red-social.css        # Estilos de red social
│   ├── modern-cards.css      # Estilos de tarjetas
│   └── packages-page.css     # Estilos de paquetes
├── js/
│   ├── auth-crm.js          # Sistema de autenticación
│   ├── red-social.js        # Funcionalidades de red social
│   └── social-feed.js       # Feed de publicaciones
└── documentacion/            # Documentación completa
```

## Características Implementadas

### ✅ Sistema de Autenticación
- Login con credenciales del CRM
- Verificación de sesión
- Logout automático
- Protección de rutas

### ✅ Red Social con Filtros Fijos
- Sidebar fijo con filtros
- Publicaciones responsivas
- Sistema de likes y comentarios
- Diseño optimizado para pantallas grandes

### ✅ Página de Paquetes
- Filtros jerárquicos (país, departamento, ciudad)
- Tarjetas modernas estilo Wellezy
- Paginación
- Diseño responsive

### ✅ SEO y Accesibilidad
- Meta tags optimizados
- Estructura semántica
- Modo oscuro/claro automático
- Navegación por teclado

## Próximos Pasos

1. **Desplegar al servidor** con las rutas de producción
2. **Probar todas las funcionalidades** en el servidor
3. **Regresar a desarrollo local** usando los scripts proporcionados
4. **Continuar desarrollo** de nuevas funcionalidades
