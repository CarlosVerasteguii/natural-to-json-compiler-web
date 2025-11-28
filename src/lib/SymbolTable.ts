export type EntityKind = "objeto" | "lista";

export class SymbolEntry {
  constructor(
    public nombre: string,
    public tipo_entidad: EntityKind,
    public linea: number,
    public columna: number,
    public metadatos: unknown = {}
  ) { }
}

export class SymbolTable {
  private symbols: Map<string, SymbolEntry> = new Map();

  private reservedWords: Set<string> = new Set([
    "CREAR",
    "OBJETO",
    "LISTA",
    "CON",
    "ELEMENTOS",
    "VERDADERO",
    "FALSO",
  ]);

  isReserved(nombre: string): boolean {
    return this.reservedWords.has(nombre.toUpperCase());
  }

  lookup(nombre: string): SymbolEntry | undefined {
    return this.symbols.get(nombre);
  }

  declare(
    nombre: string,
    tipo_entidad: EntityKind,
    linea: number,
    columna: number,
    metadatos: unknown = {}
  ): boolean {
    if (this.symbols.has(nombre)) {
      return false;
    }
    const entry = new SymbolEntry(nombre, tipo_entidad, linea, columna, metadatos);
    this.symbols.set(nombre, entry);
    return true;
  }

  addProperty(nombre: string, key: string, type: string): boolean {
    const entry = this.symbols.get(nombre);
    if (!entry) {
      return false;
    }
    if (typeof entry.metadatos !== 'object' || entry.metadatos === null) {
      entry.metadatos = {};
    }
    (entry.metadatos as Record<string, unknown>)[key] = type;
    return true;
  }

  getDebugInfo(): Record<string, unknown> {
    const info: Record<string, unknown> = {};
    this.symbols.forEach((value, key) => {
      info[key] = {
        tipo: value.tipo_entidad,
        meta: value.metadatos,
      };
    });
    return info;
  }

  getSymbols(): Record<string, SymbolEntry> {
    return Object.fromEntries(this.symbols);
  }
}

