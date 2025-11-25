"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const StatusBar = () => {
    const { compilationResult, isCompiling } = useCompiler();
    const stats = compilationResult?.stats;

    return (
        <div className="h-8 bg-slate-950 border-t border-slate-800 flex items-center px-4 justify-between text-xs font-mono select-none">
            {/* Left: Status Indicator */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <AnimatePresence mode="wait">
                        {isCompiling ? (
                            <motion.div
                                key="compiling"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center text-blue-400"
                            >
                                <Activity className="w-3 h-3 mr-1.5 animate-pulse" />
                                <span>COMPILING...</span>
                            </motion.div>
                        ) : compilationResult?.errors && compilationResult.errors.length > 0 ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center text-red-400"
                            >
                                <AlertCircle className="w-3 h-3 mr-1.5" />
                                <span>BUILD FAILED</span>
                            </motion.div>
                        ) : compilationResult?.output ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center text-green-400"
                            >
                                <CheckCircle className="w-3 h-3 mr-1.5" />
                                <span>READY</span>
                            </motion.div>
                        ) : (
                            <div className="flex items-center text-slate-500">
                                <div className="w-2 h-2 rounded-full bg-slate-700 mr-2" />
                                <span>IDLE</span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: Stats */}
            <div className="flex items-center space-x-6 text-slate-400">
                {stats && (
                    <>
                        <div className="flex items-center space-x-1.5" title="Execution Time">
                            <Clock className="w-3 h-3" />
                            <span className={stats.executionTime > 100 ? "text-yellow-400" : "text-slate-300"}>
                                {stats.executionTime.toFixed(2)}ms
                            </span>
                        </div>
                        <div className="flex items-center space-x-1.5" title="Tokens Generated">
                            <FileText className="w-3 h-3" />
                            <span>{stats.tokenCount} tokens</span>
                        </div>
                        {stats.instructionCount > 0 && (
                            <div className="flex items-center space-x-1.5" title="IR Instructions">
                                <span className="font-bold text-[10px] border border-slate-700 px-1 rounded">IR</span>
                                <span>{stats.instructionCount} inst</span>
                            </div>
                        )}
                    </>
                )}
                <div className="text-slate-600 border-l border-slate-800 pl-4">
                    Natural Compiler v2.0
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
