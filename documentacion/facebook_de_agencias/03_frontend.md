# Frontend y Componentes - Facebook de Agencias

## 🎨 Visión General del Frontend

El frontend del sistema "Facebook de Agencias" está construido con tecnologías web modernas, enfocándose en una experiencia de usuario fluida, diseño responsivo y funcionalidades sociales interactivas.

## 🏗️ Arquitectura Frontend

### **Tecnologías Base**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Grid y Flexbox
- **JavaScript ES6+** - Lógica de aplicación
- **Font Awesome 6.4.0** - Iconografía
- **Google Fonts** - Tipografía (Poppins, Playfair Display)

### **Patrón de Diseño**
- **Component-Based Architecture** - Componentes reutilizables
- **Mobile-First Design** - Diseño responsivo
- **Progressive Enhancement** - Funcionalidad gradual
- **Accessibility First** - Accesibilidad prioritaria

## 📁 Estructura de Archivos

```
frontend/
├── index.html                 # Página principal
├── packages.html              # Lista de paquetes
├── details-package.html       # Detalle de paquete
├── dashboard.html             # Panel de agencia
├── css/
│   ├── style.css             # Estilos principales
│   ├── components.css        # Componentes reutilizables
│   ├── responsive.css        # Media queries
│   ├── auth.css             # Autenticación
│   ├── dashboard.css        # Panel de control
│   ├── packages.css         # Páginas de paquetes
│   └── images.css           # Estilos de imágenes
├── js/
│   ├── main.js              # Lógica principal
│   ├── api.js               # Cliente API
│   ├── auth.js              # Autenticación
│   ├── forms.js             # Manejo de formularios
│   └── packages-working.js  # Funcionalidad de paquetes
└── assets/
    ├── images/              # Imágenes locales
    └── icons/               # Iconos personalizados
```

## 🎯 Páginas Principales

### 1. **Página Principal (index.html)**

#### **Secciones:**
- **Hero Section** - Mensaje de bienvenida y CTA
- **Servicios** - Grid de servicios ofrecidos
- **Destinos** - Paquetes destacados por destino
- **Cotización** - Formulario de solicitud
- **Sobre Nosotros** - Información de la agencia
- **Contacto** - Información de contacto

#### **Componentes Clave:**
```html
<!-- Hero Section -->
<section class="hero" id="inicio">
    <div class="hero-container">
        <div class="hero-content">
            <h1 class="hero-title">
                Descubre la <span class="highlight">Magia del Caribe</span>
            </h1>
            <p class="hero-subtitle">
                Vive experiencias inolvidables con nuestros paquetes turísticos
            </p>
            <div class="hero-buttons">
                <a href="#cotizacion" class="btn btn-primary">
                    <i class="fas fa-plane"></i>
                    Solicitar Cotización
                </a>
                <a href="#destinos" class="btn btn-secondary">
                    <i class="fas fa-map-marked-alt"></i>
                    Ver Destinos
                </a>
            </div>
        </div>
    </div>
</section>
```

### 2. **Página de Paquetes (packages.html)**

#### **Funcionalidades:**
- **Filtros Avanzados** - Por destino, precio, fecha
- **Búsqueda** - Texto libre en títulos y descripciones
- **Ordenamiento** - Por precio, fecha, popularidad
- **Paginación** - Navegación por páginas
- **Vista de Tarjetas** - Diseño tipo Pinterest

#### **Componente de Filtros:**
```html
<div class="filters-container">
    <div class="filter-group">
        <label for="destination-filter">Destino</label>
        <select id="destination-filter" class="filter-select">
            <option value="">Todos los destinos</option>
            <option value="cancun">Cancún, México</option>
            <option value="punta-cana">Punta Cana, R.D.</option>
        </select>
    </div>
    
    <div class="filter-group">
        <label for="price-range">Rango de Precio</label>
        <input type="range" id="price-range" min="0" max="5000000" 
               step="100000" class="price-slider">
        <div class="price-display">
            <span id="min-price">$0</span> - 
            <span id="max-price">$5,000,000</span>
        </div>
    </div>
</div>
```

### 3. **Detalle de Paquete (details-package.html)**

#### **Secciones:**
- **Galería de Imágenes** - Carousel de fotos
- **Información Principal** - Título, precio, descripción
- **Incluye/No Incluye** - Lista de servicios
- **Interacciones Sociales** - Likes, comentarios
- **Formulario de Contacto** - Solicitar información
- **Paquetes Relacionados** - Recomendaciones

#### **Componente de Galería:**
```html
<div class="package-gallery">
    <div class="main-image">
        <img id="main-image" src="paquete-1.jpg" alt="Imagen principal">
        <div class="image-overlay">
            <button class="gallery-btn prev" onclick="previousImage()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="gallery-btn next" onclick="nextImage()">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
    <div class="thumbnail-grid">
        <img class="thumbnail active" src="paquete-1.jpg" onclick="changeImage(this)">
        <img class="thumbnail" src="paquete-2.jpg" onclick="changeImage(this)">
        <img class="thumbnail" src="paquete-3.jpg" onclick="changeImage(this)">
    </div>
</div>
```

