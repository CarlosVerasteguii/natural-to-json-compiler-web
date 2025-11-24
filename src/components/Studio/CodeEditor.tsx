"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';

const CodeEditor = () => {
    const { sourceCode, setSourceCode } = useCompiler();

    // Calculate line numbers
    const lineCount = sourceCode.split('\n').length;
    const lines = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative group">
            {/* Header */}
            <div className="bg-slate-950/80 backdrop-blur px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">input.txt</span>
            </div>

            {/* Editor Area */}
            <div className="flex-grow flex relative overflow-hidden">
                {/* Line Numbers */}
                <div className="w-12 bg-slate-950/50 border-r border-slate-800 flex flex-col items-end py-4 pr-3 select-none text-slate-600 font-mono text-sm leading-6">
                    {lines.map(line => (
                        <div key={line}>{line}</div>
                    ))}
                </div>

                {/* Textarea */}
                <textarea
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    className="flex-grow bg-transparent text-slate-200 p-4 font-mono text-sm leading-6 resize-none focus:outline-none custom-scrollbar z-10 relative"
                    placeholder="Escribe tus comandos aquí..."
                    spellCheck={false}
                />

                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </div>
    );
};

export default CodeEditor;
