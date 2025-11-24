"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        id: 'lexer',
        title: '1. Análisis Léxico (Lexer)',
        description: 'El Lexer lee el flujo de caracteres y los agrupa en unidades significativas llamadas "Tokens". Es como identificar las palabras en una oración.',
        visual: (
            <div className="flex flex-col items-center space-y-6 w-full">
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Entrada (Código Fuente)</div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-lg flex space-x-1 font-mono text-lg">
                    {['C', 'R', 'E', 'A', 'R', ' ', 'O', 'B', 'J', 'E', 'T', 'O'].map((char, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-8 h-10 flex items-center justify-center rounded ${char === ' ' ? '' : 'bg-slate-800 text-slate-200'}`}
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

                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Salida (Tokens)</div>
                <div className="flex space-x-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: "spring" }}
                        className="bg-blue-600/20 border border-blue-500 p-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] backdrop-blur-sm"
                    >
                        <div className="text-xs text-blue-300 font-bold mb-1">KEYWORD</div>
                        <div className="text-xl text-white font-mono">CREAR</div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8, type: "spring" }}
                        className="bg-purple-600/20 border border-purple-500 p-4 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.5)] backdrop-blur-sm"
                    >
                        <div className="text-xs text-purple-300 font-bold mb-1">KEYWORD</div>
                        <div className="text-xl text-white font-mono">OBJETO</div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: 'parser',
        title: '2. Análisis Sintáctico (Parser)',
        description: 'El Parser toma los tokens y construye una estructura jerárquica llamada "Árbol de Sintaxis Abstracta" (AST) basada en las reglas gramaticales.',
        visual: (
            <div className="relative w-full h-64 flex justify-center items-start pt-4">
                {/* Tree Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        d="M300 50 L200 120"
                        stroke="#475569" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.path
                        d="M300 50 L400 120"
                        stroke="#475569" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                    />
                </svg>

                {/* Nodes */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800 border-2 border-slate-600 px-6 py-3 rounded-full text-white font-bold shadow-xl z-10 relative"
                    >
                        Comando
                    </motion.div>
                </div>

                <div className="absolute top-32 left-[30%] -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
                        className="bg-blue-900/80 border border-blue-500 px-4 py-2 rounded-lg text-blue-200 font-mono shadow-lg shadow-blue-900/50"
                    >
                        CREAR
                    </motion.div>
                </div>

                <div className="absolute top-32 left-[70%] -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
                        className="bg-purple-900/80 border border-purple-500 px-4 py-2 rounded-lg text-purple-200 font-mono shadow-lg shadow-purple-900/50"
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
            <div className="w-full max-w-md bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-slate-400 ml-2">semantic_check.exe</span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 font-mono text-lg">
                        <span className="text-yellow-400">edad</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-red-400">"veinte"</span>
                    </div>

                    <div className="h-px bg-slate-800 w-full"></div>

                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r"
                    >
                        <div className="flex items-center text-red-400 font-bold mb-1">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ERROR DE TIPO
                        </div>
                        <p className="text-red-300 text-sm">
                            Se esperaba <span className="font-mono bg-red-900/50 px-1 rounded">NUMBER</span>, pero se recibió <span className="font-mono bg-red-900/50 px-1 rounded">STRING</span>.
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
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                {steps.map((step, idx) => (
                    <button
                        key={step.id}
                        onClick={() => setCurrentStep(idx)}
                        className={`flex-1 py-6 text-sm font-medium transition-all relative ${currentStep === idx
                                ? 'text-blue-400'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                            }`}
                    >
                        <span className="relative z-10">{step.title}</span>
                        {currentStep === idx && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
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
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{steps[currentStep].title}</h3>
                            <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">{steps[currentStep].description}</p>
                        </div>

                        <div className="bg-slate-900/50 p-12 rounded-3xl border border-slate-800/50 flex justify-center items-center min-h-[300px] backdrop-blur-sm relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 w-full flex justify-center">
                                {steps[currentStep].visual}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="bg-slate-900/80 p-6 border-t border-slate-800 flex justify-between items-center backdrop-blur">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="flex items-center px-6 py-3 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <span className="mr-2 text-xl">←</span> Anterior
                </button>

                <div className="flex space-x-2">
                    {steps.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStep === idx ? 'bg-blue-500 w-6' : 'bg-slate-700'}`}
                        ></div>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    Siguiente <span className="ml-2 text-xl">→</span>
                </button>
            </div>
        </div>
    );
};

export default ConceptStepper;
