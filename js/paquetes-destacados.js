// 🌐 Red de Agencias 360 - Paquetes Destacados
// Sistema dinámico de paquetes con carrusel y filtros

class PaquetesDestacados {
    constructor() {
        this.packages = [];
        this.agencies = [];
        this.currentFilters = {
            destination: '',
            price: '',
            duration: '',
            search: ''
        };
        this.currentPage = 1;
        this.packagesPerPage = 6;
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderPackages();
        this.renderAgencies();
    }

    loadData() {
        // Cargar datos desde social-data.js
        if (window.socialData) {
            this.packages = window.socialData.getPackages();
            this.agencies = window.socialData.getAgencies();
        } else {
            // Datos mock si no está disponible social-data.js
            this.packages = this.getMockPackages();
            this.agencies = this.getMockAgencies();
        }
    }

    getMockPackages() {
        return [
            {
                id: 1,
                agencyId: 1,
                title: "Cartagena Romántica - 4 Días",
                description: "Una experiencia única en la ciudad amurallada. Incluye hotel boutique, cena romántica en el Castillo San Felipe y paseo en carruaje.",
                destination: "Cartagena",
                origin: "Medellín",
                price: 1250000,
                originalPrice: 1500000,
                currency: "COP",
                duration: 4,
                departureDate: "2025-10-15",
                returnDate: "2025-10-18",
                includes: [
                    "Vuelo ida y vuelta",
                    "3 noches en hotel boutique",
                    "Desayunos incluidos",
                    "Cena romántica en el Castillo",
                    "Paseo en carruaje por la ciudad amurallada",
                    "Guía turístico certificado"
                ],
                excludes: [
                    "Almuerzos y cenas adicionales",
                    "Bebidas alcohólicas",
                    "Propinas",
                    "Gastos personales"
                ],
                images: [
                    "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1583422409516-2895a77efdef?w=800&h=600&fit=crop"
                ],
                featured: true,
                likes: 127,
                comments: 23,
                views: 892,
                rating: 4.8,
                tags: ["romántico", "histórico", "boutique", "cartagena"],
                availability: 8,
                maxCapacity: 12,
                createdAt: "2025-09-15T10:30:00Z"
            },
            {
                id: 2,
                agencyId: 2,
                title: "Trekking Cocora - 3 Días",
                description: "Aventura en el Valle del Cocora. Caminata por palmas de cera, avistamiento de cóndores y experiencia en finca cafetera.",
                destination: "Salento",
                origin: "Bogotá",
                price: 890000,
                originalPrice: 1100000,
                currency: "COP",
                duration: 3,
                departureDate: "2025-10-20",
                returnDate: "2025-10-22",
                includes: [
                    "Transporte terrestre",
                    "2 noches en hostal ecológico",
                    "Todas las comidas",
                    "Guía especializado en avistamiento",
                    "Seguro de viaje",
                    "Equipo de trekking"
                ],
                excludes: [
                    "Bebidas alcohólicas",
                    "Gastos personales",
                    "Propinas"
                ],
                images: [
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1583422409516-2895a77efdef?w=800&h=600&fit=crop"
                ],
                featured: true,
                likes: 89,
                comments: 15,
                views: 456,
                rating: 4.9,
                tags: ["aventura", "naturaleza", "trekking", "cocora"],
                availability: 6,
                maxCapacity: 8,
                createdAt: "2025-09-12T14:20:00Z"
            },
            {
                id: 3,
                agencyId: 3,
                title: "Avistamiento de Ballenas - 2 Días",
                description: "Experiencia única en el Pacífico colombiano. Avistamiento de ballenas jorobadas, playas vírgenes y cultura afrocolombiana.",
                destination: "Nuquí",
                origin: "Medellín",
                price: 1450000,
                originalPrice: 1800000,
                currency: "COP",
                duration: 2,
                departureDate: "2025-10-25",
                returnDate: "2025-10-26",
                includes: [
                    "Vuelo ida y vuelta",
                    "1 noche en eco-lodge",
                    "Todas las comidas",
                    "Avistamiento de ballenas",
                    "Guía local especializado",
                    "Seguro de viaje"
                ],
                excludes: [
                    "Bebidas alcohólicas",
                    "Gastos personales",
                    "Propinas"
                ],
                images: [
                    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1583422409516-2895a77efdef?w=800&h=600&fit=crop"
                ],
                featured: false,
                likes: 67,
                comments: 12,
                views: 234,
                rating: 4.7,
                tags: ["ballenas", "pacifico", "naturaleza", "eco-turismo"],
                availability: 4,
                maxCapacity: 6,
                createdAt: "2025-09-10T09:15:00Z"
            }
        ];
    }

