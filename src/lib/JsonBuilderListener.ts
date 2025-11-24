import {
  Crear_lista_cmdContext,
  Crear_objeto_cmdContext,
  Items_listaContext,
  PropiedadContext,
  ValorContext,
} from "../generated/NaturalToJsonParser";
import { NaturalToJsonListener } from "../generated/NaturalToJsonListener";
import { getLiteralValue } from "./valueUtils";

export type JsonResult = Record<string, unknown>;

export class JsonBuilderListener implements NaturalToJsonListener {
  private resultData: JsonResult = {};
  private currentObjectName: string | null = null;
  private currentObjectProps: Record<string, unknown> = {};
  private currentListName: string | null = null;
  private currentListItems: unknown[] = [];
  private currentKey: string | null = null;

  getResult(): JsonResult {
    return this.resultData;
  }

  enterCrear_objeto_cmd(ctx: Crear_objeto_cmdContext): void {
    this.currentObjectName = ctx._nombre_obj?.text ?? null;
    this.currentObjectProps = {};
  }

  exitCrear_objeto_cmd(): void {
    if (this.currentObjectName) {
      this.resultData[this.currentObjectName] = this.currentObjectProps;
    }
    this.currentObjectName = null;
    this.currentObjectProps = {};
  }

  enterPropiedad(ctx: PropiedadContext): void {
    this.currentKey = ctx._clave?.text ?? null;
  }

  exitPropiedad(ctx: PropiedadContext): void {
    if (!this.currentKey || !this.currentObjectName) {
      this.currentKey = null;
      return;
    }
    const valueCtx = ctx.valor();
    const literal = getLiteralValue(valueCtx);
    this.currentObjectProps[this.currentKey] = literal;
    this.currentKey = null;
  }

  enterCrear_lista_cmd(ctx: Crear_lista_cmdContext): void {
    this.currentListName = ctx._nombre_lista?.text ?? null;
    this.currentListItems = [];
  }

  exitCrear_lista_cmd(): void {
    if (this.currentListName) {
      this.resultData[this.currentListName] = this.currentListItems;
    }
    this.currentListName = null;
    this.currentListItems = [];
  }

  exitValor(ctx: ValorContext): void {
    if (
      !this.currentListName ||
      !(ctx.parent instanceof Items_listaContext)
    ) {
      return;
    }
    const literal = getLiteralValue(ctx);
    this.currentListItems.push(literal);
  }

  visitTerminal() { }
  visitErrorNode() { }
  enterEveryRule() { }
  exitEveryRule() { }
}
