"use client";

import React, { useState, useEffect } from 'react';
import { TestExample } from '@/data/testExamples';
import { useCompiler } from '@/context/CompilerContext';
import { analyze } from '@/lib/analyzer';
import { motion, AnimatePresence } from 'framer-motion';

interface TestRunnerProps {
    example: TestExample;
}

const TestRunner = ({ example }: TestRunnerProps) => {
    const { setSourceCode, setCompilationResult } = useCompiler();
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Reset state when example changes
    useEffect(() => {
        setStatus('idle');
        setOutput(null);
        setError(null);
    }, [example]);

    const runTest = async () => {
        setStatus('running');

        try {
            // Small delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const result = analyze(example.code);

            // Update global context
            setSourceCode(example.code);
            setCompilationResult({
                tokens: result.tokens,
                parseTree: {},
                symbolTable: result.symbolTable,
                ir: result.rawIr,
                optimizedIr: result.optimizedIr,
                output: result.json,
                errors: result.errors
            });

            if (example.type === 'valid') {
                if (result.errors.length === 0) {
                    setStatus('success');
                    setOutput(JSON.stringify(result.json, null, 2));
                } else {
                    setStatus('failure');
                    setError("Errores Inesperados:\n" + result.errors.join("\n"));
                }
            } else {
                // Invalid case
                if (result.errors.length > 0) {
                    setStatus('success'); // Success because we expected errors
                    setError("Errores Esperados (Capturados Correctamente):\n" + result.errors.join("\n"));
                } else {
                    setStatus('failure');
                    setOutput(JSON.stringify(result.json, null, 2));
                    setError("Fallo de Prueba: Se esperaban errores pero la compilación fue exitosa.");
                }
            }
        } catch (e) {
            setStatus('failure');
            setError("Error Interno: " + (e as Error).message);
        }
    };

    return (
        <div className="flex-grow flex flex-col h-full bg-slate-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Header */}
            <div className="p-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm z-10">
                <div className="flex justify-between items-start max-w-5xl mx-auto">
                    <div>
                        <motion.h2
                            key={example.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-black text-white mb-2 tracking-tight"
                        >
                            {example.name}
                        </motion.h2>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">{example.description}</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={runTest}
                        disabled={status === 'running'}
                        className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center ${status === 'running'
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30'
                            }`}
                    >
                        {status === 'running' ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Ejecutando...
                            </>
                        ) : (
                            <>
                                <span className="mr-2 text-lg">▶</span> Ejecutar Prueba
                            </>
                        )}
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow p-8 overflow-hidden z-10">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Input */}
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center">
                            <span className="w-2 h-2 bg-slate-600 rounded-full mr-2"></span>
                            Código de Entrada
                        </label>
                        <div className="flex-grow bg-slate-900 rounded-2xl p-6 font-mono text-sm text-slate-300 border border-slate-800 overflow-auto whitespace-pre-wrap shadow-inner custom-scrollbar">
                            {example.code}
                        </div>
                    </div>

                    {/* Output */}
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 transition-colors ${status === 'success' ? 'bg-green-500' :
                                    status === 'failure' ? 'bg-red-500' :
                                        'bg-slate-600'
                                }`}></span>
                            Resultado
                        </label>
                        <div className={`flex-grow rounded-2xl p-6 font-mono text-sm border overflow-auto shadow-inner custom-scrollbar transition-colors duration-500 ${status === 'failure' ? 'bg-red-950/20 border-red-900/30' :
                                status === 'success' ? 'bg-green-950/20 border-green-900/30' :
                                    'bg-slate-900 border-slate-800'
                            }`}>
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-slate-600 italic"
                                    >
                                        <div className="text-4xl mb-4 opacity-50">⚡</div>
                                        <p>Listo para ejecutar</p>
                                    </motion.div>
                                )}
                                {status === 'running' && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-blue-400"
                                    >
                                        <div className="animate-pulse text-lg">Compilando y Verificando...</div>
                                    </motion.div>
                                )}
                                {output && (
                                    <motion.pre
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400"
                                    >
                                        {output}
                                    </motion.pre>
                                )}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        className={status === 'success' ? 'text-green-400' : 'text-red-400'}
                                    >
                                        {status === 'success' && <div className="mb-2 font-bold text-green-500">✅ Prueba Exitosa (Error Esperado)</div>}
                                        {status === 'failure' && <div className="mb-2 font-bold text-red-500">❌ Prueba Fallida</div>}
                                        <div className="whitespace-pre-wrap">{error}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestRunner;
