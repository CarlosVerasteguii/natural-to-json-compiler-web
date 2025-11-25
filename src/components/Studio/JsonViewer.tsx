"use client";

import React, { useState } from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

interface JsonViewerProps {
    embedded?: boolean;
}

const JsonViewer = ({ embedded = false }: JsonViewerProps) => {
    const { compilationResult } = useCompiler();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (compilationResult?.output) {
            navigator.clipboard.writeText(JSON.stringify(compilationResult.output, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!compilationResult?.output) {
        return (
            <div className="flex flex-col h-full bg-slate-900/30 rounded-xl border border-slate-800 border-dashed items-center justify-center text-slate-600">
                <div className="text-4xl mb-4 opacity-50">📄</div>
                <p className="text-sm">El resultado JSON aparecerá aquí</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative group ${embedded ? 'border-0 rounded-none shadow-none bg-transparent' : ''}`}>
            {/* Header */}
            {!embedded && (
                <div className="bg-slate-950/80 backdrop-blur px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">output.json</span>
                    <button
                        onClick={handleCopy}
                        className="text-xs flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-800 transition-colors text-blue-400"
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.span
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="text-green-400 font-bold"
                                >
                                    ✓ Copiado
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="copy"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    Copiar JSON
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="flex-grow relative overflow-hidden bg-slate-950">
                <pre className="absolute inset-0 w-full h-full p-4 font-mono text-sm overflow-auto custom-scrollbar text-green-400 selection:bg-green-900/30">
                    {JSON.stringify(compilationResult.output, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default JsonViewer;
