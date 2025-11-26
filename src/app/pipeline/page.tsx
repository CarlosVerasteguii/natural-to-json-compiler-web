"use client";

import React, { useState } from 'react';
import TokenList from '@/components/Pipeline/TokenList';
import SymbolTableViewer from '@/components/Pipeline/SymbolTableViewer';
import IRViewer from '@/components/Pipeline/IRViewer';
import PipelineFlow from '@/components/Pipeline/PipelineFlow';
import InfoCard from '@/components/Pipeline/InfoCard';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PipelinePage() {
    const [activeTab, setActiveTab] = useState<'tokens' | 'symbols' | 'ir'>('tokens');
    const { compilationResult, applyCodePatch } = useCompiler();

    const tabs = [
        { id: 'tokens', label: '1. Léxico (Tokens)', icon: '🔍' },
        { id: 'symbols', label: '2. Semántico (Símbolos)', icon: '📦' },
        { id: 'ir', label: '3. Intermedio & Opt', icon: '⚙️' },
    ];

    const loadBasicExample = () => {
        const code = `crear objeto persona con nombre: "Juan"
crear objeto config con activo: verdadero
crear lista numeros con elementos 10, 20, 30`;
        applyCodePatch(code);
    };

    const loadOptimizationExample = () => {
        // Usamos propiedades duplicadas en la misma declaración para demostrar
        // cómo el optimizador elimina las asignaciones redundantes.
        const code = `crear objeto jugador con vida: 100, vida: 50, vida: 0
crear objeto config con debug: verdadero, debug: falso`;
        applyCodePatch(code);
    };

    const getInfoCardProps = () => {
        switch (activeTab) {
            case 'tokens':
                return {
                    title: 'Fase 1: Análisis Léxico',
                    description: 'Aquí el compilador lee tu texto y lo rompe en piezas fundamentales llamadas "tokens". Es como identificar las palabras individuales en una oración antes de entender qué significan juntas.',
                    icon: '🔍',
                    color: 'blue'
                };
            case 'symbols':
                return {
                    title: 'Fase 2: Análisis Semántico',
                    description: 'Ahora entendemos el significado. Verificamos que las variables existan, que los tipos de datos sean correctos (no sumar peras con manzanas) y construimos una "Tabla de Símbolos" para recordar todo.',
                    icon: '📦',
                    color: 'green'
                };
            case 'ir':
                return {
                    title: 'Fase 3: Código Intermedio y Generación',
                    description: 'Finalmente, traducimos tu código a un lenguaje universal (IR) y luego generamos el código final (Python/JSON). ¡Aquí es donde ocurre la magia de la traducción!',
                    icon: '⚙️',
                    color: 'purple'
                };
            default:
                return { title: '', description: '', icon: '' };
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950">
            {/* Header / Navigation */}
            <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 backdrop-blur-sm z-20">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold text-white flex items-center">
                        <span className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3 shadow-lg shadow-blue-900/50">PI</span>
                        Pipeline Inspector
                    </h1>

                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'tokens' | 'symbols' | 'ir')}
                                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab.id
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activePipelineTab"
                                        className="absolute inset-0 bg-slate-800 rounded-md shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center">
                                    <span className="mr-2 opacity-70">{tab.icon}</span>
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pipeline Flow Visualization */}
            <div className="bg-slate-950/80 border-b border-slate-800/50">
                <PipelineFlow currentStep={activeTab} />
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto relative p-6">
                <div className="max-w-7xl mx-auto">
                    {!compilationResult ? (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 mx-auto shadow-2xl shadow-blue-900/20">
                                    <span className="text-4xl">⚡</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Esperando Código</h3>
                                <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                                    El pipeline está vacío. Escribe código en el Studio o carga un ejemplo para ver cómo funciona el compilador paso a paso.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={loadBasicExample}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-600/40 flex items-center gap-2"
                                    >
                                        <span>✨</span>
                                        Ejemplo Básico
                                    </button>
                                    <button
                                        onClick={loadOptimizationExample}
                                        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 flex items-center gap-2"
                                    >
                                        <span>🚀</span>
                                        Demo Optimización
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <InfoCard {...getInfoCardProps()} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden min-h-[500px]"
                                >
                                    {activeTab === 'tokens' && <TokenList />}
                                    {activeTab === 'symbols' && <SymbolTableViewer />}
                                    {activeTab === 'ir' && <IRViewer />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
