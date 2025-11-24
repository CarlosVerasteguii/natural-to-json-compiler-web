import { ValorContext } from "../generated/NaturalToJsonParser";

export type ValueTypeTag = "STRING" | "NUMBER" | "BOOLEAN" | "UNKNOWN";
export type LiteralValue = string | number | boolean | null;

const INT_RADIX = 10;

const parseStringLiteral = (raw: string | undefined): string => {
  if (!raw) {
    return "";
  }
  try {
    return JSON.parse(raw);
  } catch {
    return raw.substring(1, raw.length - 1);
  }
};

export const getValueType = (ctx: ValorContext): ValueTypeTag => {
  if (ctx.STRING()) {
    return "STRING";
  }
  if (ctx.NUMERO_ENTERO() || ctx.NUMERO_DECIMAL()) {
    return "NUMBER";
  }
  if (ctx.KW_VERDADERO() || ctx.KW_FALSO()) {
    return "BOOLEAN";
  }
  return "UNKNOWN";
};

export const getLiteralValue = (ctx: ValorContext): LiteralValue => {
  if (ctx.STRING()) {
    return parseStringLiteral(ctx.STRING()?.text);
  }
  if (ctx.NUMERO_ENTERO()) {
    return Number.parseInt(ctx.NUMERO_ENTERO()?.text ?? "0", INT_RADIX);
  }
  if (ctx.NUMERO_DECIMAL()) {
    return Number.parseFloat(ctx.NUMERO_DECIMAL()?.text ?? "0");
  }
  if (ctx.KW_VERDADERO()) {
    return true;
  }
  if (ctx.KW_FALSO()) {
    return false;
  }
  return null;
};

