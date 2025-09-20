# 🎨 Frontend - Red de Agencias 360 - Especificaciones Detalladas

## 📊 Resumen Ejecutivo

Este documento define las especificaciones detalladas del frontend para "Red de Agencias 360", una plataforma social que conecta agencias de viajes con viajeros, incluyendo las cinco páginas principales y sus funcionalidades específicas.

## 🎯 Páginas Principales

### 1. **Página de Índice (index.html)**

#### **Título Principal**
- **Color**: Tonos azules que inviten a la tranquilidad y exploración
- **Estilo**: Tipografía moderna y llamativa
- **Efectos**: Animaciones suaves al cargar

#### **Descripción Inicial**
- **Texto**: "Esta plataforma conecta agencias de viajes con viajeros para ofrecer experiencias únicas"
- **Posición**: Debajo del título principal
- **Estilo**: Texto descriptivo con tipografía legible

#### **Carrusel de Imágenes Infinitas**
- **Destinos**: Medellín, San Andrés, Punta Cana, Madrid, etc.
- **Funcionalidad**: Bucle infinito automático
- **Transiciones**: Suaves entre imágenes
- **Responsive**: Adaptable a diferentes tamaños de pantalla

```html
<div class="hero-carousel">
    <div class="carousel-container">
        <div class="carousel-track">
            <div class="carousel-slide active">
                <img src="images/medellin.jpg" alt="Medellín, Colombia">
                <div class="slide-overlay">
                    <h3>Medellín</h3>
                    <p>La ciudad de la eterna primavera</p>
                </div>
            </div>
            <div class="carousel-slide">
                <img src="images/san-andres.jpg" alt="San Andrés, Colombia">
                <div class="slide-overlay">
                    <h3>San Andrés</h3>
                    <p>Paraíso caribeño colombiano</p>
                </div>
            </div>
            <!-- Más slides -->
        </div>
        <div class="carousel-controls">
            <button class="carousel-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="carousel-next"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="carousel-indicators">
            <span class="indicator active"></span>
            <span class="indicator"></span>
            <span class="indicator"></span>
        </div>
    </div>
</div>
```

#### **Cuatro Cards Interactivas**
- **Efecto Hover**: Se agrandan al pasar el mouse
- **Navegación**: Llevan a otras secciones
- **Contenido**: Explican opciones disponibles

```html
<div class="features-grid">
    <div class="feature-card" data-section="paquetes">
        <div class="card-icon">
            <i class="fas fa-suitcase"></i>
        </div>
        <h3>Paquetes Turísticos</h3>
        <p>Descubre los mejores destinos y experiencias</p>
        <a href="paquetes.html" class="card-link">Explorar</a>
    </div>
    
    <div class="feature-card" data-section="red-social">
        <div class="card-icon">
            <i class="fas fa-users"></i>
        </div>
        <h3>Red Social</h3>
        <p>Conecta con otras agencias y viajeros</p>
        <a href="red-social.html" class="card-link">Conectar</a>
    </div>
    
    <div class="feature-card" data-section="mas-vendidos">
        <div class="card-icon">
            <i class="fas fa-star"></i>
        </div>
        <h3>Lo Más Vendido</h3>
        <p>Los destinos más populares del momento</p>
        <a href="mas-vendidos.html" class="card-link">Ver Top</a>
    </div>
    
    <div class="feature-card" data-section="blog">
        <div class="card-icon">
            <i class="fas fa-newspaper"></i>
        </div>
        <h3>Blog</h3>
        <p>Consejos y conceptos para asesores</p>
        <a href="blog.html" class="card-link">Leer</a>
    </div>
</div>
```

#### **Sección para Agencias**
- **Mensaje**: "Únete a nuestra red y conecta con miles de viajeros en busca de experiencias únicas"
- **Botón**: Abre formulario de registro
- **Formulario**: Campos obligatorios y opcionales

