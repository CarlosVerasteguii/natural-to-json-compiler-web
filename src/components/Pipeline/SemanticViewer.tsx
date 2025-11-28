import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';

export default function SemanticViewer() {
    const { compilationResult } = useCompiler();

    if (!compilationResult) {
        return (
            <div className="p-8 text-center text-slate-500">
                No hay resultados de análisis semántico.
            </div>
        );
    }

    const hasErrors = compilationResult.errors.length > 0;

    return (
        <div className="h-full flex flex-col bg-midnight-950">
            <div className="p-4 border-b border-midnight-800 bg-midnight-950/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Análisis Semántico</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${hasErrors ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {hasErrors ? `${compilationResult.errors.length} ERRORES` : 'ANÁLISIS CORRECTO'}
                </div>
            </div>

            <div className="flex-grow overflow-auto p-6 space-y-6">
                {/* Status Card */}
                <div className={`p-6 rounded-xl border ${hasErrors ? 'bg-red-900/10 border-red-500/30' : 'bg-green-900/10 border-green-500/30'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${hasErrors ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {hasErrors ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h4 className={`text-lg font-bold mb-1 ${hasErrors ? 'text-red-400' : 'text-green-400'}`}>
                                {hasErrors ? 'Se encontraron errores semánticos' : 'Semántica Válida'}
                            </h4>
                            <p className="text-slate-400 text-sm">
                                {hasErrors
                                    ? 'El código contiene violaciones a las reglas semánticas (tipos, alcance, etc.).'
                                    : 'Todas las verificaciones de tipos y alcance han pasado exitosamente.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Errors List */}
                {hasErrors && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Detalle de Errores</h4>
                        {compilationResult.errors.map((error, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-red-950/30 border border-red-900/50 p-4 rounded-lg flex items-start gap-3"
                            >
                                <span className="text-red-500 mt-0.5">•</span>
                                <span className="text-red-200 font-mono text-sm">{error}</span>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Checks Summary (Mocked for now as we don't have granular check results in context yet) */}
                {!hasErrors && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-midnight-900/50 p-4 rounded-lg border border-midnight-800">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Verificación de Tipos</div>
                            <div className="flex items-center text-green-400 text-sm font-bold">
                                <span className="mr-2">✓</span> Tipos compatibles
                            </div>
                        </div>
                        <div className="bg-midnight-900/50 p-4 rounded-lg border border-midnight-800">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Resolución de Nombres</div>
                            <div className="flex items-center text-green-400 text-sm font-bold">
                                <span className="mr-2">✓</span> Variables declaradas
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
