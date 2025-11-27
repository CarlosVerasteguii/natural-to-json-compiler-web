"use client";

import React, { useState } from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

// Better Highlighter using regex on the whole string
const HighlightedJSON = ({ data }: { data: unknown }) => {
    const jsonString = JSON.stringify(data, null, 2);

    if (!jsonString) return <span className="text-slate-500">null</span>;

    const highlighted = jsonString.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
            let cls = 'text-orange-400'; // number
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'text-blue-400'; // key
                } else {
                    cls = 'text-green-400'; // string
                }
            } else if (/true|false/.test(match)) {
                cls = 'text-purple-400'; // boolean
            } else if (/null/.test(match)) {
                cls = 'text-slate-500'; // null
            }
            return `<span class="${cls}">${match}</span>`;
        }
    );

    return (
        <pre
            className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlighted }}
        />
    );
};

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
            <div className="flex flex-col h-full bg-midnight-900/30 rounded-xl border border-midnight-800 border-dashed items-center justify-center text-slate-600">
                <div className="text-4xl mb-4 opacity-50">📄</div>
                <p className="text-sm">El resultado JSON aparecerá aquí</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full bg-midnight-950 rounded-xl overflow-hidden border border-midnight-800 shadow-2xl relative group ${embedded ? 'border-0 rounded-none shadow-none bg-transparent' : ''}`}>
            {/* Header */}
            {!embedded && (
                <div className="bg-midnight-900/80 backdrop-blur px-4 py-2 border-b border-midnight-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        <span className="ml-2 text-xs font-mono text-slate-500">output.json</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-xs flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-midnight-800 transition-all text-slate-400 hover:text-white border border-transparent hover:border-midnight-700"
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.span
                                    key="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="text-green-400 font-bold flex items-center gap-1"
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
                                    Copiar
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="flex-grow relative overflow-auto custom-scrollbar bg-midnight-950 p-4">
                <HighlightedJSON data={compilationResult.output} />
            </div>
        </div>
    );
};

export default JsonViewer;
