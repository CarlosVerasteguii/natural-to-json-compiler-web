import { describe, it, expect } from 'vitest';
import { optimizeIR } from '@/lib/optimizer';
import { IRInstruction } from '@/lib/irTypes';

describe('Unit 4: Optimization', () => {
    it('should remove redundant SET_PROPERTY instructions (Dead Store Elimination)', () => {
        // user.name = "A"
        // user.name = "B" -> "A" is dead
        const input: IRInstruction[] = [
            { opcode: "IR_CREATE_OBJECT", args: ["user"] },
            { opcode: "IR_SET_PROPERTY", args: ["user", "name", "STRING", "A"] },
            { opcode: "IR_SET_PROPERTY", args: ["user", "name", "STRING", "B"] },
        ];

        const optimized = optimizeIR(input);

        expect(optimized).toHaveLength(2);
        expect(optimized[0].opcode).toBe("IR_CREATE_OBJECT");
        expect(optimized[1].args[3]).toBe("B"); // Should keep the last one
    });

    it('should group instructions by object (Locality)', () => {
        // obj1.create
        // obj2.create
        // obj1.set
        // obj2.set
        // -> Should become: obj1.create, obj1.set, obj2.create, obj2.set
        const input: IRInstruction[] = [
            { opcode: "IR_CREATE_OBJECT", args: ["obj1"] },
            { opcode: "IR_CREATE_OBJECT", args: ["obj2"] },
            { opcode: "IR_SET_PROPERTY", args: ["obj1", "id", "NUMBER", 1] },
            { opcode: "IR_SET_PROPERTY", args: ["obj2", "id", "NUMBER", 2] },
        ];

        const optimized = optimizeIR(input);

        expect(optimized).toHaveLength(4);
        // Check order
        expect(optimized[0].args[0]).toBe("obj1");
        expect(optimized[1].args[0]).toBe("obj1"); // Grouped
        expect(optimized[2].args[0]).toBe("obj2");
        expect(optimized[3].args[0]).toBe("obj2");
    });

    it('should handle mixed optimizations', () => {
        const input: IRInstruction[] = [
            { opcode: "IR_CREATE_OBJECT", args: ["obj1"] },
            { opcode: "IR_SET_PROPERTY", args: ["obj1", "val", "NUMBER", 10] },
            { opcode: "IR_CREATE_OBJECT", args: ["obj2"] },
            { opcode: "IR_SET_PROPERTY", args: ["obj1", "val", "NUMBER", 20] }, // Overwrites 10
        ];

        const optimized = optimizeIR(input);

        // Expected:
        // obj1.create
        // obj1.set(20)
        // obj2.create

        expect(optimized).toHaveLength(3);
        const obj1Instructions = optimized.filter(i => i.args[0] === "obj1");
        expect(obj1Instructions).toHaveLength(2);
        expect(obj1Instructions[1].args[3]).toBe(20);
    });
});
