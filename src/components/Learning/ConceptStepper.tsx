"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        id: 'lexer',
        title: '1. Análisis Léxico (Lexer)',
        description: 'El Lexer lee el flujo de caracteres y los agrupa en unidades significativas llamadas "Tokens". Es como identificar palabras en una oración.',
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
        description: 'El Parser toma los tokens y construye una estructura jerárquica llamada "Árbol de Sintaxis Abstracta" (AST) basada en reglas gramaticales.',
        visual: (
            <div className="relative w-full h-64 flex justify-center items-start pt-4">
                {/* Tree Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        d="M300 50 L200 120"
                        stroke="#334155" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.path
                        d="M300 50 L400 120"
                        stroke="#334155" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                    />
                </svg>

                {/* Nodes */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-midnight-800 border border-midnight-700 px-6 py-3 rounded-full text-slate-200 font-bold shadow-xl z-10 relative"
                    >
                        Comando
                    </motion.div>
                </div>

                <div className="absolute top-32 left-[30%] -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
                        className="bg-blue-900/40 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-200 font-mono shadow-lg shadow-blue-900/20"
                    >
                        CREAR
                    </motion.div>
                </div>

                <div className="absolute top-32 left-[70%] -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
                        className="bg-purple-900/40 border border-purple-500/30 px-4 py-2 rounded-lg text-purple-200 font-mono shadow-lg shadow-purple-900/20"
                    >
                        OBJETO
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'semantic',
        title: '3. Análisis Semántico',
        description: 'Verifica errores lógicos que la gramática permite pero el lenguaje prohíbe, como incompatibilidad de tipos o variables no declaradas.',
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
                            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">{steps[currentStep].description}</p>
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
