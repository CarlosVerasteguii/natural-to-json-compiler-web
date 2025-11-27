import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDiff } from 'lucide-react';

interface DiffViewerProps {
    original: string;
    modified: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified }) => {
    return (
        <div className="mt-6 bg-slate-950/50 rounded-xl border border-slate-800/50 overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-slate-900/50 border-b border-slate-800/50">
                <FileDiff className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revisión de Cambios</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-0 lg:gap-4 p-4 font-mono text-sm">
                {/* Original (Error) */}
                <div className="group relative">
                    <div className="absolute -top-3 left-2 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] font-bold text-red-400 uppercase tracking-wider">
                        Antes
                    </div>
                    <div className="p-4 rounded-lg bg-red-950/10 border border-red-900/20 text-red-200/80 overflow-x-auto min-h-[80px] transition-colors group-hover:bg-red-950/20">
                        <pre className="whitespace-pre-wrap break-all">{original}</pre>
                    </div>
                </div>

                {/* Arrow Indicator */}
                <div className="flex items-center justify-center py-2 lg:py-0">
                    <div className="p-2 rounded-full bg-slate-800/50 text-slate-500">
                        <ArrowRight className="w-5 h-5 lg:rotate-0 rotate-90" />
                    </div>
                </div>

                {/* Modified (Fix) */}
                <div className="group relative">
                    <div className="absolute -top-3 left-2 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-bold text-green-400 uppercase tracking-wider">
                        Después
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-lg bg-green-950/10 border border-green-900/20 text-green-200 overflow-x-auto min-h-[80px] relative transition-colors group-hover:bg-green-950/20"
                    >
                        <div className="absolute inset-0 bg-green-400/5 animate-pulse rounded-lg pointer-events-none" />
                        <pre className="whitespace-pre-wrap break-all">{modified}</pre>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;
