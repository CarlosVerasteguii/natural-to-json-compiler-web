import React from 'react';
import { useCompiler } from '@/context/CompilerContext';

export default function CodeGenViewer() {
    const { compilationResult } = useCompiler();

    if (!compilationResult) {
        return (
            <div className="p-8 text-center text-slate-500">
                No hay código generado.
            </div>
        );
    }

    const jsonString = compilationResult.output
        ? JSON.stringify(compilationResult.output, null, 2)
        : '// No output generated';

    return (
        <div className="h-full flex flex-col bg-midnight-950">
            <div className="p-4 border-b border-midnight-800 bg-midnight-950/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Código Generado (JSON)</h3>
                <button
                    onClick={() => navigator.clipboard.writeText(jsonString)}
                    className="text-xs bg-midnight-800 hover:bg-midnight-700 text-slate-300 px-3 py-1 rounded border border-midnight-700 transition-colors"
                >
                    Copiar
                </button>
            </div>
            <div className="flex-grow overflow-auto p-0 relative group">
                <pre className="p-6 font-mono text-sm text-green-400 bg-midnight-950 min-h-full">
                    {jsonString}
                </pre>
            </div>
        </div>
    );
}
