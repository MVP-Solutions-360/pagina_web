/**
 * Mock API para pruebas de desarrollo
 * Simula la respuesta de la API real mientras no tengas Laravel corriendo
 */

// Simular la API global
window.AgenciaAPI = {
    // Simular getPackageById
    getPackageById: async function(packageId) {
        console.log('🔍 Mock API: Obteniendo paquete con ID:', packageId);
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Datos simulados del paquete
        const mockPackage = {
            success: true,
            data: {
                data: {
                    id: packageId,
                    title: "CUBA MÁGICA: ¡UN VIAJE INOLVIDABLE AL CORAZÓN DEL CARIBE!",
                    name: "CUBA MÁGICA: ¡UN VIAJE INOLVIDABLE AL CORAZÓN DEL CARIBE!",
                    destination: "Cuba: La Habana, Cayo y Varadero",
                    location: "Cuba: La Habana, Cayo y Varadero",
                    origin: "Medellín, Colombia",
                    min_price: 3999000,
                    price: 3999000,
                    departure_date: "2025-08-28",
                    start_date: "2025-08-28",
                    return_date: "2025-09-03",
                    end_date: "2025-09-03",
                    duration: "7 días / 6 noches",
                    nights: "6",
                    available_units: "6",
                    capacity: "6",
                    group_size: "Grupo turístico",
                    description: "Embárcate en una aventura inolvidable a Cuba, donde la historia, la cultura y la belleza natural se fusionan en un destino único.",
                    details: "Embárcate en una aventura inolvidable a Cuba, donde la historia, la cultura y la belleza natural se fusionan en un destino único. Descubre la Habana, una ciudad llena de vida y color, con sus coches clásicos y su arquitectura colonial. Relájate en Cayo Santa María, un paraíso de playas de ensueño, y disfruta de la diversión y el sol en Varadero. ¡Una experiencia que despertará tus sentidos! 🍹☀️🏖️",
                    destinations: "Tres destinos Cuba: La Habana, Cayo y Varadero",
                    include: [
                        "Tiquetes aéreos Medellín - Santa Clara / La Habana - Medellín, vía Panamá",
                        "Salida: 05:07 A.M. - Regreso: 03:01 P.M.",
                        "Equipaje: artículo personal (morral) + maleta de cabina (10 kg)",
                        "Traslados en servicio regular compartido",
                        "2 noches en hotel Meliá Cayo Santa María, alimentación todo incluido",
                        "2 noches en hotel Meliá Varadero, alimentación todo incluido",
                        "2 noches en hotel Meliá Cohiba, La Habana, desayuno diario",
                        "City tour en La Habana, sin almuerzo",
                        "Tarjeta de ingreso a la Isla de Cuba",
                        "Asistencia médica",
                        "Fee bancario"
                    ],
                    includes: [
                        "Tiquetes aéreos Medellín - Santa Clara / La Habana - Medellín, vía Panamá",
                        "Salida: 05:07 A.M. - Regreso: 03:01 P.M.",
                        "Equipaje: artículo personal (morral) + maleta de cabina (10 kg)",
                        "Traslados en servicio regular compartido",
                        "2 noches en hotel Meliá Cayo Santa María, alimentación todo incluido",
                        "2 noches en hotel Meliá Varadero, alimentación todo incluido",
                        "2 noches en hotel Meliá Cohiba, La Habana, desayuno diario",
                        "City tour en La Habana, sin almuerzo",
                        "Tarjeta de ingreso a la Isla de Cuba",
                        "Asistencia médica",
                        "Fee bancario"
                    ],
                    inclusions: [
                        "Tiquetes aéreos Medellín - Santa Clara / La Habana - Medellín, vía Panamá",
                        "Salida: 05:07 A.M. - Regreso: 03:01 P.M.",
                        "Equipaje: artículo personal (morral) + maleta de cabina (10 kg)",
                        "Traslados en servicio regular compartido",
                        "2 noches en hotel Meliá Cayo Santa María, alimentación todo incluido",
                        "2 noches en hotel Meliá Varadero, alimentación todo incluido",
                        "2 noches en hotel Meliá Cohiba, La Habana, desayuno diario",
                        "City tour en La Habana, sin almuerzo",
                        "Tarjeta de ingreso a la Isla de Cuba",
                        "Asistencia médica",
                        "Fee bancario"
                    ],
                    no_include: [
                        "Gastos personales",
                        "Propinas",
                        "Bebidas alcohólicas (excepto en todo incluido)",
                        "Excursiones opcionales",
                        "Seguro de viaje"
                    ],
                    not_includes: [
                        "Gastos personales",
                        "Propinas",
                        "Bebidas alcohólicas (excepto en todo incluido)",
                        "Excursiones opcionales",
                        "Seguro de viaje"
                    ],
                    exclusions: [
                        "Gastos personales",
                        "Propinas",
                        "Bebidas alcohólicas (excepto en todo incluido)",
                        "Excursiones opcionales",
                        "Seguro de viaje"
                    ],
                    conditions: [
                        "Tarifas por persona desde acomodación doble",
                        "Mayores de 75 años pagan suplemento de asistencia médica",
                        "Tarifas no reembolsables, itinerario, tarifas y disponibilidad sujetos a cambios",
                        "Estamos comprometidos con la ley 679-2001 (Prev. ESCNNA)"
                    ],
                    terms: [
                        "Tarifas por persona desde acomodación doble",
                        "Mayores de 75 años pagan suplemento de asistencia médica",
                        "Tarifas no reembolsables, itinerario, tarifas y disponibilidad sujetos a cambios",
                        "Estamos comprometidos con la ley 679-2001 (Prev. ESCNNA)"
                    ],
                    itinerary: [
                        "Día 1: Llegada a Santa Clara, traslado a Cayo Santa María",
                        "Día 2: Día libre en Cayo Santa María, playas y actividades",
                        "Día 3: Traslado a Varadero, check-in en hotel",
                        "Día 4: Día libre en Varadero, playas y actividades",
                        "Día 5: Traslado a La Habana, check-in en hotel",
                        "Día 6: City tour en La Habana, visita a lugares históricos",
                        "Día 7: Regreso a Medellín"
                    ],
                    main_image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop",
                    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop",
                    gallery_images: [
                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
                    ]
                }
            }
        };
        
        console.log('📡 Mock API: Respuesta simulada:', mockPackage);
        return mockPackage;
    },

    // Simular getPackages
    getPackages: async function(filters = {}) {
        console.log('🔍 Mock API: Obteniendo paquetes con filtros:', filters);
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const mockPackages = {
            success: true,
            data: {
                data: {
                    data: [
                        {
                            id: "1",
                            title: "CUBA MÁGICA: ¡UN VIAJE INOLVIDABLE AL CORAZÓN DEL CARIBE!",
                            destination: "Cuba: La Habana, Cayo y Varadero",
                            min_price: 3999000,
                            main_image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop"
                        },
                        {
                            id: "2",
                            title: "CARIBE COLOMBIANO: Cartagena y San Andrés",
                            destination: "Colombia: Cartagena y San Andrés",
                            min_price: 2500000,
                            main_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                        },
                        {
                            id: "3",
                            title: "MÉXICO ESPECTACULAR: Cancún y Riviera Maya",
                            destination: "México: Cancún y Riviera Maya",
                            min_price: 4500000,
                            main_image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
                        }
                    ]
                }
            }
        };
        
        console.log('📡 Mock API: Paquetes simulados:', mockPackages);
        return mockPackages;
    }
};

console.log('🚀 Mock API cargada para pruebas de desarrollo');
