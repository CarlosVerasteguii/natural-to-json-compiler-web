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
        { id: 'tokens', label: '1. Análisis Léxico', icon: '🔍' },
        { id: 'symbols', label: '2. Semántica y Símbolos', icon: '📦' },
        { id: 'ir', label: '3. RI y Optimización', icon: '⚙️' },
    ];

    const loadBasicExample = () => {
        const code = `crear objeto persona con nombre: "Juan"
crear objeto config con activo: verdadero
crear lista numeros con elementos 10, 20, 30`;
        applyCodePatch(code);
    };

    const loadOptimizationExample = () => {
        const code = `crear objeto jugador con vida: 100, vida: 50, vida: 0
crear objeto config con debug: verdadero, debug: falso`;
        applyCodePatch(code);
    };

    const getInfoCardProps = () => {
        switch (activeTab) {
            case 'tokens':
                return {
                    title: 'Fase 1: Análisis Léxico',
                    description: 'El compilador descompone tu texto en "tokens" fundamentales. Es como identificar palabras individuales en una oración antes de entender su significado.',
                    icon: '🔍',
                    color: 'blue'
                };
            case 'symbols':
                return {
                    title: 'Fase 2: Análisis Semántico',
                    description: 'Verificamos el significado, la existencia de variables, validamos tipos y construimos la Tabla de Símbolos para rastrear todo.',
                    icon: '📦',
                    color: 'green'
                };
            case 'ir':
                return {
                    title: 'Fase 3: Representación Intermedia (RI)',
                    description: 'Traduciendo código a una RI universal, optimizándolo y generando la salida final (Python/JSON).',
                    icon: '⚙️',
                    color: 'purple'
                };
            default:
                return { title: '', description: '', icon: '' };
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-midnight-950">
            {/* Sub-header / Navigation */}
            <div className="bg-midnight-900/50 border-b border-midnight-800 px-6 py-3 backdrop-blur-sm z-20">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h1 className="text-lg font-bold text-slate-200">Inspector de Tubería</h1>
                    </div>

                    <div className="flex bg-midnight-950 p-1 rounded-lg border border-midnight-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'tokens' | 'symbols' | 'ir')}
                                className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === tab.id
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activePipelineTab"
                                        className="absolute inset-0 bg-midnight-800 rounded-md shadow-sm border border-midnight-700"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="opacity-70">{tab.icon}</span>
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pipeline Flow Visualization */}
            <div className="bg-midnight-950 border-b border-midnight-800/50 py-4">
                <PipelineFlow currentStep={activeTab} />
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto relative p-6 bg-midnight-950">
                <div className="max-w-7xl mx-auto">
                    {!compilationResult ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 bg-midnight-900 rounded-2xl flex items-center justify-center mb-6 border border-midnight-800 mx-auto shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="text-4xl relative z-10">⚡</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-200 mb-3">Esperando Código</h3>
                                <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed text-sm">
                                    La tubería está vacía. Escribe código en el Estudio o carga un ejemplo para visualizar el proceso de compilación.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={loadBasicExample}
                                        className="bg-midnight-800 hover:bg-midnight-700 text-slate-200 border border-midnight-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg hover:shadow-blue-900/20 flex items-center gap-2"
                                    >
                                        <span>✨</span>
                                        Ejemplo Básico
                                    </button>
                                    <button
                                        onClick={loadOptimizationExample}
                                        className="bg-midnight-800 hover:bg-midnight-700 text-slate-200 border border-midnight-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg hover:shadow-purple-900/20 flex items-center gap-2"
                                    >
                                        <span>🚀</span>
                                        Demo de Optimización
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-6 pb-12">
                            <InfoCard {...getInfoCardProps()} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-midnight-900/50 rounded-xl border border-midnight-800 overflow-hidden min-h-[500px] shadow-xl"
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
