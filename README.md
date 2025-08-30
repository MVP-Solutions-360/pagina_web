# 🏝️ **Agencia Principal - Sitio Web Corporativo**

## 🎯 **Descripción del Proyecto**

Sitio web corporativo moderno y profesional para una agencia de viajes especializada en destinos del Caribe. El proyecto incluye un sistema completo de solicitud de cotizaciones, autenticación de clientes, y dashboard personalizado, completamente integrado con un CRM interno desarrollado en Laravel.

## ✨ **Características Principales**

### **🌐 Sitio Web Corporativo**
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Modo Oscuro/Claro**: Soporte automático y manual
- **Paleta Caribeña**: Colores temáticos (#0066CC, #FF6B35, #00D4AA)
- **Animaciones Suaves**: Transiciones y efectos visuales atractivos

### **📋 Sistema de Cotizaciones**
- **Formulario Multi-paso**: Experiencia de usuario optimizada
- **Validación en Tiempo Real**: Feedback inmediato al usuario
- **Auto-guardado**: Persistencia en localStorage
- **Integración API**: Conexión directa con CRM Laravel

### **🔐 Sistema de Autenticación**
- **Login/Logout**: Gestión de sesiones de clientes
- **Dashboard Personalizado**: Acceso a cotizaciones y perfil
- **Persistencia de Sesión**: Mantiene login entre recargas
- **Rutas Protegidas**: Acceso restringido para usuarios autenticados

### **📱 Experiencia de Usuario**
- **Navegación Intuitiva**: Menú responsive y fácil de usar
- **Formularios Optimizados**: Validación y autocompletado
- **Notificaciones**: Feedback visual para todas las acciones
- **Accesibilidad**: Soporte para lectores de pantalla

## 🏗️ **Arquitectura del Proyecto**

### **Frontend (Cliente)**
```
agencia-viajes-web/
├── index.html              # Página principal
├── dashboard.html          # Dashboard de cliente
├── login.html             # Página de login
├── css/                   # Estilos
│   ├── style.css         # Estilos principales
│   ├── components.css    # Componentes específicos
│   ├── responsive.css    # Diseño responsive
│   ├── auth.css         # Estilos de autenticación
│   ├── dashboard.css    # Estilos del dashboard
│   └── images.css       # Placeholders de imágenes
├── js/                   # JavaScript
│   ├── config.js        # Configuración centralizada
│   ├── main.js          # Funcionalidades principales
│   ├── forms.js         # Gestión de formularios
│   ├── api.js           # Integración con API
│   ├── auth.js          # Sistema de autenticación
│   └── dashboard.js     # Funcionalidades del dashboard
└── README.md            # Documentación del proyecto
```

### **Backend (API Laravel)**
- **Base URL**: `http://localhost:8000/api/v1`
- **Autenticación**: Sanctum Token
- **Endpoints**: Clientes, Cotizaciones, Tareas, Agencias
- **Base de Datos**: MySQL con tablas `clients`, `quotations`, `tasks`, `personnels`

## 🚀 **Tecnologías Utilizadas**

### **Frontend**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, Variables CSS, Animaciones
- **JavaScript ES6+**: Módulos, Async/Await, Fetch API
- **LocalStorage**: Persistencia de datos del usuario

### **Backend**
- **Laravel**: Framework PHP para la API
- **MySQL**: Base de datos relacional
- **Sanctum**: Autenticación por tokens
- **REST API**: Endpoints estándar HTTP

## 📋 **Funcionalidades Implementadas**

### **✅ Completamente Funcional**
1. **Sitio Web Corporativo**
   - Página principal con todas las secciones
   - Navegación responsive
   - Diseño moderno con modo oscuro/claro

2. **Sistema de Cotizaciones**
   - Formulario multi-paso funcional
   - Validación en tiempo real
   - Integración completa con API Laravel
   - Auto-guardado en localStorage

3. **Sistema de Autenticación**
   - Login/logout de clientes
   - Dashboard personalizado
   - Gestión de sesiones
   - Rutas protegidas

4. **Integración API**
   - Endpoints de cliente funcionando
   - Creación de cotizaciones exitosa
   - Asignación automática de tareas
   - Validación robusta de datos

### **🔄 En Desarrollo**
- Optimización de rendimiento
- Testing en diferentes dispositivos
- Mejoras de UX basadas en feedback

## 🔧 **Configuración y Instalación**

### **Requisitos Previos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local para desarrollo (opcional)
- API Laravel funcionando en `http://localhost:8000`

### **Instalación Frontend**
1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd agencia-viajes-web
   ```

2. **Configurar la API**
   - Editar `config.js` si es necesario
   - Verificar que `api.baseURL` apunte a tu servidor Laravel

3. **Abrir en el navegador**
   - Abrir `index.html` en tu navegador
   - O usar un servidor local: `python -m http.server 8000`

### **Configuración de la API**
1. **Verificar que Laravel esté funcionando**
2. **Confirmar que la base de datos esté configurada**
3. **Verificar que las tablas existan**: `clients`, `quotations`, `tasks`, `personnels`

## 🧪 **Testing y Verificación**

### **Endpoints de Prueba**
- **GET** `/api/v1/agency/agencia-principal` - Información de la agencia
- **POST** `/api/v1/quotation` - Crear cotización
- **POST** `/api/v1/client/login` - Login de cliente

### **Credenciales de Prueba**
- **Email**: `vanessaparedes186@gmail.com`
- **Password**: `12345678`

### **Flujo de Testing**
1. **Verificar API**: Los endpoints responden correctamente
2. **Probar Formulario**: Enviar cotización desde el frontend
3. **Verificar Autenticación**: Login y acceso al dashboard
4. **Verificar Integración**: Los datos se crean en la BD

## 📊 **Estado del Proyecto**

### **🎯 Objetivos Cumplidos (100%)**
- ✅ Sitio web corporativo completo
- ✅ Sistema de cotizaciones funcional
- ✅ Integración con API Laravel
- ✅ Sistema de autenticación
- ✅ Dashboard de cliente
- ✅ Diseño responsive y moderno

### **🚀 Próximos Pasos (Opcionales)**
- 🔄 Optimización de rendimiento
- 🔄 Testing en producción
- 🔄 Mejoras de UX basadas en feedback
- 🔄 Implementación de analytics

## 🤝 **Contribución y Soporte**

### **Reportar Problemas**
- Crear un issue en el repositorio
- Incluir detalles del error y pasos para reproducir
- Adjuntar logs del navegador si es posible

### **Solicitar Funcionalidades**
- Describir la funcionalidad deseada
- Explicar el caso de uso
- Proponer implementación si es posible

## 📝 **Changelog**

### **v1.0.0 (2025-01-30)**
- ✅ Implementación completa del sitio web
- ✅ Sistema de cotizaciones funcional
- ✅ Integración con API Laravel
- ✅ Sistema de autenticación
- ✅ Dashboard de cliente
- ✅ Diseño responsive y modo oscuro/claro

## 📄 **Licencia**

Este proyecto es propiedad de **Agencia Principal** y está desarrollado para uso interno y comercial.

## 👨‍💻 **Desarrollado por**

**MVP Solutions** - Soluciones tecnológicas profesionales
- **Email**: maicol.londono@mvpsolutions.com
- **Teléfono**: +57 350 685 2261
- **Ubicación**: Medellín, Colombia

---

**¡Tu aventura caribeña comienza aquí!** 🏝️✈️
