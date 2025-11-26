import { describe, it, expect } from 'vitest';
import { analyze } from '@/lib/analyzer';

describe('Compiler Core - Analyzer', () => {
    it('should compile a simple object creation', () => {
        const input = 'crear objeto usuario con id:1';
        const result = analyze(input);

        expect(result.errors).toHaveLength(0);
        expect(result.json).toEqual({ usuario: { id: 1 } });
        expect(result.symbolTable).toHaveProperty('usuario');
    });

    it('should detect syntax errors', () => {
        const input = 'crear objeto'; // Missing name and properties
        const result = analyze(input);

        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toContain('Syntax Error');
    });

    it('should generate Python code', () => {
        const input = 'crear objeto config con activo:verdadero';
        const result = analyze(input);

        expect(result.errors).toHaveLength(0);
        expect(result.pythonCode).toContain('config = {}');
        expect(result.pythonCode).toContain('config["activo"] = True');
    });
});