```html
<section class="agencies-cta">
    <div class="cta-content">
        <h2>¿Eres una agencia de viajes?</h2>
        <p>Únete a nuestra red y conecta con miles de viajeros en busca de experiencias únicas</p>
        <button class="btn btn-primary" onclick="openAgencyForm()">
            <i class="fas fa-handshake"></i>
            Únete Ahora
        </button>
    </div>
</section>

<!-- Modal de Formulario de Agencia -->
<div id="agency-form-modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeAgencyForm()">&times;</span>
        <h3>Registro de Agencia</h3>
        <form id="agency-registration-form">
            <div class="form-group">
                <label for="agency-name">Nombre de la Agencia *</label>
                <input type="text" id="agency-name" name="agency_name" required>
            </div>
            
            <div class="form-group">
                <label for="agency-nit">NIT *</label>
                <input type="text" id="agency-nit" name="agency_nit" required>
            </div>
            
            <div class="form-group">
                <label for="contact-name">Nombre de la Persona de Contacto *</label>
                <input type="text" id="contact-name" name="contact_name" required>
            </div>
            
            <div class="form-group">
                <label for="contact-phone">Teléfono *</label>
                <input type="tel" id="contact-phone" name="contact_phone" required>
            </div>
            
            <div class="form-group">
                <label for="contact-email">Correo Electrónico *</label>
                <input type="email" id="contact-email" name="contact_email" required>
            </div>
            
            <div class="form-group">
                <label for="observations">Observaciones</label>
                <textarea id="observations" name="observations" rows="4"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Enviar Solicitud</button>
        </form>
    </div>
</div>
```

### 2. **Página de Paquetes Turísticos (paquetes.html)**

#### **Título e Imagen de Cabecera**
- **Título**: "Descubre tu próxima aventura"
- **Imagen**: Hero image de destinos turísticos
- **Efectos**: Parallax o overlay con texto

#### **Sistema de Filtros**
- **Filtro por Nombre**: Búsqueda de texto libre
- **Filtro por Ubicación**: Jerárquico (País → Departamento → Ciudad)
- **Filtro por Fechas**: Rango de fechas de salida
- **Filtros Adicionales**: Precio, duración, tipo de paquete

```html
<div class="filters-section">
    <div class="filters-container">
        <div class="filter-group">
            <label for="search-input">Buscar por nombre</label>
            <input type="text" id="search-input" placeholder="Escribe el nombre del paquete...">
        </div>
        
        <div class="filter-group">
            <label for="country-filter">País</label>
            <select id="country-filter">
                <option value="">Todos los países</option>
                <option value="colombia">Colombia</option>
                <option value="mexico">México</option>
                <option value="republica-dominicana">República Dominicana</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label for="department-filter">Departamento</label>
            <select id="department-filter" disabled>
                <option value="">Selecciona un país primero</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label for="city-filter">Ciudad</label>
            <select id="city-filter" disabled>
                <option value="">Selecciona un departamento primero</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label for="date-range">Rango de Fechas</label>
            <div class="date-range-inputs">
                <input type="date" id="start-date" placeholder="Fecha de salida">
                <input type="date" id="end-date" placeholder="Fecha de regreso">
            </div>
        </div>
        
        <button class="btn btn-secondary" onclick="clearFilters()">Limpiar Filtros</button>
    </div>
</div>
```

#### **Layout de Cards Responsive**
- **Desktop**: 4 columnas
- **Tablet**: 3 columnas
- **Mobile**: 2 columnas
- **Adaptación**: Sin desbordamiento de texto

```html
<div class="packages-grid">
    <div class="package-card" data-package-id="1">
        <div class="package-image">
            <img src="images/paquete-1.jpg" alt="Paquete Caribe">
            <div class="package-overlay">
                <button class="like-btn" onclick="toggleLike(1)">
                    <i class="far fa-heart"></i>
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
            <div class="package-dates">15 - 22 Marzo 2025</div>
            
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
    <!-- Más cards -->
</div>
```

#### **Sistema de Paginación**
- **Navegación**: Páginas numeradas
- **Información**: "Mostrando X de Y paquetes"
- **Controles**: Anterior/Siguiente

```html
<div class="pagination-container">
    <div class="pagination-info">
        Mostrando <span id="showing-start">1</span> - <span id="showing-end">12</span> 
        de <span id="total-packages">48</span> paquetes
    </div>
    
    <div class="pagination">
        <button class="pagination-btn prev" onclick="previousPage()" disabled>
            <i class="fas fa-chevron-left"></i> Anterior
        </button>
        
        <div class="pagination-numbers">
            <button class="pagination-number active">1</button>
            <button class="pagination-number">2</button>
            <button class="pagination-number">3</button>
            <span class="pagination-ellipsis">...</span>
            <button class="pagination-number">4</button>
        </div>
        
        <button class="pagination-btn next" onclick="nextPage()">
            Siguiente <i class="fas fa-chevron-right"></i>
        </button>
    </div>
</div>
```

