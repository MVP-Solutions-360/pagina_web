<?php

use App\Http\Controllers\Api\PackageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // ===== RUTAS DE PAQUETES TURÍSTICOS =====
    
    // ✅ IMPORTANTE: Las rutas más específicas VAN PRIMERO
    Route::get('/agency/{agencySlug}/packages/destinations', [PackageController::class, 'destinations']);
    Route::get('/agency/{agencySlug}/packages/featured', [PackageController::class, 'featured']);
    
    // ✅ DESPUÉS van las rutas con parámetros
    Route::get('/agency/{agencySlug}/packages/{id}', [PackageController::class, 'show']);
    Route::get('/agency/{agencySlug}/packages', [PackageController::class, 'index']);
    
    // ===== OTRAS RUTAS DE LA AGENCIA =====
    
    // Información de la agencia
    Route::get('/agency/{agencySlug}', [AgencyController::class, 'show']);
    
    // Tipos de servicios
    Route::get('/agency/{agencySlug}/services', [ServiceController::class, 'index']);
    
    // Destinos populares
    Route::get('/agency/{agencySlug}/destinations', [DestinationController::class, 'index']);
    
    // Cotizaciones
    Route::post('/agency/{agencySlug}/quotations', [QuotationController::class, 'store']);
    
    // Contacto
    Route::post('/agency/{agencySlug}/contact', [ContactController::class, 'store']);
    
    // Clientes
    Route::get('/agency/{agencySlug}/clients/find', [ClientController::class, 'find']);
    Route::post('/agency/{agencySlug}/clients', [ClientController::class, 'store']);
});
