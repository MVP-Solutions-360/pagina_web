#!/bin/bash
# Script para revertir las rutas API a localhost

echo "Revirtiendo rutas API a localhost..."

# Actualizar js/auth-crm.js
sed -i 's/https:\/\/mvpsolutions365\.com\/api\/v1/http:\/\/127.0.0.1:8000\/api\/v1/g' js/auth-crm.js

# Actualizar js/auth-system.js
sed -i 's/https:\/\/mvpsolutions365\.com\/api\/v1/http:\/\/127.0.0.1:8000\/api\/v1/g' js/auth-system.js

# Actualizar js/auth-service.js
sed -i 's/https:\/\/mvpsolutions365\.com\/api\/v1/http:\/\/127.0.0.1:8000\/api\/v1/g' js/auth-service.js

# Actualizar js/api.js
sed -i 's/https:\/\/mvpsolutions365\.com\/api\/v1/http:\/\/localhost:8000\/api\/v1/g' js/api.js

# Actualizar config.js
sed -i 's/https:\/\/mvpsolutions365\.com\/api\/v1/http:\/\/localhost:8000\/api\/v1/g' config.js

echo "Rutas API revertidas a localhost exitosamente!"
