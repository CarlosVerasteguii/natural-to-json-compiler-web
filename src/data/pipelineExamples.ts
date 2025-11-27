export interface PipelineExample {
    id: string;
    label: string;
    description: string;
    icon: string;
    code: string;
}

export const PIPELINE_EXAMPLES: PipelineExample[] = [
    {
        id: 'basic',
        label: 'Básico: Objetos y Listas',
        description: 'Un ejemplo simple para entender la sintaxis básica.',
        icon: '✨',
        code: `CREAR OBJETO usuario CON
    nombre: "Juan Perez",
    edad: 25,
    activo: VERDADERO

CREAR LISTA colores CON ELEMENTOS "rojo", "verde", "azul"`
    },
    {
        id: 'complex',
        label: 'Complejo: Tipos Mixtos',
        description: 'Muestra cómo el compilador maneja múltiples tipos de datos y estructuras.',
        icon: '🧬',
        code: `CREAR OBJETO configuracion CON
    servidor: "localhost",
    puerto: 8080,
    reintentos: 3.5,
    ssl_activado: VERDADERO

CREAR LISTA coordenadas CON ELEMENTOS 10.5, 20.1, 30.0
CREAR LISTA banderas CON ELEMENTOS VERDADERO, FALSO, VERDADERO`
    },
    {
        id: 'optimization',
        label: 'Optimización: Código Muerto',
        description: 'Demuestra la eliminación de código redundante (Dead Code Elimination).',
        icon: '🚀',
        code: `// Este objeto tiene propiedades repetidas
// El compilador debería quedarse solo con la última asignación
CREAR OBJETO jugador CON
    vida: 100,
    vida: 50,
    vida: 0

// Definición redundante
CREAR OBJETO estado CON
    nivel: 1,
    nivel: 2`
    },
    {
        id: 'semantic_error',
        label: 'Error Semántico (Demo)',
        description: 'Un caso diseñado para fallar y probar la validación semántica.',
        icon: '⚠️',
        code: `CREAR OBJETO producto CON
    precio: "cien",  // Error: debería ser número
    stock: -5        // Semánticamente válido pero lógico dudoso`
    }
];
