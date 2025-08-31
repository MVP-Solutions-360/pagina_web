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
    if (!grid) {
        console.error('❌ No se encontró packages-grid');
        return;
    }

    if (this.packages.length === 0) {
        grid.innerHTML = '<p>No se encontraron paquetes</p>';
        return;
    }

    var packagesHTML = this.packages.map(function(package) {
        return '<div class="package-card">' +
               '<h3>' + (package.title || 'Sin título') + '</h3>' +
               '<p>Destino: ' + (package.destination || 'No especificado') + '</p>' +
               '<p>ID: ' + package.id + '</p>' +
               '<p>Origen: ' + (package.origin || 'No especificado') + '</p>' +
               '<div class="package-actions">' +
               '<a href="details-package.html?id=' + package.id + '" class="btn btn-primary">' +
               '<i class="fas fa-eye"></i> Ver Detalles</a>' +
               '</div>' +
               '</div>';
    }).join('');

    grid.innerHTML = packagesHTML;
    console.log('✅ Paquetes renderizados');
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
