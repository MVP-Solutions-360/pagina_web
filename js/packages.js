// ===== PACKAGES MANAGER SIMPLE =====

console.log('🔄 Script packages.js cargado - versión simple');

class PackagesManager {
    constructor() {
        console.log('🚀 Constructor PackagesManager ejecutado');
        this.packages = [];
    }

    async init() {
        console.log('🚀 Inicializando PackagesManager...');
        try {
            await this.loadPackages();
            console.log('✅ PackagesManager inicializado correctamente');
        } catch (error) {
            console.error('❌ Error en init:', error);
        }
    }

    async loadPackages() {
        console.log('📦 Cargando paquetes...');
        
        try {
            if (!window.AgenciaAPI || !window.AgenciaAPI.getPackages) {
                throw new Error('AgenciaAPI no disponible');
            }

            const response = await window.AgenciaAPI.getPackages();
            console.log('📡 Respuesta de la API:', response);

            if (response && response.success && response.data) {
                let packagesData = [];
                
                if (response.data.data && response.data.data.data && Array.isArray(response.data.data.data)) {
                    packagesData = response.data.data.data;
                    console.log('✅ Datos encontrados en response.data.data.data');
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    packagesData = response.data.data;
                    console.log('✅ Datos encontrados en response.data.data');
                } else {
                    packagesData = [];
                }

                this.packages = packagesData;
                console.log(`✅ Paquetes cargados: ${this.packages.length}`);
                
                this.renderPackages();
            } else {
                console.log('❌ No se pudieron cargar los paquetes');
                this.packages = [];
            }
        } catch (error) {
            console.error('❌ Error al cargar paquetes:', error);
            this.packages = [];
        }
    }

    renderPackages() {
        console.log('🎨 Renderizando paquetes...');
        
        const grid = document.getElementById('packages-grid');
        if (!grid) {
            console.error('❌ No se encontró packages-grid');
            return;
        }

        if (this.packages.length === 0) {
            grid.innerHTML = '<p>No se encontraron paquetes</p>';
            return;
        }

        const packagesHTML = this.packages.map(package => `
            <div class="package-card">
                <h3>${package.title || 'Sin título'}</h3>
                <p>Destino: ${package.destination || 'No especificado'}</p>
                <p>ID: ${package.id}</p>
            </div>
        `).join('');

        grid.innerHTML = packagesHTML;
        console.log('✅ Paquetes renderizados');
    }
}

// ===== INICIALIZACIÓN =====
try {
    console.log('🎯 Creando PackagesManager...');
    
    const packagesManager = new PackagesManager();
    
    window.PackagesManager = {
        instance: packagesManager,
        init: function() {
            return packagesManager.init();
        }
    };
    
    console.log('✅ PackagesManager disponible globalmente');
    
    // Inicializar automáticamente
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
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
