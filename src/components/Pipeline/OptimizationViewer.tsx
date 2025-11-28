import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';
import { IRInstruction } from '@/lib/irTypes';

const InstructionList = ({ instructions, title, color }: { instructions: IRInstruction[], title: string, color: string }) => (
    <div className="flex-1 flex flex-col min-h-0">
        <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 text-${color}-400`}>{title}</h4>
        <div className={`flex-grow overflow-auto bg-midnight-950 rounded-lg border border-${color}-900/30 p-2 space-y-1 custom-scrollbar`}>
            {instructions.map((inst, idx) => (
                <div key={idx} className="font-mono text-xs text-slate-400 hover:bg-white/5 p-1.5 rounded flex gap-3">
                    <span className="text-slate-600 w-6 text-right select-none">{idx}</span>
                    <span className={`text-${color}-300 font-bold`}>{inst.opcode}</span>
                    <span className="text-slate-500">
                        {Object.entries(inst)
                            .filter(([k]) => k !== 'opcode')
                            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
                            .join(' ')}
                    </span>
                </div>
            ))}
            {instructions.length === 0 && (
                <div className="text-slate-600 text-center py-8 italic">Sin instrucciones</div>
            )}
        </div>
        <div className="mt-2 text-right text-xs text-slate-500">
            {instructions.length} instrucciones
        </div>
    </div>
);

export default function OptimizationViewer() {
    const { compilationResult } = useCompiler();

    if (!compilationResult) {
        return (
            <div className="p-8 text-center text-slate-500">
                No hay resultados de optimización.
            </div>
        );
    }

    const savedCount = (compilationResult.ir.length || 0) - (compilationResult.optimizedIr.length || 0);
    const percentSaved = compilationResult.ir.length > 0
        ? Math.round((savedCount / compilationResult.ir.length) * 100)
        : 0;

    return (
        <div className="h-full flex flex-col bg-midnight-950">
            <div className="p-4 border-b border-midnight-800 bg-midnight-950/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Optimización de Código Intermedio</h3>
                {savedCount > 0 && (
                    <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <span className="text-green-400 font-bold text-xs">-{savedCount} Instr. ({percentSaved}%)</span>
                    </div>
                )}
            </div>

            <div className="flex-grow p-4 flex gap-4 overflow-hidden">
                <InstructionList
                    instructions={compilationResult.ir || []}
                    title="RI Original (Raw)"
                    color="slate"
                />

                <div className="flex flex-col justify-center items-center text-slate-600">
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        ➜
                    </motion.div>
                </div>

                <InstructionList
                    instructions={compilationResult.optimizedIr || []}
                    title="RI Optimizada"
                    color="blue"
                />
            </div>
        </div>
    );
}
