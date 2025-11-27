"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
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
    hoveredToken: TokenInfo | null;
    setHoveredToken: (token: TokenInfo | null) => void;
}

const CompilerContext = createContext<CompilerContextType | undefined>(undefined);

import { analyze } from '@/lib/analyzer';

export const CompilerProvider = ({ children }: { children: ReactNode }) => {
    const [sourceCode, setSourceCode] = useState<string>(`CREAR OBJETO usuario CON
    nombre: "Juan",
    edad: 25,
    activo: VERDADERO`);
    const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
    const [isCompiling, setIsCompiling] = useState(false);

    const [hoveredToken, setHoveredToken] = useState<TokenInfo | null>(null);

    const runCompilation = useCallback(async (codeToCompile?: string) => {
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
    }, [sourceCode]);

    const applyCodePatch = useCallback((newCode: string) => {
        setSourceCode(newCode);
        // Automatically re-compile with the new code
        // We can't call runCompilation directly here if it depends on the updated sourceCode state immediately
        // But since we pass newCode explicitly to runCompilation (if we modify it to accept it), it works.
        // Actually runCompilation takes an argument.

        // However, runCompilation depends on sourceCode. If we call it here, we should pass newCode.
        // But runCompilation is memoized on sourceCode. 
        // If we call it inside this callback, we need to make sure we don't create a circular dependency or stale closure issues.
        // Ideally applyCodePatch shouldn't depend on runCompilation if runCompilation depends on sourceCode.
        // But let's look at runCompilation signature: async (codeToCompile?: string)

        // If we pass newCode, it uses that instead of sourceCode.
        // So we can just call it. But we need to add runCompilation to dependency list.
        runCompilation(newCode);
    }, [runCompilation]);

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
                runCompilation,
                hoveredToken,
                setHoveredToken
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
