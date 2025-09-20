// ===== BLOG FUNCTIONALITY =====
// Funcionalidades para la página de blog

class BlogManager {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.init();
    }

    init() {
        this.loadArticles();
        this.setupEventListeners();
        this.renderArticles();
    }

    loadArticles() {
        // Datos mock para el blog
        this.articles = [
            {
                id: 1,
                title: "Los 10 mejores destinos de Colombia para 2024",
                excerpt: "Descubre los destinos más populares y emergentes de Colombia que están marcando tendencia este año.",
                category: "Destinos",
                author: "María González",
                date: "2024-01-15",
                readTime: "5 min",
                image: "https://via.placeholder.com/400x250",
                tags: ["Colombia", "Destinos", "Turismo"],
                likes: 45,
                comments: 12
            },
            {
                id: 2,
                title: "Consejos para viajar en temporada alta",
                excerpt: "Aprende cómo planificar tu viaje durante las temporadas más concurridas y obtener las mejores ofertas.",
                category: "Consejos",
                author: "Carlos Rodríguez",
                date: "2024-01-12",
                readTime: "7 min",
                image: "https://via.placeholder.com/400x250",
                tags: ["Consejos", "Viajes", "Planificación"],
                likes: 38,
                comments: 8
            },
            {
                id: 3,
                title: "Nuevas rutas turísticas en el Pacífico colombiano",
                excerpt: "Explora las nuevas rutas que conectan los mejores destinos del Pacífico colombiano.",
                category: "Noticias",
                author: "Ana Martínez",
                date: "2024-01-10",
                readTime: "6 min",
                image: "https://via.placeholder.com/400x250",
                tags: ["Pacífico", "Rutas", "Nuevas"],
                likes: 52,
                comments: 15
            },
            {
                id: 4,
                title: "Tendencias del turismo sostenible en Colombia",
                excerpt: "Conoce cómo el turismo sostenible está transformando la industria en Colombia.",
                category: "Tendencias",
                author: "Luis Fernández",
                date: "2024-01-08",
                readTime: "8 min",
                image: "https://via.placeholder.com/400x250",
                tags: ["Sostenible", "Tendencias", "Ecoturismo"],
                likes: 41,
                comments: 9
            },
            {
                id: 5,
                title: "Guía completa para viajar a la Amazonia",
                excerpt: "Todo lo que necesitas saber para planificar tu aventura en la Amazonia colombiana.",
                category: "Destinos",
                author: "Patricia López",
                date: "2024-01-05",
                readTime: "10 min",
                image: "https://via.placeholder.com/400x250",
                tags: ["Amazonia", "Aventura", "Guía"],
                likes: 67,
                comments: 23
            },
            {
                id: 6,
                title: "Cómo elegir la agencia de viajes perfecta",
                excerpt: "Consejos prácticos para seleccionar la agencia de viajes que mejor se adapte a tus necesidades.",
                category: "Agencias",
                author: "Roberto Silva",
                date: "2024-01-03",
                readTime: "6 min",
                image: "https://via.placeholder.com/400x250",
                tags: ["Agencias", "Consejos", "Selección"],
                likes: 29,
                comments: 6
            }
        ];
    }

    setupEventListeners() {
        // Botón cargar más artículos
        const loadMoreBtn = document.getElementById('load-more-articles');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
        }

        // Filtros de categoría
        const categoryLinks = document.querySelectorAll('.sidebar-item');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.textContent.trim();
                this.filterByCategory(category);
            });
        });

        // Búsqueda
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchArticles(e.target.value);
            });
        }

        // Newsletter
        const newsletterBtn = document.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNewsletter();
            });
        }
    }

    renderArticles() {
        const articlesGrid = document.getElementById('articles-grid');
        if (!articlesGrid) return;

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.articles.slice(startIndex, endIndex);

        articlesGrid.innerHTML = articlesToShow.map(article => this.createArticleCard(article)).join('');

        // Mostrar/ocultar botón cargar más
        const loadMoreBtn = document.getElementById('load-more-articles');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex < this.articles.length ? 'block' : 'none';
        }
    }

    createArticleCard(article) {
        return `
            <div class="article-card">
                <div class="article-image">
                    <i class="fas fa-image"></i>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-category">${article.category}</span>
                        <span class="article-date">${this.formatDate(article.date)}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <div class="article-author">
                            <i class="fas fa-user"></i>
                            <span>${article.author}</span>
                        </div>
                        <div class="article-stats">
                            <span class="read-time">${article.readTime}</span>
                            <div class="article-actions">
                                <button class="action-btn like-btn" data-id="${article.id}">
                                    <i class="fas fa-heart"></i>
                                    <span>${article.likes}</span>
                                </button>
                                <button class="action-btn comment-btn" data-id="${article.id}">
                                    <i class="fas fa-comment"></i>
                                    <span>${article.comments}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Hace 1 día';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
        return `Hace ${Math.ceil(diffDays / 30)} meses`;
    }

    loadMoreArticles() {
        this.currentPage++;
        this.renderArticles();
    }

    filterByCategory(category) {
        // Implementar filtrado por categoría
        console.log('Filtrar por categoría:', category);
    }

    searchArticles(query) {
        // Implementar búsqueda
        console.log('Buscar artículos:', query);
    }

    handleNewsletter() {
        const email = document.querySelector('.newsletter-input').value;
        if (email) {
            alert('¡Gracias por suscribirte! Te mantendremos informado sobre las últimas noticias.');
            document.querySelector('.newsletter-input').value = '';
        } else {
            alert('Por favor, ingresa tu email.');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});