### 4. **Dashboard de Agencia (dashboard.html)**

#### **Funcionalidades:**
- **Estadísticas** - Métricas de paquetes y interacciones
- **Gestión de Paquetes** - CRUD completo
- **Análisis Social** - Likes, comentarios, reviews
- **Configuración** - Datos de la agencia
- **Notificaciones** - Alertas y mensajes

## 🧩 Componentes Reutilizables

### 1. **Header/Navbar**

```html
<header class="header" id="header">
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">
                <i class="fas fa-plane"></i>
                <span>Agencia de Viajes</span>
            </a>
            
            <div class="nav-menu">
                <a href="#inicio" class="nav-link active">
                    <i class="fas fa-home"></i>
                    Inicio
                </a>
                <a href="packages.html" class="nav-link">
                    <i class="fas fa-suitcase"></i>
                    Paquetes
                </a>
                <!-- Más enlaces -->
            </div>
            
            <div class="nav-actions">
                <button id="auth-button" class="auth-button">
                    <i class="fas fa-sign-in-alt"></i>
                    Login
                </button>
            </div>
        </div>
    </nav>
</header>
```

### 2. **Tarjeta de Paquete**

```html
<div class="package-card" data-package-id="1">
    <div class="package-image">
        <img src="paquete-1.jpg" alt="Paquete Caribe">
        <div class="package-overlay">
            <button class="like-btn" onclick="toggleLike(1)">
                <i class="fas fa-heart"></i>
            </button>
            <button class="share-btn" onclick="sharePackage(1)">
                <i class="fas fa-share"></i>
            </button>
        </div>
    </div>
    
    <div class="package-content">
        <h3 class="package-title">Paquete Caribe 7 días</h3>
        <p class="package-destination">Cancún, México</p>
        <div class="package-price">$2,500,000 COP</div>
        
        <div class="package-actions">
            <button class="btn btn-primary" onclick="viewDetails(1)">
                Ver Detalles
            </button>
            <button class="btn btn-secondary" onclick="contactAgency(1)">
                Contactar
            </button>
        </div>
    </div>
</div>
```

### 3. **Formulario de Cotización**

```html
<form id="quotationForm" class="quotation-form">
    <div class="form-row">
        <div class="form-group">
            <label for="client_name">Nombre Completo *</label>
            <input type="text" id="client_name" name="client_name" required>
        </div>
        
        <div class="form-group">
            <label for="client_email">Email *</label>
            <input type="email" id="client_email" name="client_email" required>
        </div>
    </div>
    
    <div class="form-group">
        <label for="request_type">Tipo de Servicio *</label>
        <select id="request_type" name="request_type" required>
            <option value="">Selecciona un servicio</option>
            <option value="Vuelo">Vuelo</option>
            <option value="Hotel">Hotel</option>
            <option value="Paquete">Paquete</option>
        </select>
    </div>
    
    <button type="submit" class="btn btn-primary">
        <i class="fas fa-paper-plane"></i>
        Enviar Solicitud
    </button>
</form>
```

## 🎨 Sistema de Diseño

### **Paleta de Colores**
```css
:root {
    /* Colores principales */
    --primary-color: #0F172A;        /* Negro Profundo */
    --secondary-color: #0EA5E9;      /* Azul Oceánico */
    --accent-color: #06B6D4;         /* Azul Eléctrico */
    
    /* Colores de estado */
    --success-color: #10B981;        /* Verde Éxito */
    --warning-color: #F59E0B;        /* Amarillo Advertencia */
    --error-color: #EF4444;          /* Rojo Error */
    
    /* Colores de texto */
    --text-color: #0F172A;           /* Texto Oscuro */
    --text-muted: #475569;           /* Texto Claro */
    --text-light: #64748B;           /* Texto Mudo */
    
    /* Colores de fondo */
    --bg-primary: #FFFFFF;           /* Fondo Blanco */
    --bg-secondary: #F8FAFC;         /* Fondo Gris */
    --bg-tertiary: #F1F5F9;          /* Fondo Gris Suave */
}
```

### **Tipografía**
```css
/* Fuentes principales */
body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    line-height: 1.2;
}

/* Tamaños de fuente */
h1 { font-size: 3.5rem; }
h2 { font-size: 2.8rem; }
h3 { font-size: 2.2rem; }
h4 { font-size: 1.8rem; }
h5 { font-size: 1.4rem; }
h6 { font-size: 1.2rem; }
```

### **Espaciado**
```css
:root {
    --spacing-xs: 0.5rem;    /* 8px */
    --spacing-sm: 1rem;      /* 16px */
    --spacing-md: 1.5rem;    /* 24px */
    --spacing-lg: 2rem;      /* 32px */
    --spacing-xl: 3rem;      /* 48px */
    --spacing-xxl: 4rem;     /* 64px */
}
```

