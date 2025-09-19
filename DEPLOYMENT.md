# 🚀 **GUÍA DE DESPLIEGUE A PRODUCCIÓN**

## 📋 **INSTRUCCIONES PRE-DESPLIEGUE**

### **1. Configuración de URLs**

#### **Cambios Necesarios en `config.production.js`:**
```javascript
api: {
    // CAMBIAR ESTA URL POR TU DOMINIO REAL
    baseURL: 'https://tudominio.com/crm/api/v1',
    // Ejemplo: 'https://agenciaviajes.com/crm/api/v1'
}
```

#### **Estructura de Directorios en el Servidor:**
```
public_html/
├── index.html (página principal)
├── css/
├── js/
├── images/
├── packages.html
├── dashboard.html
├── details-package.html
├── config.production.js (renombrar de config.js)
├── .htaccess
└── crm/ (subdirectorio con Laravel)
    ├── app/
    ├── public/
    ├── routes/
    └── ...
```

### **2. Configuración del CRM Laravel**

#### **En `routes/api.php` del CRM:**
Verificar que las rutas estén configuradas correctamente:
```php
Route::prefix('v1')->group(function () {
    Route::get('/agency/{agency:slug}', [AgencyController::class, 'show']);
    Route::post('/quotation', [QuotationController::class, 'store']);
    Route::post('/client', [ClientController::class, 'store']);
    Route::post('/client/login', [ClientAuthController::class, 'login']);
    // ... otras rutas
});
```

#### **Configuración de CORS en Laravel:**
En `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['https://tudominio.com'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

### **3. Configuración de Base de Datos**

#### **Variables de Entorno (.env):**
```env
APP_URL=https://tudominio.com/crm
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nombre_base_datos
DB_USERNAME=usuario_db
DB_PASSWORD=password_db

# Configuración de Sanctum
SANCTUM_STATEFUL_DOMAINS=tudominio.com
SESSION_DOMAIN=.tudominio.com
```

## 🔧 **PASOS PARA EL DESPLIEGUE**

### **Paso 1: Preparar Archivos**

1. **Renombrar configuración:**
   ```bash
   mv config.js config.development.js
   mv config.production.js config.js
   ```

2. **Actualizar URLs en config.js:**
   - Cambiar `baseURL` por tu dominio real
   - Verificar que `agencySlug` sea correcto

### **Paso 2: Subir Archivos al Servidor**

1. **Subir toda la carpeta `pagina_web/` a `public_html/`**
2. **Subir el CRM Laravel a `public_html/crm/`**
3. **Configurar el servidor web para que apunte a `public_html/crm/public/`**

### **Paso 3: Configurar Servidor Web**

#### **Apache (.htaccess en public_html/crm/):**
```apache
RewriteEngine On
RewriteRule ^(.*)$ public/$1 [L]
```

#### **Nginx:**
```nginx
location /crm {
    try_files $uri $uri/ /crm/public/index.php?$query_string;
}
```

### **Paso 4: Configurar Permisos**

```bash
# Permisos para Laravel
chmod -R 755 public_html/crm/storage
chmod -R 755 public_html/crm/bootstrap/cache
chown -R www-data:www-data public_html/crm/storage
chown -R www-data:www-data public_html/crm/bootstrap/cache
```

### **Paso 5: Configurar SSL (Recomendado)**

1. **Obtener certificado SSL**
2. **Configurar redirección HTTP → HTTPS**
3. **Actualizar URLs en config.js para usar HTTPS**

## ✅ **VERIFICACIONES POST-DESPLIEGUE**

### **1. Verificar Funcionamiento de la Página Web**
- [ ] Página principal carga correctamente
- [ ] CSS y JS se cargan sin errores
- [ ] Formularios funcionan correctamente
- [ ] Navegación entre páginas funciona

### **2. Verificar Conexión con API**
- [ ] Abrir DevTools → Network
- [ ] Enviar una cotización de prueba
- [ ] Verificar que las peticiones lleguen al CRM
- [ ] Verificar respuestas de la API

### **3. Verificar Autenticación**
- [ ] Login de clientes funciona
- [ ] Dashboard se carga correctamente
- [ ] Logout funciona correctamente
- [ ] Tokens se almacenan correctamente

### **4. Verificar Responsive Design**
- [ ] Probar en móvil
- [ ] Probar en tablet
- [ ] Probar en desktop
- [ ] Verificar que todos los elementos se vean bien

## 🐛 **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Error 404 en API:**
- Verificar que las rutas estén bien configuradas
- Verificar que el CRM esté en el subdirectorio correcto
- Verificar configuración del servidor web

### **Error CORS:**
- Verificar configuración en `config/cors.php`
- Verificar que el dominio esté en `allowed_origins`

### **Error 500 en API:**
- Verificar logs de Laravel en `storage/logs/`
- Verificar permisos de archivos
- Verificar configuración de base de datos

### **CSS/JS no cargan:**
- Verificar rutas relativas
- Verificar configuración de `.htaccess`
- Verificar permisos de archivos

## 📊 **MONITOREO Y MANTENIMIENTO**

### **Logs a Monitorear:**
- `public_html/crm/storage/logs/laravel.log`
- Logs del servidor web (Apache/Nginx)
- Logs de base de datos

### **Métricas a Revisar:**
- Tiempo de carga de páginas
- Errores 404/500
- Uso de memoria del servidor
- Rendimiento de la base de datos

## 🔒 **CONSIDERACIONES DE SEGURIDAD**

1. **Nunca subir archivos de desarrollo** (`config.development.js`)
2. **Configurar HTTPS** para todas las comunicaciones
3. **Configurar firewall** para proteger el servidor
4. **Mantener actualizado** Laravel y dependencias
5. **Configurar backups** regulares de la base de datos

## 📞 **SOPORTE**

Si encuentras problemas durante el despliegue:
1. Revisar logs de error
2. Verificar configuración paso a paso
3. Probar en entorno local primero
4. Contactar al desarrollador si es necesario

---

**¡Tu sitio web estará listo para recibir clientes!** 🎉
