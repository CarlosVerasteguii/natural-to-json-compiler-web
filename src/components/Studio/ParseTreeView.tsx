"use client";

import React, { useState } from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Circle, Box, AlertOctagon } from 'lucide-react';

interface TreeNodeData {
    name: string;
    type: string;
    children?: TreeNodeData[];
    text?: string;
}

interface TreeNodeProps {
    node: TreeNodeData;
    depth?: number;
}

const TreeNode = ({ node, depth = 0 }: TreeNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const getIcon = () => {
        if (node.type === 'error') return <AlertOctagon className="w-3 h-3 text-red-500" />;
        if (node.type === 'terminal') return <Circle className="w-3 h-3 text-green-500" />;
        return <Box className="w-3 h-3 text-blue-500" />;
    };

    return (
        <div className="select-none">
            <div
                className={`flex items-center py-1 px-2 hover:bg-slate-800/50 rounded cursor-pointer transition-colors ${depth === 0 ? 'bg-slate-900/30 mb-1' : ''
                    }`}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="mr-1 w-4 h-4 flex items-center justify-center text-slate-500">
                    {hasChildren && (
                        isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
                    )}
                </div>
                <div className="mr-2">{getIcon()}</div>
                <span className={`text-sm font-mono ${node.type === 'rule' ? 'text-slate-300 font-bold' : 'text-slate-400'}`}>
                    {node.name}
                </span>
                {node.text && (
                    <span className="ml-2 text-xs text-slate-500 bg-slate-950 px-1 rounded border border-slate-800">
                        {node.text}
                    </span>
                )}
            </div>
            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        {node.children?.map((child: TreeNodeData, index: number) => (
                            <TreeNode key={index} node={child} depth={depth + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ParseTreeView = () => {
    const { compilationResult } = useCompiler();
    const tree = compilationResult?.parseTree;

    if (!tree) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <p>No parse tree available.</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto custom-scrollbar p-4">
            <TreeNode node={tree as TreeNodeData} />
        </div>
    );
};

export default ParseTreeView;
