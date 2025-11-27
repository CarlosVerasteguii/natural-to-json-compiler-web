"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ConceptStepper from '@/components/Learning/ConceptStepper';
import Glossary from '@/components/Learning/Glossary';

export default function LearningPage() {
    return (
        <div className="min-h-screen bg-midnight-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-midnight-900 via-midnight-950 to-midnight-950">
            <div className="max-w-6xl mx-auto p-8 space-y-20 pb-20">

                {/* Hero Section */}
                <div className="text-center space-y-6 pt-10">
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x pb-2 tracking-tight">
                        Centro de Aprendizaje
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Descubre la magia detrás del compilador. Entiende cómo transformamos el lenguaje natural en datos estructurados paso a paso.
                    </p>

                    <div className="pt-4">
                        <Link
                            href="/?tutorial=true"
                            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 group"
                        >
                            <span>Iniciar Tutorial Interactivo</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Interactive Stepper Section */}
                <section>
                    <div className="flex items-center mb-8">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/30 mr-4 border border-blue-500/20">1</div>
                        <h2 className="text-3xl font-bold text-slate-100">Proceso de Compilación</h2>
                    </div>
                    <ConceptStepper />
                </section>

                {/* Glossary Section */}
                <section>
                    <div className="flex items-center mb-8">
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/30 mr-4 border border-purple-500/20">2</div>
                        <h2 className="text-3xl font-bold text-slate-100">Glosario Técnico</h2>
                    </div>
                    <Glossary />
                </section>

            </div>
        </div>
    );
}
