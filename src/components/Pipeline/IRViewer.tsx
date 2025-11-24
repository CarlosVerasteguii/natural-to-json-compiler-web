"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';

const IRViewer = () => {
    const { compilationResult } = useCompiler();

    if (!compilationResult?.ir || compilationResult.ir.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <div className="text-4xl mb-4">⚙️</div>
                <p>No se ha generado código intermedio (IR).</p>
            </div>
        );
    }

    const renderInstruction = (instr: any, idx: number, isOptimized: boolean) => {
        // Simple heuristic to colorize parts of the instruction string
        // Assuming format like "OPCODE arg1, arg2"
        const str = instr.toString();
        const parts = str.split(' ');
        const opcode = parts[0];
        const args = parts.slice(1).join(' ');

        return (
            <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={`font-mono text-sm mb-1 p-1 rounded flex hover:bg-white/5 ${isOptimized ? 'text-green-300' : 'text-slate-300'}`}
            >
                <span className={`mr-4 select-none w-6 text-right ${isOptimized ? 'text-green-800' : 'text-slate-700'}`}>{idx + 1}.</span>
                <div>
                    <span className={`font-bold ${isOptimized ? 'text-green-400' : 'text-blue-400'}`}>{opcode}</span>
                    <span className="text-slate-500 ml-2">{args}</span>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-6">
            {/* Raw IR */}
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center">
                        <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
                        Raw IR (Código Intermedio)
                    </h3>
                    <span className="text-xs text-slate-600 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        {compilationResult.ir.length} instrucciones
                    </span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl overflow-auto flex-grow border border-slate-800 shadow-inner custom-scrollbar">
                    {compilationResult.ir.map((instr, idx) => renderInstruction(instr, idx, false))}
                </div>
            </div>

            {/* Optimized IR */}
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Optimized IR (Optimizado)
                    </h3>
                    <span className="text-xs text-green-900 bg-green-900/20 px-2 py-1 rounded border border-green-900/30 text-green-400">
                        {compilationResult.optimizedIr?.length || 0} instrucciones
                    </span>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl overflow-auto flex-grow border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)] custom-scrollbar">
                    {compilationResult.optimizedIr && compilationResult.optimizedIr.length > 0 ? (
                        compilationResult.optimizedIr.map((instr, idx) => renderInstruction(instr, idx, true))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-600 italic">
                            <p>Sin optimizaciones aplicadas.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IRViewer;
