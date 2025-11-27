"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    {
        title: "Bienvenido al Estudio",
        content: "Esta es una herramienta interactiva para aprender cómo funciona un compilador. Escribe comandos en lenguaje natural y ve cómo se transforman en código JSON.",
        target: null
    },
    {
        title: "1. Escribe tu Código",
        content: "Aquí escribes tus instrucciones. Por ejemplo: 'Crear una lista de usuarios con nombre: Juan'.",
        target: "input.nat"
    },
    {
        title: "2. Visualiza los Tokens",
        content: "El compilador primero rompe tu texto en piezas pequeñas llamadas 'Tokens'. Pasa el mouse sobre ellos para ver su relación con el código.",
        target: "Tokens"
    },
    {
        title: "3. Árbol de Análisis",
        content: "Luego, los tokens se organizan en una estructura jerárquica llamada Árbol de Análisis (Parse Tree).",
        target: "Árbol"
    },
    {
        title: "4. Resultado JSON",
        content: "Finalmente, se genera el código JSON resultante listo para ser usado.",
        target: "JSON"
    }
];

export default function WelcomeTour() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Check if user has seen the tour
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            // Use setTimeout to avoid synchronous state update warning
            setTimeout(() => setIsOpen(true), 100);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenTour', 'true');
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsOpen(true);
    };

    if (!isOpen) {
        return (
            <button
                onClick={handleReset}
                className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
                title="Ver Tour"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-midnight-900 border border-midnight-700 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                    >
                        <div className="relative h-32 bg-gradient-to-br from-blue-600 to-purple-600 p-6 flex items-end">
                            <h2 className="text-2xl font-bold text-white mb-1">{steps[currentStep].title}</h2>
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Progress Dots */}
                            <div className="absolute top-4 left-6 flex space-x-1">
                                {steps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep ? 'bg-white' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                {steps[currentStep].content}
                            </p>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={handleClose}
                                    className="text-slate-500 hover:text-slate-300 text-sm font-medium px-4 py-2"
                                >
                                    Saltar
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
                                >
                                    {currentStep === steps.length - 1 ? '¡Empezar!' : 'Siguiente'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
