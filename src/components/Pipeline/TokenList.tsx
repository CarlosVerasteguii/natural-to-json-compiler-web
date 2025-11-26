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
                relative px-3 py-1.5 rounded-lg border ${style.border} ${style.bg} 
                flex flex-col items-center justify-center min-w-[3rem] cursor-help
                transition-all duration-200 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:z-10
                backdrop-blur-sm shadow-sm
            `}>
                <span className={`font-mono text-sm font-bold ${style.color} drop-shadow-sm`}>
                    {token.type === 'WHITESPACE' ? '␣' : token.text}
                </span>
                <span className="text-[9px] uppercase tracking-wider opacity-70 text-slate-400 mt-0.5 font-semibold">
                    {style.label}
                </span>
            </div>

            <div className={`
                absolute ${alignClass} w-56 p-3 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl 
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 backdrop-blur-md
                ${isNearBottom ? 'bottom-full mb-3' : 'top-full mt-3'}
            `}>
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded-full">{token.type}</span>
                    <span className="text-[10px] text-slate-500 font-mono">L{token.line}</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                    {style.desc}
                </div>
            </div>
        </motion.div>
    );
};

const TokenList = () => {
    const { compilationResult } = useCompiler();
    const [showWhitespace, setShowWhitespace] = useState(false);

    if (!compilationResult?.tokens || compilationResult.tokens.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <div className="text-4xl mb-4">🔍</div>
                <p>No se han generado tokens.</p>
            </div>
        );
    }

    // Filter tokens based on whitespace setting
    const visibleTokens = compilationResult.tokens.filter(t =>
        showWhitespace || t.type !== 'WHITESPACE'
    );

    // Helper to get friendly names and colors
    const getTokenStyle = (type: string) => {
        const styles: Record<string, { label: string, color: string, border: string, bg: string, desc: string }> = {
            'CREAR': { label: 'Acción', color: 'text-blue-300', border: 'border-blue-500/40', bg: 'bg-blue-900/30', desc: 'Palabra clave que inicia una acción' },
            'OBJETO': { label: 'Tipo', color: 'text-purple-300', border: 'border-purple-500/40', bg: 'bg-purple-900/30', desc: 'Define qué estamos creando' },
            'LISTA': { label: 'Tipo', color: 'text-purple-300', border: 'border-purple-500/40', bg: 'bg-purple-900/30', desc: 'Define una colección de elementos' },
            'CON': { label: 'Conector', color: 'text-slate-400', border: 'border-slate-600/40', bg: 'bg-slate-800/30', desc: 'Une partes de la instrucción' },
            'AGREGAR': { label: 'Acción', color: 'text-blue-300', border: 'border-blue-500/40', bg: 'bg-blue-900/30', desc: 'Añade elementos a una lista' },
            'A': { label: 'Conector', color: 'text-slate-400', border: 'border-slate-600/40', bg: 'bg-slate-800/30', desc: 'Preposición' },
            'VALOR': { label: 'Propiedad', color: 'text-cyan-300', border: 'border-cyan-500/40', bg: 'bg-cyan-900/30', desc: 'Indica el valor a asignar' },
            'IDENTIFICADOR': { label: 'Nombre', color: 'text-yellow-300', border: 'border-yellow-500/40', bg: 'bg-yellow-900/30', desc: 'Nombre único dado por el usuario' },
            'STRING': { label: 'Texto', color: 'text-green-300', border: 'border-green-500/40', bg: 'bg-green-900/30', desc: 'Valor de texto literal' },
            'NUMBER': { label: 'Número', color: 'text-orange-300', border: 'border-orange-500/40', bg: 'bg-orange-900/30', desc: 'Valor numérico' },
            'BOOLEAN': { label: 'Booleano', color: 'text-red-300', border: 'border-red-500/40', bg: 'bg-red-900/30', desc: 'Valor verdadero o falso' },
            'DOS_PUNTOS': { label: 'Sintaxis', color: 'text-slate-500', border: 'border-slate-700/40', bg: 'bg-slate-900/30', desc: 'Separador' },
            'WHITESPACE': { label: 'Espacio', color: 'text-slate-600', border: 'border-slate-800', bg: 'bg-transparent', desc: 'Espacio en blanco (ignorado)' },
        };

        return styles[type] || { label: type, color: 'text-slate-300', border: 'border-slate-700', bg: 'bg-slate-800', desc: 'Token desconocido' };
    };

    return (
        <div className="h-full flex flex-col bg-[url('/grid-pattern.svg')] bg-repeat opacity-100">
            {/* Toolbar */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Vista de Tokens
                </div>
                <label className="flex items-center space-x-3 text-xs text-slate-400 cursor-pointer group">
                    <span className="group-hover:text-slate-200 transition-colors">Mostrar espacios invisibles</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={showWhitespace}
                            onChange={(e) => setShowWhitespace(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                </label>
            </div>

            {/* Magnetic Poetry Area */}
            <div className="flex-grow overflow-auto p-6 custom-scrollbar">
                <div className="relative flex flex-wrap gap-3 items-start content-start">
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

export default TokenList;
