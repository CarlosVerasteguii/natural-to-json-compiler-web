import React from 'react';
import { Book, Cpu, Zap, FileJson, List, Workflow, Layers, Puzzle, AlertTriangle } from 'lucide-react';

export type DocSection = {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
};

export const docsData: DocSection[] = [
    {
        id: 'getting-started',
        title: 'Primeros Pasos',
        icon: <Zap className="w-5 h-5" />,
        content: (
            <div className="space-y-6">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Primeros Pasos</h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    Bienvenido a la documentación del <strong>Compilador de Natural a JSON</strong>. Esta herramienta te permite escribir definiciones de datos estructurados utilizando comandos en lenguaje natural y compilarlos a un formato JSON válido.
                </p>

                <div className="bg-midnight-900/50 border border-midnight-800 rounded-xl p-6 my-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Ejemplo Rápido</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-500 uppercase">Entrada (Natural)</p>
                            <pre className="bg-midnight-950 p-4 rounded-lg text-sm font-mono text-slate-300 border border-midnight-800">
                                {`CREAR OBJETO usuario CON
    nombre: "Alice",
    edad: 25,
    activo: VERDADERO`}
                            </pre>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-500 uppercase">Salida (JSON)</p>
                            <pre className="bg-midnight-950 p-4 rounded-lg text-sm font-mono text-green-400 border border-midnight-800">
                                {`{
  "usuario": {
    "nombre": "Alice",
    "edad": 25,
    "activo": true
  }
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-200 mt-8 mb-4">¿Cómo Funciona?</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                    <li>Escribe comandos en el editor del <strong>Studio</strong>.</li>
                    <li>El compilador analiza tu código en tiempo real.</li>
                    <li>Visualiza el <strong>JSON</strong> generado, los <strong>Tokens</strong> y el <strong>Árbol de Análisis</strong> en el panel de resultados.</li>
                </ul>
            </div>
        )
    },
    {
        id: 'syntax',
        title: 'Referencia de Sintaxis',
        icon: <Book className="w-5 h-5" />,
        content: (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Referencia de Sintaxis</h1>

                <section>
                    <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
                        <span className="bg-blue-500/10 p-2 rounded-lg mr-3"><FileJson className="w-6 h-6" /></span>
                        Creando Objetos
                    </h2>
                    <p className="text-slate-400 mb-4">
                        Usa el comando <code className="text-blue-300 bg-blue-900/20 px-1 py-0.5 rounded">CREAR OBJETO</code> para definir un nuevo objeto JSON.
                    </p>
                    <div className="bg-midnight-900/50 border border-midnight-800 rounded-xl p-6">
                        <code className="block font-mono text-sm text-slate-300 mb-4">
                            CREAR OBJETO <span className="text-yellow-400">&lt;identificador&gt;</span> CON <span className="text-purple-400">&lt;clave&gt;</span>:<span className="text-green-400">&lt;valor&gt;</span>, ...
                        </code>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><strong className="text-slate-300">identificador</strong>: El nombre de la clave principal del objeto.</li>
                            <li><strong className="text-slate-300">clave</strong>: El nombre de la propiedad.</li>
                            <li><strong className="text-slate-300">valor</strong>: Un texto, número o booleano.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
                        <span className="bg-purple-500/10 p-2 rounded-lg mr-3"><List className="w-6 h-6" /></span>
                        Creando Listas
                    </h2>
                    <p className="text-slate-400 mb-4">
                        Usa el comando <code className="text-purple-300 bg-purple-900/20 px-1 py-0.5 rounded">CREAR LISTA</code> para definir un arreglo (array).
                    </p>
                    <div className="bg-midnight-900/50 border border-midnight-800 rounded-xl p-6">
                        <code className="block font-mono text-sm text-slate-300 mb-4">
                            CREAR LISTA <span className="text-yellow-400">&lt;identificador&gt;</span> CON ELEMENTOS <span className="text-green-400">&lt;valor1&gt;</span>, <span className="text-green-400">&lt;valor2&gt;</span>
                        </code>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-200 mb-4">Tipos de Datos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-midnight-900 border border-midnight-800 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:border-green-500/30 transition-all duration-300 cursor-default group">
                            <div className="text-green-400 font-bold mb-2 group-hover:text-green-300 transition-colors">Texto (String)</div>
                            <code className="text-xs bg-midnight-950 p-1 rounded text-slate-400 group-hover:bg-midnight-900 transition-colors">&quot;Hola Mundo&quot;</code>
                            <p className="text-xs text-slate-500 mt-2">Texto entre comillas dobles.</p>
                        </div>
                        <div className="p-4 bg-midnight-900 border border-midnight-800 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:border-orange-500/30 transition-all duration-300 cursor-default group">
                            <div className="text-orange-400 font-bold mb-2 group-hover:text-orange-300 transition-colors">Número</div>
                            <code className="text-xs bg-midnight-950 p-1 rounded text-slate-400 group-hover:bg-midnight-900 transition-colors">42, 3.14</code>
                            <p className="text-xs text-slate-500 mt-2">Enteros o decimales.</p>
                        </div>
                        <div className="p-4 bg-midnight-900 border border-midnight-800 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:border-red-500/30 transition-all duration-300 cursor-default group">
                            <div className="text-red-400 font-bold mb-2 group-hover:text-red-300 transition-colors">Booleano</div>
                            <code className="text-xs bg-midnight-950 p-1 rounded text-slate-400 group-hover:bg-midnight-900 transition-colors">VERDADERO, FALSO</code>
                            <p className="text-xs text-slate-500 mt-2">Valores Verdadero o Falso.</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    },
    {
        id: 'architecture',
        title: 'Arquitectura',
        icon: <Cpu className="w-5 h-5" />,
        content: (
            <div className="space-y-6">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Arquitectura del Compilador</h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    El compilador sigue un proceso estándar de varias etapas para transformar el lenguaje natural a JSON.
                </p>

                <div className="relative border-l-2 border-midnight-800 ml-4 space-y-8 py-4">
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-midnight-950"></div>
                        <h3 className="text-xl font-bold text-blue-400">1. Análisis Léxico</h3>
                        <p className="text-slate-400 mt-2">
                            El <strong>Lexer</strong> (ANTLR4) lee el texto de entrada y lo convierte en una secuencia de <strong>Tokens</strong> (ej. `CREAR`, `IDENTIFICADOR`, `STRING`).
                        </p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-midnight-950"></div>
                        <h3 className="text-xl font-bold text-purple-400">2. Análisis Sintáctico (Parsing)</h3>
                        <p className="text-slate-400 mt-2">
                            El <strong>Parser</strong> construye un <strong>Árbol de Análisis</strong> basado en las reglas gramaticales, validando la estructura de los comandos.
                        </p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-midnight-950"></div>
                        <h3 className="text-xl font-bold text-yellow-400">3. Análisis Semántico</h3>
                        <p className="text-slate-400 mt-2">
                            El <strong>Listener</strong> recorre el árbol para construir la <strong>Tabla de Símbolos</strong> y generar la <strong>Representación Intermedia (IR)</strong>.
                        </p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-midnight-950"></div>
                        <h3 className="text-xl font-bold text-green-400">4. Generación de Código</h3>
                        <p className="text-slate-400 mt-2">
                            La etapa final toma la IR y construye el objeto <strong>JSON</strong> final.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'data-flow',
        title: 'Flujo de Datos',
        icon: <Workflow className="w-5 h-5" />,
        content: (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Flujo de Datos Completo</h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    El compilador transforma el lenguaje natural en JSON a través de una serie de transformaciones secuenciales.
                </p>

                <div className="bg-midnight-900/50 border border-midnight-800 rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>

                    <div className="space-y-8 relative z-10">
                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-blue-400">1. Entrada del Usuario</h3>
                                <code className="block mt-2 text-sm bg-midnight-950 p-2 rounded text-slate-300 border border-midnight-800">
                                    crear objeto usuario...
                                </code>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-8 w-0.5 bg-midnight-700"></div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                                <span className="text-2xl">🔤</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-purple-400">2. Lexer & Parser (ANTLR)</h3>
                                <p className="text-sm text-slate-400 mt-1">Tokenización y construcción del AST (Abstract Syntax Tree).</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-8 w-0.5 bg-midnight-700"></div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-yellow-400">3. Análisis Semántico</h3>
                                <ul className="text-sm text-slate-400 mt-1 list-disc list-inside">
                                    <li>Validación de tipos</li>
                                    <li>Detección de duplicados</li>
                                    <li>Tabla de Símbolos</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-8 w-0.5 bg-midnight-700"></div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                                <span className="text-2xl">⚙️</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-orange-400">4. Generación de IR</h3>
                                <p className="text-sm text-slate-400 mt-1">Transformación a código intermedio agnóstico.</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="h-8 w-0.5 bg-midnight-700"></div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-green-400">5. Salida JSON</h3>
                                <pre className="block mt-2 text-xs bg-midnight-950 p-2 rounded text-green-300 border border-midnight-800 font-mono">
                                    {`{
  "usuario": { ... }
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'compiler-phases',
        title: 'Fases del Compilador',
        icon: <Layers className="w-5 h-5" />,
        content: (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Fases del Compilador</h1>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-midnight-800 pb-2">1. Análisis Léxico y Sintáctico</h2>
                    <p className="text-slate-400">
                        Utilizamos <strong>ANTLR4</strong> para generar el lexer y parser. Esta fase convierte el texto plano en una estructura jerárquica llamada <strong>AST</strong>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-midnight-900 p-4 rounded-lg border border-midnight-800">
                            <h4 className="font-bold text-slate-300 mb-2">Entrada</h4>
                            <code className="text-sm text-blue-300">crear objeto usuario</code>
                        </div>
                        <div className="bg-midnight-900 p-4 rounded-lg border border-midnight-800">
                            <h4 className="font-bold text-slate-300 mb-2">Tokens</h4>
                            <code className="text-sm text-purple-300">[CREAR] [OBJETO] [ID:usuario]</code>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-midnight-800 pb-2">2. Análisis Semántico</h2>
                    <p className="text-slate-400">
                        Aquí validamos que el código tenga sentido. Se construye una <strong>Tabla de Símbolos</strong> para rastrear variables y tipos.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center text-slate-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            Verificación de tipos (ej. no asignar texto a un número)
                        </li>
                        <li className="flex items-center text-slate-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            Detección de variables duplicadas
                        </li>
                        <li className="flex items-center text-slate-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            Validación de palabras reservadas
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-midnight-800 pb-2">3. Código Intermedio (IR)</h2>
                    <p className="text-slate-400">
                        Generamos una lista lineal de instrucciones simples, independiente del lenguaje de salida.
                    </p>
                    <div className="bg-midnight-900 p-4 rounded-lg border border-midnight-800 font-mono text-sm text-slate-300">
                        [CREATE_OBJ, usuario]<br />
                        [ASSIGN_PROP, usuario.nombre, "Juan"]<br />
                        [ASSIGN_PROP, usuario.edad, 30]
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-200 border-b border-midnight-800 pb-2">4. Optimización</h2>
                    <p className="text-slate-400">
                        Mejoramos el código IR eliminando instrucciones innecesarias.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-red-900/10 border border-red-900/30 p-3 rounded">
                            <strong className="text-red-400 block mb-1">Antes</strong>
                            x = 5 + 3
                        </div>
                        <div className="bg-green-900/10 border border-green-900/30 p-3 rounded">
                            <strong className="text-green-400 block mb-1">Después (Constant Folding)</strong>
                            x = 8
                        </div>
                    </div>
                </section>
            </div>
        )
    },
    {
        id: 'extension-guide',
        title: 'Guía de Extensión',
        icon: <Puzzle className="w-5 h-5" />,
        content: (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Extendiendo el Compilador</h1>
                <p className="text-lg text-slate-400">
                    Pasos para agregar nueva sintaxis o funcionalidades al lenguaje.
                </p>

                <div className="space-y-6">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-4">1</div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-200">Modificar Gramática</h3>
                            <p className="text-slate-400 mt-1">Edita <code className="text-blue-400">src/NaturalToJson.g4</code> para agregar nuevas reglas.</p>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-4">2</div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-200">Regenerar Parser</h3>
                            <p className="text-slate-400 mt-1">Ejecuta el comando de ANTLR para actualizar los archivos en <code className="text-blue-400">src/generated/</code>.</p>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-4">3</div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-200">Actualizar Semántica</h3>
                            <p className="text-slate-400 mt-1">Implementa las validaciones en <code className="text-blue-400">src/lib/SemanticListener.ts</code>.</p>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-4">4</div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-200">Actualizar CodeGen</h3>
                            <p className="text-slate-400 mt-1">Maneja las nuevas instrucciones en <code className="text-blue-400">src/lib/JsonBuilderListener.ts</code>.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-yellow-500">Importante</h4>
                        <p className="text-sm text-yellow-200/70">
                            Siempre agrega tests unitarios en <code className="text-yellow-500">tests/</code> para verificar tu nueva funcionalidad.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'troubleshooting',
        title: 'Solución de Problemas',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: (
            <div className="space-y-8">
                <h1 className="text-4xl font-black text-slate-100 mb-4">Troubleshooting</h1>

                <div className="overflow-hidden rounded-xl border border-midnight-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-midnight-900 text-slate-200">
                            <tr>
                                <th className="p-4 font-bold">Problema</th>
                                <th className="p-4 font-bold">Causa Probable</th>
                                <th className="p-4 font-bold">Solución</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-midnight-800 bg-midnight-900/50">
                            <tr>
                                <td className="p-4 text-red-400 font-medium">Parser no reconoce sintaxis</td>
                                <td className="p-4 text-slate-400">Gramática desactualizada</td>
                                <td className="p-4 text-slate-300">Revisar NaturalToJson.g4</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-red-400 font-medium">Unexpected token</td>
                                <td className="p-4 text-slate-400">Token no definido</td>
                                <td className="p-4 text-slate-300">Agregar token a la gramática</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-red-400 font-medium">Errores de tipo</td>
                                <td className="p-4 text-slate-400">Tabla de símbolos corrupta</td>
                                <td className="p-4 text-slate-300">Reiniciar análisis / Recargar</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-red-400 font-medium">JSON malformado</td>
                                <td className="p-4 text-slate-400">Error en CodeGen</td>
                                <td className="p-4 text-slate-300">Revisar JsonBuilderListener</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
];
