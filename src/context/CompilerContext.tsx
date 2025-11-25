"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our compilation result
// This will expand as we integrate the actual compiler
export interface CompilationResult {
    tokens: any[];
    parseTree: any; // Or string representation
    symbolTable: any;
    ir: any[];
    optimizedIr: any[];
    output: any; // The final JSON
    errors: string[];
    stats?: {
        executionTime: number;
        tokenCount: number;
        errorCount: number;
        instructionCount: number;
    };
}

interface CompilerContextType {
    sourceCode: string;
    setSourceCode: (code: string) => void;
    compilationResult: CompilationResult | null;
    setCompilationResult: (result: CompilationResult | null) => void;
    isCompiling: boolean;
    setIsCompiling: (isCompiling: boolean) => void;
}

const CompilerContext = createContext<CompilerContextType | undefined>(undefined);

export const CompilerProvider = ({ children }: { children: ReactNode }) => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
    const [isCompiling, setIsCompiling] = useState(false);

    return (
        <CompilerContext.Provider
            value={{
                sourceCode,
                setSourceCode,
                compilationResult,
                setCompilationResult,
                isCompiling,
                setIsCompiling,
            }}
        >
            {children}
        </CompilerContext.Provider>
    );
};

export const useCompiler = () => {
    const context = useContext(CompilerContext);
    if (context === undefined) {
        throw new Error('useCompiler must be used within a CompilerProvider');
    }
    return context;
};
