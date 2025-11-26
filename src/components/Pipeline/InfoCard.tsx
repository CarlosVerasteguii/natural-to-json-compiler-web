import React from 'react';
import { motion } from 'framer-motion';

interface InfoCardProps {
    title: string;
    description: string;
    icon: string;
    color?: string;
}

export default function InfoCard({ title, description, icon, color = "blue" }: InfoCardProps) {
    const colorClasses = {
        blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400 shadow-blue-900/10",
        green: "from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400 shadow-green-900/10",
        purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400 shadow-purple-900/10",
        amber: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400 shadow-amber-900/10",
    };

    const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
                relative overflow-hidden rounded-2xl border bg-gradient-to-br ${selectedColor} 
                p-5 mb-6 backdrop-blur-md shadow-lg
            `}
        >
            {/* Subtle Shine Effect */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-5 relative z-10">
                <div className={`
                    p-3.5 rounded-xl bg-slate-950/40 border border-white/5 text-2xl shadow-inner
                    flex items-center justify-center
                `}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
