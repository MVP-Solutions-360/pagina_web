/* ========================================
   RED SOCIAL - FUNCIONALIDADES JAVASCRIPT
   ======================================== */

// Variables globales
let postsData = [];
let currentUser = {
    name: 'Usuario Actual',
    agency: 'Mi Agencia',
    avatar: 'TU'
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeRedSocial();
    loadPosts();
    setupEventListeners();
});

// Inicializar la red social
function initializeRedSocial() {
    console.log('Red Social inicializada');
    
    // Cargar datos de localStorage
    loadUserData();
    
    // Aplicar modo oscuro si está activo
    applyDarkMode();
}

// Cargar datos del usuario
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Aplicar modo oscuro
function applyDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                      (localStorage.getItem('darkMode') === null && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Cargar publicaciones
function loadPosts() {
    // Datos de ejemplo
    postsData = [
        {
            id: 1,
            agency: {
                name: 'Caribe Dreams Travel',
                avatar: 'CD',
                logo: 'https://via.placeholder.com/50x50/3B82F6/FFFFFF?text=CD'
            },
            title: '¡Nuevo paquete a Punta Cana! 🏖️',
            description: 'Descubre la magia del Caribe con nuestro paquete todo incluido. Incluye vuelos, hotel 5 estrellas, comidas, bebidas y actividades recreativas. ¡No te lo pierdas!',
            images: [
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
            ],
            timeAgo: 'Hace 2 horas',
            likes: 24,
            comments: 8,
            isLiked: false,
            packageId: 'punta-cana-4-dias'
        },
        {
            id: 2,
            agency: {
                name: 'Andes Adventure Tours',
                avatar: 'AA',
                logo: 'https://via.placeholder.com/50x50/10B981/FFFFFF?text=AA'
            },
            title: 'Aventura en Medellín - Ciudad de la Eterna Primavera 🌸',
            description: 'Explora la vibrante cultura paisa y sus hermosos paisajes. Incluye tour por el centro histórico, cable aéreo, comuna 13 y gastronomía local. Una experiencia única en la ciudad de la eterna primavera.',
            images: [
                'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
            ],
            timeAgo: 'Hace 4 horas',
            likes: 18,
            comments: 5,
            isLiked: false,
            packageId: 'medellin-3-dias'
        }
    ];
    
    renderPosts();
}

// Renderizar publicaciones
function renderPosts() {
    const postsFeed = document.getElementById('posts-feed');
    if (!postsFeed) return;
    
    postsFeed.innerHTML = postsData.map(post => createPostHTML(post)).join('');
}

// Crear HTML de una publicación
function createPostHTML(post) {
    const imagesHTML = createImagesHTML(post.images);
    const commentsHTML = createCommentsHTML(post.id);
    
    return `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="agency-info">
                    <img src="${post.agency.logo}" alt="Agencia Logo" class="agency-avatar">
                    <div class="agency-details">
                        <h4 class="agency-name">${post.agency.name}</h4>
                        <span class="post-time">${post.timeAgo}</span>
                    </div>
                </div>
                <button class="follow-btn" onclick="followAgency('${post.agency.name}')">Seguir</button>
            </div>
            
            <div class="post-content">
                <h3 class="post-title" onclick="viewPackageDetails('${post.packageId}')">
                    ${post.title}
                </h3>
                
                <div class="post-images">
                    ${imagesHTML}
                </div>
                
                <div class="post-description">
                    <div class="description-preview">
                        <p>${post.description.substring(0, 100)}...</p>
                    </div>
                    <button class="expand-description" onclick="toggleDescription(${post.id})">
                        <span class="expand-text">Ver más</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="description-full" style="display: none;">
                        <p>${post.description}</p>
                    </div>
                </div>
            </div>
            
            <div class="post-actions">
                <button class="action-btn like-btn ${post.isLiked ? 'liked' : ''}" onclick="togglePostLike(${post.id})">
                    <i class="${post.isLiked ? 'fas' : 'far'} fa-heart"></i>
                    <span class="like-count">${post.likes}</span>
                </button>
                <button class="action-btn comment-btn" onclick="toggleComments(${post.id})">
                    <i class="far fa-comment"></i>
                    <span class="comment-count">${post.comments}</span>
                </button>
                <button class="action-btn share-btn" onclick="sharePost(${post.id})">
                    <i class="fas fa-share"></i>
                    Compartir
                </button>
            </div>
            
            <div class="comments-section" style="display: none;">
                ${commentsHTML}
            </div>
        </div>
    `;
}

// Crear HTML de imágenes
function createImagesHTML(images) {
    if (images.length === 0) return '';
    
    const mainImage = images[0];
    const secondaryImages = images.slice(1, 4);
    const remainingCount = images.length - 4;
    
    let secondaryHTML = secondaryImages.map(img => 
        `<img src="${img}" alt="Imagen" onclick="openImageModal('${img}')">`
    ).join('');
    
    if (remainingCount > 0) {
        secondaryHTML += `<div class="more-images" onclick="openImageModal('${images[0]}')">+${remainingCount}</div>`;
    }
    
    return `
        <div class="main-image">
            <img src="${mainImage}" alt="Imagen principal" onclick="openImageModal('${mainImage}')">
        </div>
        <div class="secondary-images">
            ${secondaryHTML}
        </div>
    `;
}

// Crear HTML de comentarios
function createCommentsHTML(postId) {
    return `
        <div class="comments-list">
            <div class="comment">
                <img src="https://via.placeholder.com/40x40/10B981/FFFFFF?text=MG" alt="Usuario" class="comment-avatar">
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="comment-author">María González</span>
                        <span class="comment-agency">Agencia Viajes del Sol</span>
                    </div>
                    <p class="comment-text">¡Se ve increíble! ¿Cuál es el precio?</p>
                    <div class="comment-actions">
                        <button class="comment-like-btn" onclick="toggleCommentLike(${postId}, 1)">
                            <i class="far fa-heart"></i>
                            <span>3</span>
                        </button>
                        <button class="reply-btn" onclick="replyToComment(${postId}, 1)">Responder</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="comment-form">
            <img src="https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=${currentUser.avatar}" alt="Tu avatar" class="comment-avatar">
            <div class="comment-input-container">
                <input type="text" placeholder="Escribe un comentario..." class="comment-input" onkeypress="handleCommentKeypress(event, ${postId})">
                <button class="comment-submit-btn" onclick="submitComment(${postId})">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros del sidebar
    const searchInput = document.getElementById('sidebar-search');
    const agencyFilter = document.getElementById('sidebar-agency');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterPosts);
    }
    
    if (agencyFilter) {
        agencyFilter.addEventListener('change', filterPosts);
    }
    
    // Crear post
    const createPostInput = document.querySelector('.create-post-input');
    if (createPostInput) {
        createPostInput.addEventListener('keypress', handleCreatePostKeypress);
    }
}

// Filtrar publicaciones
function filterPosts() {
    const searchTerm = document.getElementById('sidebar-search')?.value.toLowerCase() || '';
    const agencyFilter = document.getElementById('sidebar-agency')?.value || '';
    
    const filteredPosts = postsData.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                             post.description.toLowerCase().includes(searchTerm);
        const matchesAgency = !agencyFilter || post.agency.name.toLowerCase().includes(agencyFilter.toLowerCase());
        
        return matchesSearch && matchesAgency;
    });
    
    // Actualizar la vista (simplificado para demo)
    console.log('Filtrando posts:', { searchTerm, agencyFilter, filteredCount: filteredPosts.length });
}

// Toggle de descripción
function toggleDescription(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (!post) return;
    
    const expandBtn = post.querySelector('.expand-description');
    const descriptionFull = post.querySelector('.description-full');
    const expandText = post.querySelector('.expand-text');
    const chevron = expandBtn.querySelector('i');
    
    if (descriptionFull.style.display === 'none') {
        descriptionFull.style.display = 'block';
        expandText.textContent = 'Ver menos';
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
    } else {
        descriptionFull.style.display = 'none';
        expandText.textContent = 'Ver más';
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    }
}

// Toggle de comentarios
function toggleComments(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (!post) return;
    
    const commentsSection = post.querySelector('.comments-section');
    const commentBtn = post.querySelector('.comment-btn');
    
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        commentBtn.style.color = '#3b82f6';
    } else {
        commentsSection.style.display = 'none';
        commentBtn.style.color = '#6b7280';
    }
}

// Toggle de like en post
function togglePostLike(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    
    // Actualizar UI
    const likeBtn = document.querySelector(`[data-post-id="${postId}"] .like-btn`);
    const likeCount = document.querySelector(`[data-post-id="${postId}"] .like-count`);
    const likeIcon = likeBtn.querySelector('i');
    
    if (post.isLiked) {
        likeBtn.classList.add('liked');
        likeIcon.classList.remove('far');
        likeIcon.classList.add('fas');
    } else {
        likeBtn.classList.remove('liked');
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
    }
    
    likeCount.textContent = post.likes;
    
    // Guardar en localStorage
    localStorage.setItem('postsData', JSON.stringify(postsData));
}

// Toggle de like en comentario
function toggleCommentLike(postId, commentId) {
    console.log(`Like en comentario ${commentId} del post ${postId}`);
    // Implementar lógica de like en comentarios
}

// Compartir post
function sharePost(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;
    
    if (navigator.share) {
        navigator.share({
            title: post.title,
            text: post.description,
            url: window.location.href
        });
    } else {
        // Fallback: copiar al portapapeles
        const shareText = `${post.title}\n\n${post.description}\n\n${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Enlace copiado al portapapeles');
        });
    }
}

