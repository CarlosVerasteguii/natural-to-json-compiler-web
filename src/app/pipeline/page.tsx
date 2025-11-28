"use client";

import React, { useState } from 'react';
import TokenList from '@/components/Pipeline/TokenList';
import SymbolTableViewer from '@/components/Pipeline/SymbolTableViewer';
import IRViewer from '@/components/Pipeline/IRViewer'; // Keeping this for backward compatibility or as part of Optimization view if needed
import PipelineFlow from '@/components/Pipeline/PipelineFlow';
import InfoCard from '@/components/Pipeline/InfoCard';
import ParserViewer from '@/components/Pipeline/ParserViewer';
import SemanticViewer from '@/components/Pipeline/SemanticViewer';
import OptimizationViewer from '@/components/Pipeline/OptimizationViewer';
import CodeGenViewer from '@/components/Pipeline/CodeGenViewer';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PIPELINE_EXAMPLES } from '@/data/pipelineExamples';

export default function PipelinePage() {
    const [activeTab, setActiveTab] = useState<'tokens' | 'parser' | 'semantic' | 'symbols' | 'optimization' | 'codegen'>('tokens');
    const { compilationResult, applyCodePatch } = useCompiler();

    const tabs = [
        { id: 'tokens', label: '1. Lexer', icon: '🔍' },
        { id: 'parser', label: '2. Parser', icon: '🌳' },
        { id: 'semantic', label: '3. Semántica', icon: '🧠' },
        { id: 'symbols', label: '4. Símbolos', icon: '📦' },
        { id: 'optimization', label: '5. Optimización', icon: '⚡' },
        { id: 'codegen', label: '6. Código', icon: '⚙️' },
    ];

    const getInfoCardProps = () => {
        switch (activeTab) {
            case 'tokens':
                return {
                    title: 'Fase 1: Análisis Léxico',
                    description: 'El compilador descompone tu texto en "tokens" fundamentales. Es como identificar palabras individuales en una oración antes de entender su significado.',
                    icon: '🔍',
                    color: 'blue'
                };
            case 'parser':
                return {
                    title: 'Fase 2: Análisis Sintáctico',
                    description: 'Organiza los tokens en una estructura jerárquica (Árbol de Sintaxis Abstracta o AST) que representa la gramática y lógica del programa.',
                    icon: '🌳',
                    color: 'indigo'
                };
            case 'semantic':
                return {
                    title: 'Fase 3: Análisis Semántico',
                    description: 'Verifica que el programa tenga sentido: tipos de datos correctos, variables declaradas y reglas de alcance.',
                    icon: '🧠',
                    color: 'pink'
                };
            case 'symbols':
                return {
                    title: 'Fase 4: Tabla de Símbolos',
                    description: 'Una base de datos viva que rastrea todas las variables, objetos y sus atributos durante la compilación.',
                    icon: '📦',
                    color: 'yellow'
                };
            case 'optimization':
                return {
                    title: 'Fase 5: Optimización',
                    description: 'Mejora el código intermedio (RI) eliminando redundancias y cálculos innecesarios para hacerlo más eficiente.',
                    icon: '⚡',
                    color: 'cyan'
                };
            case 'codegen':
                return {
                    title: 'Fase 6: Generación de Código',
                    description: 'Traduce la representación interna optimizada al formato de salida final (JSON en este caso).',
                    icon: '⚙️',
                    color: 'green'
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

                    <div className="flex bg-midnight-950 p-1.5 rounded-lg border border-midnight-800 overflow-x-auto no-scrollbar gap-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`relative px-6 py-2.5 text-sm font-medium rounded-md transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
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
                                <span className="relative z-10 flex items-center gap-3">
                                    <span className="opacity-70 text-lg">{tab.icon}</span>
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Example Loader (Header) */}
                    <div className="ml-4 relative group">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-midnight-800 hover:bg-midnight-700 text-slate-300 rounded-lg border border-midnight-700 text-xs font-medium transition-colors">
                            <span>📚</span>
                            <span>Cargar Ejemplo</span>
                        </button>
                        <div className="absolute right-0 top-full pt-2 w-64 hidden group-hover:block z-50">
                            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                                {PIPELINE_EXAMPLES.map((ex) => (
                                    <button
                                        key={ex.id}
                                        onClick={() => applyCodePatch(ex.code)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
                                    >
                                        <div className="flex items-center gap-2 text-slate-200 font-bold text-xs mb-0.5">
                                            <span>{ex.icon}</span>
                                            {ex.label}
                                        </div>
                                        <div className="text-[10px] text-slate-500 line-clamp-1">{ex.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pipeline Flow Visualization */}
            <div className="bg-midnight-950 border-b border-midnight-800/50 py-4">
                <PipelineFlow currentStep={activeTab} />
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto relative p-6 bg-midnight-950">
                <div className="max-w-7xl mx-auto h-full">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                                    {PIPELINE_EXAMPLES.map((example) => (
                                        <button
                                            key={example.id}
                                            onClick={() => applyCodePatch(example.code)}
                                            className="bg-midnight-800 hover:bg-midnight-700 text-slate-200 border border-midnight-700 px-4 py-3 rounded-xl text-left transition-all shadow-lg hover:shadow-blue-900/20 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative z-10 flex items-start gap-3">
                                                <span className="text-2xl">{example.icon}</span>
                                                <div>
                                                    <div className="font-bold text-sm text-slate-200 mb-1">{example.label}</div>
                                                    <div className="text-xs text-slate-500 leading-snug">{example.description}</div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="space-y-6 pb-12 h-full flex flex-col">
                            <InfoCard {...getInfoCardProps()} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-midnight-900/50 rounded-xl border border-midnight-800 overflow-hidden flex-grow shadow-xl flex flex-col min-h-[500px]"
                                >
                                    {activeTab === 'tokens' && <TokenList />}
                                    {activeTab === 'parser' && <ParserViewer />}
                                    {activeTab === 'semantic' && <SemanticViewer />}
                                    {activeTab === 'symbols' && <SymbolTableViewer />}
                                    {activeTab === 'optimization' && <OptimizationViewer />}
                                    {activeTab === 'codegen' && <CodeGenViewer />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
