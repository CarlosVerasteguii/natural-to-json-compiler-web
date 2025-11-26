"use client";

import React, { useState } from 'react';
import { TestExample } from '@/data/testExamples';
import { useCompiler } from '@/context/CompilerContext';
import { analyze } from '@/lib/analyzer';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, AlertCircle, CheckCircle2, XCircle, Code2, FileJson } from 'lucide-react';
import { TreeNode } from '@/lib/ParseTreeBuilderListener';
import { SymbolEntry } from '@/lib/SymbolTable';

interface TestRunnerProps {
    example: TestExample;
}

const TestRunner = ({ example }: TestRunnerProps) => {
    const { setSourceCode, setCompilationResult } = useCompiler();
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle');
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const runTest = async () => {
        setStatus('running');
        setOutput(null);
        setError(null);

        try {
            // Cinematic delay for effect
            await new Promise(resolve => setTimeout(resolve, 800));

            const result = analyze(example.code);

            // Update global context
            setSourceCode(example.code);
            setCompilationResult({
                tokens: result.tokens,
                parseTree: result.parseTree as TreeNode,
                symbolTable: result.symbolTable as Record<string, SymbolEntry>,
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
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            {/* Header */}
            <div className="p-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm z-10 flex justify-between items-center">
                <div>
                    <motion.div
                        key={example.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-3 mb-2"
                    >
                        <div className={`p-2 rounded-lg ${example.type === 'valid' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {example.type === 'valid' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">
                            {example.name}
                        </h2>
                    </motion.div>
                    <p className="text-slate-400 text-sm max-w-2xl leading-relaxed pl-1">{example.description}</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={runTest}
                    disabled={status === 'running'}
                    className={`
                        px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center space-x-3
                        ${status === 'running'
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-500/50'
                        }
                    `}
                >
                    {status === 'running' ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Ejecutando...</span>
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5 fill-current" />
                            <span className="tracking-wide">EJECUTAR PRUEBA</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* Content Area */}
            <div className="flex-grow p-6 overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Input Panel */}
                <div className="flex flex-col h-full bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl group hover:border-slate-700 transition-colors">
                    <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/50 flex items-center space-x-2">
                        <Code2 className="w-4 h-4 text-slate-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Código Fuente</span>
                    </div>
                    <div className="flex-grow p-6 font-mono text-sm text-slate-300 overflow-auto custom-scrollbar relative">
                        <div className="absolute top-0 left-0 w-8 h-full bg-slate-900/50 border-r border-slate-800/50 flex flex-col items-center pt-6 text-slate-700 select-none text-xs font-mono">
                            {example.code.split('\n').map((_, i) => <div key={i} className="mb-0.5">{i + 1}</div>)}
                        </div>
                        <pre className="pl-10 whitespace-pre-wrap leading-relaxed">
                            {example.code}
                        </pre>
                    </div>
                </div>

                {/* Output Panel */}
                <div className="flex flex-col h-full bg-black/40 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative">
                    <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Terminal className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consola de Salida</span>
                        </div>
                        {status !== 'idle' && (
                            <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                status === 'failure' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' :
                                    status === 'failure' ? 'bg-red-500' :
                                        'bg-blue-500 animate-pulse'
                                    }`} />
                                <span>{status === 'running' ? 'Procesando' : status === 'success' ? 'Completado' : 'Fallido'}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-grow p-6 font-mono text-sm overflow-auto custom-scrollbar relative">
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-700"
                                >
                                    <Terminal className="w-16 h-16 mb-4 opacity-20" />
                                    <p className="text-sm font-medium">Esperando ejecución...</p>
                                </motion.div>
                            )}

                            {status === 'running' && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                >
                                    <div className="relative w-20 h-20">
                                        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                    <p className="mt-6 text-blue-400 font-mono text-xs animate-pulse">COMPILANDO CÓDIGO...</p>
                                </motion.div>
                            )}

                            {(output || error) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full"
                                >
                                    {status === 'success' && (
                                        <div className="mb-6 p-4 bg-green-500/5 border border-green-500/20 rounded-xl flex items-center space-x-4">
                                            <div className="p-2 bg-green-500/10 rounded-full text-green-400">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-green-400 font-bold text-sm">Prueba Exitosa</h4>
                                                <p className="text-green-500/60 text-xs">El resultado coincide con lo esperado.</p>
                                            </div>
                                        </div>
                                    )}

                                    {status === 'failure' && (
                                        <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center space-x-4">
                                            <div className="p-2 bg-red-500/10 rounded-full text-red-400">
                                                <XCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-red-400 font-bold text-sm">Prueba Fallida</h4>
                                                <p className="text-red-500/60 text-xs">Se encontraron errores inesperados.</p>
                                            </div>
                                        </div>
                                    )}

                                    {output && (
                                        <div className="space-y-2">
                                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center">
                                                <FileJson className="w-3 h-3 mr-2" /> Output JSON
                                            </div>
                                            <pre className="text-green-400 bg-slate-900/50 p-4 rounded-lg border border-slate-800/50 overflow-x-auto">
                                                {output}
                                            </pre>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="space-y-2 mt-4">
                                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center">
                                                <AlertCircle className="w-3 h-3 mr-2" /> Detalles del Reporte
                                            </div>
                                            <pre className={`p-4 rounded-lg border overflow-x-auto ${status === 'success' ? 'text-slate-300 bg-slate-900/50 border-slate-800' : 'text-red-400 bg-red-950/10 border-red-900/20'
                                                }`}>
                                                {error}
                                            </pre>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestRunner;
