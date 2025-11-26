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

    // Simple syntax highlighter
    const highlightJSON = (json: any) => {
        const str = JSON.stringify(json, null, 2);
        return str.split('\n').map((line, i) => {
            // Basic regex to identify parts
            const parts = line.split(/(".*?"|:|\d+|true|false|null)/g).filter(Boolean);

            return (
                <div key={i} className="table-row hover:bg-white/5 transition-colors">
                    <span className="table-cell text-right select-none text-slate-700 pr-4 w-8 text-xs">{i + 1}</span>
                    <span className="table-cell whitespace-pre">
                        {parts.map((part, j) => {
                            let colorClass = 'text-slate-300'; // Default punctuation

                            if (part.startsWith('"')) {
                                if (part.endsWith('":')) {
                                    // Key
                                    colorClass = 'text-blue-300 font-semibold';
                                    // Remove the colon for styling if needed, but keeping it simple
                                    return <span key={j} className={colorClass}>{part}</span>;
                                } else {
                                    // String Value
                                    colorClass = 'text-green-300';
                                }
                            } else if (/^\d+$/.test(part)) {
                                colorClass = 'text-orange-300';
                            } else if (/^(true|false)$/.test(part)) {
                                colorClass = 'text-red-300 font-bold';
                            } else if (part === 'null') {
                                colorClass = 'text-slate-500 italic';
                            }

                            // Special case for keys that might be split by the regex (e.g. "key": )
                            // The regex above keeps the colon separate if not inside quotes, 
                            // but JSON.stringify puts quotes around keys.
                            // Let's refine: simple string match is safer for this basic highlighter.

                            // Actually, a simpler approach for the whole line might be better
                            // but let's stick to a simpler "color the whole line based on content" 
                            // or just color the string literals.

                            return <span key={j} className={colorClass}>{part}</span>;
                        })}
                    </span>
                </div>
            );
        });
    };

    // Better Highlighter using regex on the whole string
    const HighlightedJSON = ({ data }: { data: any }) => {
        const jsonString = JSON.stringify(data, null, 2);

        // Tokenize
        const tokens = jsonString.split(/(".*?"|:|,|\[|\]|\{|\}|true|false|null|\d+)/g).filter(t => t.trim() !== '' || t === ' ');

        // We need to preserve whitespace for indentation
        // Actually, let's just use a dangerousInnerHTML approach with a robust regex replacer
        // It's standard for simple highlighters.

        const html = jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
            let cls = 'text-orange-300'; // number
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'text-blue-300 font-bold'; // key
                } else {
                    cls = 'text-green-300'; // string
                }
            } else if (/true|false/.test(match)) {
                cls = 'text-red-300 font-bold'; // boolean
            } else if (/null/.test(match)) {
                cls = 'text-slate-500 italic'; // null
            }
            return `<span class="${cls}">${match}</span>`;
        });

        return (
            <pre
                className="font-mono text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    };

    return (
        <div className={`flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative group ${embedded ? 'border-0 rounded-none shadow-none bg-transparent' : ''}`}>
            {/* Header */}
            {!embedded && (
                <div className="bg-slate-900/80 backdrop-blur px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        <span className="ml-2 text-xs font-mono text-slate-500">output.json</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-xs flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-all text-slate-400 hover:text-white border border-transparent hover:border-slate-700"
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
            <div className="flex-grow relative overflow-auto custom-scrollbar bg-slate-950 p-4">
                <HighlightedJSON data={compilationResult.output} />
            </div>
        </div>
    );
};

export default JsonViewer;
