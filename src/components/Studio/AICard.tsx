"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, XCircle, Terminal } from 'lucide-react';
import { useCompiler } from '@/context/CompilerContext';
import confetti from 'canvas-confetti';
import DiffViewer from './DiffViewer';

const AICard = () => {
    const { compilationResult, applyCodePatch, sourceCode } = useCompiler();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [streamedResponse, setStreamedResponse] = useState('');
    const [showFixButton, setShowFixButton] = useState(false);
    const [pendingFix, setPendingFix] = useState<string | null>(null);

    // Reset state when errors change
    React.useEffect(() => {
        setIsExpanded(false);
        setStreamedResponse('');
        setShowFixButton(false);
        setPendingFix(null);
    }, [compilationResult?.errors]);

    const handleAskAI = async () => {
        setIsExpanded(true);
        setIsThinking(true);
        setStreamedResponse('');
        setShowFixButton(false);
        setPendingFix(null);

        const errorMsg = compilationResult?.errors?.[0] || "Error desconocido";
        const codeSnippet = sourceCode;

        try {
            const response = await fetch('/api/ai-explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeSnippet, error: errorMsg }),
            });

            const data = await response.json();
            let fullText = "";

            if (response.ok) {
                fullText = data.explanation || "No se pudo generar una explicación.";
                if (data.fixedCode) {
                    setPendingFix(data.fixedCode);
                }
            } else {
                console.warn("AI API Error:", data.error);
                fullText = `Error al consultar IA: ${data.error || "Desconocido"}`;
            }

            setIsThinking(false);

            // Stream the response
            let i = 0;
            const interval = setInterval(() => {
                setStreamedResponse(fullText.substring(0, i));
                i++;
                if (i > fullText.length) {
                    clearInterval(interval);
                    setShowFixButton(true);
                }
            }, 15);

        } catch {
            setIsThinking(false);
            setStreamedResponse("Lo siento, no pude conectar con el asistente inteligente.");
        }
    };

    const handleApplyFix = () => {
        if (pendingFix) {
            applyCodePatch(pendingFix);
            setIsExpanded(false); // Close card on success

            // Trigger confetti celebration
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#3b82f6', '#ffffff']
            });
        } else {
            // Fallback if no fix was returned (should be rare with new prompt)
            alert("La IA no proporcionó un código corregido automáticamente. Por favor revisa la sugerencia.");
        }
    };

    if (!compilationResult?.errors || compilationResult.errors.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            <div className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${isExpanded
                ? 'bg-slate-900/95 border-blue-500/50 shadow-2xl shadow-blue-900/20'
                : 'bg-gradient-to-r from-red-950/90 to-slate-900/90 border-red-500/30 hover:border-red-500/50'
                }`}>

                {/* Background Glow Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="p-6">
                    {!isExpanded ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20 animate-pulse">
                                    <XCircle className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg tracking-tight">Error de Compilación</h3>
                                    <p className="text-red-300/80 text-sm font-mono mt-1 max-w-md truncate">
                                        {compilationResult.errors[0]}
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAskAI}
                                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-bold text-white shadow-lg shadow-blue-900/30 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="relative flex items-center space-x-2">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Reparar con IA</span>
                                </div>
                            </motion.button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-center space-x-3 text-blue-400 pb-4 border-b border-blue-500/10">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-bold tracking-wide text-sm uppercase block text-blue-300">Asistente Inteligente</span>
                                    <span className="text-xs text-slate-500">Análisis y corrección automática</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="min-h-[100px] text-slate-300 leading-relaxed font-medium">
                                {isThinking ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-slate-500">
                                        <div className="relative">
                                            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Terminal className="w-5 h-5 text-blue-500" />
                                            </div>
                                        </div>
                                        <span className="animate-pulse">Analizando estructura del código...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-in fade-in duration-500">
                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-lg text-slate-200 leading-relaxed">{streamedResponse}</p>
                                        </div>

                                        {pendingFix && (
                                            <DiffViewer original={sourceCode} modified={pendingFix} />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <AnimatePresence>
                                {showFixButton && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-800/50"
                                    >
                                        <button
                                            onClick={() => setIsExpanded(false)}
                                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium hover:bg-slate-800/50 rounded-lg"
                                        >
                                            Cancelar
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleApplyFix}
                                            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-green-900/20 flex items-center space-x-2 ring-1 ring-white/10"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Aplicar Corrección</span>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AICard;
