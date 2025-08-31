# 🔧 Configuración de Laravel para API de Paquetes

## 📋 Verificaciones Necesarias

### 1. **Verificar que Laravel esté corriendo**
```bash
# En tu proyecto Laravel
php artisan serve
```
**Resultado esperado:** `Server running on http://127.0.0.1:8000`

### 2. **Verificar rutas de la API**
En `routes/api.php` debe estar:
```php
<?php

use App\Http\Controllers\PackageController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Endpoint principal de paquetes
    Route::get('/agency/{agencySlug}/packages', [PackageController::class, 'index']);
    
    // Endpoint de paquete específico
    Route::get('/agency/{agencySlug}/packages/{id}', [PackageController::class, 'show']);
    
    // Endpoint de destinos
    Route::get('/agency/{agencySlug}/packages/destinations', [PackageController::class, 'destinations']);
    
    // Endpoint de paquetes destacados
    Route::get('/agency/{agencySlug}/packages/featured', [PackageController::class, 'featured']);
});
```

### 3. **Verificar controlador PackageController**
En `app/Http/Controllers/PackageController.php`:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PackageController extends Controller
{
    public function index(Request $request, string $agencySlug): JsonResponse
    {
        try {
            $query = Package::query();
            
            // Aplicar filtros
            if ($request->has('destination')) {
                $query->where('destination', 'like', '%' . $request->destination . '%');
            }
            
            if ($request->has('search')) {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
                });
            }
            
            if ($request->has('min_price')) {
                $query->where('min_price', '>=', $request->min_price);
            }
            
            if ($request->has('max_price')) {
                $query->where('max_price', '<=', $request->max_price);
            }
            
            // Paginación
            $perPage = $request->get('limit', 12);
            $packages = $query->paginate($perPage);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'packages' => $packages->items(),
                    'total' => $packages->total(),
                    'per_page' => $packages->perPage(),
                    'current_page' => $packages->currentPage(),
                    'last_page' => $packages->lastPage(),
                    'from' => $packages->firstItem(),
                    'to' => $packages->lastItem()
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener paquetes: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function show(string $agencySlug, int $id): JsonResponse
    {
        try {
            $package = Package::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $package
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Paquete no encontrado'
            ], 404);
        }
    }
    
    public function destinations(string $agencySlug): JsonResponse
    {
        try {
            $destinations = Package::select('destination')
                ->distinct()
                ->whereNotNull('destination')
                ->pluck('destination');
            
            return response()->json([
                'success' => true,
                'data' => $destinations
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener destinos'
            ], 500);
        }
    }
    
    public function featured(string $agencySlug, Request $request): JsonResponse
    {
        try {
            $limit = $request->get('limit', 6);
            
            $packages = Package::where('featured', true)
                ->limit($limit)
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $packages
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener paquetes destacados'
            ], 500);
        }
    }
}
```

### 4. **Verificar modelo Package**
En `app/Models/Package.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Package extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'description',
        'destination',
        'min_price',
        'max_price',
        'duration',
        'departure_date',
        'return_date',
        'featured',
        'image',
        'agency_slug'
    ];
    
    protected $casts = [
        'departure_date' => 'date',
        'return_date' => 'date',
        'featured' => 'boolean',
        'min_price' => 'decimal:2',
        'max_price' => 'decimal:2'
    ];
}
```

### 5. **Verificar migración de la tabla packages**
En `database/migrations/xxxx_xx_xx_create_packages_table.php`:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('destination');
            $table->decimal('min_price', 10, 2)->nullable();
            $table->decimal('max_price', 10, 2)->nullable();
            $table->integer('duration')->nullable();
            $table->date('departure_date')->nullable();
            $table->date('return_date')->nullable();
            $table->boolean('featured')->default(false);
            $table->string('image')->nullable();
            $table->string('agency_slug');
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
```

### 6. **Verificar configuración de CORS**
En `config/cors.php`:
```php
<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### 7. **Verificar middleware en Kernel.php**
En `app/Http/Kernel.php`, asegúrate de que esté:
```php
protected $middleware = [
    // ... otros middlewares
    \Fruitcake\Cors\HandleCors::class,
];
```

## 🧪 **Comandos de Verificación**

### **Verificar rutas registradas:**
```bash
php artisan route:list --path=api
```

### **Verificar que la tabla existe:**
```bash
php artisan migrate:status
```

### **Verificar datos en la base de datos:**
```bash
php artisan tinker
>>> App\Models\Package::count();
>>> App\Models\Package::first();
```

### **Limpiar cache de rutas:**
```bash
php artisan route:clear
php artisan config:clear
php artisan cache:clear
```

## 🚨 **Problemas Comunes y Soluciones**

### **Error 404 - Ruta no encontrada:**
- Verifica que las rutas estén en `routes/api.php`
- Ejecuta `php artisan route:clear`
- Verifica que el prefijo sea `api/v1`

### **Error CORS:**
- Verifica `config/cors.php`
- Asegúrate de que el middleware esté en `Kernel.php`
- Ejecuta `php artisan config:clear`

### **Error de base de datos:**
- Verifica que la migración se haya ejecutado
- Verifica la conexión a la base de datos en `.env`
- Ejecuta `php artisan migrate:status`

### **Error de controlador:**
- Verifica que el namespace sea correcto
- Verifica que la clase exista en `app/Http/Controllers/`
- Verifica que los métodos sean públicos

## 📊 **Respuesta Esperada de la API**

### **GET /api/v1/agency/agencia-principal/packages**
```json
{
    "success": true,
    "data": {
        "packages": [
            {
                "id": 1,
                "title": "Paquete Cancún Todo Incluido",
                "description": "7 noches en Cancún con todo incluido",
                "destination": "Cancún, México",
                "min_price": "2500000.00",
                "max_price": "3500000.00",
                "duration": 7,
                "departure_date": "2025-03-15",
                "featured": true,
                "image": "cancun.jpg"
            }
        ],
        "total": 1,
        "per_page": 12,
        "current_page": 1,
        "last_page": 1
    }
}
```

## 🔍 **Verificación Final**

1. **Laravel corriendo:** `http://127.0.0.1:8000`
2. **API respondiendo:** `http://127.0.0.1:8000/api/v1/agency/agencia-principal/packages`
3. **Datos en BD:** Al menos 1 paquete creado
4. **CORS configurado:** Sin errores de CORS en el navegador
5. **Rutas registradas:** `php artisan route:list --path=api`

Si todo está correcto, los paquetes deberían aparecer en tu sitio web automáticamente.
