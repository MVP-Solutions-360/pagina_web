// 🌐 Red de Agencias 360 - Datos Sociales Dinámicos
// Sistema de datos mock para demostración

class SocialDataManager {
    constructor() {
        this.agencies = this.generateAgencies();
        this.packages = this.generatePackages();
        this.users = this.generateUsers();
        this.socialInteractions = this.generateSocialInteractions();
        this.notifications = [];
    }

    generateAgencies() {
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

    generatePackages() {
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

    generateUsers() {
        return [
            {
                id: 1,
                name: "María González",
                username: "@mariagonzalez",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                verified: true,
                followers: 1234,
                following: 567,
                bio: "Viajera apasionada del Caribe colombiano 🌴✈️",
                location: "Medellín, Colombia"
            },
            {
                id: 2,
                name: "Carlos Mendoza",
                username: "@carlosmendoza",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                verified: false,
                followers: 892,
                following: 234,
                bio: "Aventurero y fotógrafo de naturaleza 📸🏔️",
                location: "Bogotá, Colombia"
            },
            {
                id: 3,
                name: "Ana Rodríguez",
                username: "@anarodriguez",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                verified: true,
                followers: 2156,
                following: 789,
                bio: "Especialista en turismo sostenible 🌱🌍",
                location: "Cali, Colombia"
            }
        ];
    }

    generateSocialInteractions() {
        return [
            {
                id: 1,
                packageId: 1,
                userId: 1,
                type: "like",
                createdAt: "2025-09-15T11:30:00Z"
            },
            {
                id: 2,
                packageId: 1,
                userId: 2,
                type: "comment",
                content: "¡Increíble experiencia! La cena en el Castillo fue mágica ✨",
                createdAt: "2025-09-15T12:15:00Z"
            },
            {
                id: 3,
                packageId: 2,
                userId: 3,
                type: "like",
                createdAt: "2025-09-12T15:45:00Z"
            },
            {
                id: 4,
                packageId: 2,
                userId: 1,
                type: "comment",
                content: "El trekking por Cocora es una experiencia única. Las palmas de cera son impresionantes 🌴",
                createdAt: "2025-09-12T16:20:00Z"
            }
        ];
    }

    // Métodos para obtener datos
    getAgencies() {
        return this.agencies;
    }

    getPackages(filters = {}) {
        let packages = [...this.packages];
        
        if (filters.destination) {
            packages = packages.filter(pkg => 
                pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())
            );
        }
        
        if (filters.featured) {
            packages = packages.filter(pkg => pkg.featured);
        }
        
        if (filters.maxPrice) {
            packages = packages.filter(pkg => pkg.price <= filters.maxPrice);
        }
        
        return packages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    getPackageById(id) {
        return this.packages.find(pkg => pkg.id === id);
    }

    getAgencyById(id) {
        return this.agencies.find(agency => agency.id === id);
    }

    getUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    // Métodos para interacciones sociales
    likePackage(packageId, userId) {
        const existingLike = this.socialInteractions.find(
            interaction => interaction.packageId === packageId && 
                          interaction.userId === userId && 
                          interaction.type === "like"
        );
        
        if (!existingLike) {
            this.socialInteractions.push({
                id: this.socialInteractions.length + 1,
                packageId,
                userId,
                type: "like",
                createdAt: new Date().toISOString()
            });
            
            // Actualizar contador de likes
            const package = this.getPackageById(packageId);
            if (package) {
                package.likes++;
            }
            
            return true;
        }
        return false;
    }

    unlikePackage(packageId, userId) {
        const likeIndex = this.socialInteractions.findIndex(
            interaction => interaction.packageId === packageId && 
                          interaction.userId === userId && 
                          interaction.type === "like"
        );
        
        if (likeIndex !== -1) {
            this.socialInteractions.splice(likeIndex, 1);
            
            // Actualizar contador de likes
            const package = this.getPackageById(packageId);
            if (package) {
                package.likes--;
            }
            
            return true;
        }
        return false;
    }

    addComment(packageId, userId, content) {
        const comment = {
            id: this.socialInteractions.length + 1,
            packageId,
            userId,
            type: "comment",
            content,
            createdAt: new Date().toISOString()
        };
        
        this.socialInteractions.push(comment);
        
        // Actualizar contador de comentarios
        const package = this.getPackageById(packageId);
        if (package) {
            package.comments++;
        }
        
        return comment;
    }

    getComments(packageId) {
        return this.socialInteractions
            .filter(interaction => interaction.packageId === packageId && interaction.type === "comment")
            .map(comment => ({
                ...comment,
                user: this.getUserById(comment.userId)
            }))
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    isLikedByUser(packageId, userId) {
        return this.socialInteractions.some(
            interaction => interaction.packageId === packageId && 
                          interaction.userId === userId && 
                          interaction.type === "like"
        );
    }

    // Métodos para notificaciones
    addNotification(userId, type, title, message, data = {}) {
        const notification = {
            id: this.notifications.length + 1,
            userId,
            type,
            title,
            message,
            data,
            read: false,
            createdAt: new Date().toISOString()
        };
        
        this.notifications.push(notification);
        return notification;
    }

    getNotifications(userId) {
        return this.notifications
            .filter(notification => notification.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    markNotificationAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            return true;
        }
        return false;
    }
}

// Instancia global
window.socialData = new SocialDataManager();
