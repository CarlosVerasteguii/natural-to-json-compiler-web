"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';

const TokenList = () => {
    const { compilationResult } = useCompiler();

    if (!compilationResult?.tokens || compilationResult.tokens.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <div className="text-4xl mb-4">🔍</div>
                <p>No se han generado tokens.</p>
            </div>
        );
    }

    return (
        <div className="overflow-auto h-full p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {compilationResult.tokens.map((token, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-slate-800 text-slate-500 text-[10px] px-2 py-1 rounded-bl-lg font-mono">
                            L{token.line}
                        </div>

                        <div className="mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${token.type === 'KEYWORD' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
                                    token.type === 'STRING' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
                                        token.type === 'NUMBER' ? 'bg-orange-900/50 text-orange-300 border border-orange-500/30' :
                                            'bg-blue-900/50 text-blue-300 border border-blue-500/30'
                                }`}>
                                {token.type}
                            </span>
                        </div>

                        <div className="font-mono text-white text-lg break-all">
                            {token.text}
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TokenList;
