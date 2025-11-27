"use client";

import React, { useState } from 'react';
import ExampleList from '@/components/TestSuite/ExampleList';
import TestRunner from '@/components/TestSuite/TestRunner';
import { testExamples, TestExample } from '@/data/testExamples';

export default function TestSuitePage() {
    const [selectedExample, setSelectedExample] = useState<TestExample | null>(testExamples[0]);

    return (
        <div className="flex h-[calc(100vh-3.5rem)] bg-midnight-950 overflow-hidden">
            <ExampleList
                onSelect={setSelectedExample}
                selectedId={selectedExample?.id || null}
            />
            {selectedExample ? (
                <TestRunner example={selectedExample} />
            ) : (
                <div className="flex-grow flex items-center justify-center text-slate-500 bg-[url('/grid-pattern.svg')] bg-repeat opacity-50">
                    <div className="text-center">
                        <p className="text-xl font-light mb-2">Selecciona un caso de prueba</p>
                        <p className="text-sm opacity-50">Explora ejemplos válidos e inválidos</p>
                    </div>
                </div>
            )}
        </div>
    );
}
