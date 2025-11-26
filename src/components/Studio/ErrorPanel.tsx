"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';
import AICard from '@/components/Studio/AICard';

const ErrorPanel = () => {
    const { compilationResult } = useCompiler();
    const errors = compilationResult?.errors || [];

    return (
        <div className="mt-4">
            <AnimatePresence>
                {errors.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <AICard />

                        {/* Fallback list for multiple errors (optional, hidden if AICard handles the main one) */}
                        {errors.length > 1 && (
                            <div className="mt-2 p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
                                <h4 className="text-red-400 text-xs font-bold uppercase mb-2">Otros Errores ({errors.length - 1})</h4>
                                <ul className="space-y-1">
                                    {errors.slice(1).map((error, index) => (
                                        <li key={index} className="text-red-300/70 text-xs font-mono pl-2 border-l-2 border-red-900">
                                            {error}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ErrorPanel;