### 3. **Página Tipo Red Social (red-social.html)**

#### **Publicaciones de Agencias**
- **Título**: Clickeable, lleva al detalle del paquete
- **Imágenes**: Una principal + cuadrícula de secundarias
- **Descripción**: Acordeón desplegable
- **Interacciones**: Likes, comentarios, compartir

```html
<div class="social-feed">
    <div class="post-card" data-post-id="1">
        <div class="post-header">
            <div class="agency-info">
                <img src="images/agency-logo.jpg" alt="Agencia Logo" class="agency-avatar">
                <div class="agency-details">
                    <h4 class="agency-name">Agencia de Viajes del Caribe</h4>
                    <span class="post-time">Hace 2 horas</span>
                </div>
            </div>
            <button class="follow-btn">Seguir</button>
        </div>
        
        <div class="post-content">
            <h3 class="post-title" onclick="viewPackageDetails(1)">
                ¡Nuevo paquete a Punta Cana! 🏖️
            </h3>
            
            <div class="post-images">
                <div class="main-image">
                    <img src="images/punta-cana-main.jpg" alt="Punta Cana">
                </div>
                <div class="secondary-images">
                    <img src="images/punta-cana-2.jpg" alt="Punta Cana 2">
                    <img src="images/punta-cana-3.jpg" alt="Punta Cana 3">
                    <img src="images/punta-cana-4.jpg" alt="Punta Cana 4">
                    <div class="more-images">+5</div>
                </div>
            </div>
            
            <div class="post-description">
                <div class="description-preview">
                    <p>Descubre la magia del Caribe con nuestro paquete todo incluido...</p>
                </div>
                <button class="expand-description" onclick="toggleDescription(1)">
                    <span class="expand-text">Ver más</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="description-full" style="display: none;">
                    <p>Descubre la magia del Caribe con nuestro paquete todo incluido. Incluye vuelos, hotel 5 estrellas, comidas, bebidas y actividades recreativas. ¡No te lo pierdas!</p>
                </div>
            </div>
        </div>
        
        <div class="post-actions">
            <button class="action-btn like-btn" onclick="togglePostLike(1)">
                <i class="far fa-heart"></i>
                <span class="like-count">24</span>
            </button>
            <button class="action-btn comment-btn" onclick="toggleComments(1)">
                <i class="far fa-comment"></i>
                <span class="comment-count">8</span>
            </button>
            <button class="action-btn share-btn" onclick="sharePost(1)">
                <i class="fas fa-share"></i>
                Compartir
            </button>
        </div>
        
        <div class="comments-section" style="display: none;">
            <div class="comments-list">
                <div class="comment">
                    <img src="images/user-avatar.jpg" alt="Usuario" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-header">
                            <span class="comment-author">María González</span>
                            <span class="comment-agency">Agencia Viajes del Sol</span>
                        </div>
                        <p class="comment-text">¡Se ve increíble! ¿Cuál es el precio?</p>
                        <div class="comment-actions">
                            <button class="comment-like-btn" onclick="toggleCommentLike(1)">
                                <i class="far fa-heart"></i>
                                <span>3</span>
                            </button>
                            <button class="reply-btn" onclick="replyToComment(1)">Responder</button>
                        </div>
                    </div>
                </div>
                <!-- Más comentarios -->
            </div>
            
            <div class="comment-form">
                <img src="images/current-user-avatar.jpg" alt="Tu avatar" class="comment-avatar">
                <div class="comment-input-container">
                    <input type="text" placeholder="Escribe un comentario..." class="comment-input">
                    <button class="comment-submit-btn" onclick="submitComment(1)">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Más publicaciones -->
</div>
```

#### **Espacio para Publicidad/Filtros**
- **Columna Derecha**: Dos columnas para publicidad futura
- **Filtros**: Similares a la página de paquetes
- **Carrusel**: Contenido adicional

