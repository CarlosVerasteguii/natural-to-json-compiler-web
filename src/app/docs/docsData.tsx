import React from 'react';
import { Book, Cpu, Zap, FileJson, List } from 'lucide-react';

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
    }
];
