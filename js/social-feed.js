// 🌐 Red de Agencias 360 - Sistema de Feed Social
// Feed dinámico con interacciones sociales en tiempo real

class SocialFeed {
    constructor() {
        this.currentUser = null;
        this.feedContainer = null;
        this.filters = {
            destination: '',
            maxPrice: null,
            featured: false
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderFeed();
        this.setupRealTimeUpdates();
    }

    setupEventListeners() {
        // Filtros
        document.addEventListener('change', (e) => {
            if (e.target.id === 'destination-filter') {
                this.filters.destination = e.target.value;
                this.renderFeed();
            }
            if (e.target.id === 'price-filter') {
                this.filters.maxPrice = e.target.value ? parseInt(e.target.value) : null;
                this.renderFeed();
            }
            if (e.target.id === 'featured-filter') {
                this.filters.featured = e.target.checked;
                this.renderFeed();
            }
        });

        // Búsqueda
        document.addEventListener('input', (e) => {
            if (e.target.id === 'search-input') {
                this.filters.search = e.target.value;
                this.renderFeed();
            }
        });
    }

    renderFeed() {
        const packages = socialData.getPackages(this.filters);
        const feedContainer = document.getElementById('social-feed');
        
        if (!feedContainer) {
            this.createFeedContainer();
            return;
        }

        feedContainer.innerHTML = `
            <div class="feed-header">
                <h2>🌐 Red de Agencias 360</h2>
                <p>Descubre los mejores paquetes turísticos de agencias verificadas</p>
            </div>
            
            <div class="feed-filters">
                <div class="filter-group">
                    <input type="text" id="search-input" placeholder="🔍 Buscar destinos, agencias..." class="search-input">
                </div>
                <div class="filter-group">
                    <select id="destination-filter" class="filter-select">
                        <option value="">Todos los destinos</option>
                        <option value="cartagena">Cartagena</option>
                        <option value="salento">Salento</option>
                        <option value="nuquí">Nuquí</option>
                        <option value="san andrés">San Andrés</option>
                    </select>
                </div>
                <div class="filter-group">
                    <select id="price-filter" class="filter-select">
                        <option value="">Cualquier precio</option>
                        <option value="500000">Hasta $500.000</option>
                        <option value="1000000">Hasta $1.000.000</option>
                        <option value="1500000">Hasta $1.500.000</option>
                        <option value="2000000">Hasta $2.000.000</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="featured-filter">
                        ⭐ Solo destacados
                    </label>
                </div>
            </div>

            <div class="packages-grid" id="packages-container">
                ${packages.map(pkg => this.renderPackageCard(pkg)).join('')}
            </div>

            <div class="feed-stats">
                <div class="stat-item">
                    <span class="stat-number">${packages.length}</span>
                    <span class="stat-label">Paquetes disponibles</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${socialData.getAgencies().length}</span>
                    <span class="stat-label">Agencias verificadas</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${this.getTotalLikes()}</span>
                    <span class="stat-label">Likes totales</span>
                </div>
            </div>
        `;

        this.setupPackageInteractions();
    }

    renderPackageCard(packageItem) {
        const agency = socialData.getAgencyById(packageItem.agencyId);
        const isLiked = this.currentUser ? socialData.isLikedByUser(packageItem.id, this.currentUser.id) : false;
        const comments = socialData.getComments(packageItem.id);
        const discount = packageItem.originalPrice ? Math.round(((packageItem.originalPrice - packageItem.price) / packageItem.originalPrice) * 100) : 0;

        return `
            <div class="package-card" data-package-id="${packageItem.id}">
                <div class="package-image-container">
                    <img src="${packageItem.images[0]}" alt="${packageItem.title}" class="package-image">
                    ${packageItem.featured ? '<div class="featured-badge">⭐ Destacado</div>' : ''}
                    ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
                    <div class="package-overlay">
                        <button class="btn-like ${isLiked ? 'liked' : ''}" data-package-id="${packageItem.id}">
                            <i class="fas fa-heart"></i>
                            <span class="like-count">${packageItem.likes}</span>
                        </button>
                        <button class="btn-comment" data-package-id="${packageItem.id}">
                            <i class="fas fa-comment"></i>
                            <span class="comment-count">${packageItem.comments}</span>
                        </button>
                        <button class="btn-share" data-package-id="${packageItem.id}">
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
                                    <span class="followers">${agency.followers} seguidores</span>
                                </div>
                            </div>
                        </div>
                        ${agency.verified ? '<span class="verified-badge">✓ Verificada</span>' : ''}
                    </div>

                    <h3 class="package-title">${packageItem.title}</h3>
                    <p class="package-route">${packageItem.origin} → ${packageItem.destination}</p>
                    <p class="package-description">${packageItem.description}</p>
                    
                    <div class="package-tags">
                        ${packageItem.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>

                    <div class="package-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${packageItem.duration} días</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${packageItem.availability} disponibles</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-eye"></i>
                            <span>${packageItem.views} vistas</span>
                        </div>
                    </div>

                    <div class="package-pricing">
                        <div class="price-container">
                            <span class="current-price">$${this.formatPrice(packageItem.price)}</span>
                            ${packageItem.originalPrice ? `<span class="original-price">$${this.formatPrice(packageItem.originalPrice)}</span>` : ''}
                        </div>
                        <div class="price-per-person">por persona</div>
                    </div>

                    <div class="package-actions">
                        <button class="btn-primary btn-quote" data-package-id="${packageItem.id}">
                            <i class="fas fa-paper-plane"></i>
                            Solicitar Cotización
                        </button>
                        <button class="btn-secondary btn-details" data-package-id="${packageItem.id}">
                            <i class="fas fa-info-circle"></i>
                            Ver Detalles
                        </button>
                    </div>
                </div>

                <div class="package-comments" id="comments-${packageItem.id}" style="display: none;">
                    <div class="comments-header">
                        <h4>Comentarios (${packageItem.comments})</h4>
                        <button class="btn-close-comments" data-package-id="${packageItem.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="comments-list">
                        ${comments.map(comment => this.renderComment(comment)).join('')}
                    </div>
                    <div class="comment-form">
                        <input type="text" placeholder="Escribe un comentario..." class="comment-input" data-package-id="${packageItem.id}">
                        <button class="btn-send-comment" data-package-id="${packageItem.id}">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderComment(comment) {
        return `
            <div class="comment-item">
                <img src="${comment.user.avatar}" alt="${comment.user.name}" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">${comment.user.name}</span>
                        <span class="comment-time">${this.formatTime(comment.createdAt)}</span>
                    </div>
                    <p class="comment-text">${comment.content}</p>
                </div>
            </div>
        `;
    }

    setupPackageInteractions() {
        // Likes
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-like')) {
                const packageId = parseInt(e.target.closest('.btn-like').dataset.packageId);
                this.toggleLike(packageId);
            }
        });

        // Comentarios
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-comment')) {
                const packageId = parseInt(e.target.closest('.btn-comment').dataset.packageId);
                this.toggleComments(packageId);
            }
            if (e.target.closest('.btn-close-comments')) {
                const packageId = parseInt(e.target.closest('.btn-close-comments').dataset.packageId);
                this.hideComments(packageId);
            }
            if (e.target.closest('.btn-send-comment')) {
                const packageId = parseInt(e.target.closest('.btn-send-comment').dataset.packageId);
                this.sendComment(packageId);
            }
        });

        // Cotización
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-quote')) {
                const packageId = parseInt(e.target.closest('.btn-quote').dataset.packageId);
                this.showQuoteModal(packageId);
            }
        });

        // Detalles
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-details')) {
                const packageId = parseInt(e.target.closest('.btn-details').dataset.packageId);
                this.showPackageDetails(packageId);
            }
        });

        // Envío de comentarios con Enter
        document.addEventListener('keypress', (e) => {
            if (e.target.classList.contains('comment-input') && e.key === 'Enter') {
                const packageId = parseInt(e.target.dataset.packageId);
                this.sendComment(packageId);
            }
        });
    }

    toggleLike(packageId) {
        if (!this.currentUser) {
            this.showLoginModal();
            return;
        }

        const isLiked = socialData.isLikedByUser(packageId, this.currentUser.id);
        const likeBtn = document.querySelector(`[data-package-id="${packageId}"].btn-like`);
        const likeCount = likeBtn.querySelector('.like-count');

        if (isLiked) {
            socialData.unlikePackage(packageId, this.currentUser.id);
            likeBtn.classList.remove('liked');
        } else {
            socialData.likePackage(packageId, this.currentUser.id);
            likeBtn.classList.add('liked');
            this.showNotification('¡Te gusta este paquete! ❤️');
        }

        // Actualizar contador
        const package = socialData.getPackageById(packageId);
        likeCount.textContent = packageItem.likes;

        // Animación
        likeBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 200);
    }

    toggleComments(packageId) {
        const commentsContainer = document.getElementById(`comments-${packageId}`);
        if (commentsContainer.style.display === 'none') {
            this.showComments(packageId);
        } else {
            this.hideComments(packageId);
        }
    }

    showComments(packageId) {
        const commentsContainer = document.getElementById(`comments-${packageId}`);
        commentsContainer.style.display = 'block';
        commentsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    hideComments(packageId) {
        const commentsContainer = document.getElementById(`comments-${packageId}`);
        commentsContainer.style.display = 'none';
    }

    sendComment(packageId) {
        if (!this.currentUser) {
            this.showLoginModal();
            return;
        }

        const commentInput = document.querySelector(`[data-package-id="${packageId}"].comment-input`);
        const content = commentInput.value.trim();

        if (content) {
            const comment = socialData.addComment(packageId, this.currentUser.id, content);
            comment.user = this.currentUser;
            
            // Actualizar UI
            const commentsList = document.querySelector(`#comments-${packageId} .comments-list`);
            commentsList.insertAdjacentHTML('beforeend', this.renderComment(comment));
            
            // Actualizar contador
            const commentBtn = document.querySelector(`[data-package-id="${packageId}"].btn-comment .comment-count`);
            const package = socialData.getPackageById(packageId);
            commentBtn.textContent = packageItem.comments;
            
            // Limpiar input
            commentInput.value = '';
            
            this.showNotification('¡Comentario publicado! 💬');
        }
    }

