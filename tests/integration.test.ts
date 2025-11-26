import { describe, it, expect } from 'vitest';
import { analyze } from '@/lib/analyzer';

describe('Integration & Edge Cases', () => {
    it('should handle case insensitivity for keywords', () => {
        const input = `
      CREAR OBJETO obj1 CON val:1
      crear objeto obj2 con val:2
      CrEaR ObJeTo obj3 CoN val:3
    `;
        const result = analyze(input);

        expect(result.errors).toHaveLength(0);
        expect(result.json).toHaveProperty('obj1');
        expect(result.json).toHaveProperty('obj2');
        expect(result.json).toHaveProperty('obj3');
    });

    it('should ignore comments and whitespace', () => {
        const input = `
      // Este es un comentario
      crear objeto usuario con
          nombre: "Juan", // Comentario inline
          edad: 30

      // Otro comentario
      crear lista numeros con elementos 1, 2, 3
    `;
        const result = analyze(input);

        expect(result.errors).toHaveLength(0);
        expect(result.json).toEqual({
            usuario: { nombre: "Juan", edad: 30 },
            numeros: [1, 2, 3]
        });
    });

    it('should handle complex mixed programs', () => {
        const input = `
      crear objeto config con debug:verdadero, version:1.5
      crear lista tags con elementos "v1", "stable", "prod"
      crear objeto stats con count:100, active:falso
    `;
        const result = analyze(input);

        expect(result.errors).toHaveLength(0);
        expect(result.json).toEqual({
            config: { debug: true, version: 1.5 },
            tags: ["v1", "stable", "prod"],
            stats: { count: 100, active: false }
        });

        // Verify Python code contains all parts
        expect(result.pythonCode).toContain('config = {}');
        expect(result.pythonCode).toContain('tags = []');
        expect(result.pythonCode).toContain('stats = {}');
    });

    it('should handle mixed types in lists', () => {
        const input = 'crear lista mixta con elementos 1, "dos", verdadero, 4.5';
        const result = analyze(input);

        expect(result.errors).toHaveLength(0);
        expect(result.json).toEqual({
            mixta: [1, "dos", true, 4.5]
        });

        expect(result.pythonCode).toContain('mixta.append(1)');
        expect(result.pythonCode).toContain('mixta.append(\'dos\')');
        expect(result.pythonCode).toContain('mixta.append(True)');
    });
});
