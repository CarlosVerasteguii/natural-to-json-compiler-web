"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorPanel = () => {
    const { compilationResult, sourceCode } = useCompiler();
    const [aiExplanation, setAiExplanation] = React.useState<string | null>(null);
    const [aiModel, setAiModel] = React.useState<string | null>(null);
    const [loadingAi, setLoadingAi] = React.useState(false);

    // Reset AI explanation when errors change
    React.useEffect(() => {
        setAiExplanation(null);
        setAiModel(null);
    }, [compilationResult?.errors]);

    const handleConsultAI = async () => {
        if (!compilationResult?.errors || compilationResult.errors.length === 0) return;

        setLoadingAi(true);
        setAiExplanation(null);
        setAiModel(null);

        try {
            const res = await fetch('/api/ai-explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: sourceCode,
                    error: compilationResult.errors.join('\n')
                })
            });

            const data = await res.json();
            if (data.error) {
                setAiExplanation(`Error: ${data.error}`);
            } else {
                setAiExplanation(data.explanation);
                if (data.modelUsed) {
                    setAiModel(data.modelUsed);
                }
            }
        } catch (err) {
            setAiExplanation("Error al conectar con el servicio de IA.");
        } finally {
            setLoadingAi(false);
        }
    };

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
                        <div className="bg-red-900/20 px-4 py-2 border-b border-red-900/30 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                                <span className="font-bold text-red-400 text-xs uppercase tracking-wider">Errores de Compilación</span>
                                <span className="ml-2 bg-red-900/50 text-red-200 text-[10px] px-2 py-0.5 rounded-full">
                                    {compilationResult.errors.length}
                                </span>
                            </div>

                            <button
                                onClick={handleConsultAI}
                                disabled={loadingAi}
                                className="flex items-center gap-2 px-3 py-1 rounded-md bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 text-xs font-medium transition-colors border border-purple-500/30 disabled:opacity-50"
                            >
                                {loadingAi ? (
                                    <>
                                        <span className="animate-spin">⏳</span> Analizando...
                                    </>
                                ) : (
                                    <>
                                        <span>🤖</span> Consultar IA
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="p-4 max-h-60 overflow-auto custom-scrollbar">
                            <ul className="space-y-2 mb-4">
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

                            {aiExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pt-4 border-t border-red-900/30"
                                >
                                    <h4 className="text-purple-300 text-xs font-bold uppercase mb-2 flex items-center">
                                        <span className="mr-2">💡</span> Sugerencia de la IA
                                    </h4>
                                    {aiModel && (
                                        <div className="text-[10px] text-purple-400 mb-2 uppercase tracking-wide">
                                            Modelo: <span className="font-mono">{aiModel}</span>
                                        </div>
                                    )}
                                    <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/20 text-purple-200 text-sm whitespace-pre-wrap">
                                        {aiExplanation}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorPanel;
