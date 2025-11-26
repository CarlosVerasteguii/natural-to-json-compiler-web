"use client";

import React from 'react';
import { testExamples, TestExample } from '@/data/testExamples';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Beaker, ChevronRight } from 'lucide-react';

interface ExampleListProps {
    onSelect: (example: TestExample) => void;
    selectedId: string | null;
}

const ExampleList = ({ onSelect, selectedId }: ExampleListProps) => {
    return (
        <div className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col h-full overflow-hidden relative z-20 shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center space-x-3 mb-1">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
                        <Beaker className="w-5 h-5" />
                    </div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                        Banco de Pruebas
                    </h2>
                </div>
                <p className="text-xs text-slate-500 mt-2 pl-1">
                    Selecciona un caso para validar el compilador.
                </p>
            </div>

            {/* List */}
            <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar flex-grow bg-[url('/grid-pattern.svg')] bg-repeat opacity-100">
                {testExamples.map((example, idx) => {
                    const isSelected = selectedId === example.id;
                    const isValid = example.type === 'valid';

                    return (
                        <motion.button
                            key={example.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            onClick={() => onSelect(example)}
                            className={`
                                w-full text-left p-4 rounded-xl text-sm transition-all duration-300 border relative overflow-hidden group
                                ${isSelected
                                    ? 'bg-slate-900 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                                }
                            `}
                        >
                            {/* Active Indicator Line */}
                            {isSelected && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"
                                />
                            )}

                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <div className={`font-bold truncate pr-2 transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                    {example.name}
                                </div>
                                {isValid ? (
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                )}
                            </div>

                            <div className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3 relative z-10 group-hover:text-slate-400 transition-colors">
                                {example.description}
                            </div>

                            <div className="flex items-center justify-between relative z-10">
                                <span className={`
                                    text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider
                                    ${isValid
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                    }
                                `}>
                                    {isValid ? 'Válido' : 'Error Esp.'}
                                </span>
                                {isSelected && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-blue-400"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Subtle Gradient Background for Selected State */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default ExampleList;
