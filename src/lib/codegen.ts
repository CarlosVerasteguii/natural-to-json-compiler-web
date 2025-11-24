import { IRInstruction } from "./irTypes";
import { LiteralValue, ValueTypeTag } from "./valueUtils";

const escapePythonString = (value: string): string => {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
};

const formatValue = (value: LiteralValue, tipo: ValueTypeTag): string => {
  if (tipo === "STRING") {
    const safe = typeof value === "string" ? value : "";
    return `'${escapePythonString(safe)}'`;
  }
  if (tipo === "BOOLEAN") {
    return value ? "True" : "False";
  }
  if (tipo === "NUMBER") {
    return value !== null ? String(value) : "0";
  }
  return "None";
};

export const generatePythonFromIR = (ir: IRInstruction[]): string => {
  const lines: string[] = ["# --- Codigo Generado ---"];

  for (const instr of ir) {
    switch (instr.opcode) {
      case "IR_CREATE_OBJECT": {
        const [name] = instr.args;
        lines.push(`${name} = {}`);
        break;
      }
      case "IR_SET_PROPERTY": {
        const [name, key, tipo, value] = instr.args;
        const literal = formatValue(value, tipo);
        lines.push(`${name}["${key}"] = ${literal}`);
        break;
      }
      case "IR_CREATE_LIST": {
        const [name] = instr.args;
        lines.push(`${name} = []`);
        break;
      }
      case "IR_APPEND_LIST": {
        const [name, tipo, value] = instr.args;
        const literal = formatValue(value, tipo);
        lines.push(`${name}.append(${literal})`);
        break;
      }
    }
  }

  return lines.join("\n");
};

