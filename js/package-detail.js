/**
 * Package Detail Manager
 * Maneja la carga dinámica de datos del paquete y funcionalidad de colapsar/desplegar
 */
class PackageDetailManager {
    constructor() {
        this.currentPackage = null;
        this.init();
    }

    /**
     * Inicializa el gestor del detalle del paquete
     */
    init() {
        this.loadPackageFromURL();
        this.initCollapsibleSections();
        this.initNavigationArrows();
        this.initReserveButton();
    }

    /**
     * Carga la información del paquete desde la URL o localStorage
     */
    loadPackageFromURL() {
        // Obtener el ID del paquete desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const packageId = urlParams.get('id');
        
        if (packageId) {
            this.loadPackageById(packageId);
        } else {
            // Si no hay ID en la URL, cargar paquete de ejemplo
            this.loadExamplePackage();
        }
    }

    /**
     * Carga un paquete específico por ID desde la API
     */
    async loadPackageById(packageId) {
        try {
            console.log('🔍 Cargando paquete con ID:', packageId);
            
            // Verificar que la API esté disponible
            if (!window.AgenciaAPI || !window.AgenciaAPI.getPackageById) {
                throw new Error('AgenciaAPI no disponible');
            }

            // Llamar a tu API real
            const response = await window.AgenciaAPI.getPackageById(packageId);
            console.log('📡 Respuesta de la API:', response);

            if (response && response.success && response.data) {
                this.currentPackage = this.formatPackageData(response.data);
                this.renderPackageData();
            } else {
                throw new Error('No se pudo cargar el paquete desde la API');
            }
        } catch (error) {
            console.error('❌ Error cargando el paquete desde la API:', error);
            // Fallback a datos de ejemplo
            this.loadExamplePackage();
        }
    }

    /**
     * Formatea los datos del paquete desde la API para nuestro formato interno
     */
    formatPackageData(apiData) {
        console.log('🔧 Formateando datos de la API:', apiData);
        
        // La API puede devolver datos doble encapsulados (response.data.data)
        // o directamente en response.data
        const packageData = apiData.data || apiData;
        console.log('📦 Datos del paquete extraídos:', packageData);
        
        // Adaptar la estructura de tu API al formato que necesitamos
        return {
            id: packageData.id || packageData.package_id || 'ID no disponible',
            title: packageData.title || packageData.name || 'Paquete Turístico',
            price: packageData.min_price || packageData.price ? 
                `$${(packageData.min_price || packageData.price).toLocaleString()} COP` : 'Consultar',
            departureDate: packageData.departure_date || packageData.start_date || '2025-08-28',
            returnDate: packageData.return_date || packageData.end_date || '2025-09-03',
            duration: packageData.duration || '7 días / 6 noches',
            nights: packageData.nights || '6',
            availableUnits: packageData.available_units || packageData.capacity || packageData.group_size || '6',
            destination: packageData.destination || packageData.location || 'Destino Turístico',
            origin: packageData.origin || 'Origen no especificado',
            mainImage: packageData.main_image || packageData.image || 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop',
            description: packageData.description || packageData.details || 'Descripción del paquete turístico',
            destinations: packageData.destinations || packageData.destination || 'Destinos incluidos',
            includes: packageData.include || packageData.includes || packageData.inclusions || [
                'Tiquetes aéreos',
                'Alojamiento',
                'Traslados',
                'Alimentación según plan'
            ],
            conditions: packageData.conditions || packageData.terms || [
                'Tarifas por persona desde acomodación doble',
                'Sujeto a disponibilidad'
            ],
            notIncludes: packageData.no_include || packageData.not_includes || packageData.exclusions || [
                'Gastos personales',
                'Propinas',
                'Seguro de viaje'
            ],
            itinerary: packageData.itinerary || 'Itinerario no disponible',
            groupSize: packageData.group_size || 'Grupo turístico',
            images: this.extractImages(packageData)
        };
    }

    /**
     * Extrae las imágenes del paquete desde los datos de la API
     */
    extractImages(packageData) {
        let images = [];
        
        // Imagen principal
        if (packageData.main_image) {
            images.push(packageData.main_image);
        }
        
        // Galería de imágenes
        if (packageData.gallery_images && Array.isArray(packageData.gallery_images)) {
            images = images.concat(packageData.gallery_images);
        }
        
        // Si no hay imágenes, usar imagen por defecto
        if (images.length === 0) {
            images = ['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop'];
        }
        
        return images;
    }

