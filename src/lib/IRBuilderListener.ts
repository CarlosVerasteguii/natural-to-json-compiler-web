import {
  Crear_lista_cmdContext,
  Crear_objeto_cmdContext,
  Items_listaContext,
  PropiedadContext,
  ValorContext,
} from "../generated/NaturalToJsonParser";
import { NaturalToJsonListener } from "../generated/NaturalToJsonListener";
import { IRInstruction } from "./irTypes";
import { getLiteralValue, getValueType } from "./valueUtils";

export class IRBuilderListener implements NaturalToJsonListener {
  private instructions: IRInstruction[] = [];
  private currentObjectName: string | null = null;
  private currentListName: string | null = null;

  getInstructions(): IRInstruction[] {
    return this.instructions;
  }

  enterCrear_objeto_cmd(ctx: Crear_objeto_cmdContext): void {
    const name = ctx._nombre_obj?.text ?? null;
    if (!name) {
      return;
    }
    this.currentObjectName = name;
    this.instructions.push({
      opcode: "IR_CREATE_OBJECT",
      args: [name],
    });
  }

  exitCrear_objeto_cmd(): void {
    this.currentObjectName = null;
  }

  exitPropiedad(ctx: PropiedadContext): void {
    if (!this.currentObjectName) {
      return;
    }
    const key = ctx._clave?.text ?? null;
    if (!key) {
      return;
    }
    const valueCtx = ctx.valor();
    const tipo = getValueType(valueCtx);
    const literal = getLiteralValue(valueCtx);
    this.instructions.push({
      opcode: "IR_SET_PROPERTY",
      args: [this.currentObjectName, key, tipo, literal],
    });
  }

  enterCrear_lista_cmd(ctx: Crear_lista_cmdContext): void {
    const name = ctx._nombre_lista?.text ?? null;
    if (!name) {
      return;
    }
    this.currentListName = name;
    this.instructions.push({
      opcode: "IR_CREATE_LIST",
      args: [name],
    });
  }

  exitCrear_lista_cmd(): void {
    this.currentListName = null;
  }

  exitValor(ctx: ValorContext): void {
    if (
      !this.currentListName ||
      !(ctx.parentCtx instanceof Items_listaContext)
    ) {
      return;
    }

    const tipo = getValueType(ctx);
    const literal = getLiteralValue(ctx);
    this.instructions.push({
      opcode: "IR_APPEND_LIST",
      args: [this.currentListName, tipo, literal],
    });
  }
}