    showQuoteModal(packageId) {
        const package = socialData.getPackageById(packageId);
        const agency = socialData.getAgencyById(packageItem.agencyId);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Solicitar Cotización</h3>
                    <button class="btn-close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="quote-package-info">
                        <img src="${packageItem.images[0]}" alt="${packageItem.title}" class="quote-package-image">
                        <div class="quote-package-details">
                            <h4>${packageItem.title}</h4>
                            <p>${packageItem.origin} → ${packageItem.destination}</p>
                            <p class="quote-price">$${this.formatPrice(packageItem.price)} por persona</p>
                        </div>
                    </div>
                    
                    <form class="quote-form" id="quote-form-${packageId}">
                        <div class="form-group">
                            <label>Nombre completo *</label>
                            <input type="text" name="client_name" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="client_email" required>
                        </div>
                        <div class="form-group">
                            <label>Teléfono *</label>
                            <input type="tel" name="client_phone" required>
                        </div>
                        <div class="form-group">
                            <label>Número de personas</label>
                            <input type="number" name="adults" min="1" value="2">
                        </div>
                        <div class="form-group">
                            <label>Fecha de salida preferida</label>
                            <input type="date" name="departure_date">
                        </div>
                        <div class="form-group">
                            <label>Comentarios adicionales</label>
                            <textarea name="special_requirements" placeholder="Cuéntanos más sobre tu viaje ideal..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-paper-plane"></i>
                            Enviar Solicitud
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.btn-close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.quote-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitQuote(packageId, new FormData(e.target));
        });

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    submitQuote(packageId, formData) {
        // Simular envío de cotización
        this.showNotification('¡Solicitud enviada! Un asesor se pondrá en contacto contigo pronto. 📧');
        
        // Cerrar modal
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    showPackageDetails(packageId) {
        const package = socialData.getPackageById(packageId);
        const agency = socialData.getAgencyById(packageItem.agencyId);
        
        // Crear modal de detalles
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>${packageItem.title}</h3>
                    <button class="btn-close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="package-detail-images">
                        ${packageItem.images.map(img => `<img src="${img}" alt="${packageItem.title}" class="detail-image">`).join('')}
                    </div>
                    
                    <div class="package-detail-content">
                        <div class="detail-section">
                            <h4>Descripción</h4>
                            <p>${packageItem.description}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Incluye</h4>
                            <ul>
                                ${packageItem.includes.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="detail-section">
                            <h4>No incluye</h4>
                            <ul>
                                ${packageItem.excludes.map(item => `<li>${item}</li>`).join('')}
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
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.btn-close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Iniciar Sesión</h3>
                    <button class="btn-close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Para interactuar con los paquetes, necesitas iniciar sesión.</p>
                    <div class="login-options">
                        <button class="btn-primary" onclick="socialFeed.loginAsGuest()">
                            <i class="fas fa-user"></i>
                            Continuar como Invitado
                        </button>
                        <button class="btn-secondary" onclick="socialFeed.showRegisterModal()">
                            <i class="fas fa-user-plus"></i>
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.btn-close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    loginAsGuest() {
        this.currentUser = {
            id: 999,
            name: "Usuario Invitado",
            username: "@invitado",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
            verified: false,
            followers: 0,
            following: 0,
            bio: "Usuario invitado",
            location: "Colombia"
        };
        
        this.showNotification('¡Bienvenido! Ahora puedes interactuar con los paquetes. 👋');
        this.updateUserInterface();
        
        // Cerrar modal
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    updateUserInterface() {
        // Actualizar header con información del usuario
        const userInfo = document.getElementById('user-info');
        const authButton = document.getElementById('auth-button');
        
        if (this.currentUser) {
            userInfo.style.display = 'flex';
            authButton.style.display = 'none';
            
            document.getElementById('user-avatar').src = this.currentUser.avatar;
            document.getElementById('user-avatar').alt = this.currentUser.name;
            document.getElementById('user-name').textContent = this.currentUser.name;
        } else {
            userInfo.style.display = 'none';
            authButton.style.display = 'block';
        }
    }

    setupRealTimeUpdates() {
        // Simular actualizaciones en tiempo real
        setInterval(() => {
            this.updateStats();
        }, 30000); // Cada 30 segundos
    }

    updateStats() {
        const packages = socialData.getPackages();
        const totalLikes = packages.reduce((sum, pkg) => sum + pkg.likes, 0);
        
        const statsElement = document.querySelector('.feed-stats .stat-item:last-child .stat-number');
        if (statsElement) {
            statsElement.textContent = totalLikes;
        }
    }

    getTotalLikes() {
        const packages = socialData.getPackages();
        return packages.reduce((sum, pkg) => sum + pkg.likes, 0);
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

    formatPrice(price) {
        return new Intl.NumberFormat('es-CO').format(price);
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'hace un momento';
        if (diff < 3600000) return `hace ${Math.floor(diff / 60000)} min`;
        if (diff < 86400000) return `hace ${Math.floor(diff / 3600000)} h`;
        return `hace ${Math.floor(diff / 86400000)} días`;
    }

    createFeedContainer() {
        const mainContent = document.querySelector('.main-content-full');
        if (mainContent) {
            mainContent.innerHTML = `
                <div id="social-feed" class="social-feed-container">
                    <!-- El contenido se generará dinámicamente -->
                </div>
            `;
        }
    }
}

// Inicializar el feed social
document.addEventListener('DOMContentLoaded', () => {
    window.socialFeed = new SocialFeed();
});