    /**
     * Formatea el precio para mostrar
     */
    formatPrice(price) {
        if (typeof price === 'string') {
            return price.replace(/[^\d]/g, '');
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Carga un paquete de ejemplo para desarrollo
     */
    loadExamplePackage() {
        console.log('📦 Cargando paquete de ejemplo...');
        this.currentPackage = {
            id: "example",
            title: "CUBA MÁGICA: ¡UN VIAJE INOLVIDABLE AL CORAZÓN DEL CARIBE!",
            price: "$3,999,000 COP",
            departureDate: "2025-08-28",
            returnDate: "2025-09-03",
            duration: "7 días / 6 noches",
            nights: "6",
            availableUnits: "6",
            destination: "Cuba: La Habana, Cayo y Varadero",
            mainImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop",
            description: "Embárcate en una aventura inolvidable a Cuba, donde la historia, la cultura y la belleza natural se fusionan en un destino único. Descubre la Habana, una ciudad llena de vida y color, con sus coches clásicos y su arquitectura colonial. Relájate en Cayo Santa María, un paraíso de playas de ensueño, y disfruta de la diversión y el sol en Varadero. ¡Una experiencia que despertará tus sentidos! 🍹☀️🏖️",
            destinations: "Tres destinos Cuba: La Habana, Cayo y Varadero",
            includes: [
                "Tiquetes aéreos Medellín - Santa Clara / La Habana - Medellín, vía Panamá",
                "Salida: 05:07 A.M. - Regreso: 03:01 P.M.",
                "Equipaje: artículo personal (morral) + maleta de cabina (10 kg)",
                "Traslados en servicio regular compartido",
                "2 noches en hotel Meliá Cayo Santa María, alimentación todo incluido",
                "2 noches en hotel Meliá Varadero, alimentación todo incluido",
                "2 noches en hotel Meliá Cohiba, La Habana, desayuno diario",
                "City tour en La Habana, sin almuerzo",
                "Tarjeta de ingreso a la Isla de Cuba",
                "Asistencia médica",
                "Fee bancario"
            ],
            conditions: [
                "Tarifas por persona desde acomodación doble",
                "Mayores de 75 años pagan suplemento de asistencia médica",
                "Tarifas no reembolsables, itinerario, tarifas y disponibilidad sujetos a cambios",
                "Estamos comprometidos con la ley 679-2001 (Prev. ESCNNA)"
            ],
            notIncludes: [
                "Gastos personales",
                "Propinas",
                "Bebidas alcohólicas (excepto en todo incluido)",
                "Excursiones opcionales",
                "Seguro de viaje"
            ],
            images: [
                "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
            ]
        };
        
        this.renderPackageData();
    }

    /**
     * Renderiza los datos del paquete en el HTML
     */
    renderPackageData() {
        if (!this.currentPackage) return;

        const pkg = this.currentPackage;
        console.log('🎨 Renderizando datos del paquete:', pkg);

        // Título del paquete
        this.updateElement('package-title', pkg.title);
        
        // Imagen principal
        this.updateElement('package-main-image', pkg.mainImage, 'src');
        
        // Precio
        this.updateElement('package-price', pkg.price);
        
        // Fechas
        this.updateElement('date-range', `Desde el ${pkg.departureDate} Hasta el ${pkg.returnDate}`);
        this.updateElement('duration', pkg.duration);
        
        // Disponibilidad
        this.updateElement('units-available', pkg.availableUnits);
        
        // Destino
        this.updateElement('destination-info', pkg.destination);
        
        // Descripción
        this.updateElement('destinations-info', pkg.destinations);
        this.updateElement('package-name', `🌴 ${pkg.title}`);
        this.updateElement('package-duration', `<strong>${pkg.nights} noches / ${pkg.duration}</strong>`);
        this.updateElement('package-description', pkg.description);
        
        // Fechas clave
        this.updateElement('travel-date', `Del ${this.formatDate(pkg.departureDate)} al ${this.formatDate(pkg.returnDate)} 2025`);
        
        // Información adicional si está disponible
        if (pkg.origin) {
            this.updateElement('origin-info', pkg.origin);
        }
        
        if (pkg.groupSize) {
            this.updateElement('group-size-info', pkg.groupSize);
        }
        
        // Renderizar listas
        this.renderList('includes-list', pkg.includes);
        this.renderList('includes-list-detailed', pkg.includes);
        this.renderList('conditions-list', pkg.conditions);
        this.renderList('not-includes-list', pkg.notIncludes);
        
        // Renderizar itinerario si está disponible
        if (pkg.itinerary && pkg.itinerary !== 'Itinerario no disponible') {
            this.renderItinerary(pkg.itinerary);
        }
        
        // Actualizar navegación de imágenes
        this.updateImageNavigation(pkg.images);
    }

    /**
     * Actualiza un elemento del DOM
     */
    updateElement(id, content, attribute = 'textContent') {
        const element = document.getElementById(id);
        if (element) {
            if (attribute === 'textContent') {
                element.textContent = content;
            } else {
                element.setAttribute(attribute, content);
            }
        } else {
            console.warn(`⚠️ Elemento con ID '${id}' no encontrado`);
        }
    }

    /**
     * Renderiza una lista de elementos
     */
    renderList(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Contenedor con ID '${containerId}' no encontrado`);
            return;
        }

        container.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            container.appendChild(li);
        });
    }

    /**
     * Formatea una fecha para mostrar
     */
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'long' };
            return date.toLocaleDateString('es-ES', options);
        } catch (error) {
            console.warn('⚠️ Error formateando fecha:', dateString);
            return dateString;
        }
    }

    /**
     * Inicializa las secciones colapsables
     */
    initCollapsibleSections() {
        const collapseToggles = document.querySelectorAll('.collapse-toggle');
        
        collapseToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSection(toggle);
            });
        });

        // Inicializar estado de las secciones
        this.initializeSections();
    }

    /**
     * Alterna el estado de una sección
     */
    toggleSection(toggle) {
        const target = toggle.getAttribute('data-target');
        const content = document.getElementById(target + '-content');
        const icon = toggle.querySelector('i');
        const section = toggle.closest('.collapsible-section');
        
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            section.classList.add('expanded');
        } else {
            content.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
            section.classList.remove('expanded');
        }
    }

    /**
     * Inicializa el estado de las secciones
     */
    initializeSections() {
        const sections = document.querySelectorAll('.section-content');
        sections.forEach((section, index) => {
            if (index === 0) {
                // Primera sección expandida
                section.style.display = 'block';
                const toggle = section.closest('.collapsible-section').querySelector('.collapse-toggle');
                const icon = toggle.querySelector('i');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                section.closest('.collapsible-section').classList.add('expanded');
            } else {
                // Resto de secciones colapsadas
                section.style.display = 'none';
            }
        });
    }

    /**
     * Inicializa las flechas de navegación
     */
    initNavigationArrows() {
        const prevBtn = document.querySelector('.package-nav-prev');
        const nextBtn = document.querySelector('.package-nav-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.navigateImage('prev'));
            nextBtn.addEventListener('click', () => this.navigateImage('next'));
        }
    }

    /**
     * Navega entre imágenes del paquete
     */
    navigateImage(direction) {
        if (!this.currentPackage || !this.currentPackage.images) return;
        
        const currentImage = document.getElementById('package-main-image');
        const currentSrc = currentImage.src;
        const images = this.currentPackage.images;
        const currentIndex = images.findIndex(img => img === currentSrc);
        
        let newIndex;
        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        } else {
            newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        }
        
        currentImage.src = images[newIndex];
    }

    /**
     * Inicializa el botón de reservar
     */
    initReserveButton() {
        const reserveBtn = document.getElementById('reserve-btn');
        if (reserveBtn) {
            reserveBtn.addEventListener('click', () => this.handleReservation());
        }
    }

    /**
     * Maneja la acción de reservar
     */
    handleReservation() {
        if (!this.currentPackage) return;
        
        // Aquí puedes implementar la lógica de reserva
        alert(`Reservando paquete: ${this.currentPackage.title}`);
        
        // O redirigir a un formulario de reserva
        // window.location.href = `reserva.html?packageId=${this.currentPackage.id}`;
    }

    /**
     * Renderiza el itinerario del paquete
     */
    renderItinerary(itinerary) {
        const container = document.getElementById('itinerary-content');
        if (!container) {
            console.warn('⚠️ Contenedor de itinerario no encontrado');
            return;
        }

        if (typeof itinerary === 'string') {
            container.innerHTML = `<p>${itinerary}</p>`;
        } else if (Array.isArray(itinerary)) {
            const itineraryHTML = itinerary.map((item, index) => 
                `<li><strong>Día ${index + 1}:</strong> ${item}</li>`
            ).join('');
            container.innerHTML = `<ul>${itineraryHTML}</ul>`;
        } else {
            container.innerHTML = '<p>Itinerario no disponible</p>';
        }
    }

    /**
     * Actualiza la navegación de imágenes
     */
    updateImageNavigation(images) {
        if (!images || images.length <= 1) {
            // Ocultar flechas de navegación si solo hay una imagen
            const prevBtn = document.querySelector('.package-nav-prev');
            const nextBtn = document.querySelector('.package-nav-next');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        // Mostrar flechas de navegación
        const prevBtn = document.querySelector('.package-nav-prev');
        const nextBtn = document.querySelector('.package-nav-next');
        if (prevBtn) prevBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';

        console.log('🖼️ Navegación de imágenes configurada para', images.length, 'imágenes');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando PackageDetailManager...');
    new PackageDetailManager();
});
