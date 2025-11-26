"use client";

import React, { useState } from 'react';
import { useCompiler } from '@/context/CompilerContext';
import { motion, AnimatePresence } from 'framer-motion';

// Extracted TokenItem for individual logic
const TokenItem = ({ token, index, totalTokens, getTokenStyle }: { token: any, index: number, totalTokens: number, getTokenStyle: (t: string) => any }) => {
    const [tooltipAlign, setTooltipAlign] = useState<'left' | 'center' | 'right'>('center');
    const itemRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (itemRef.current && itemRef.current.offsetParent) {
            const parent = itemRef.current.offsetParent as HTMLElement;
            const parentWidth = parent.clientWidth;
            const left = itemRef.current.offsetLeft;
            const width = itemRef.current.offsetWidth;
            const right = left + width;

            // Tooltip width is w-48 (approx 192px). Half is 96px.
            if (left < 100) {
                setTooltipAlign('left');
            } else if (parentWidth - right < 100) {
                setTooltipAlign('right');
            } else {
                setTooltipAlign('center');
            }
        }
    };

    const style = getTokenStyle(token.type);
    const isNearBottom = index > totalTokens - 5 || index > totalTokens * 0.8;

    let alignClass = 'left-1/2 -translate-x-1/2'; // Default center
    if (tooltipAlign === 'left') alignClass = 'left-0 translate-x-0';
    if (tooltipAlign === 'right') alignClass = 'right-0 translate-x-0';

    return (
        <motion.div
            layout
            ref={itemRef}
            onMouseEnter={handleMouseEnter}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="group relative"
        >
            <div className={`
                relative px-2 py-1 rounded border ${style.border} ${style.bg} 
                flex flex-col items-center justify-center min-w-[2.5rem] cursor-help
                transition-all duration-200 hover:scale-105 hover:shadow-lg hover:z-10
            `}>
                <span className={`font-mono text-xs font-medium ${style.color}`}>
                    {token.type === 'WHITESPACE' ? '␣' : token.text}
                </span>
                <span className="text-[8px] uppercase tracking-wider opacity-60 text-slate-400 mt-0.5">
                    {style.label}
                </span>
            </div>

            <div className={`
                absolute ${alignClass} w-48 p-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl 
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50
                ${isNearBottom ? 'bottom-full mb-2' : 'top-full mt-2'}
            `}>
                <div className="text-xs font-bold text-white mb-1">{token.type}</div>
                <div className="text-[10px] text-slate-300 leading-tight">
                    {style.desc}
                </div>
                <div className="mt-1 pt-1 border-t border-slate-800 text-[9px] text-slate-500 font-mono">
                    Línea {token.line}
                </div>
            </div>
        </motion.div>
    );
};

const TokensView = () => {
    const { compilationResult } = useCompiler();
    const [showWhitespace, setShowWhitespace] = useState(false);

    const tokens = compilationResult?.tokens || [];

    if (tokens.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <div className="text-4xl mb-4">🔍</div>
                <p>No tokens generated yet.</p>
            </div>
        );
    }

    // Filter tokens based on whitespace setting
    const visibleTokens = tokens.filter(t =>
        showWhitespace || t.type !== 'WHITESPACE'
    );

    // Helper to get friendly names and colors
    const getTokenStyle = (type: string) => {
        const styles: Record<string, { label: string, color: string, border: string, bg: string, desc: string }> = {
            'CREAR': { label: 'Acción', color: 'text-blue-300', border: 'border-blue-500/50', bg: 'bg-blue-900/40', desc: 'Palabra clave que inicia una acción' },
            'OBJETO': { label: 'Tipo', color: 'text-purple-300', border: 'border-purple-500/50', bg: 'bg-purple-900/40', desc: 'Define qué estamos creando' },
            'LISTA': { label: 'Tipo', color: 'text-purple-300', border: 'border-purple-500/50', bg: 'bg-purple-900/40', desc: 'Define una colección de elementos' },
            'CON': { label: 'Conector', color: 'text-slate-400', border: 'border-slate-600/50', bg: 'bg-slate-800/40', desc: 'Une partes de la instrucción' },
            'AGREGAR': { label: 'Acción', color: 'text-blue-300', border: 'border-blue-500/50', bg: 'bg-blue-900/40', desc: 'Añade elementos a una lista' },
            'A': { label: 'Conector', color: 'text-slate-400', border: 'border-slate-600/50', bg: 'bg-slate-800/40', desc: 'Preposición' },
            'VALOR': { label: 'Propiedad', color: 'text-cyan-300', border: 'border-cyan-500/50', bg: 'bg-cyan-900/40', desc: 'Indica el valor a asignar' },
            'IDENTIFICADOR': { label: 'Nombre', color: 'text-yellow-300', border: 'border-yellow-500/50', bg: 'bg-yellow-900/40', desc: 'Nombre único dado por el usuario' },
            'STRING': { label: 'Texto', color: 'text-green-300', border: 'border-green-500/50', bg: 'bg-green-900/40', desc: 'Valor de texto literal' },
            'NUMBER': { label: 'Número', color: 'text-orange-300', border: 'border-orange-500/50', bg: 'bg-orange-900/40', desc: 'Valor numérico' },
            'BOOLEAN': { label: 'Booleano', color: 'text-red-300', border: 'border-red-500/50', bg: 'bg-red-900/40', desc: 'Valor verdadero o falso' },
            'DOS_PUNTOS': { label: 'Sintaxis', color: 'text-slate-500', border: 'border-slate-700/50', bg: 'bg-slate-900/40', desc: 'Separador' },
            'WHITESPACE': { label: 'Espacio', color: 'text-slate-600', border: 'border-slate-800', bg: 'bg-transparent', desc: 'Espacio en blanco (ignorado)' },
        };

        return styles[type] || { label: type, color: 'text-slate-300', border: 'border-slate-700', bg: 'bg-slate-800', desc: 'Token desconocido' };
    };

    return (
        <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex justify-end px-4 py-2 border-b border-slate-800/50 bg-slate-950/30">
                <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer hover:text-slate-200 transition-colors">
                    <input
                        type="checkbox"
                        checked={showWhitespace}
                        onChange={(e) => setShowWhitespace(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
                    />
                    <span>Mostrar espacios</span>
                </label>
            </div>

            {/* Magnetic Poetry Area */}
            <div className="flex-grow overflow-auto p-4 custom-scrollbar">
                <div className="relative flex flex-wrap gap-2 items-start content-start">
                    <AnimatePresence mode="popLayout">
                        {visibleTokens.map((token, idx) => (
                            <TokenItem
                                key={`${idx}-${token.type}`}
                                token={token}
                                index={idx}
                                totalTokens={visibleTokens.length}
                                getTokenStyle={getTokenStyle}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TokensView;
