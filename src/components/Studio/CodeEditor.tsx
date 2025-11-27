"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';


interface CodeEditorProps {
    hasError?: boolean;
}

const CodeEditor = ({ hasError = false }: CodeEditorProps) => {
    const { sourceCode, setSourceCode, hoveredToken } = useCompiler();

    // Calculate line numbers
    const lineCount = sourceCode.split('\n').length;
    const lines = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

    // Render the overlay content with highlighting
    const renderOverlay = () => {
        if (!hoveredToken || !sourceCode) return <span className="opacity-0">{sourceCode}</span>;

        // Ensure indices are within bounds
        const start = hoveredToken.startIndex;
        const stop = hoveredToken.stopIndex + 1; // stopIndex is inclusive in ANTLR

        if (start < 0 || stop > sourceCode.length || start >= stop) {
            return <span className="opacity-0">{sourceCode}</span>;
        }

        const before = sourceCode.slice(0, start);
        const match = sourceCode.slice(start, stop);
        const after = sourceCode.slice(stop);

        return (
            <>
                <span className="opacity-0">{before}</span>
                <span className="bg-yellow-500/40 rounded px-0.5 text-transparent border-b-2 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-200">
                    {match}
                </span>
                <span className="opacity-0">{after}</span>
            </>
        );
    };

    return (
        <div className={`flex flex-col h-full bg-midnight-900/50 rounded-xl overflow-hidden border shadow-2xl transition-all duration-500 backdrop-blur-sm ${hasError
            ? 'border-red-500/50 shadow-red-900/20'
            : 'border-midnight-800 focus-within:border-blue-500/50 focus-within:shadow-blue-900/20'
            }`}>
            {/* Header */}
            <div className="bg-midnight-950/80 backdrop-blur px-4 py-3 border-b border-midnight-800 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">input.nat</span>
            </div>

            {/* Editor Area */}
            <div className="flex-grow flex relative overflow-hidden group">
                {/* Line Numbers */}
                <div className="w-12 bg-midnight-950/30 border-r border-midnight-800 flex flex-col items-end py-4 pr-3 select-none text-slate-600 font-mono text-sm leading-6">
                    {lines.map(line => (
                        <div key={line}>{line}</div>
                    ))}
                </div>

                <div className="relative flex-grow h-full">
                    {/* Highlight Overlay */}
                    <div
                        className="absolute inset-0 p-4 font-mono text-sm leading-6 pointer-events-none whitespace-pre-wrap break-words z-0"
                        aria-hidden="true"
                    >
                        {renderOverlay()}
                    </div>

                    {/* Textarea */}
                    <textarea
                        value={sourceCode}
                        onChange={(e) => setSourceCode(e.target.value)}
                        className="absolute inset-0 w-full h-full bg-transparent text-slate-200 p-4 font-mono text-sm leading-6 resize-none focus:outline-none custom-scrollbar z-10 placeholder-slate-600 whitespace-pre-wrap break-words"
                        placeholder="Escribe tus comandos en lenguaje natural aquí..."
                        spellCheck={false}
                    />
                </div>

                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </div>
    );
};

export default CodeEditor;