// Seguir agencia
function followAgency(agencyName) {
    console.log(`Siguiendo a ${agencyName}`);
    showNotification(`Ahora sigues a ${agencyName}`);
}

// Ver detalles del paquete
function viewPackageDetails(packageId) {
    console.log(`Viendo detalles del paquete: ${packageId}`);
    // Redirigir a la página de paquetes con el ID específico
    window.location.href = `packages.html#${packageId}`;
}

// Enviar comentario
function submitComment(postId) {
    const commentInput = document.querySelector(`[data-post-id="${postId}"] .comment-input`);
    const commentText = commentInput.value.trim();
    
    if (!commentText) return;
    
    // Agregar comentario a los datos
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.comments += 1;
        
        // Actualizar contador de comentarios
        const commentCount = document.querySelector(`[data-post-id="${postId}"] .comment-count`);
        if (commentCount) {
            commentCount.textContent = post.comments;
        }
    }
    
    // Limpiar input
    commentInput.value = '';
    
    // Mostrar notificación
    showNotification('Comentario agregado');
    
    // Guardar en localStorage
    localStorage.setItem('postsData', JSON.stringify(postsData));
}

// Manejar tecla Enter en comentarios
function handleCommentKeypress(event, postId) {
    if (event.key === 'Enter') {
        submitComment(postId);
    }
}

