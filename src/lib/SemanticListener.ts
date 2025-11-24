import {
  Crear_lista_cmdContext,
  Crear_objeto_cmdContext,
  PropiedadContext,
} from "../generated/NaturalToJsonParser";
import { NaturalToJsonListener } from "../generated/NaturalToJsonListener";
import { SymbolTable } from "./SymbolTable";
import { getValueType } from "./valueUtils";

export class SemanticListener implements NaturalToJsonListener {
  private errors: string[] = [];
  private currentObject: string | null = null;

  constructor(private symbolTable: SymbolTable) { }

  getErrors(): string[] {
    return this.errors;
  }

  enterCrear_objeto_cmd(ctx: Crear_objeto_cmdContext): void {
    const nombreToken = ctx._nombre_obj;
    const nombre = nombreToken.text ?? "";
    const linea = nombreToken.line;
    const col = nombreToken.charPositionInLine + 1;

    if (this.symbolTable.isReserved(nombre)) {
      this.errors.push(
        `Error Semantico (L${linea}:C${col}): '${nombre}' es una palabra reservada.`
      );
      this.currentObject = null;
      return;
    }

    const exito = this.symbolTable.declare(nombre, "objeto", linea, col);
    if (!exito) {
      const prev = this.symbolTable.lookup(nombre);
      this.errors.push(
        `Error Semantico (L${linea}:C${col}): El simbolo '${nombre}' ya fue declarado previamente en la linea ${prev?.linea}.`
      );
      this.currentObject = null;
      return;
    }

    this.currentObject = nombre;
  }

  exitCrear_objeto_cmd(): void {
    this.currentObject = null;
  }

  enterCrear_lista_cmd(ctx: Crear_lista_cmdContext): void {
    const nombreToken = ctx._nombre_lista;
    const nombre = nombreToken.text ?? "";
    const linea = nombreToken.line;
    const col = nombreToken.charPositionInLine + 1;

    if (this.symbolTable.isReserved(nombre)) {
      this.errors.push(
        `Error Semantico (L${linea}:C${col}): '${nombre}' es una palabra reservada.`
      );
      this.currentObject = null;
      return;
    }

    const exito = this.symbolTable.declare(nombre, "lista", linea, col);
    if (!exito) {
      const prev = this.symbolTable.lookup(nombre);
      this.errors.push(
        `Error Semantico (L${linea}:C${col}): El simbolo '${nombre}' ya fue declarado previamente en la linea ${prev?.linea}.`
      );
    }

    this.currentObject = null;
  }

  enterPropiedad(ctx: PropiedadContext): void {
    if (!this.currentObject) {
      return;
    }

    const clave = ctx._clave?.text ?? "";
    if (!clave) {
      return;
    }

    const tipoValor = getValueType(ctx.valor());
    const linea = ctx.start.line;
    const col = ctx.start.charPositionInLine + 1;

    if (clave === "edad" && tipoValor !== "NUMBER") {
      this.errors.push(
        `Error Semantico (L${linea}:C${col}): La propiedad 'edad' debe ser de tipo NUMBER.`
      );
    } else if (clave === "activo" && tipoValor !== "BOOLEAN") {
      this.errors.push(
        `Error Semantico (L${linea}:C${col}): La propiedad 'activo' debe ser de tipo BOOLEAN.`
      );
    }
  }

  visitTerminal() { }
  visitErrorNode() { }
  enterEveryRule() { }
  exitEveryRule() { }
}

