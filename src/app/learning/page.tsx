"use client";

import React from 'react';
import ConceptStepper from '@/components/Learning/ConceptStepper';
import Glossary from '@/components/Learning/Glossary';

export default function LearningPage() {
    return (
        <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
            <div className="max-w-6xl mx-auto p-8 space-y-20 pb-20">

                {/* Hero Section */}
                <div className="text-center space-y-6 pt-10">
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x pb-2">
                        Centro de Aprendizaje
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Descubre la magia detrás del compilador. Entiende cómo transformamos el lenguaje natural en estructuras de datos estructuradas paso a paso.
                    </p>
                </div>

                {/* Interactive Stepper Section */}
                <section>
                    <div className="flex items-center mb-8">
                        <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50 mr-4">1</div>
                        <h2 className="text-3xl font-bold text-white">Proceso de Compilación</h2>
                    </div>
                    <ConceptStepper />
                </section>

                {/* Glossary Section */}
                <section>
                    <div className="flex items-center mb-8">
                        <div className="bg-purple-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/50 mr-4">2</div>
                        <h2 className="text-3xl font-bold text-white">Glosario Técnico</h2>
                    </div>
                    <Glossary />
                </section>

            </div>
        </div>
    );
}
