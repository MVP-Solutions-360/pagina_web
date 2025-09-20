# Script PowerShell para revertir las rutas API a localhost

Write-Host "Revirtiendo rutas API a localhost..." -ForegroundColor Green

# Actualizar js/auth-crm.js
(Get-Content js/auth-crm.js) -replace 'https://mvpsolutions365\.com/api/v1', 'http://127.0.0.1:8000/api/v1' | Set-Content js/auth-crm.js

# Actualizar js/auth-system.js
(Get-Content js/auth-system.js) -replace 'https://mvpsolutions365\.com/api/v1', 'http://127.0.0.1:8000/api/v1' | Set-Content js/auth-system.js

# Actualizar js/auth-service.js
(Get-Content js/auth-service.js) -replace 'https://mvpsolutions365\.com/api/v1', 'http://127.0.0.1:8000/api/v1' | Set-Content js/auth-service.js

# Actualizar js/api.js
(Get-Content js/api.js) -replace 'https://mvpsolutions365\.com/api/v1', 'http://localhost:8000/api/v1' | Set-Content js/api.js

# Actualizar config.js
(Get-Content config.js) -replace 'https://mvpsolutions365\.com/api/v1', 'http://localhost:8000/api/v1' | Set-Content config.js

Write-Host "Rutas API revertidas a localhost exitosamente!" -ForegroundColor Green
