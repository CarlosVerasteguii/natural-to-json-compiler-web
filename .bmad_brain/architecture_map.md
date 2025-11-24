# Architecture Map: Natural-to-JSON Compiler Web

## Project Overview
A web-based compiler that converts natural language descriptions into JSON, built with Next.js and ANTLR4.

## Technology Stack
- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Compiler Engine**: ANTLR4 (`antlr4ts`)

## Directory Structure
- **`src/app`**: Next.js App Router pages and UI components.
- **`src/lib`**: Core compiler logic and utilities.
    - `analyzer.ts`: Main analysis logic.
    - `codegen.ts`: JSON generation.
    - `optimizer.ts`: IR optimization.
    - `SymbolTable.ts`: Symbol management.
    - `*Listener.ts`: ANTLR parse tree listeners.
- **`src/generated`**: Auto-generated ANTLR4 parser/lexer files.
- **`src/NaturalToJson.g4`**: The grammar definition file.

## Core Data Flow
1.  **Input**: Natural language text.
2.  **Lexing/Parsing**: `NaturalToJsonLexer` / `NaturalToJsonParser` (ANTLR).
3.  **Semantic Analysis**: `SemanticListener` validates rules.
4.  **IR Generation**: `IRBuilderListener` creates Intermediate Representation.
5.  **Optimization**: `optimizer.ts` refines the IR.
6.  **Code Generation**: `codegen.ts` produces the final JSON.

## "Untouchable" Files (unless necessary)
- `src/generated/*`: Do not edit manually; regenerate using ANTLR.
- `package-lock.json`: Managed by npm.
