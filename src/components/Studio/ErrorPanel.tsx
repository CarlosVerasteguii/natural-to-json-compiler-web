"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorPanel = () => {
    const { compilationResult } = useCompiler();

    return (
        <AnimatePresence>
            {compilationResult?.errors && compilationResult.errors.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 20, height: 0 }}
                    className="mt-4"
                >
                    <div className="bg-red-950/30 border border-red-900/50 rounded-xl overflow-hidden shadow-lg shadow-red-900/10 backdrop-blur-sm">
                        <div className="bg-red-900/20 px-4 py-2 border-b border-red-900/30 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                            <span className="font-bold text-red-400 text-xs uppercase tracking-wider">Errores de Compilación</span>
                            <span className="ml-auto bg-red-900/50 text-red-200 text-[10px] px-2 py-0.5 rounded-full">
                                {compilationResult.errors.length}
                            </span>
                        </div>
                        <div className="p-4 max-h-40 overflow-auto custom-scrollbar">
                            <ul className="space-y-2">
                                {compilationResult.errors.map((err, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start text-red-300 text-sm font-mono bg-red-900/10 p-2 rounded border border-red-900/20"
                                    >
                                        <span className="mr-2 text-red-500">✖</span>
                                        {err}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorPanel;
