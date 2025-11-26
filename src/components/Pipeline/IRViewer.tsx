"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';
import { IRInstruction } from '@/lib/irTypes';

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

    const rawIR = compilationResult.ir;
    const optimizedIR = compilationResult.optimizedIr || [];
    const isIdentical = JSON.stringify(rawIR) === JSON.stringify(optimizedIR);

    // Helper to determine card style based on Opcode
    const getOpcodeStyle = (opcode: string) => {
        if (opcode.includes('CREATE_OBJECT')) return { border: 'border-l-blue-500', bg: 'bg-blue-900/20', text: 'text-blue-300', icon: '📦' };
        if (opcode.includes('CREATE_LIST')) return { border: 'border-l-purple-500', bg: 'bg-purple-900/20', text: 'text-purple-300', icon: '📑' };
        if (opcode.includes('SET_PROPERTY')) return { border: 'border-l-cyan-500', bg: 'bg-cyan-900/20', text: 'text-cyan-300', icon: '✏️' };
        if (opcode.includes('APPEND')) return { border: 'border-l-orange-500', bg: 'bg-orange-900/20', text: 'text-orange-300', icon: '➕' };
        return { border: 'border-l-slate-500', bg: 'bg-slate-800', text: 'text-slate-300', icon: '🔧' };
    };

    const formatArg = (arg: any) => {
        if (typeof arg === 'string') return <span className="text-green-400">"{arg}"</span>;
        if (typeof arg === 'number') return <span className="text-orange-400">{arg}</span>;
        if (typeof arg === 'boolean') return <span className="text-red-400">{arg ? 'verdadero' : 'falso'}</span>;
        return <span className="text-slate-400">{JSON.stringify(arg)}</span>;
    };

    const InstructionCard = ({ instr, idx }: { instr: IRInstruction, idx: number }) => {
        const style = getOpcodeStyle(instr.opcode);
        return (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`
                    relative mb-3 p-3 rounded-r-lg rounded-l-sm border-l-4 ${style.border} ${style.bg}
                    hover:brightness-110 transition-all cursor-default group
                `}
            >
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                        <span className={`text-xs font-bold ${style.text}`}>{instr.opcode}</span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 text-xs text-slate-500 transition-opacity">
                        {style.icon}
                    </span>
                </div>
                <div className="font-mono text-xs text-slate-300 pl-6 break-all">
                    {instr.args.map((arg, i) => (
                        <span key={i}>
                            {i > 0 && <span className="text-slate-600 mr-1">,</span>}
                            {formatArg(arg)}
                        </span>
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Raw IR Column */}
            <div className="flex flex-col h-full bg-slate-950/30">
                <div className="p-4 border-b border-slate-800/50 bg-slate-900/20">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                        Raw IR (Original)
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Traducción directa del código fuente.</p>
                </div>
                <div className="flex-grow overflow-auto p-4 custom-scrollbar">
                    {rawIR.map((instr, idx) => (
                        <InstructionCard key={`raw-${idx}`} instr={instr} idx={idx} />
                    ))}
                </div>
            </div>

            {/* Optimized IR Column */}
            <div className="flex flex-col h-full bg-slate-950/30 relative">
                <div className="p-4 border-b border-slate-800/50 bg-slate-900/20">
                    <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Optimized IR (Final)
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Código limpio y eficiente listo para generar.</p>
                </div>

                <div className="flex-grow overflow-auto p-4 custom-scrollbar relative">
                    {isIdentical ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-green-900/10 border border-green-500/20 rounded-2xl p-6 max-w-sm"
                            >
                                <div className="text-4xl mb-3">✨</div>
                                <h4 className="text-green-400 font-bold mb-2">¡Código Eficiente!</h4>
                                <p className="text-sm text-slate-400">
                                    El optimizador no encontró instrucciones redundantes para eliminar. Tu código original ya es óptimo.
                                </p>
                            </motion.div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 px-2 py-1 bg-green-900/20 border border-green-500/20 rounded text-xs text-green-400 text-center">
                                ✂️ Se eliminaron {rawIR.length - optimizedIR.length} instrucciones redundantes
                            </div>
                            {optimizedIR.map((instr, idx) => (
                                <InstructionCard key={`opt-${idx}`} instr={instr} idx={idx} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IRViewer;
