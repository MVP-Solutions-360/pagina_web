// ===== PACKAGES MANAGER FUNCIONAL =====

console.log('🔄 Script packages-working.js cargado');

var PackagesManager = function() {
    console.log('🚀 Constructor PackagesManager ejecutado');
    this.packages = [];
    this.currentPage = 1;
    this.totalPages = 1;
};

PackagesManager.prototype.init = function() {
    console.log('🚀 Inicializando PackagesManager...');
    var self = this;
    
    try {
        self.loadPackages();
        console.log('✅ PackagesManager inicializado correctamente');
    } catch (error) {
        console.error('❌ Error en init:', error);
    }
};

PackagesManager.prototype.loadPackages = function() {
    console.log('📦 Cargando paquetes...');
    var self = this;
    
    try {
        if (!window.AgenciaAPI || !window.AgenciaAPI.getPackages) {
            throw new Error('AgenciaAPI no disponible');
        }

        window.AgenciaAPI.getPackages().then(function(response) {
            console.log('📡 Respuesta de la API:', response);

            if (response && response.success && response.data) {
                var packagesData = [];
                
                if (response.data.data && response.data.data.data && Array.isArray(response.data.data.data)) {
                    packagesData = response.data.data.data;
                    console.log('✅ Datos encontrados en response.data.data.data');
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    packagesData = response.data.data;
                    console.log('✅ Datos encontrados en response.data.data');
                } else {
                    packagesData = [];
                }

                self.packages = packagesData;
                console.log('✅ Paquetes cargados: ' + self.packages.length);
                
                self.renderPackages();
            } else {
                console.log('❌ No se pudieron cargar los paquetes');
                self.packages = [];
            }
        }).catch(function(error) {
            console.error('❌ Error al cargar paquetes:', error);
            self.packages = [];
        });
        
    } catch (error) {
        console.error('❌ Error al cargar paquetes:', error);
        this.packages = [];
    }
};

PackagesManager.prototype.renderPackages = function() {
    console.log('🎨 Renderizando paquetes...');
    
    var grid = document.getElementById('packages-grid');
    var carousel = document.getElementById('packages-carousel');
    
    if (!grid || !carousel) {
        console.error('❌ No se encontró packages-grid o packages-carousel');
        return;
    }

    if (this.packages.length === 0) {
        grid.innerHTML = '<div class="no-packages-message">' +
                        '<div class="no-packages-icon">🌍</div>' +
                        '<h3>No se encontraron paquetes</h3>' +
                        '<p>Intenta ajustar los filtros o vuelve más tarde.</p>' +
                        '</div>';
        carousel.style.display = 'none';
        return;
    }

    // Determinar si usar grid o carrusel
    if (this.packages.length <= 4) {
        // Usar grid normal para 4 o menos paquetes
        this.renderGrid();
        carousel.style.display = 'none';
    } else {
        // Usar carrusel para más de 4 paquetes
        this.renderCarousel();
        grid.style.display = 'none';
    }
    
    // Inicializar las cards clickeables después del renderizado
    this.initPackageCards();
};

PackagesManager.prototype.renderGrid = function() {
    console.log('🎨 Renderizando grid de paquetes...');
    
    var grid = document.getElementById('packages-grid');
    if (!grid) return;
    
    var packagesHTML = this.packages.map(function(package) {
        // Construir la URL de la imagen principal
        var imageUrl = package.main_image ? 
            (package.main_image.startsWith('http') ? package.main_image : 'api/' + package.main_image) : 
            'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Imagen+No+Disponible';
        
        // Formatear el precio (si existe en la base de datos)
        var priceDisplay = package.price ? 
            '<div class="package-price">' +
            '<span class="price-label">Precio desde</span>' +
            '<div class="price-amount">$' + package.price.toLocaleString() + '</div>' +
            '</div>' : '';
        
        return '<div class="package-card" data-package-id="' + package.id + '">' +
               '<div class="package-image">' +
               '<img src="' + imageUrl + '" alt="' + (package.title || 'Paquete turístico') + '" loading="lazy">' +
               '</div>' +
               '<div class="package-content">' +
               '<h3 class="package-title">' + (package.title || 'Sin título') + '</h3>' +
               '<div class="package-destination">' +
               '<i class="fas fa-map-marker-alt"></i>' +
               '<span>' + (package.destination || 'No especificado') + '</span>' +
               '</div>' +
               priceDisplay +
               '<div class="package-actions">' +
               '<a href="details-package.html?id=' + package.id + '" class="btn-ver-mas">' +
               '<i class="fas fa-eye"></i> Ver Detalles</a>' +
               '</div>' +
               '</div>' +
               '</div>';
    }).join('');

    grid.innerHTML = packagesHTML;
    grid.style.display = 'grid';
    console.log('✅ Grid de paquetes renderizado');
};

