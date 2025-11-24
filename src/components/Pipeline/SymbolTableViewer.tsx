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

    return (
        <div className="overflow-auto h-full p-6">
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl">
                <table className="min-w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-900/80 backdrop-blur sticky top-0">
                        <tr>
                            <th className="px-6 py-4 font-bold tracking-wider">Nombre</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Tipo</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Categoría</th>
                            <th className="px-6 py-4 font-bold tracking-wider">Valor Actual</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {symbols.map((sym: any, idx) => (
                            <motion.tr
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="hover:bg-slate-800/50 transition-colors group"
                            >
                                <td className="px-6 py-4 font-bold text-white font-mono group-hover:text-blue-400 transition-colors">
                                    {sym.name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded text-xs font-mono">
                                        {sym.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400">
                                    {sym.category}
                                </td>
                                <td className="px-6 py-4 font-mono text-slate-300">
                                    <div className="bg-slate-950 rounded px-2 py-1 inline-block border border-slate-800 max-w-[200px] truncate">
                                        {JSON.stringify(sym.value)}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SymbolTableViewer;
