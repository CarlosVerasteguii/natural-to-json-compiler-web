"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';

const SymbolTableViewer = () => {
    const { compilationResult } = useCompiler();
    const symbols = compilationResult?.symbolTable ? Object.values(compilationResult.symbolTable) : [];

    if (symbols.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <div className="text-4xl mb-4">📦</div>
                <p>La tabla de símbolos está vacía.</p>
            </div>
        );
    }

    const getEntityStyle = (kind: string) => {
        if (kind === 'objeto') return {
            bg: 'bg-blue-900/20',
            border: 'border-blue-500/30',
            text: 'text-blue-300',
            icon: '📦',
            label: 'Objeto'
        };
        if (kind === 'lista') return {
            bg: 'bg-purple-900/20',
            border: 'border-purple-500/30',
            text: 'text-purple-300',
            icon: '📑',
            label: 'Lista'
        };
        return {
            bg: 'bg-slate-800',
            border: 'border-slate-700',
            text: 'text-slate-300',
            icon: '❓',
            label: kind
        };
    };

    const renderMetadata = (meta: Record<string, unknown>) => {
        if (!meta || Object.keys(meta).length === 0) {
            return <span className="text-slate-600 italic text-xs">Sin propiedades definidas</span>;
        }

        return (
            <div className="grid grid-cols-1 gap-1">
                {Object.entries(meta).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50">
                        <span className="text-slate-300 font-medium">{key}</span>
                        <span className={`font-mono text-[10px] px-1.5 rounded ${value === 'NUMBER' ? 'bg-orange-900/30 text-orange-300' :
                            value === 'STRING' ? 'bg-green-900/30 text-green-300' :
                                value === 'BOOLEAN' ? 'bg-red-900/30 text-red-300' :
                                    'bg-slate-800 text-slate-400'
                            }`}>
                            {String(value)}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="h-full p-6 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symbols.map((sym, idx) => {
                    const style = getEntityStyle(sym.tipo_entidad);
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`
                                relative overflow-hidden rounded-xl border ${style.border} ${style.bg}
                                hover:shadow-lg hover:shadow-blue-900/10 transition-all group
                            `}
                        >
                            {/* Card Header */}
                            <div className="px-4 py-3 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/30">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{style.icon}</span>
                                    <div>
                                        <h3 className={`font-bold ${style.text}`}>{sym.nombre}</h3>
                                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                                            {style.label}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 font-mono">
                                        L{sym.linea}:C{sym.columna}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body (Metadata) */}
                            <div className="p-4">
                                <h4 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                                    Propiedades & Tipos
                                </h4>
                                {renderMetadata(sym.metadatos)}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default SymbolTableViewer;
