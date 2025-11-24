# Assignment Context: Producto Integrador (Compiladores 2)

## Overview
This project is the final assignment ("Producto Integrador") for the Compilers 2 course. The goal is to build a complete compiler/translator that includes Semantic Analysis, Intermediate Code Generation, Optimization, and Final Code Generation.

## Requirements
-   **Input**: Natural language commands (e.g., `CREAR OBJETO ...`).
-   **Output**: JSON representation of the objects/lists.
-   **Phases**:
    1.  **Semantic Analysis**: Symbol table, type checking, scope verification.
    2.  **Intermediate Code Generation**: Translation to IR (triples/quadruples).
    3.  **Optimization**: Local/global optimizations (dead code elimination, loop optimization).
    4.  **Final Code Generation**: Translation to target language (JSON in this case).
-   **Documentation**: Technical and User manuals, BNF syntax, semantic rules.
-   **Testing**: Valid and invalid test cases demonstrating all phases.

## Previous Work (Reference)
A previous Python-based implementation exists in `../ProyectoCompiladores2`. We are migrating/reimplementing this as a web application using Next.js and ANTLR4.

## Specific Rules (from previous project)
-   **Keywords**: `CREAR`, `OBJETO`, `LISTA`, `CON`, `ELEMENTOS`.
-   **Types**: `STRING`, `NUMBER`, `BOOLEAN` (`VERDADERO`, `FALSO`).
-   **Semantic Rules**:
    -   `edad` must be a NUMBER.
    -   `activo` must be a BOOLEAN.
    -   No duplicate properties in an object.
    -   Consistent types for duplicate properties (if allowed by grammar but caught by semantics).

## Deliverables
-   Source code.
-   PDF Manuals (Technical & User).
-   Screenshots of execution.
-   GitHub repository with specific structure (`src`, `docs`, `examples`, `tests`).
