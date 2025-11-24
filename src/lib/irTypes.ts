import { LiteralValue, ValueTypeTag } from "./valueUtils";

export type IRInstruction =
  | { opcode: "IR_CREATE_OBJECT"; args: [string] }
  | { opcode: "IR_SET_PROPERTY"; args: [string, string, ValueTypeTag, LiteralValue] }
  | { opcode: "IR_CREATE_LIST"; args: [string] }
  | { opcode: "IR_APPEND_LIST"; args: [string, ValueTypeTag, LiteralValue] };

export type IRProgram = IRInstruction[];

