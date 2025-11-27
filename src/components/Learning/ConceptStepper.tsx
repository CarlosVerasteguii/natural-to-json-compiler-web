"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        id: 'lexer',
        title: '1. Análisis Léxico (Lexer)',
        description: (
            <div className="space-y-4 text-left">
                <div className="mb-4">
                    El <strong>Análisis Léxico</strong> es la primera fase crítica de todo compilador. Imagina que estás leyendo un libro en un idioma que apenas conoces; lo primero que haces es identificar las palabras individuales antes de intentar entender el significado de la oración completa.
                </div>
                <div className="mb-4">
                    El <strong>Lexer</strong> (o escáner) realiza exactamente esta tarea: lee el flujo de caracteres crudos del código fuente (letras, números, símbolos) y los agrupa en unidades coherentes llamadas <strong>Tokens</strong>.
                </div>
                <ul className="list-disc list-inside bg-midnight-900/50 p-4 rounded-lg border border-midnight-800 text-sm mb-4">
                    <li><strong>Eliminación de Ruido:</strong> Ignora espacios en blanco, tabulaciones y comentarios que no afectan la lógica del programa.</li>
                    <li><strong>Clasificación:</strong> Asigna una categoría a cada token (ej. <code>PALABRA_CLAVE</code>, <code>IDENTIFICADOR</code>, <code>LITERAL_STRING</code>).</li>
                    <li><strong>Reporte de Errores:</strong> Detecta caracteres ilegales que no pertenecen al alfabeto del lenguaje.</li>
                </ul>
                <div>
                    En nuestro ejemplo, la secuencia de caracteres <code>C-R-E-A-R</code> se reconoce como un único token de tipo <strong>KEYWORD</strong>. Esto simplifica enormemente el trabajo de las fases siguientes.
                </div>
            </div>
        ),
        visual: (
            <div className="flex flex-col items-center space-y-6 w-full">
                <div className="text-slate-500 text-xs uppercase tracking-widest font-bold font-mono">Entrada (Código Fuente)</div>
                <div className="bg-midnight-950 p-4 rounded-xl border border-midnight-800 shadow-lg flex space-x-1 font-mono text-lg">
                    {['C', 'R', 'E', 'A', 'R', ' ', 'O', 'B', 'J', 'E', 'T', 'O'].map((char, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-8 h-10 flex items-center justify-center rounded-lg border border-transparent ${char === ' ' ? '' : 'bg-midnight-800 text-slate-200 border-midnight-700'}`}
                        >
                            {char}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-blue-500 text-2xl"
                >
                    ⬇
                </motion.div>

                <div className="text-slate-500 text-xs uppercase tracking-widest font-bold font-mono">Salida (Tokens)</div>
                <div className="flex space-x-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: "spring" }}
                        className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-sm"
                    >
                        <div className="text-[10px] text-blue-400 font-bold mb-1 uppercase tracking-wider">Palabra Clave</div>
                        <div className="text-xl text-slate-100 font-mono font-bold">CREAR</div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8, type: "spring" }}
                        className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-sm"
                    >
                        <div className="text-[10px] text-purple-400 font-bold mb-1 uppercase tracking-wider">Palabra Clave</div>
                        <div className="text-xl text-slate-100 font-mono font-bold">OBJETO</div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'parser',
        title: '2. Análisis Sintáctico (Parser)',
        description: (
            <div className="space-y-4 text-left">
                <div className="mb-4">
                    Una vez que tenemos los tokens, necesitamos verificar si están ordenados de una manera que tenga sentido. Aquí entra el <strong>Parser</strong>. Si el Lexer se encarga de la ortografía (palabras válidas), el Parser se encarga de la <strong>gramática</strong> (oraciones válidas).
                </div>
                <div className="mb-4">
                    El Parser toma la lista plana de tokens y construye una estructura jerárquica llamada <strong>Árbol de Sintaxis Abstracta (AST)</strong>. Este árbol representa la estructura lógica del programa.
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 text-sm mb-4">
                    <p className="font-bold text-blue-300 mb-1">¿Por qué un árbol?</p>
                    <p>Porque el código es naturalmente jerárquico. Un <code>Programa</code> contiene <code>Comandos</code>, un <code>Comando</code> contiene <code>Expresiones</code>, y una <code>Expresión</code> puede contener otras sub-expresiones.</p>
                </div>
                <div>
                    Si el Parser encuentra una secuencia inesperada (por ejemplo, <code>CREAR OBJETO :</code> sin un nombre), lanzará un <strong>Error de Sintaxis</strong>, indicando que la estructura no cumple con las reglas gramaticales definidas.
                </div>
            </div>
        ),
        visual: (
            <div className="relative w-full h-80 flex flex-col items-center justify-center">
                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {/* Root to Command */}
                    <motion.path d="M400 40 L400 100" stroke="#334155" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />

                    {/* Command to Children */}
                    <motion.path d="M400 140 L250 200" stroke="#334155" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
                    <motion.path d="M400 140 L400 200" stroke="#334155" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
                    <motion.path d="M400 140 L550 200" stroke="#334155" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
                </svg>

                {/* Level 1: Program */}
                <div className="absolute top-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-800 border-2 border-slate-600 px-6 py-2 rounded-lg text-slate-200 font-bold shadow-xl z-10"
                    >
                        Programa
                    </motion.div>
                </div>

                {/* Level 2: Command */}
                <div className="absolute top-24">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-blue-900/80 border-2 border-blue-500 px-6 py-2 rounded-lg text-blue-100 font-bold shadow-xl z-10"
                    >
                        Comando
                    </motion.div>
                </div>

                {/* Level 3: Tokens/Nodes */}
                <div className="absolute top-48 w-full flex justify-center space-x-16">
                    {/* Node 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <div className="bg-purple-900/60 border border-purple-500/50 px-4 py-2 rounded-lg text-purple-200 font-mono text-sm shadow-lg mb-2">
                            CREAR
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Keyword</span>
                    </motion.div>

                    {/* Node 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="bg-purple-900/60 border border-purple-500/50 px-4 py-2 rounded-lg text-purple-200 font-mono text-sm shadow-lg mb-2">
                            OBJETO
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Keyword</span>
                    </motion.div>

                    {/* Node 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="bg-green-900/60 border border-green-500/50 px-4 py-2 rounded-lg text-green-200 font-mono text-sm shadow-lg mb-2">
                            &quot;usuario&quot;
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Identifier</span>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'semantic',
        title: '3. Análisis Semántico',
        description: (
            <div className="space-y-4 text-left">
                <div className="mb-4">
                    Una oración puede ser gramaticalmente correcta pero no tener sentido. Por ejemplo: &quot;El número 5 se comió una manzana&quot;. Gramaticalmente es válida (Sujeto + Verbo + Predicado), pero semánticamente es absurda (los números no comen).
                </div>
                <div className="mb-4">
                    El <strong>Análisis Semántico</strong> es el guardián de la lógica y el significado. Verifica reglas que la gramática por sí sola no puede capturar:
                </div>
                <ul className="list-disc list-inside bg-midnight-900/50 p-4 rounded-lg border border-midnight-800 text-sm mb-4">
                    <li><strong>Verificación de Tipos:</strong> ¿Estás intentando sumar un número con un texto?</li>
                    <li><strong>Declaración de Variables:</strong> ¿Estás usando una variable que nunca definiste?</li>
                    <li><strong>Alcance (Scope):</strong> ¿Esta variable es visible en esta parte del código?</li>
                </ul>
                <div>
                    En esta fase, el compilador decora el AST con información de tipos y asegura que el programa sea coherente antes de intentar generar código.
                </div>
            </div>
        ),
        visual: (
            <div className="w-full max-w-md bg-midnight-950 rounded-xl border border-midnight-800 overflow-hidden shadow-2xl">
                <div className="bg-midnight-900 px-4 py-2 flex items-center space-x-2 border-b border-midnight-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-xs text-slate-500 ml-2 font-mono">semantic_check.exe</span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 font-mono text-lg">
                        <span className="text-yellow-400">age</span>
                        <span className="text-slate-600">=</span>
                        <span className="text-red-400">&quot;twenty&quot;</span>
                    </div>

                    <div className="h-px bg-midnight-800 w-full"></div>

                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r"
                    >
                        <div className="flex items-center text-red-400 font-bold mb-1 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ERROR DE TIPO
                        </div>
                        <p className="text-red-300/80 text-xs mt-1">
                            Se esperaba <span className="font-mono bg-red-900/30 px-1 rounded text-red-200">NÚMERO</span>, pero se recibió <span className="font-mono bg-red-900/30 px-1 rounded text-red-200">TEXTO</span>.
                        </p>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'symbol-table',
        title: '4. Tabla de Símbolos',
        description: (
            <div className="space-y-4 text-left">
                <div className="mb-4">
                    La <strong>Tabla de Símbolos</strong> es el cerebro o la base de datos del compilador. Es una estructura de datos vital que se mantiene durante todo el proceso de compilación para rastrear todas las entidades definidas por el usuario.
                </div>
                <div className="mb-4">
                    Cada vez que declaras una variable, función o clase, el compilador crea una entrada en esta tabla con metadatos cruciales:
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="bg-midnight-900/50 p-3 rounded border border-midnight-800">
                        <span className="text-blue-400 font-bold block mb-1">Nombre</span>
                        <span className="text-slate-400">El identificador único (ej. &quot;usuario&quot;).</span>
                    </div>
                    <div className="bg-midnight-900/50 p-3 rounded border border-midnight-800">
                        <span className="text-purple-400 font-bold block mb-1">Tipo</span>
                        <span className="text-slate-400">El tipo de dato (Entero, String, Objeto).</span>
                    </div>
                    <div className="bg-midnight-900/50 p-3 rounded border border-midnight-800">
                        <span className="text-green-400 font-bold block mb-1">Valor/Dirección</span>
                        <span className="text-slate-400">Dónde está almacenado en memoria.</span>
                    </div>
                    <div className="bg-midnight-900/50 p-3 rounded border border-midnight-800">
                        <span className="text-yellow-400 font-bold block mb-1">Alcance</span>
                        <span className="text-slate-400">Dónde es visible esta variable.</span>
                    </div>
                </div>
                <div>
                    Sin esta tabla, el compilador olvidaría qué es &quot;x&quot; tan pronto como termine de leer la línea donde se declaró.
                </div>
            </div>
        ),
        visual: (
            <div className="w-full max-w-lg">
                <div className="bg-midnight-900 rounded-t-xl border border-midnight-800 p-4 flex justify-between items-center">
                    <span className="text-slate-300 font-bold font-mono">SYMBOL_TABLE</span>
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    </div>
                </div>
                <div className="bg-midnight-950 border-x border-b border-midnight-800 rounded-b-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-midnight-900/50 text-slate-500 font-mono uppercase text-xs">
                            <tr>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Tipo</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Scope</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-midnight-800 text-slate-300 font-mono">
                            <motion.tr
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                className="hover:bg-midnight-900/30 transition-colors"
                            >
                                <td className="p-4 text-yellow-400">usuario</td>
                                <td className="p-4 text-purple-400">OBJECT</td>
                                <td className="p-4 text-slate-500">ptr:0x1A</td>
                                <td className="p-4 text-blue-400">global</td>
                            </motion.tr>
                            <motion.tr
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                className="hover:bg-midnight-900/30 transition-colors"
                            >
                                <td className="p-4 text-yellow-400">edad</td>
                                <td className="p-4 text-orange-400">NUMBER</td>
                                <td className="p-4 text-green-400">25</td>
                                <td className="p-4 text-blue-400">usuario</td>
                            </motion.tr>
                            <motion.tr
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                className="hover:bg-midnight-900/30 transition-colors"
                            >
                                <td className="p-4 text-yellow-400">activo</td>
                                <td className="p-4 text-red-400">BOOLEAN</td>
                                <td className="p-4 text-green-400">true</td>
                                <td className="p-4 text-blue-400">usuario</td>
                            </motion.tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        id: 'optimization',
        title: '5. Optimización',
        description: (
            <div className="space-y-4 text-left">
                <div className="mb-4">
                    El código generado directamente del parser suele ser ineficiente. La fase de <strong>Optimización</strong> busca mejorar el rendimiento (velocidad o uso de memoria) sin alterar el comportamiento del programa.
                </div>
                <div className="mb-4">
                    Existen muchas técnicas de optimización. Una de las más comunes y fáciles de entender es el <strong>Plegado de Constantes (Constant Folding)</strong>.
                </div>
                <div className="bg-midnight-900/50 p-4 rounded-lg border border-midnight-800 text-sm mb-4">
                    <p className="mb-2">Si escribes:</p>
                    <code className="block bg-midnight-950 p-2 rounded mb-2 text-slate-300">x = 10 * 5 + 2;</code>
                    <p className="mb-2">No tiene sentido que el programa calcule esa multiplicación cada vez que se ejecuta. El compilador inteligente lo pre-calcula:</p>
                    <code className="block bg-midnight-950 p-2 rounded text-green-400">x = 52;</code>
                </div>
                <div>
                    Otras optimizaciones incluyen la eliminación de código muerto (código que nunca se ejecuta) y la optimización de bucles.
                </div>
            </div>
        ),
        visual: (
            <div className="flex items-center space-x-8">
                {/* Before */}
                <div className="flex flex-col items-center space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Antes</span>
                    <div className="bg-midnight-950 p-6 rounded-xl border border-midnight-800 font-mono text-slate-300">
                        <div className="flex space-x-2">
                            <span>x</span>
                            <span>=</span>
                            <span className="text-orange-400">10</span>
                            <span>*</span>
                            <span className="text-orange-400">5</span>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], color: ['#64748b', '#3b82f6', '#64748b'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-2xl text-slate-500"
                >
                    ➜
                </motion.div>

                {/* After */}
                <div className="flex flex-col items-center space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Después</span>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/50 font-mono text-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    >
                        <div className="flex space-x-2">
                            <span>x</span>
                            <span>=</span>
                            <span className="text-green-400 font-bold">50</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'codegen',
        title: '6. Generación de Código',
        description: (
            <div className="space-y-4 text-left">
                <div className="mb-4">
                    La etapa final es la <strong>Generación de Código</strong>. Aquí es donde la representación interna abstracta del compilador se traduce finalmente al lenguaje de destino.
                </div>
                <div className="mb-4">
                    En un compilador tradicional (como GCC o Clang), el destino sería código ensamblador o código máquina binario. En nuestro caso, estamos transpilando a <strong>JSON</strong>.
                </div>
                <ul className="list-disc list-inside bg-midnight-900/50 p-4 rounded-lg border border-midnight-800 text-sm mb-4">
                    <li><strong>Recorrido del Árbol:</strong> Visitamos cada nodo del AST optimizado.</li>
                    <li><strong>Mapeo de Estructuras:</strong> Convertimos nuestros objetos internos en llaves <code>{`{}`}</code> y listas en corchetes <code>[]</code>.</li>
                    <li><strong>Formateo:</strong> Aseguramos que la salida sea texto válido según la especificación JSON (comillas, comas, etc.).</li>
                </ul>
                <div>
                    El resultado es un archivo limpio y listo para ser consumido por cualquier otra aplicación. ¡La magia está completa!
                </div>
            </div>
        ),
        visual: (
            <div className="relative w-full max-w-md">
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="bg-midnight-950 rounded-xl border border-midnight-800 overflow-hidden shadow-2xl"
                >
                    <div className="bg-midnight-900 px-4 py-2 flex justify-between items-center border-b border-midnight-800">
                        <span className="text-xs text-green-400 font-mono font-bold">output.json</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                        </div>
                    </div>
                    <pre className="p-6 font-mono text-sm text-slate-300 overflow-hidden">
                        {`{
  "usuario": {
    "nombre": `}
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                            className="text-green-400"
                        >&quot;Alice&quot;</motion.span>
                        {`,
    "edad": `}
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
                            className="text-orange-400"
                        >25</motion.span>
                        {`,
    "activo": `}
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                            className="text-blue-400"
                        >true</motion.span>
                        {`
  }
}`}
                    </pre>
                </motion.div>

                {/* Floating Particles */}
                <motion.div
                    className="absolute -right-4 -bottom-4 text-4xl opacity-20"
                    animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                >
                    ✨
                </motion.div>
            </div>
        )
    }
];

const ConceptStepper = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="bg-midnight-900/50 rounded-2xl border border-midnight-800 overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Tabs */}
            <div className="flex border-b border-midnight-800 bg-midnight-950/50">
                {steps.map((step, idx) => (
                    <button
                        key={step.id}
                        onClick={() => setCurrentStep(idx)}
                        className={`flex-1 py-4 px-2 text-sm font-medium transition-all relative ${currentStep === idx
                            ? 'text-blue-400'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-midnight-800/50'
                            }`}
                    >
                        <span className="relative z-10">{step.title}</span>
                        {currentStep === idx && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="p-12 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl w-full z-10"
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">{steps[currentStep].title}</h3>
                            <div className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">{steps[currentStep].description}</div>
                        </div>

                        <div className="bg-midnight-950/50 p-12 rounded-3xl border border-midnight-800/50 flex justify-center items-center min-h-[300px] backdrop-blur-sm relative group shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 w-full flex justify-center">
                                {steps[currentStep].visual}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="bg-midnight-950/80 p-6 border-t border-midnight-800 flex justify-between items-center backdrop-blur">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="flex items-center px-6 py-2.5 rounded-full text-slate-400 hover:text-white hover:bg-midnight-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
                >
                    <span className="mr-2 text-lg">←</span> Anterior
                </button>

                <div className="flex space-x-2">
                    {steps.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentStep === idx ? 'bg-blue-500 w-6' : 'bg-midnight-700'}`}
                        ></div>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none text-sm font-medium"
                >
                    Siguiente <span className="ml-2 text-lg">→</span>
                </button>
            </div>
        </div>
    );
};

export default ConceptStepper;
