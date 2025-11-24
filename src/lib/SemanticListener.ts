import {
  Crear_objeto_cmdContext,
  Crear_lista_cmdContext,
} from "../generated/NaturalToJsonParser";
import { NaturalToJsonListener } from "../generated/NaturalToJsonListener";
import { SymbolTable } from "./SymbolTable";

export class SemanticListener implements NaturalToJsonListener {
  private errors: string[] = [];

  constructor(private symbolTable: SymbolTable) {}

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
        `Error Semántico (L${linea}:C${col}): '${nombre}' es una palabra reservada.`
      );
      return;
    }

    const exito = this.symbolTable.declare(nombre, "objeto", linea, col);
    if (!exito) {
      const prev = this.symbolTable.lookup(nombre);
      this.errors.push(
        `Error Semántico (L${linea}:C${col}): El símbolo '${nombre}' ya fue declarado previamente en la línea ${prev?.linea}.`
      );
    }
  }

  enterCrear_lista_cmd(ctx: Crear_lista_cmdContext): void {
    const nombreToken = ctx._nombre_lista;
    const nombre = nombreToken.text ?? "";
    const linea = nombreToken.line;
    const col = nombreToken.charPositionInLine + 1;

    if (this.symbolTable.isReserved(nombre)) {
      this.errors.push(
        `Error Semántico (L${linea}:C${col}): '${nombre}' es una palabra reservada.`
      );
      return;
    }

    const exito = this.symbolTable.declare(nombre, "lista", linea, col);
    if (!exito) {
      const prev = this.symbolTable.lookup(nombre);
      this.errors.push(
        `Error Semántico (L${linea}:C${col}): El símbolo '${nombre}' ya fue declarado previamente en la línea ${prev?.linea}.`
      );
    }
  }
}

