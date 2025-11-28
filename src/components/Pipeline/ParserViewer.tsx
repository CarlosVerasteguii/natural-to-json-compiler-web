import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion } from 'framer-motion';
import { TreeNode } from '@/lib/ParseTreeBuilderListener';

const TreeNodeView = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => {
    const isLeaf = !node.children || node.children.length === 0;

    return (
        <div className="font-mono text-sm">
            <div
                className={`flex items-center py-1 hover:bg-white/5 rounded px-2 transition-colors ${depth > 0 ? 'border-l border-slate-800 ml-4' : ''}`}
            >
                <span className="text-slate-500 mr-2">{depth === 0 ? 'ROOT' : '├─'}</span>
                <span className={`font-bold ${isLeaf ? 'text-green-400' : 'text-blue-400'}`}>
                    {node.type}
                </span>
                {node.text && (
                    <span className="ml-2 text-slate-300 bg-slate-800/50 px-1.5 rounded text-xs">
                        "{node.text}"
                    </span>
                )}
            </div>
            {node.children && node.children.length > 0 && (
                <div className="ml-2">
                    {node.children.map((child, i) => (
                        <TreeNodeView key={i} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function ParserViewer() {
    const { compilationResult } = useCompiler();

    if (!compilationResult?.parseTree) {
        return (
            <div className="p-8 text-center text-slate-500">
                No hay árbol de análisis disponible. Compila el código primero.
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-midnight-800 bg-midnight-950/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Árbol de Sintaxis Abstracta (AST)</h3>
                <div className="text-xs text-slate-500">
                    {/* Stats could go here */}
                </div>
            </div>
            <div className="flex-grow overflow-auto p-6 bg-midnight-950">
                <TreeNodeView node={compilationResult.parseTree} />
            </div>
        </div>
    );
}
