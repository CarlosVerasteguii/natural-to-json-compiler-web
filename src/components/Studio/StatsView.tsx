"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { Clock, FileText, AlertTriangle, Zap } from 'lucide-react';

const StatsView = () => {
    const { compilationResult } = useCompiler();
    const stats = compilationResult?.stats;

    if (!stats) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <p>No statistics available.</p>
            </div>
        );
    }

    const StatCard = ({ icon: Icon, label, value, color }: any) => (
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-opacity-10 ${color.bg} ${color.text}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold">{label}</p>
                <p className="text-2xl font-mono text-white">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="h-full overflow-auto custom-scrollbar p-6">
            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    icon={Clock}
                    label="Execution Time"
                    value={`${stats.executionTime.toFixed(2)}ms`}
                    color={{ bg: 'bg-blue-500', text: 'text-blue-500' }}
                />
                <StatCard
                    icon={FileText}
                    label="Total Tokens"
                    value={stats.tokenCount}
                    color={{ bg: 'bg-purple-500', text: 'text-purple-500' }}
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Errors Found"
                    value={stats.errorCount}
                    color={{ bg: 'bg-red-500', text: 'text-red-500' }}
                />
                <StatCard
                    icon={Zap}
                    label="IR Instructions"
                    value={stats.instructionCount}
                    color={{ bg: 'bg-yellow-500', text: 'text-yellow-500' }}
                />
            </div>

            {/* Detailed Breakdown could go here */}
            <div className="mt-8">
                <h3 className="text-slate-400 font-bold mb-4">Performance Analysis</h3>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: '100%' }} // Placeholder for actual breakdown
                    />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>Parsing</span>
                    <span>Analysis</span>
                    <span>Optimization</span>
                    <span>Code Gen</span>
                </div>
            </div>
        </div>
    );
};

export default StatsView;
