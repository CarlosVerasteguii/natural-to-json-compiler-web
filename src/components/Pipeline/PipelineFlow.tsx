import React from 'react';
import { motion } from 'framer-motion';

interface PipelineFlowProps {
    currentStep: 'tokens' | 'symbols' | 'ir';
}

export default function PipelineFlow({ currentStep }: PipelineFlowProps) {
    const steps = [
        { id: 'source', label: 'Texto', icon: '📝' },
        { id: 'tokens', label: 'Tokens', icon: '🔍' },
        { id: 'symbols', label: 'Símbolos', icon: '📦' },
        { id: 'ir', label: 'IR & Código', icon: '⚙️' },
    ];

    // Map current tab to step index (0-indexed)
    // source is always 0 (completed)
    // tokens -> 1
    // symbols -> 2
    // ir -> 3
    const activeIndex = currentStep === 'tokens' ? 1 : currentStep === 'symbols' ? 2 : 3;

    return (
        <div className="w-full py-8 px-4">
            <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                {/* Connecting Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800/50 -translate-y-1/2 rounded-full" />

                {/* Connecting Line Progress */}
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Steps */}
                {steps.map((step, index) => {
                    const isActive = index === activeIndex;
                    const isCompleted = index <= activeIndex;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center group cursor-default">
                            <motion.div
                                className={`
                                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    backdrop-blur-sm
                                    ${isCompleted
                                        ? 'bg-slate-900/80 border-transparent text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                                        : 'bg-slate-950 border-slate-800 text-slate-600'
                                    }
                                `}
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    borderColor: isCompleted ? (isActive ? '#60a5fa' : '#3b82f6') : '#1e293b'
                                }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeStepGlow"
                                        className="absolute inset-0 rounded-full bg-blue-500/20"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, scale: 1.5 }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                                    />
                                )}
                                <span className="text-xl relative z-10">{step.icon}</span>
                            </motion.div>
                            <span className={`
                                mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300
                                ${isCompleted ? 'text-blue-400' : 'text-slate-600'}
                                ${isActive ? 'text-blue-300 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]' : ''}
                            `}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
