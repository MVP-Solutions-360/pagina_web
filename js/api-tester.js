// ===== HERRAMIENTA DE DIAGNÓSTICO DE API =====
// Para probar y validar la conectividad con la API del CRM

class APITester {
    constructor() {
        this.baseUrl = 'https://mvpsolutions365.com';
        this.testUser = {
            email: 'maicol.londono@mvpsolutions.com',
            password: 'test123' // Contraseña de prueba
        };
    }

    async runFullDiagnostic() {
        console.log('🔍 INICIANDO DIAGNÓSTICO COMPLETO DE LA API');
        console.log('==========================================');
        
        // 1. Probar conectividad básica
        await this.testBasicConnectivity();
        
        // 2. Probar endpoint de check
        await this.testCheckEndpoint();
        
        // 3. Probar endpoint de login
        await this.testLoginEndpoint();
        
        // 4. Probar diferentes variaciones de URL
        await this.testUrlVariations();
        
        console.log('✅ DIAGNÓSTICO COMPLETADO');
    }

    async testBasicConnectivity() {
        console.log('\n1️⃣ PROBANDO CONECTIVIDAD BÁSICA...');
        
        try {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                mode: 'no-cors' // Para evitar problemas de CORS en la prueba básica
            });
            
            console.log('✅ Servidor accesible:', this.baseUrl);
            console.log('Status:', response.status);
            
        } catch (error) {
            console.error('❌ Error de conectividad:', error.message);
            console.log('Posibles causas:');
            console.log('- Servidor no disponible');
            console.log('- Problema de DNS');
            console.log('- Firewall bloqueando la conexión');
        }
    }

    async testCheckEndpoint() {
        console.log('\n2️⃣ PROBANDO ENDPOINT /api/v1/api/check...');
        
        const urls = [
            `${this.baseUrl}/api/v1/api/check`,
            `${this.baseUrl}/api/check`,
            `${this.baseUrl}/api/v1/check`,
            `${this.baseUrl}/check`
        ];

        for (const url of urls) {
            try {
                console.log(`Probando: ${url}`);
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log(`✅ Status: ${response.status}`);
                
                if (response.ok) {
                    const data = await response.text();
                    console.log('✅ Respuesta:', data);
                    return true;
                } else {
                    console.log(`❌ Error ${response.status}: ${response.statusText}`);
                }
                
            } catch (error) {
                console.log(`❌ Error de conexión: ${error.message}`);
            }
        }
        
        return false;
    }

    async testLoginEndpoint() {
        console.log('\n3️⃣ PROBANDO ENDPOINT DE LOGIN...');
        
        const urls = [
            `${this.baseUrl}/api/v1/api/login`,
            `${this.baseUrl}/api/login`,
            `${this.baseUrl}/api/v1/login`,
            `${this.baseUrl}/login`
        ];

        for (const url of urls) {
            try {
                console.log(`Probando: ${url}`);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.testUser)
                });
                
                console.log(`Status: ${response.status}`);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Login exitoso:', data);
                    return true;
                } else {
                    const errorData = await response.text();
                    console.log(`❌ Error ${response.status}: ${errorData}`);
                }
                
            } catch (error) {
                console.log(`❌ Error de conexión: ${error.message}`);
                
                // Si es error de CORS, probar con modo no-cors
                if (error.message.includes('CORS')) {
                    console.log('🔄 Probando con modo no-cors...');
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.testUser)
                        });
                        console.log('✅ Petición enviada (no-cors):', response.type);
                    } catch (noCorsError) {
                        console.log('❌ Error incluso con no-cors:', noCorsError.message);
                    }
                }
            }
        }
        
        return false;
    }

    async testUrlVariations() {
        console.log('\n4️⃣ PROBANDO VARIACIONES DE URL...');
        
        const baseUrls = [
            'https://mvpsolutions365.com',
            'https://www.mvpsolutions365.com',
            'http://mvpsolutions365.com',
            'http://www.mvpsolutions365.com'
        ];

        const endpoints = [
            '/api/v1/api/login',
            '/api/login',
            '/api/v1/login',
            '/login',
            '/api/auth/login',
            '/auth/login'
        ];

        for (const baseUrl of baseUrls) {
            console.log(`\nProbando base URL: ${baseUrl}`);
            
            for (const endpoint of endpoints) {
                const fullUrl = baseUrl + endpoint;
                try {
                    const response = await fetch(fullUrl, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.testUser)
                    });
                    
                    if (response.ok) {
                        console.log(`✅ URL FUNCIONA: ${fullUrl}`);
                        const data = await response.json();
                        console.log('Respuesta:', data);
                        return fullUrl;
                    } else {
                        console.log(`❌ ${fullUrl} - Status: ${response.status}`);
                    }
                    
                } catch (error) {
                    console.log(`❌ ${fullUrl} - Error: ${error.message}`);
                }
            }
        }
        
        return null;
    }

    async testWithCurl() {
        console.log('\n5️⃣ COMANDOS CURL PARA PROBAR MANUALMENTE...');
        
        const curlCommands = [
            `curl -X POST "${this.baseUrl}/api/v1/api/login" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{"email":"${this.testUser.email}","password":"${this.testUser.password}"}'`,
            
            `curl -X GET "${this.baseUrl}/api/v1/api/check" \\
  -H "Accept: application/json"`,
            
            `curl -X GET "${this.baseUrl}/api/v1/api/me" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"`
        ];

        curlCommands.forEach((cmd, index) => {
            console.log(`\nComando ${index + 1}:`);
            console.log(cmd);
        });
    }

    async testWithPostman() {
        console.log('\n6️⃣ CONFIGURACIÓN PARA POSTMAN...');
        
        console.log('URL:', `${this.baseUrl}/api/v1/api/login`);
        console.log('Método: POST');
        console.log('Headers:');
        console.log('  Content-Type: application/json');
        console.log('  Accept: application/json');
        console.log('Body (raw JSON):');
        console.log(JSON.stringify(this.testUser, null, 2));
    }
}

// Función para ejecutar el diagnóstico
async function runAPIDiagnostic() {
    const tester = new APITester();
    await tester.runFullDiagnostic();
    await tester.testWithCurl();
    await tester.testWithPostman();
}

// Ejecutar automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Herramienta de diagnóstico de API cargada');
    console.log('Ejecuta runAPIDiagnostic() en la consola para probar la API');
    
    // Ejecutar diagnóstico automáticamente
    setTimeout(() => {
        runAPIDiagnostic();
    }, 2000);
});

// Hacer disponible globalmente
window.runAPIDiagnostic = runAPIDiagnostic;
window.APITester = APITester;
