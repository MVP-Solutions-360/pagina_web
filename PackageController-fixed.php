<?php

namespace App\Http\Controllers\Api;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PackageController extends Controller
{
    /**
     * Obtener lista de paquetes con filtros y paginación
     */
    public function index(Request $request, string $agencySlug): JsonResponse
    {
        try {
            $query = Package::query()->where('agency_slug', $agencySlug);
            
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
            
            if ($request->has('departure_date')) {
                $query->where('departure_date', '>=', $request->departure_date);
            }
            
            if ($request->has('return_date')) {
                $query->where('return_date', '<=', $request->return_date);
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
                ],
                'agency' => [
                    'slug' => $agencySlug,
                    'name' => 'Agencia Principal'
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener paquetes: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Obtener paquete específico por ID
     */
    public function show(string $agencySlug, int $packageId): JsonResponse
    {
        try {
            $package = Package::where('id', $packageId)
                ->where('agency_slug', $agencySlug)
                ->first();
            
            if (!$package) {
                return response()->json([
                    'success' => false,
                    'message' => 'Paquete no encontrado'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $package
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener paquete: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Obtener lista de destinos disponibles
     */
    public function destinations(string $agencySlug): JsonResponse
    {
        try {
            $destinations = Package::select('destination')
                ->where('agency_slug', $agencySlug)
                ->whereNotNull('destination')
                ->distinct()
                ->pluck('destination');
            
            return response()->json([
                'success' => true,
                'data' => $destinations
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener destinos: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Obtener paquetes destacados
     */
    public function featured(string $agencySlug, Request $request): JsonResponse
    {
        try {
            $limit = $request->get('limit', 6);
            
            $packages = Package::where('agency_slug', $agencySlug)
                ->where('featured', true)
                ->limit($limit)
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $packages
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener paquetes destacados: ' . $e->getMessage()
            ], 500);
        }
    }
}
