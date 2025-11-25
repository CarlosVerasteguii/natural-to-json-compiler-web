"use client";

import React, { useState } from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FileJson, List, Network, BarChart2, Copy, Check } from 'lucide-react';
import JsonViewer from '@/components/Studio/JsonViewer';
import TokensView from '@/components/Studio/TokensView';
import ParseTreeView from '@/components/Studio/ParseTreeView';
import StatsView from '@/components/Studio/StatsView';

type Tab = 'json' | 'tokens' | 'tree' | 'stats';

const OutputPanel = () => {
    const [activeTab, setActiveTab] = useState<Tab>('json');
    const { compilationResult } = useCompiler();

    const tabs = [
        { id: 'json', label: 'JSON', icon: FileJson },
        { id: 'tokens', label: 'Tokens', icon: List },
        { id: 'tree', label: 'Parse Tree', icon: Network },
        { id: 'stats', label: 'Stats', icon: BarChart2 },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Tab Header */}
            <div className="flex items-center px-2 pt-2 border-b border-slate-800 bg-slate-950/50">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-colors flex items-center space-x-2 rounded-t-lg ${activeTab === tab.id
                            ? 'text-blue-400 bg-slate-900/50'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-grow relative overflow-hidden bg-slate-900/30">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        {activeTab === 'json' && <JsonViewer embedded />}
                        {activeTab === 'tokens' && <TokensView />}
                        {activeTab === 'tree' && <ParseTreeView />}
                        {activeTab === 'stats' && <StatsView />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OutputPanel;
