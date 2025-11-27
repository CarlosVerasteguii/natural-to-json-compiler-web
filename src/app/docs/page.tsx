"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronRight, ExternalLink } from 'lucide-react';
import { docsData } from './docsData';

export default function DocsPage() {
    const [activeDocId, setActiveDocId] = useState<string>(docsData[0].id);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const activeDoc = docsData.find(d => d.id === activeDocId) || docsData[0];

    const filteredDocs = docsData.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-3.5rem)] bg-midnight-950 overflow-hidden">
            {/* Sidebar */}
            <motion.div
                initial={{ width: 280 }}
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                className="border-r border-midnight-800 bg-midnight-900/50 backdrop-blur-md flex flex-col relative z-20"
            >
                <div className="p-4 border-b border-midnight-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar documentación..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-midnight-950 border border-midnight-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {filteredDocs.map((doc) => (
                        <button
                            key={doc.id}
                            onClick={() => setActiveDocId(doc.id)}
                            className={`
                                w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group hover:translate-x-1
                                ${activeDocId === doc.id
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                    : 'text-slate-400 hover:bg-midnight-800 hover:text-slate-200 border border-transparent'
                                }
                            `}
                        >
                            <span className={`
                                p-1.5 rounded-md transition-colors
                                ${activeDocId === doc.id ? 'bg-blue-500/20 text-blue-400' : 'bg-midnight-800 text-slate-500 group-hover:bg-midnight-700 group-hover:text-slate-300'}
                            `}>
                                {doc.icon}
                            </span>
                            <span>{doc.title}</span>
                            {activeDocId === doc.id && (
                                <motion.div layoutId="active-indicator" className="ml-auto">
                                    <ChevronRight className="w-4 h-4 opacity-50" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-midnight-800 bg-midnight-900/80">
                    <a
                        href="https://github.com/CarlosVerasteguii/natural-to-json-compiler-web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 text-xs text-slate-500 hover:text-blue-400 transition-colors"
                    >
                        <span>Ver en GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col h-full relative overflow-hidden bg-midnight-950">
                {/* Mobile/Toggle Header */}
                <div className="h-12 border-b border-midnight-800 flex items-center px-4 bg-midnight-900/30 backdrop-blur-sm sticky top-0 z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-midnight-800 rounded-lg text-slate-400 transition-colors mr-4"
                    >
                        {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                    <div className="text-sm text-slate-500 breadcrumbs">
                        <span className="opacity-50">Documentación</span>
                        <span className="mx-2">/</span>
                        <span className="text-blue-400 font-medium">{activeDoc.title}</span>
                    </div>
                </div>

                {/* Content Scroll Area */}
                <div className="flex-grow overflow-y-auto custom-scrollbar p-8 lg:p-12 max-w-5xl mx-auto w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDoc.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="prose prose-invert prose-slate max-w-none"
                        >
                            {activeDoc.content}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer for content */}
                    <div className="mt-20 pt-10 border-t border-midnight-800 flex justify-between text-sm text-slate-500">
                        <p>Última actualización: Nov 2025</p>
                        <p>Compilador Natural a JSON v1.0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