```html
<div class="sidebar">
    <div class="sidebar-section">
        <h4>Filtros</h4>
        <div class="sidebar-filters">
            <div class="filter-group">
                <label for="sidebar-search">Buscar</label>
                <input type="text" id="sidebar-search" placeholder="Buscar publicaciones...">
            </div>
            
            <div class="filter-group">
                <label for="sidebar-agency">Agencia</label>
                <select id="sidebar-agency">
                    <option value="">Todas las agencias</option>
                    <option value="agencia-1">Agencia del Caribe</option>
                    <option value="agencia-2">Viajes del Sol</option>
                </select>
            </div>
        </div>
    </div>
    
    <div class="sidebar-section">
        <h4>Publicidad</h4>
        <div class="ad-space">
            <img src="images/ad-placeholder.jpg" alt="Publicidad">
            <p>Espacio publicitario</p>
        </div>
    </div>
    
    <div class="sidebar-section">
        <h4>Destinos Populares</h4>
        <div class="popular-destinations">
            <div class="destination-item">
                <img src="images/medellin-small.jpg" alt="Medellín">
                <span>Medellín</span>
            </div>
            <div class="destination-item">
                <img src="images/cartagena-small.jpg" alt="Cartagena">
                <span>Cartagena</span>
            </div>
        </div>
    </div>
</div>
```

### 4. **Página de Paquetes Más Vendidos (mas-vendidos.html)**

#### **Título Creativo**
- **Opciones**: "Lo que más viajan", "Top Destinos del Mes", "Los Favoritos"
- **Estilo**: Llamativo y atractivo
- **Animación**: Efecto de entrada suave

#### **Lógica de Destinos**
- **Determinación**: Sistema calcula destinos más vendidos
- **Sin Estadísticas**: No mostrar números ni rankings
- **Presentación**: Como "recomendados por popularidad"

```html
<section class="top-destinations">
    <div class="section-header">
        <h2>Lo que más viajan</h2>
        <p>Los destinos más populares del momento</p>
    </div>
    
    <div class="destination-sections">
        <div class="destination-section">
            <h3>Destino #1</h3>
            <div class="packages-carousel">
                <div class="carousel-container">
                    <div class="carousel-track">
                        <div class="package-card">
                            <img src="images/paquete-destino-1.jpg" alt="Paquete">
                            <div class="card-content">
                                <h4>Paquete Destino 1</h4>
                                <p>Descripción del paquete</p>
                                <div class="price">$2,500,000</div>
                            </div>
                        </div>
                        <!-- Más paquetes del mismo destino -->
                    </div>
                    <button class="carousel-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
        
        <div class="destination-section">
            <h3>Destino #2</h3>
            <div class="packages-carousel">
                <!-- Paquetes del segundo destino más vendido -->
            </div>
        </div>
        
        <div class="destination-section">
            <h3>Destino #3</h3>
            <div class="packages-carousel">
                <!-- Paquetes del tercer destino más vendido -->
            </div>
        </div>
    </div>
</section>
```

### 5. **Página del Blog (blog.html)**

#### **Título y Descripción**
- **Título**: "Biblioteca de Conceptos para Asesores de Viajes"
- **Descripción**: Explicación del propósito del blog
- **Estilo**: Profesional y educativo

#### **Entradas del Blog**
- **Estructura**: Título, descripción, fecha, autor
- **Funcionalidad**: Comentarios de usuarios
- **Navegación**: Categorías y etiquetas

