"use client";

import React from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { Clock, FileText, AlertTriangle, Zap } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: { bg: string; text: string; border: string; glow: string };
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
    <div className={`
        relative overflow-hidden bg-midnight-950 border ${color.border} p-5 rounded-2xl 
        flex items-center space-x-5 group hover:shadow-lg transition-all duration-300
    `}>
        {/* Glow Effect */}
        <div className={`absolute -right-6 -top-6 w-24 h-24 ${color.glow} opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity`} />

        <div className={`p-3.5 rounded-xl bg-opacity-10 ${color.bg} ${color.text} relative z-10`}>
            <Icon className="w-6 h-6" />
        </div>
        <div className="relative z-10">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">{label}</p>
            <p className="text-2xl font-mono text-white font-bold tracking-tight">{value}</p>
        </div>
    </div>
);

const StatsView = () => {
    const { compilationResult } = useCompiler();
    const stats = compilationResult?.stats;

    if (!stats) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <p>No hay estadísticas disponibles.</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto custom-scrollbar p-6">
            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    icon={Clock}
                    label="Tiempo de Ejecución"
                    value={`${stats.executionTime.toFixed(2)}ms`}
                    color={{ bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'bg-blue-500' }}
                />
                <StatCard
                    icon={FileText}
                    label="Tokens Totales"
                    value={stats.tokenCount}
                    color={{ bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/20', glow: 'bg-purple-500' }}
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Errores"
                    value={stats.errorCount}
                    color={{ bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/20', glow: 'bg-red-500' }}
                />
                <StatCard
                    icon={Zap}
                    label="Instrucciones IR"
                    value={stats.instructionCount}
                    color={{ bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/20', glow: 'bg-yellow-500' }}
                />
            </div>

            {/* Detailed Breakdown */}
            <div className="mt-8 bg-midnight-900/30 border border-midnight-800/50 rounded-2xl p-6">
                <h3 className="text-slate-400 font-bold mb-6 text-sm uppercase tracking-wider">Análisis de Rendimiento</h3>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Análisis Léxico y Sintáctico</span>
                            <span className="text-blue-400">40%</span>
                        </div>
                        <div className="h-2 bg-midnight-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[40%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Optimización IR</span>
                            <span className="text-purple-400">35%</span>
                        </div>
                        <div className="h-2 bg-midnight-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[35%] shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Generación de Código</span>
                            <span className="text-green-400">25%</span>
                        </div>
                        <div className="h-2 bg-midnight-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[25%] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsView;
