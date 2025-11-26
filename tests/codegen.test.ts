import { describe, it, expect } from 'vitest';
import { generatePythonFromIR } from '@/lib/codegen';
import { IRInstruction } from '@/lib/irTypes';

describe('Unit 3: Code Generation (Python)', () => {
    it('should generate empty object creation', () => {
        const ir: IRInstruction[] = [
            { opcode: "IR_CREATE_OBJECT", args: ["data"] }
        ];
        const code = generatePythonFromIR(ir);
        expect(code).toContain('data = {}');
    });

    it('should generate property assignments with correct types', () => {
        const ir: IRInstruction[] = [
            { opcode: "IR_CREATE_OBJECT", args: ["user"] },
            { opcode: "IR_SET_PROPERTY", args: ["user", "name", "STRING", "Alice"] },
            { opcode: "IR_SET_PROPERTY", args: ["user", "age", "NUMBER", 30] },
            { opcode: "IR_SET_PROPERTY", args: ["user", "is_admin", "BOOLEAN", true] },
        ];
        const code = generatePythonFromIR(ir);

        expect(code).toContain('user = {}');
        expect(code).toContain('user["name"] = \'Alice\'');
        expect(code).toContain('user["age"] = 30');
        expect(code).toContain('user["is_admin"] = True'); // Python boolean
    });

    it('should generate list operations', () => {
        const ir: IRInstruction[] = [
            { opcode: "IR_CREATE_LIST", args: ["items"] },
            { opcode: "IR_APPEND_LIST", args: ["items", "STRING", "A"] },
            { opcode: "IR_APPEND_LIST", args: ["items", "NUMBER", 1] },
        ];
        const code = generatePythonFromIR(ir);

        expect(code).toContain('items = []');
        expect(code).toContain('items.append(\'A\')');
        expect(code).toContain('items.append(1)');
    });

    it('should escape strings correctly', () => {
        const ir: IRInstruction[] = [
            { opcode: "IR_CREATE_OBJECT", args: ["msg"] },
            { opcode: "IR_SET_PROPERTY", args: ["msg", "text", "STRING", "It's a test"] },
        ];
        const code = generatePythonFromIR(ir);

        expect(code).toContain("msg[\"text\"] = 'It\\'s a test'");
    });
});