```html
<section class="blog-header">
    <div class="container">
        <h1>Biblioteca de Conceptos para Asesores de Viajes</h1>
        <p>Recursos, consejos y conocimientos para profesionales del turismo</p>
    </div>
</section>

<section class="blog-content">
    <div class="container">
        <div class="blog-posts">
            <article class="blog-post">
                <div class="post-image">
                    <img src="images/blog-post-1.jpg" alt="Título del post">
                </div>
                
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date">
                            <i class="fas fa-calendar"></i>
                            15 de Septiembre, 2025
                        </span>
                        <span class="post-author">
                            <i class="fas fa-user"></i>
                            Por: María González
                        </span>
                        <span class="post-category">
                            <i class="fas fa-tag"></i>
                            Destinos
                        </span>
                    </div>
                    
                    <h2 class="post-title">
                        <a href="blog-post.html">Cómo vender paquetes a destinos exóticos</a>
                    </h2>
                    
                    <p class="post-excerpt">
                        Descubre las mejores estrategias para promocionar y vender paquetes turísticos a destinos exóticos y poco convencionales...
                    </p>
                    
                    <div class="post-actions">
                        <a href="blog-post.html" class="read-more-btn">
                            Leer más <i class="fas fa-arrow-right"></i>
                        </a>
                        <div class="post-stats">
                            <span class="views-count">
                                <i class="fas fa-eye"></i> 245
                            </span>
                            <span class="comments-count">
                                <i class="fas fa-comment"></i> 12
                            </span>
                        </div>
                    </div>
                </div>
            </article>
            <!-- Más entradas del blog -->
        </div>
        
        <aside class="blog-sidebar">
            <div class="sidebar-widget">
                <h3>Categorías</h3>
                <ul class="category-list">
                    <li><a href="#">Destinos</a></li>
                    <li><a href="#">Marketing</a></li>
                    <li><a href="#">Técnicas de Venta</a></li>
                    <li><a href="#">Tendencias</a></li>
                </ul>
            </div>
            
            <div class="sidebar-widget">
                <h3>Posts Populares</h3>
                <div class="popular-posts">
                    <div class="popular-post">
                        <img src="images/popular-post-1.jpg" alt="Post popular">
                        <div class="post-info">
                            <h4><a href="#">Título del post popular</a></h4>
                            <span class="post-date">10 Sep, 2025</span>
                        </div>
                    </div>
                    <!-- Más posts populares -->
                </div>
            </div>
        </aside>
    </div>
</section>
```

## 🌙 Modo Oscuro/Claro

### **Detección Automática**
- **Sistema**: Detecta preferencias del sistema operativo
- **Aplicación**: Se aplica automáticamente al cargar la página
- **Persistencia**: Recuerda la preferencia del usuario

```css
/* Variables CSS para modo claro */
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #212529;
    --text-secondary: #6c757d;
    --border-color: #dee2e6;
    --card-bg: #ffffff;
    --shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Variables CSS para modo oscuro */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: #1a1a1a;
        --bg-secondary: #2d2d2d;
        --text-primary: #ffffff;
        --text-secondary: #b0b0b0;
        --border-color: #404040;
        --card-bg: #2d2d2d;
        --shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
}

/* Clase para forzar modo oscuro */
[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
    --card-bg: #2d2d2d;
    --shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* Clase para forzar modo claro */
[data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #212529;
    --text-secondary: #6c757d;
    --border-color: #dee2e6;
    --card-bg: #ffffff;
    --shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### **JavaScript para Detección**
```javascript
// Detectar preferencia del sistema
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Aplicar tema al cargar la página
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = detectSystemTheme();
    const theme = savedTheme || systemTheme;
    
    document.documentElement.setAttribute('data-theme', theme);
}

// Toggle manual de tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', applyTheme);
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

### **Grid Responsive para Paquetes**
```css
.packages-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr; /* Mobile: 1 columna */
}

@media (min-width: 768px) {
    .packages-grid {
        grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columnas */
    }
}

@media (min-width: 1024px) {
    .packages-grid {
        grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columnas */
    }
}

@media (min-width: 1200px) {
    .packages-grid {
        grid-template-columns: repeat(4, 1fr); /* Large: 4 columnas */
    }
}
```

## 🎨 Paleta de Colores

### **Colores Principales**
```css
:root {
    /* Azules para tranquilidad y exploración */
    --primary-blue: #2563eb;      /* Azul principal */
    --secondary-blue: #3b82f6;    /* Azul secundario */
    --light-blue: #dbeafe;        /* Azul claro */
    --dark-blue: #1e40af;         /* Azul oscuro */
    
    /* Colores de acento */
    --accent-green: #10b981;      /* Verde éxito */
    --accent-orange: #f59e0b;     /* Naranja advertencia */
    --accent-red: #ef4444;        /* Rojo error */
    
    /* Colores neutros */
    --white: #ffffff;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --black: #000000;
}
```

## 🚀 Optimizaciones de Rendimiento

### **Lazy Loading de Imágenes**
```javascript
// Intersection Observer para lazy loading
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

// Aplicar a todas las imágenes con data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
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

// Aplicar debounce a búsquedas
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
    outline: 2px solid var(--primary-blue);
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

**Documento generado para Red de Agencias 360**  
**Especificaciones Frontend Detalladas**  
**Fecha: 20 de Septiembre de 2025**  
**Versión: 1.0.0**
