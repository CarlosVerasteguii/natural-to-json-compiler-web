"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';

const TokensView = () => {
    const { compilationResult } = useCompiler();
    const tokens = compilationResult?.tokens || [];

    if (tokens.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <p>No tokens generated yet.</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto custom-scrollbar p-4">
            <table className="w-full text-left text-sm font-mono border-collapse">
                <thead>
                    <tr className="text-slate-500 border-b border-slate-800">
                        <th className="py-2 px-4">Line</th>
                        <th className="py-2 px-4">Type</th>
                        <th className="py-2 px-4">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map((token, index) => (
                        <tr key={index} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800/50">
                            <td className="py-2 px-4 text-slate-600 w-16">{token.line}</td>
                            <td className="py-2 px-4 text-blue-400 font-bold">{token.type}</td>
                            <td className="py-2 px-4 text-slate-300 break-all">
                                <span className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                                    {token.text}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TokensView;
