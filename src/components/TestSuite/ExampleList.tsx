"use client";

import React from 'react';
import { testExamples, TestExample } from '@/data/testExamples';
import { motion } from 'framer-motion';

interface ExampleListProps {
    onSelect: (example: TestExample) => void;
    selectedId: string | null;
}

const ExampleList = ({ onSelect, selectedId }: ExampleListProps) => {
    return (
        <div className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Casos de Prueba
                </h2>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto custom-scrollbar flex-grow">
                {testExamples.map((example, idx) => (
                    <motion.button
                        key={example.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => onSelect(example)}
                        className={`w-full text-left p-3 rounded-xl text-sm transition-all border relative overflow-hidden group ${selectedId === example.id
                            ? 'bg-blue-600/10 border-blue-500/50 text-white shadow-lg shadow-blue-900/20'
                            : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-200'
                            }`}
                    >
                        {selectedId === example.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                        )}

                        <div className="flex justify-between items-start mb-1">
                            <div className="font-bold truncate pr-2">{example.name}</div>
                            {example.type === 'valid' ? (
                                <span className="text-[10px] bg-green-900/50 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded">VALID</span>
                            ) : (
                                <span className="text-[10px] bg-red-900/50 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">INVALID</span>
                            )}
                        </div>
                        <div className="text-xs opacity-60 truncate">
                            {example.description}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ExampleList;
