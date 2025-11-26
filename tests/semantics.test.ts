import { describe, it, expect } from 'vitest';
import { analyze } from '@/lib/analyzer';

describe('Unit 1: Semantic Analysis', () => {
    it('should detect duplicate declarations', () => {
        const input = `
      crear objeto usuario con nombre:"Juan"
      crear objeto usuario con nombre:"Pedro"
    `;
        const result = analyze(input);

        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toContain('ya fue declarado previamente');
    });

    it('should enforce type rules for "edad" (NUMBER)', () => {
        const input = 'crear objeto persona con edad:"veinte"';
        const result = analyze(input);

        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toContain("La propiedad 'edad' debe ser de tipo NUMBER");
    });

    it('should enforce type rules for "activo" (BOOLEAN)', () => {
        const input = 'crear objeto config con activo:123';
        const result = analyze(input);

        expect(result.errors.length).toBeGreaterThan(0);
        expect(result.errors[0]).toContain("La propiedad 'activo' debe ser de tipo BOOLEAN");
    });

    it('should detect reserved words as identifiers', () => {
        const input = 'crear objeto crear con id:1';
        const result = analyze(input);

        expect(result.errors.length).toBeGreaterThan(0);
        // The parser catches this as a syntax error before semantic analysis
        expect(result.errors[0]).toMatch(/Syntax Error|palabra reservada/);
    });

    it('should allow valid types for special properties', () => {
        const input = `
      crear objeto persona con edad:25
      crear objeto config con activo:verdadero
    `;
        const result = analyze(input);
        expect(result.errors).toHaveLength(0);
    });
});
