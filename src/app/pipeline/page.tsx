"use client";

import React, { useState } from 'react';
import TokenList from '@/components/Pipeline/TokenList';
import SymbolTableViewer from '@/components/Pipeline/SymbolTableViewer';
import IRViewer from '@/components/Pipeline/IRViewer';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PipelinePage() {
    const [activeTab, setActiveTab] = useState<'tokens' | 'symbols' | 'ir'>('tokens');
    const { compilationResult } = useCompiler();

    const tabs = [
        { id: 'tokens', label: '1. Léxico (Tokens)', icon: '🔍' },
        { id: 'symbols', label: '2. Semántico (Símbolos)', icon: '📦' },
        { id: 'ir', label: '3. Intermedio & Opt', icon: '⚙️' },
    ];

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950">
            {/* Header / Navigation */}
            <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold text-white flex items-center">
                        <span className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3 shadow-lg shadow-blue-900/50">PI</span>
                        Pipeline Inspector
                    </h1>

                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
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

            {/* Content Area */}
            <div className="flex-grow overflow-hidden relative">
                {!compilationResult ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Esperando Compilación</h3>
                        <p className="text-sm max-w-md text-center">
                            Ve al <strong>Studio</strong> y ejecuta el compilador para ver los datos del pipeline aquí.
                        </p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {activeTab === 'tokens' && <TokenList />}
                            {activeTab === 'symbols' && <SymbolTableViewer />}
                            {activeTab === 'ir' && <IRViewer />}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