## 📱 Responsive Design

### **Breakpoints**
```css
/* Mobile First */
@media (min-width: 480px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 1024px) { /* Large devices */ }
@media (min-width: 1200px) { /* Extra large devices */ }
```

### **Grid System**
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
}

.packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--spacing-lg);
}
```

## ⚡ JavaScript y Funcionalidades

### 1. **Cliente API (api.js)**

```javascript
class AgenciaAPI {
    constructor() {
        this.baseURL = 'http://localhost:8000/api/v1';
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'GET',
            headers: { ...this.headers, ...options.headers },
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Métodos específicos
    async getPackages(filters = {}) {
        const queryParams = new URLSearchParams(filters);
        return await this.request(`/agency/agencia-principal/packages?${queryParams}`);
    }

    async likePackage(packageId) {
        return await this.request(`/packages/${packageId}/like`, {
            method: 'POST'
        });
    }
}
```

### 2. **Manejo de Formularios (forms.js)**

```javascript
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.api = new AgenciaAPI();
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            this.showLoading();
            const response = await this.api.createQuotation(data);
            this.showSuccess(response.message);
            this.form.reset();
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    }

    hideLoading() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitud';
    }
}
```

### 3. **Sistema de Likes (social.js)**

```javascript
class SocialInteraction {
    constructor() {
        this.api = new AgenciaAPI();
        this.initLikeButtons();
    }

    initLikeButtons() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.like-btn')) {
                this.handleLike(event);
            }
        });
    }

    async handleLike(event) {
        const button = event.target.closest('.like-btn');
        const packageId = button.dataset.packageId;
        
        try {
            const response = await this.api.likePackage(packageId);
            this.updateLikeUI(button, response.data);
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    }

    updateLikeUI(button, data) {
        const icon = button.querySelector('i');
        const countElement = button.querySelector('.like-count');
        
        if (data.liked) {
            icon.classList.add('fas', 'fa-heart');
            icon.classList.remove('far');
            button.classList.add('liked');
        } else {
            icon.classList.add('far', 'fa-heart');
            icon.classList.remove('fas');
            button.classList.remove('liked');
        }
        
        if (countElement) {
            countElement.textContent = data.likes_count;
        }
    }
}
```

## 🔧 Configuración y Personalización

### **Variables de Configuración**
```javascript
// config.js
window.PROJECT_CONFIG = {
    api: {
        baseURL: 'http://localhost:8000/api/v1',
        timeout: 30000
    },
    agency: {
        slug: 'agencia-principal',
        name: 'Agencia de Viajes'
    },
    features: {
        socialEnabled: true,
        notificationsEnabled: true,
        analyticsEnabled: true
    }
};
```

### **Temas Personalizables**
```css
/* Tema Claro (por defecto) */
:root {
    --bg-primary: #FFFFFF;
    --text-color: #0F172A;
}

/* Tema Oscuro */
[data-theme="dark"] {
    --bg-primary: #0F172A;
    --text-color: #F8FAFC;
}

/* Tema de Agencia Personalizado */
[data-agency="agencia-principal"] {
    --primary-color: #0EA5E9;
    --secondary-color: #06B6D4;
}
```

## 📊 Analytics y Tracking

### **Eventos Personalizados**
```javascript
// Tracking de eventos
function trackEvent(eventName, properties = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Evento personalizado
    window.dispatchEvent(new CustomEvent('analytics', {
        detail: { event: eventName, properties }
    }));
}

// Ejemplos de uso
trackEvent('package_view', { package_id: 1, package_title: 'Paquete Caribe' });
trackEvent('like_package', { package_id: 1, user_id: 123 });
trackEvent('quotation_submit', { destination: 'Cancún', price_range: '2000000-3000000' });
```

## 🚀 Optimización de Rendimiento

### **Lazy Loading de Imágenes**
```javascript
// Lazy loading para imágenes
const images = document.querySelectorAll('img[data-src]');
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
```

### **Debouncing para Búsquedas**
```javascript
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

// Búsqueda con debounce
const searchInput = document.getElementById('search-input');
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);
```

## ♿ Accesibilidad

### **ARIA Labels y Roles**
```html
<button class="like-btn" 
        aria-label="Dar like al paquete"
        role="button"
        tabindex="0">
    <i class="fas fa-heart" aria-hidden="true"></i>
    <span class="sr-only">Like</span>
</button>
```

### **Navegación por Teclado**
```css
/* Focus visible para navegación por teclado */
.btn:focus-visible,
.nav-link:focus-visible {
    outline: 2px solid var(--secondary-color);
    outline-offset: 2px;
}

/* Screen reader only */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

---

**Documento actualizado**: 19 de Septiembre de 2025  
**Versión Frontend**: 1.0.0  
**Próxima actualización**: Optimizaciones de rendimiento
