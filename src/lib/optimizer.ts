import { IRInstruction } from "./irTypes";

type EntityName = string;

const cloneInstruction = (instr: IRInstruction): IRInstruction => {
  return {
    opcode: instr.opcode,
    args: [...instr.args] as typeof instr.args,
  } as IRInstruction;
};

const getEntityName = (instr: IRInstruction): EntityName => {
  return instr.args[0];
};

const removeRedundantSets = (instructions: IRInstruction[]): IRInstruction[] => {
  const lastWrites = new Map<string, number>();

  instructions.forEach((instr, index) => {
    if (instr.opcode === "IR_SET_PROPERTY") {
      const [obj, key] = instr.args;
      lastWrites.set(`${obj}:${key}`, index);
    }
  });

  return instructions.filter((instr, index) => {
    if (instr.opcode !== "IR_SET_PROPERTY") {
      return true;
    }
    const [obj, key] = instr.args;
    const marker = `${obj}:${key}`;
    return lastWrites.get(marker) === index;
  });
};

const groupInstructions = (instructions: IRInstruction[]): IRInstruction[] => {
  const creations: IRInstruction[] = [];
  const operations: IRInstruction[] = [];
  const others: IRInstruction[] = [];

  for (const instr of instructions) {
    if (instr.opcode === "IR_CREATE_OBJECT" || instr.opcode === "IR_CREATE_LIST") {
      creations.push(instr);
    } else if (instr.opcode === "IR_SET_PROPERTY" || instr.opcode === "IR_APPEND_LIST") {
      operations.push(instr);
    } else {
      others.push(instr);
    }
  }

  if (others.length > 0) {
    return instructions;
  }

  const opsByEntity = new Map<EntityName, IRInstruction[]>();
  for (const op of operations) {
    const name = getEntityName(op);
    if (!opsByEntity.has(name)) {
      opsByEntity.set(name, []);
    }
    opsByEntity.get(name)!.push(op);
  }

  const grouped: IRInstruction[] = [];
  const processed = new Set<EntityName>();

  for (const create of creations) {
    const name = getEntityName(create);
    grouped.push(create);
    if (opsByEntity.has(name)) {
      grouped.push(...opsByEntity.get(name)!);
      processed.add(name);
    }
  }

  for (const op of operations) {
    const name = getEntityName(op);
    if (!processed.has(name)) {
      grouped.push(op);
    }
  }

  return grouped;
};

export const optimizeIR = (instructions: IRInstruction[]): IRInstruction[] => {
  if (!instructions.length) {
    return [];
  }

  const cloned = instructions.map(cloneInstruction);
  const withoutRedundancies = removeRedundantSets(cloned);
  return groupInstructions(withoutRedundancies);
};

