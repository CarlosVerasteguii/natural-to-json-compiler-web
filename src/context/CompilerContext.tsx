"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IRInstruction } from '@/lib/irTypes';
import { TokenInfo } from '@/lib/analyzer';
import { TreeNode } from '@/lib/ParseTreeBuilderListener';
import { SymbolEntry } from '@/lib/SymbolTable';

// Define the shape of our compilation result
// This will expand as we integrate the actual compiler
export interface CompilationResult {
    tokens: TokenInfo[];
    parseTree: TreeNode | null; // Or string representation
    symbolTable: Record<string, SymbolEntry>;
    ir: IRInstruction[];
    optimizedIr: IRInstruction[];
    output: unknown; // The final JSON
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
    applyCodePatch: (newCode: string) => void;
    runCompilation: (codeToCompile?: string) => Promise<void>;
}

const CompilerContext = createContext<CompilerContextType | undefined>(undefined);

import { analyze } from '@/lib/analyzer';

export const CompilerProvider = ({ children }: { children: ReactNode }) => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
    const [isCompiling, setIsCompiling] = useState(false);

    const runCompilation = async (codeToCompile?: string) => {
        const code = codeToCompile ?? sourceCode;
        setIsCompiling(true);

        try {
            // Small delay to allow UI to update and show animation
            await new Promise(resolve => setTimeout(resolve, 600));

            const result = analyze(code);

            setCompilationResult({
                tokens: result.tokens,
                parseTree: result.parseTree as TreeNode,
                symbolTable: result.symbolTable as Record<string, SymbolEntry>,
                ir: result.rawIr,
                optimizedIr: result.optimizedIr,
                output: result.json,
                errors: result.errors,
                stats: result.stats
            });
        } catch (e) {
            console.error("Compilation failed:", e);
            setCompilationResult({
                tokens: [],
                parseTree: null,
                symbolTable: {},
                ir: [],
                optimizedIr: [],
                output: null,
                errors: ["Internal Compiler Error: " + (e as Error).message],
                stats: { executionTime: 0, tokenCount: 0, errorCount: 1, instructionCount: 0 }
            });
        } finally {
            setIsCompiling(false);
        }
    };

    const applyCodePatch = (newCode: string) => {
        setSourceCode(newCode);
        // Automatically re-compile with the new code
        runCompilation(newCode);
    };

    return (
        <CompilerContext.Provider
            value={{
                sourceCode,
                setSourceCode,
                compilationResult,
                setCompilationResult,
                isCompiling,
                setIsCompiling,
                applyCodePatch,
                runCompilation
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
