# Manual Técnico - Natural to JSON Compiler

> [!NOTE]
> Este manual detalla la arquitectura interna del compilador y está dirigido a desarrolladores que deseen comprender o extender el sistema.

🚀 **[Ver Demo en Vivo](https://natural-to-json-compiler-web.vercel.app/)**

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Fases del Compilador](#fases-del-compilador)
- [Estructura de Archivos](#estructura-de-archivos)
- [Guía de Extensión](#guía-de-extensión)

---

## Visión General

El **Natural to JSON Compiler** es un compilador completo que traduce descripciones en lenguaje natural (español) a formato JSON estructurado. Implementa todas las fases clásicas de un compilador:

```mermaid
graph LR
    A[Entrada en Lenguaje Natural] --> B[Análisis Léxico]
    B --> C[Análisis Sintáctico]
    C --> D[Análisis Semántico]
    D --> E[Código Intermedio]
    E --> F[Optimización]
    F --> G[Código Final JSON]
    
    style A fill:#e1f5ff
    style G fill:#d4edda
    style D fill:#fff3cd
    style E fill:#fff3cd
    style F fill:#f8d7da
```

---

## Arquitectura del Sistema

### Stack Tecnológico

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| **Frontend** | Next.js (React) | Interfaz web interactiva |
| **Lenguaje** | TypeScript | Lógica del compilador |
| **Análisis** | ANTLR4 | Generación de parser |
| **Testing** | Vitest | Pruebas unitarias |

### Flujo de Datos Completo

```mermaid
flowchart TD
    Start[Usuario ingresa texto] --> Parser[ANTLR Parser]
    Parser --> AST[Árbol Sintáctico AST]
    
    AST --> Semantic[Análisis Semántico]
    Semantic --> SymbolTable[Tabla de Símbolos]
    Semantic --> TypeCheck{Verificación de Tipos}
    
    TypeCheck -->|Error| ErrorDisplay[Mostrar Errores]
    TypeCheck -->|OK| IR[Generación de IR]
    
    IR --> Optimize[Optimizador]
    Optimize --> CodeGen[Generador de Código]
    CodeGen --> JSON[Salida JSON]
    
    JSON --> Display[Visualización UI]
    
    style Start fill:#e3f2fd
    style JSON fill:#c8e6c9
    style ErrorDisplay fill:#ffcdd2
    style SymbolTable fill:#fff9c4
```

---

## Fases del Compilador

### 1️⃣ Análisis Léxico y Sintáctico

> [!IMPORTANT]
> Utiliza ANTLR4 para generar automáticamente el lexer y parser desde la gramática.

**Archivos:**

- Gramática: [NaturalToJson.g4](../../src/NaturalToJson.g4)
- Parser generado: `src/generated/`

**Proceso:**

```mermaid
sequenceDiagram
    participant User as Entrada
    participant Lexer as Lexer (ANTLR)
    participant Parser as Parser (ANTLR)
    participant AST as AST Builder
    
    User->>Lexer: crear objeto usuario con edad:25
    Lexer->>Parser: [CREAR, OBJETO, ID, CON, ID, NUMERO]
    Parser->>AST: Construir árbol sintáctico
    AST-->>Parser: ParseTree completo
```

**Tokens principales:**

- `CREAR`, `OBJETO`, `CON`
- `ID` (identificadores)
- `STRING`, `NUMBER`, `BOOLEAN`

---

### 2️⃣ Análisis Semántico

> [!WARNING]
> Esta fase detecta errores que el análisis sintáctico no puede capturar (tipos, duplicados, etc.)

**Archivos:**

- [analyzer.ts](../../src/lib/analyzer.ts)
- [SemanticListener.ts](../../src/lib/SemanticListener.ts)
- [SymbolTable.ts](../../src/lib/SymbolTable.ts)

**Validaciones realizadas:**

| Validación | Descripción | Ejemplo de Error |
|------------|-------------|------------------|
| **Duplicados** | Verifica que no se declaren nombres duplicados | `crear objeto user` (x2) |
| **Tipos** | Valida tipos de propiedades especiales | `edad:"texto"` ❌ |
| **Palabras Reservadas** | Evita uso de keywords como IDs | `crear objeto crear` ❌ |

**Diagrama de Flujo:**

```mermaid
flowchart TD
    Start[Recibir AST] --> Walk[Recorrer nodos]
    Walk --> CheckDecl{¿Es declaración?}
    
    CheckDecl -->|Sí| CheckDup{¿Existe en tabla?}
    CheckDecl -->|No| Walk
    
    CheckDup -->|Sí| Error1[Error: Duplicado]
    CheckDup -->|No| AddSymbol[Agregar a tabla]
    
    AddSymbol --> CheckProps{¿Tiene propiedades?}
    
    CheckProps -->|Sí| ValidateType[Validar tipos]
    CheckProps -->|No| Walk
    
    ValidateType --> TypeOK{¿Tipo correcto?}
    TypeOK -->|No| Error2[Error: Tipo inválido]
    TypeOK -->|Sí| Walk
    
    Walk --> Done[Análisis completo]
    
    style Error1 fill:#f8d7da
    style Error2 fill:#f8d7da
    style Done fill:#d4edda
```

---

### 3️⃣ Código Intermedio (IR)

**Archivos:**

- [IRBuilderListener.ts](../../src/lib/IRBuilderListener.ts)
- [irTypes.ts](../../src/lib/irTypes.ts)

**Formato de Instrucciones:**

```typescript
interface IRInstruction {
  op: 'CREATE_OBJ' | 'ASSIGN_PROP'
  target: string
  args: any[]
}
```

**Ejemplo de traducción:**

```
Entrada: crear objeto usuario con nombre:"Juan"

IR generado:
[
  { op: 'CREATE_OBJ', target: 'usuario', args: [] },
  { op: 'ASSIGN_PROP', target: 'usuario.nombre', args: ['Juan'] }
]
```

---

### 4️⃣ Optimización

**Archivos:**

- [optimizer.ts](../../src/lib/optimizer.ts)

**Técnicas implementadas:**

```mermaid
graph TD
    IR[Código IR] --> DCE[Eliminación de Código Muerto]
    DCE --> CF[Plegado de Constantes]
    CF --> PP[Propagación de Variables]
    PP --> Opt[IR Optimizado]
    
    style IR fill:#fff3cd
    style Opt fill:#d4edda
```

**Ejemplo:**

| Antes (IR) | Después (Optimizado) |
|------------|----------------------|
| `temp1 = 5 + 3`<br>`x = temp1` | `x = 8` |
| `y = x * 1` | `y = x` |

---

### 5️⃣ Generación de Código Final

**Archivos:**

- [codegen.ts](../../src/lib/codegen.ts)
- [JsonBuilderListener.ts](../../src/lib/JsonBuilderListener.ts)

**Proceso:**

```mermaid
flowchart LR
    A[IR Optimizado] --> B[Procesador de Objetos]
    B --> C[Constructor JSON]
    C --> D[Pretty Print]
    D --> E[JSON Final]
    
    style A fill:#fff3cd
    style E fill:#c8e6c9
```

---

## Estructura de Archivos

```
src/
├── NaturalToJson.g4          # Gramática ANTLR
├── generated/                # Archivos generados por ANTLR
├── lib/
│   ├── analyzer.ts          # Orquestador principal
│   ├── SemanticListener.ts  # Validaciones semánticas
│   ├── SymbolTable.ts       # Tabla de símbolos
│   ├── IRBuilderListener.ts # Generador de IR
│   ├── irTypes.ts           # Tipos de IR
│   ├── optimizer.ts         # Optimizador
│   ├── codegen.ts           # Generador JSON
│   ├── JsonBuilderListener.ts
│   └── valueUtils.ts        # Utilidades
├── components/              # UI Components
└── app/                     # Next.js pages
```

---

## Guía de Extensión

### Agregar Nueva Sintaxis

> [!CAUTION]
> Modificar la gramática requiere regenerar todos los archivos de ANTLR.

**Pasos:**

```mermaid
flowchart TD
    A[1. Modificar NaturalToJson.g4] --> B[2. Regenerar parser]
    B --> C[3. Actualizar SemanticListener]
    C --> D[4. Actualizar IRBuilder]
    D --> E[5. Probar con tests]
    E --> F{¿Funciona?}
    F -->|No| A
    F -->|Sí| G[Listo!]
    
    style G fill:#d4edda
```

**Ejemplo: Agregar arrays**

1. **Gramática** (`NaturalToJson.g4`):

```antlr
arrayDecl: 'crear' 'lista' ID 'con' '[' valueList ']';
```

2. **Semántica** (`SemanticListener.ts`):

```typescript
exitArrayDecl(ctx) {
  this.symbolTable.add(ctx.ID().getText(), 'ARRAY');
}
```

3. **IR** (`IRBuilderListener.ts`):

```typescript
exitArrayDecl(ctx) {
  this.emit({ op: 'CREATE_ARRAY', target: ctx.ID() });
}
```

---

## Troubleshooting

| Problema | Causa Probable | Solución |
|----------|----------------|----------|
| Parser no reconoce sintaxis | Gramática desactualizada | Verificar `NaturalToJson.g4` |
| Errores de tipo inconsistentes | Tabla de símbolos corrupta | Reiniciar análisis |
| IR incompleto | Listener no registrado | Verificar `IRBuilderListener` |

---

## Referencias

- [ANTLR Documentation](https://www.antlr.org/)
- [Next.js Docs](https://nextjs.org/docs)
- Código fuente: `src/lib/`

---

## 🤖 Asistencia Técnica con IA

¿Necesitas ayuda para entender la arquitectura, extender la gramática o depurar el compilador?

Puedes consultar a nuestra IA técnica, que tiene acceso completo al código fuente y documentación del proyecto.

👉 **[Consultar a la IA del Proyecto](https://deepwiki.com/CarlosVerasteguii/natural-to-json-compiler-web)**

La IA (Devian) puede ayudarte a:
- Explicar el flujo de datos entre componentes.
- Generar snippets para nuevos Listeners.
- Analizar errores de compilación o runtime.

