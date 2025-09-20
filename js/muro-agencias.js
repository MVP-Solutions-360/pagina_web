// 🌐 Red de Agencias 360 - Muro de Agencias
// Sistema de feed social para agencias de viajes

class MuroAgencias {
    constructor() {
        this.posts = [];
        this.agencies = [];
        this.currentUser = null;
        this.currentFilters = {
            agency: '',
            postType: '',
            date: ''
        };
        this.currentPage = 1;
        this.postsPerPage = 5;
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderPosts();
        this.updateStats();
    }

    loadData() {
        // Cargar datos desde social-data.js
        if (window.socialData) {
            this.agencies = window.socialData.getAgencies();
            this.posts = this.generateMockPosts();
        } else {
            this.agencies = this.getMockAgencies();
            this.posts = this.generateMockPosts();
        }
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
                location: "Cartagena, Colombia"
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
                location: "Bogotá, Colombia"
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
                location: "Buenaventura, Colombia"
            }
        ];
    }

    generateMockPosts() {
        return [
            {
                id: 1,
                agencyId: 1,
                type: "package",
                title: "Nuevo Paquete: Cartagena Romántica",
                content: "¡Descubre la magia de Cartagena con nuestro nuevo paquete romántico! Incluye cena en el Castillo San Felipe y paseo en carruaje por la ciudad amurallada. Perfecto para parejas que buscan una experiencia única.",
                images: [
                    "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
                ],
                likes: 45,
                comments: 12,
                shares: 8,
                createdAt: "2025-09-19T10:30:00Z",
                tags: ["cartagena", "romántico", "paquete", "nuevo"]
            },
            {
                id: 2,
                agencyId: 2,
                type: "experience",
                title: "Experiencia Única: Avistamiento de Cóndores",
                content: "Nuestro último tour al Valle del Cocora fue increíble. Los viajeros pudieron ver cóndores en su hábitat natural. Una experiencia que nunca olvidarán. ¡Las reservas están abiertas para octubre!",
                images: [
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
                ],
                likes: 67,
                comments: 18,
                shares: 15,
                createdAt: "2025-09-18T14:20:00Z",
                tags: ["cocora", "cóndores", "naturaleza", "aventura"]
            },
            {
                id: 3,
                agencyId: 3,
                type: "offer",
                title: "Oferta Especial: Temporada de Ballenas",
                content: "¡No te pierdas la temporada de ballenas jorobadas en el Pacífico! Descuento del 20% en todos nuestros paquetes de avistamiento. Incluye alojamiento en eco-lodge y guía especializado.",
                images: [
                    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
                ],
                likes: 89,
                comments: 25,
                shares: 22,
                createdAt: "2025-09-17T09:15:00Z",
                tags: ["ballenas", "oferta", "pacifico", "descuento"]
            },
            {
                id: 4,
                agencyId: 1,
                type: "news",
                title: "Nuevo Hotel Boutique en Cartagena",
                content: "Estamos emocionados de anunciar nuestra nueva alianza con un hotel boutique exclusivo en el centro histórico de Cartagena. Habitaciones con vista al mar y servicio de primera clase.",
                images: [
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
                ],
                likes: 34,
                comments: 8,
                shares: 5,
                createdAt: "2025-09-16T16:45:00Z",
                tags: ["hotel", "cartagena", "boutique", "alianza"]
            },
            {
                id: 5,
                agencyId: 2,
                type: "experience",
                title: "Testimonio de Viajero: Trekking en los Andes",
                content: "María González compartió su experiencia: 'El trekking por los Andes fue una de las mejores experiencias de mi vida. Los guías son expertos y el paisaje es impresionante. ¡100% recomendado!'",
                images: [
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
                ],
                likes: 56,
                comments: 14,
                shares: 9,
                createdAt: "2025-09-15T11:30:00Z",
                tags: ["testimonio", "andes", "trekking", "recomendación"]
            }
        ];
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('agency-filter').addEventListener('change', (e) => {
            this.currentFilters.agency = e.target.value;
            this.filterPosts();
        });

        document.getElementById('post-type-filter').addEventListener('change', (e) => {
            this.currentFilters.postType = e.target.value;
            this.filterPosts();
        });

        document.getElementById('date-filter').addEventListener('change', (e) => {
            this.currentFilters.date = e.target.value;
            this.filterPosts();
        });

        // Nueva publicación
        document.getElementById('new-post-btn').addEventListener('click', () => {
            this.showNewPostModal();
        });

        // Cargar más publicaciones
        document.getElementById('load-more-posts').addEventListener('click', () => {
            this.loadMorePosts();
        });

        // Interacciones sociales
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-like')) {
                const postId = parseInt(e.target.closest('.btn-like').dataset.postId);
                this.toggleLike(postId);
            }
            
            if (e.target.closest('.btn-comment')) {
                const postId = parseInt(e.target.closest('.btn-comment').dataset.postId);
                this.toggleComments(postId);
            }
            
            if (e.target.closest('.btn-share')) {
                const postId = parseInt(e.target.closest('.btn-share').dataset.postId);
                this.sharePost(postId);
            }
        });

        // Modal de nueva publicación
        document.getElementById('new-post-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitNewPost(new FormData(e.target));
        });

        document.getElementById('cancel-post').addEventListener('click', () => {
            this.hideNewPostModal();
        });

        // Cerrar modales
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-close-modal') || e.target.classList.contains('modal-overlay')) {
                this.hideNewPostModal();
            }
        });
    }

    filterPosts() {
        let filteredPosts = [...this.posts];

        // Filtro por agencia
        if (this.currentFilters.agency) {
            const agency = this.agencies.find(a => a.slug === this.currentFilters.agency);
            if (agency) {
                filteredPosts = filteredPosts.filter(post => post.agencyId === agency.id);
            }
        }

        // Filtro por tipo de publicación
        if (this.currentFilters.postType) {
            filteredPosts = filteredPosts.filter(post => post.type === this.currentFilters.postType);
        }

        // Filtro por fecha
        if (this.currentFilters.date) {
            const now = new Date();
            const filterDate = new Date();
            
            switch (this.currentFilters.date) {
                case 'today':
                    filterDate.setHours(0, 0, 0, 0);
                    break;
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
            }
            
            filteredPosts = filteredPosts.filter(post => new Date(post.createdAt) >= filterDate);
        }

        this.filteredPosts = filteredPosts;
        this.currentPage = 1;
        this.renderPosts();
    }

    renderPosts() {
        const postsToShow = this.getPostsToShow();
        const postsContainer = document.getElementById('posts-container');
        
        if (postsToShow.length === 0) {
            postsContainer.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-newspaper"></i>
                    <h3>No hay publicaciones</h3>
                    <p>Intenta ajustar los filtros o crea una nueva publicación</p>
                </div>
            `;
            return;
        }

        postsContainer.innerHTML = postsToShow.map(post => this.renderPostCard(post)).join('');
    }

    getPostsToShow() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return (this.filteredPosts || this.posts).slice(0, endIndex);
    }

    renderPostCard(post) {
        const agency = this.agencies.find(a => a.id === post.agencyId);
        const timeAgo = this.getTimeAgo(post.createdAt);
        const typeIcon = this.getTypeIcon(post.type);
        const typeLabel = this.getTypeLabel(post.type);

        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <div class="post-author">
                        <img src="${agency.logo}" alt="${agency.name}" class="author-avatar">
                        <div class="author-info">
                            <h4>${agency.name}</h4>
                            <div class="post-meta">
                                <span class="post-type">
                                    <i class="${typeIcon}"></i>
                                    ${typeLabel}
                                </span>
                                <span class="post-time">${timeAgo}</span>
                            </div>
                        </div>
                    </div>
                    ${agency.verified ? '<span class="verified-badge">✓</span>' : ''}
                </div>

                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-text">${post.content}</p>
                    
                    ${post.images.length > 0 ? `
                        <div class="post-images">
                            ${post.images.map(img => `<img src="${img}" alt="Imagen del post" class="post-image">`).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>

                <div class="post-actions">
                    <button class="btn-like" data-post-id="${post.id}">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${post.likes}</span>
                    </button>
                    <button class="btn-comment" data-post-id="${post.id}">
                        <i class="fas fa-comment"></i>
                        <span class="comment-count">${post.comments}</span>
                    </button>
                    <button class="btn-share" data-post-id="${post.id}">
                        <i class="fas fa-share"></i>
                        <span class="share-count">${post.shares}</span>
                    </button>
                </div>

                <div class="post-comments" id="comments-${post.id}" style="display: none;">
                    <div class="comments-list">
                        <!-- Comentarios se cargarán dinámicamente -->
                    </div>
                    <div class="comment-form">
                        <input type="text" placeholder="Escribe un comentario..." class="comment-input" data-post-id="${post.id}">
                        <button class="btn-send-comment" data-post-id="${post.id}">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getTypeIcon(type) {
        const icons = {
            'package': 'fas fa-suitcase',
            'news': 'fas fa-newspaper',
            'offer': 'fas fa-percentage',
            'experience': 'fas fa-star'
        };
        return icons[type] || 'fas fa-file';
    }

    getTypeLabel(type) {
        const labels = {
            'package': 'Paquete',
            'news': 'Noticia',
            'offer': 'Oferta',
            'experience': 'Experiencia'
        };
        return labels[type] || 'Publicación';
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'hace un momento';
        if (diff < 3600000) return `hace ${Math.floor(diff / 60000)} min`;
        if (diff < 86400000) return `hace ${Math.floor(diff / 3600000)} h`;
        return `hace ${Math.floor(diff / 86400000)} días`;
    }

    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            this.renderPosts();
            this.updateStats();
        }
    }

    toggleComments(postId) {
        const commentsContainer = document.getElementById(`comments-${postId}`);
        if (commentsContainer.style.display === 'none') {
            commentsContainer.style.display = 'block';
        } else {
            commentsContainer.style.display = 'none';
        }
    }

    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.shares++;
            this.renderPosts();
            this.updateStats();
            this.showNotification('¡Publicación compartida!');
        }
    }

    showNewPostModal() {
        document.getElementById('new-post-modal').style.display = 'flex';
    }

    hideNewPostModal() {
        document.getElementById('new-post-modal').style.display = 'none';
        document.getElementById('new-post-form').reset();
    }

    submitNewPost(formData) {
        const newPost = {
            id: this.posts.length + 1,
            agencyId: 1, // Por ahora siempre la primera agencia
            type: formData.get('post_type'),
            title: formData.get('title'),
            content: formData.get('content'),
            images: [],
            likes: 0,
            comments: 0,
            shares: 0,
            createdAt: new Date().toISOString(),
            tags: []
        };

        this.posts.unshift(newPost);
        this.renderPosts();
        this.updateStats();
        this.hideNewPostModal();
        this.showNotification('¡Publicación creada exitosamente!');
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
        
        // Ocultar botón si no hay más publicaciones
        const totalPosts = this.filteredPosts ? this.filteredPosts.length : this.posts.length;
        const displayedPosts = this.currentPage * this.postsPerPage;
        
        if (displayedPosts >= totalPosts) {
            document.getElementById('load-more-posts').style.display = 'none';
        }
    }

    updateStats() {
        const totalPosts = this.posts.length;
        const totalLikes = this.posts.reduce((sum, post) => sum + post.likes, 0);
        const totalComments = this.posts.reduce((sum, post) => sum + post.comments, 0);

        document.getElementById('total-posts').textContent = totalPosts;
        document.getElementById('total-likes').textContent = totalLikes;
        document.getElementById('total-comments').textContent = totalComments;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.muroAgencias = new MuroAgencias();
});