    getMockAgencies() {
        return [
            {
                id: 1,
                name: "Caribe Dreams Travel",
                slug: "caribe-dreams",
                logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop&crop=center",
                description: "Especialistas en destinos del Caribe colombiano con más de 15 años de experiencia",
                verified: true,
                followers: 2847,
                rating: 4.8,
                socialLinks: {
                    facebook: "https://facebook.com/caribedreams",
                    instagram: "https://instagram.com/caribedreams",
                    whatsapp: "+57 300 123 4567"
                },
                location: "Cartagena, Colombia",
                established: "2008"
            },
            {
                id: 2,
                name: "Andes Adventure Tours",
                slug: "andes-adventure",
                logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center",
                description: "Aventuras únicas en los Andes colombianos. Trekking, ecoturismo y experiencias auténticas",
                verified: true,
                followers: 1923,
                rating: 4.9,
                socialLinks: {
                    facebook: "https://facebook.com/andesadventure",
                    instagram: "https://instagram.com/andesadventure",
                    whatsapp: "+57 300 987 6543"
                },
                location: "Bogotá, Colombia",
                established: "2015"
            },
            {
                id: 3,
                name: "Pacific Paradise",
                slug: "pacific-paradise",
                logo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&crop=center",
                description: "Descubre la magia del Pacífico colombiano. Ballenas, playas vírgenes y cultura afro",
                verified: false,
                followers: 756,
                rating: 4.6,
                socialLinks: {
                    facebook: "https://facebook.com/pacificparadise",
                    instagram: "https://instagram.com/pacificparadise",
                    whatsapp: "+57 300 555 1234"
                },
                location: "Buenaventura, Colombia",
                established: "2020"
            }
        ];
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('destination-filter').addEventListener('change', (e) => {
            this.currentFilters.destination = e.target.value;
            this.filterPackages();
        });

        document.getElementById('price-filter').addEventListener('change', (e) => {
            this.currentFilters.price = e.target.value;
            this.filterPackages();
        });

        document.getElementById('duration-filter').addEventListener('change', (e) => {
            this.currentFilters.duration = e.target.value;
            this.filterPackages();
        });

        document.getElementById('search-input').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value;
            this.filterPackages();
        });

        // Cargar más paquetes
        document.getElementById('load-more-btn').addEventListener('click', () => {
            this.loadMorePackages();
        });

        // Modal de paquete
        document.addEventListener('click', (e) => {
            if (e.target.closest('.package-card')) {
                const packageId = parseInt(e.target.closest('.package-card').dataset.packageId);
                this.showPackageModal(packageId);
            }
        });

        // Cerrar modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-close-modal') || e.target.classList.contains('modal-overlay')) {
                this.hidePackageModal();
            }
        });
    }

    filterPackages() {
        let filteredPackages = [...this.packages];

        // Filtro por destino
        if (this.currentFilters.destination) {
            filteredPackages = filteredPackages.filter(pkg => 
                pkg.destination.toLowerCase().includes(this.currentFilters.destination.toLowerCase())
            );
        }

        // Filtro por precio
        if (this.currentFilters.price) {
            const [min, max] = this.currentFilters.price.split('-').map(p => p === '+' ? Infinity : parseInt(p));
            filteredPackages = filteredPackages.filter(pkg => {
                if (max === Infinity) return pkg.price >= min;
                return pkg.price >= min && pkg.price <= max;
            });
        }

        // Filtro por duración
        if (this.currentFilters.duration) {
            const [min, max] = this.currentFilters.duration.split('-').map(d => d === '+' ? Infinity : parseInt(d));
            filteredPackages = filteredPackages.filter(pkg => {
                if (max === Infinity) return pkg.duration >= min;
                return pkg.duration >= min && pkg.duration <= max;
            });
        }

        // Filtro por búsqueda
        if (this.currentFilters.search) {
            const searchTerm = this.currentFilters.search.toLowerCase();
            filteredPackages = filteredPackages.filter(pkg => 
                pkg.title.toLowerCase().includes(searchTerm) ||
                pkg.description.toLowerCase().includes(searchTerm) ||
                pkg.destination.toLowerCase().includes(searchTerm) ||
                pkg.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        this.filteredPackages = filteredPackages;
        this.currentPage = 1;
        this.renderPackages();
    }

    renderPackages() {
        const packagesToShow = this.getPackagesToShow();
        const packagesGrid = document.getElementById('packages-grid');
        
        if (packagesToShow.length === 0) {
            packagesGrid.innerHTML = `
                <div class="no-packages">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron paquetes</h3>
                    <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
            `;
            return;
        }

        packagesGrid.innerHTML = packagesToShow.map(pkg => this.renderPackageCard(pkg)).join('');
    }

    getPackagesToShow() {
        const startIndex = (this.currentPage - 1) * this.packagesPerPage;
        const endIndex = startIndex + this.packagesPerPage;
        return (this.filteredPackages || this.packages).slice(0, endIndex);
    }

    renderPackageCard(package) {
        const agency = this.agencies.find(a => a.id === package.agencyId);
        const discount = package.originalPrice ? Math.round(((package.originalPrice - package.price) / package.originalPrice) * 100) : 0;

        return `
            <div class="package-card" data-package-id="${package.id}">
                <div class="package-image-container">
                    <img src="${package.images[0]}" alt="${package.title}" class="package-image">
                    ${package.featured ? '<div class="featured-badge">⭐ Destacado</div>' : ''}
                    ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
                    <div class="package-overlay">
                        <button class="btn-like" data-package-id="${package.id}">
                            <i class="fas fa-heart"></i>
                            <span class="like-count">${package.likes}</span>
                        </button>
                        <button class="btn-comment" data-package-id="${package.id}">
                            <i class="fas fa-comment"></i>
                            <span class="comment-count">${package.comments}</span>
                        </button>
                        <button class="btn-share" data-package-id="${package.id}">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
                
                <div class="package-content">
                    <div class="package-header">
                        <div class="agency-info">
                            <img src="${agency.logo}" alt="${agency.name}" class="agency-logo">
                            <div class="agency-details">
                                <h4 class="agency-name">${agency.name}</h4>
                                <div class="agency-rating">
                                    <span class="stars">${'★'.repeat(Math.floor(agency.rating))}</span>
                                    <span class="rating-number">${agency.rating}</span>
                                </div>
                            </div>
                        </div>
                        ${agency.verified ? '<span class="verified-badge">✓ Verificada</span>' : ''}
                    </div>

                    <h3 class="package-title">${package.title}</h3>
                    <p class="package-route">${package.origin} → ${package.destination}</p>
                    <p class="package-description">${package.description}</p>
                    
                    <div class="package-tags">
                        ${package.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>

                    <div class="package-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${package.duration} días</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${package.availability} disponibles</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-eye"></i>
                            <span>${package.views} vistas</span>
                        </div>
                    </div>

                    <div class="package-pricing">
                        <div class="price-container">
                            <span class="current-price">$${this.formatPrice(package.price)}</span>
                            ${package.originalPrice ? `<span class="original-price">$${this.formatPrice(package.originalPrice)}</span>` : ''}
                        </div>
                        <div class="price-per-person">por persona</div>
                    </div>

                    <div class="package-actions">
                        <button class="btn-primary btn-quote" data-package-id="${package.id}">
                            <i class="fas fa-paper-plane"></i>
                            Solicitar Cotización
                        </button>
                        <button class="btn-secondary btn-details" data-package-id="${package.id}">
                            <i class="fas fa-info-circle"></i>
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAgencies() {
        const agenciesCarousel = document.getElementById('agencies-carousel');
        agenciesCarousel.innerHTML = this.agencies.map(agency => `
            <div class="agency-card">
                <img src="${agency.logo}" alt="${agency.name}" class="agency-logo">
                <h4>${agency.name}</h4>
                <p>${agency.description}</p>
                <div class="agency-stats">
                    <span>⭐ ${agency.rating}</span>
                    <span>👥 ${agency.followers}</span>
                </div>
                <button class="btn btn-primary">Ver Perfil</button>
            </div>
        `).join('');
    }

    showPackageModal(packageId) {
        const package = this.packages.find(p => p.id === packageId);
        const agency = this.agencies.find(a => a.id === package.agencyId);
        
        if (!package) return;

        const modal = document.getElementById('package-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = package.title;
        modalBody.innerHTML = `
            <div class="package-detail-images">
                ${package.images.map(img => `<img src="${img}" alt="${package.title}" class="detail-image">`).join('')}
            </div>
            
            <div class="package-detail-content">
                <div class="detail-section">
                    <h4>Descripción</h4>
                    <p>${package.description}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Incluye</h4>
                    <ul>
                        ${package.includes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>No incluye</h4>
                    <ul>
                        ${package.excludes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>Información de la Agencia</h4>
                    <div class="agency-detail-info">
                        <img src="${agency.logo}" alt="${agency.name}" class="agency-detail-logo">
                        <div>
                            <h5>${agency.name}</h5>
                            <p>${agency.description}</p>
                            <div class="agency-stats">
                                <span>⭐ ${agency.rating}</span>
                                <span>👥 ${agency.followers} seguidores</span>
                                <span>📍 ${agency.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    hidePackageModal() {
        document.getElementById('package-modal').style.display = 'none';
    }

    loadMorePackages() {
        this.currentPage++;
        this.renderPackages();
        
        // Ocultar botón si no hay más paquetes
        const totalPackages = this.filteredPackages ? this.filteredPackages.length : this.packages.length;
        const displayedPackages = this.currentPage * this.packagesPerPage;
        
        if (displayedPackages >= totalPackages) {
            document.getElementById('load-more-btn').style.display = 'none';
        }
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-CO').format(price);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.paquetesDestacados = new PaquetesDestacados();
});