// Manejar tecla Enter en crear post
function handleCreatePostKeypress(event) {
    if (event.key === 'Enter') {
        // Abrir modal de crear post
        showCreatePostModal();
    }
}

// Mostrar modal de crear post
function showCreatePostModal() {
    const modal = document.getElementById('new-post-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Abrir modal de imagen
function openImageModal(imageUrl) {
    // Crear modal de imagen
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="image-modal-close">&times;</span>
            <img src="${imageUrl}" alt="Imagen ampliada">
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const content = modal.querySelector('.image-modal-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = modal.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    `;
    
    const closeBtn = modal.querySelector('.image-modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    `;
    
    // Event listeners
    closeBtn.onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => {
        if (e.target === modal) document.body.removeChild(modal);
    };
    
    document.body.appendChild(modal);
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Responder a comentario
function replyToComment(postId, commentId) {
    console.log(`Respondiendo al comentario ${commentId} del post ${postId}`);
    // Implementar lógica de respuesta
}

// Exportar funciones globales
window.toggleDescription = toggleDescription;
window.toggleComments = toggleComments;
window.togglePostLike = togglePostLike;
window.toggleCommentLike = toggleCommentLike;
window.sharePost = sharePost;
window.followAgency = followAgency;
window.viewPackageDetails = viewPackageDetails;
window.submitComment = submitComment;
window.handleCommentKeypress = handleCommentKeypress;
window.replyToComment = replyToComment;
window.openImageModal = openImageModal;