PackagesManager.prototype.renderCarousel = function() {
    console.log('🎠 Renderizando carrusel de paquetes...');
    
    var carouselContainer = document.getElementById('carousel-container');
    var carousel = document.getElementById('packages-carousel');
    
    if (!carouselContainer || !carousel) return;
    
    // Crear slides de 4 paquetes cada uno
    var slidesHTML = '';
    var packagesPerSlide = 4;
    
    for (var i = 0; i < this.packages.length; i += packagesPerSlide) {
        var slidePackages = this.packages.slice(i, i + packagesPerSlide);
        var slideHTML = '<div class="carousel-slide">';
        
        slidePackages.forEach(function(package) {
            // Construir la URL de la imagen principal
            var imageUrl = package.main_image ? 
                (package.main_image.startsWith('http') ? package.main_image : 'api/' + package.main_image) : 
                'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Imagen+No+Disponible';
            
            // Formatear el precio (si existe en la base de datos)
            var priceDisplay = package.price ? 
                '<div class="package-price">' +
                '<span class="price-label">Precio desde</span>' +
                '<div class="price-amount">$' + package.price.toLocaleString() + '</div>' +
                '</div>' : '';
            
            slideHTML += '<div class="package-card" data-package-id="' + package.id + '">' +
                        '<div class="package-image">' +
                        '<img src="' + imageUrl + '" alt="' + (package.title || 'Paquete turístico') + '" loading="lazy">' +
                        '</div>' +
                        '<div class="package-content">' +
                        '<h3 class="package-title">' + (package.title || 'Sin título') + '</h3>' +
                        '<div class="package-destination">' +
                        '<i class="fas fa-map-marker-alt"></i>' +
                        '<span>' + (package.destination || 'No especificado') + '</span>' +
                        '</div>' +
                        priceDisplay +
                        '<div class="package-actions">' +
                        '<a href="details-package.html?id=' + package.id + '" class="btn-ver-mas">' +
                        '<i class="fas fa-eye"></i> Ver Detalles</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
        });
        
        slideHTML += '</div>';
        slidesHTML += slideHTML;
    }
    
    carouselContainer.innerHTML = slidesHTML;
    carousel.style.display = 'block';
    
    // Inicializar el carrusel
    this.initCarousel();
    
    console.log('✅ Carrusel de paquetes renderizado');
};

PackagesManager.prototype.initPackageCards = function() {
    console.log('🎯 Inicializando cards clickeables...');
    
    var packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(function(card) {
        if (!card.hasAttribute('data-clickable')) {
            card.setAttribute('data-clickable', 'true');
            
            // Hacer toda la card clickeable
            card.addEventListener('click', function(e) {
                // Evitar doble click si se hace click en el botón
                if (e.target.closest('.btn-ver-mas')) {
                    return;
                }
                
                // Navegar al detalle del paquete
                var packageId = this.getAttribute('data-package-id');
                if (packageId) {
                    window.location.href = 'details-package.html?id=' + packageId;
                }
            });
            
            // Efecto hover adicional
            card.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
            });
        }
    });
    
    console.log('✅ Cards clickeables inicializadas');
};

PackagesManager.prototype.initCarousel = function() {
    console.log('🎠 Inicializando carrusel...');
    
    var self = this;
    var carouselContainer = document.getElementById('carousel-container');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    var indicators = document.getElementById('carousel-indicators');
    
    if (!carouselContainer || !prevBtn || !nextBtn || !indicators) return;
    
    var currentSlide = 0;
    var totalSlides = Math.ceil(this.packages.length / 4);
    var slideWidth = 100 / totalSlides;
    
    // Crear indicadores
    var indicatorsHTML = '';
    for (var i = 0; i < totalSlides; i++) {
        indicatorsHTML += '<div class="carousel-indicator' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '"></div>';
    }
    indicators.innerHTML = indicatorsHTML;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        var translateX = -currentSlide * slideWidth;
        carouselContainer.style.transform = 'translateX(' + translateX + '%)';
        
        // Actualizar botones
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Actualizar indicadores
        var allIndicators = indicators.querySelectorAll('.carousel-indicator');
        allIndicators.forEach(function(indicator, index) {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Event listeners para botones
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });
    
    // Event listeners para indicadores
    indicators.addEventListener('click', function(e) {
        if (e.target.classList.contains('carousel-indicator')) {
            currentSlide = parseInt(e.target.getAttribute('data-slide'));
            updateCarousel();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    });
    
    // Navegación táctil (swipe)
    var startX = 0;
    var endX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        var diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Mínimo swipe de 50px
            if (diffX > 0 && currentSlide < totalSlides - 1) {
                // Swipe izquierda - siguiente slide
                currentSlide++;
                updateCarousel();
            } else if (diffX < 0 && currentSlide > 0) {
                // Swipe derecha - slide anterior
                currentSlide--;
                updateCarousel();
            }
        }
    }, { passive: true });
    
    // Inicializar estado
    updateCarousel();
    
    console.log('✅ Carrusel inicializado con ' + totalSlides + ' slides');
};

// ===== INICIALIZACIÓN =====
try {
    console.log('🎯 Creando PackagesManager...');
    
    var packagesManager = new PackagesManager();
    
    window.PackagesManager = {
        instance: packagesManager,
        init: function() {
            return packagesManager.init();
        }
    };
    
    console.log('✅ PackagesManager disponible globalmente');
    
    // Inicializar automáticamente
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🔄 DOM cargado, inicializando...');
            packagesManager.init();
        });
    } else {
        console.log('🔄 DOM ya listo, inicializando...');
        packagesManager.init();
    }
    
} catch (error) {
    console.error('❌ Error al crear PackagesManager:', error);
}
