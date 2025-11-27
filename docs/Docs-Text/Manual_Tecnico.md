# 🏗️ Manual Técnico - Natural to JSON Compiler

> **👨‍💼 Audiencia:** Desarrolladores y arquitectos de software
> **📚 Propósito:** Comprender la arquitectura interna y extender el compilador
> **⏱️ Lectura estimada:** 15-20 minutos

---

## 📋 Índice de Contenidos

```
1. Visión General ........................ Arquitectura del compilador
2. Stack Tecnológico ..................... Herramientas y tecnologías
3. Flujo de Datos Completo ............... Entrada a salida
4. Fases del Compilador .................. Desglose de cada etapa
5. Estructura de Archivos ................ Organización del proyecto
6. Guía de Extensión ..................... Cómo agregar nuevas características
7. Troubleshooting ....................... Solución de problemas comunes
```

---

## 🎯 Visión General

### ¿Qué es el Natural to JSON Compiler?

Un **compilador completo** que traduce descripciones en **lenguaje natural español** a **JSON estructurado válido**.

```
📝 Entrada en español → 🔧 Compilador → 📤 JSON estructurado
```

### Las 6 Fases del Compilador

```
┌─────────────┐
│   ENTRADA   │  Texto en lenguaje natural
└──────┬──────┘
       ↓
┌─────────────────────────────────────┐
│ 1️⃣  ANÁLISIS LÉXICO y SINTÁCTICO     │  Tokenización y parsing
├─────────────────────────────────────┤
│ 2️⃣  ANÁLISIS SEMÁNTICO               │  Validación de tipos y duplicados
├─────────────────────────────────────┤
│ 3️⃣  CÓDIGO INTERMEDIO (IR)           │  Representación intermedia
├─────────────────────────────────────┤
│ 4️⃣  OPTIMIZACIÓN                     │  Mejora de código
├─────────────────────────────────────┤
│ 5️⃣  GENERACIÓN DE CÓDIGO JSON        │  Formato final
└──────┬──────────────────────────────┘
       ↓
┌─────────────┐
│   SALIDA    │  JSON válido
└─────────────┘
```

---

## 🛠️ Stack Tecnológico

### Componentes Principales

| 🎯 Componente | 💻 Tecnología | 🎨 Propósito |
|:---|:---|:---|
| **Frontend** | Next.js (React) | Interfaz web interactiva y responsive |
| **Lenguaje** | TypeScript | Código type-safe del compilador |
| **Parser** | ANTLR4 | Generación automática de léxer/parser |
| **Testing** | Vitest | Pruebas unitarias e integración |
| **Styling** | CSS/Tailwind | Diseño y componentes visuales |

### Ventajas del Stack

✅ **Type Safety** → TypeScript previene errores
✅ **Generación Automática** → ANTLR reduce código boilerplate
✅ **Testing Robusto** → Vitest asegura calidad
✅ **UI Moderna** → Next.js con componentes React

---

## 🔄 Flujo de Datos Completo

### De Principio a Fin

```
👤 USUARIO INGRESA TEXTO
    │
    ├─→ "crear objeto usuario con nombre:\"Juan\", edad:30"
    │
    ↓
🔤 LEXER (ANTLR)
    │
    ├─→ [CREAR] [OBJETO] [ID] [CON] [ID] [:] [STRING] [,] [ID] [:] [NUMBER]
    │
    ↓
🌳 PARSER (ANTLR)
    │
    ├─→ Construye ParseTree / AST
    │
    ↓
📋 ANÁLISIS SEMÁNTICO
    │
    ├─→ Tabla de Símbolos
    ├─→ Validación de Tipos
    ├─→ Detección de Duplicados
    │
    ↓
❓ ¿Hay Errores?
    ├─→ SÍ  → ⚠️  Mostrar errores al usuario
    │
    └─→ NO  → Continuar
        │
        ↓
    ⚙️  GENERADOR DE IR
        │
        ├─→ [CREATE_OBJ, usuario]
        ├─→ [ASSIGN_PROP, usuario.nombre, "Juan"]
        ├─→ [ASSIGN_PROP, usuario.edad, 30]
        │
        ↓
    🔍 OPTIMIZADOR
        │
        ├─→ Eliminación de código muerto
        ├─→ Propagación de constantes
        ├─→ Simplificación de expresiones
        │
        ↓
    📝 GENERADOR JSON
        │
        ├─→ Procesa instrucciones IR
        ├─→ Construye estructura JSON
        ├─→ Pretty print formato
        │
        ↓
    ✅ SALIDA JSON
        │
        └─→ {
              "usuario": {
                "nombre": "Juan",
                "edad": 30
              }
            }
```

---

## ⚙️ Fases del Compilador - Análisis Detallado

### 1️⃣ ANÁLISIS LÉXICO Y SINTÁCTICO

**Responsabilidad:** Convertir texto a estructura sintáctica
**Herramienta:** ANTLR4 (Generador de parser)
**Entrada:** String de texto
**Salida:** Abstract Syntax Tree (AST)

#### 📍 Ubicación en el Proyecto

```
src/
├── NaturalToJson.g4          ← Gramática ANTLR (fuente)
└── generated/                ← Parser generado automáticamente
    ├── NaturalToJsonLexer.ts
    ├── NaturalToJsonParser.ts
    ├── NaturalToJsonListener.ts
    └── ...
```

#### 🔄 Proceso Paso a Paso

```
ENTRADA: "crear objeto usuario con edad:25"

    ↓ [LEXER]

TOKENS: [CREAR] [OBJETO] [ID:"usuario"] [CON] [ID:"edad"] [:] [NUMERO:25]

    ↓ [PARSER - Reglas Gramaticales]

ParseTree:
  objectDeclaration
    ├── CREAR "crear"
    ├── OBJETO "objeto"
    ├── ID "usuario"
    ├── CON "con"
    └── propertyList
        └── property
            ├── ID "edad"
            ├── : ":"
            └── NUMBER "25"
```

#### 🔑 Tokens Principales

| Token | Tipo | Ejemplo |
|:---|:---|:---|
| `CREAR` | Keyword | `crear objeto...` |
| `OBJETO` | Keyword | `...objeto usuario...` |
| `CON` | Keyword | `...con propiedades...` |
| `ID` | Identificador | `usuario`, `nombre`, `edad` |
| `STRING` | Literal | `"Juan"`, `'texto'` |
| `NUMBER` | Literal | `25`, `3.14`, `-10` |
| `BOOLEAN` | Literal | `verdadero`, `falso` |

#### ⚠️ Consideraciones Importantes

> **ANTLR maneja automáticamente:**
> - Tokenización (dividir en tokens)
> - Análisis sintáctico (crear árbol)
> - Errores de sintaxis básicos
>
> **NO maneja:**
> - Validación de tipos
> - Detección de duplicados
> - Análisis semántico (→ Fase 2)

---

### 2️⃣ ANÁLISIS SEMÁNTICO

**Responsabilidad:** Validar significado y coherencia
**Entrada:** AST (del Lexer/Parser)
**Salida:** AST validado o lista de errores

#### 📍 Ubicación en el Proyecto

```
src/lib/
├── analyzer.ts              ← Orquestador principal
├── SemanticListener.ts      ← Validaciones semánticas
├── SymbolTable.ts           ← Tabla de símbolos (registro de variables)
└── errorHandler.ts          ← Gestión de errores
```

#### 📊 Tabla de Símbolos

Registra todas las declaraciones para validar:

```
┌─────────────────────────────────────────┐
│          TABLA DE SÍMBOLOS              │
├─────────┬──────────┬───────────────────┤
│ Nombre  │ Tipo     │ Propiedades       │
├─────────┼──────────┼───────────────────┤
│ usuario │ OBJECT   │ {nombre, edad}    │
│ config  │ OBJECT   │ {tema, activo}    │
└─────────┴──────────┴───────────────────┘
```

#### ✅ Validaciones Realizadas

```
Para cada declaración:

┌─────────────────────────────────────────┐
│ 1️⃣  ¿Ya existe este nombre?              │
│    ├─ SÍ  → ❌ Error: Duplicado
│    └─ NO  → ✅ Continuar
├─────────────────────────────────────────┤
│ 2️⃣  ¿Las propiedades tienen tipos válidos?│
│    ├─ NO  → ❌ Error: Tipo inválido
│    └─ SÍ  → ✅ Continuar
├─────────────────────────────────────────┤
│ 3️⃣  ¿Se usa palabra reservada como ID?   │
│    ├─ SÍ  → ❌ Error: Palabra reservada
│    └─ NO  → ✅ Continuar
├─────────────────────────────────────────┤
│ 4️⃣  ✅ Análisis semántico completado    │
└─────────────────────────────────────────┘
```

#### 📋 Validaciones Específicas

| Validación | Descripción | ✅ Correcto | ❌ Incorrecto |
|:---|:---|:---|:---|
| **Duplicados** | No permite 2 objetos con mismo nombre | `usuario`, `usuario2` | `usuario`, `usuario` |
| **Tipos especiales** | `edad` debe ser NUMBER | `edad:25` | `edad:"25"` |
| **Tipos especiales** | `activo` debe ser BOOLEAN | `activo:verdadero` | `activo:"sí"` |
| **Tipos especiales** | `nombre` debe ser STRING | `nombre:"Ana"` | `nombre:Ana` |
| **Palabras reservadas** | No usar keywords como IDs | `objeto usuario` | `objeto crear` |

#### 🔍 Ejemplo de Validación

```
ENTRADA:
  crear objeto usuario con nombre:"Ana", edad:"treinta"

ANÁLISIS:
  1. ¿"usuario" existe? NO ✅
  2. nombre:"Ana" → ¿STRING? SÍ ✅
  3. edad:"treinta" → ¿NUMBER? NO ❌

RESULTADO: ❌ Error: Tipo incorrecto para 'edad'
           Se esperaba NUMBER pero se recibió STRING
```

---

### 3️⃣ CÓDIGO INTERMEDIO (IR - Intermediate Representation)

**Responsabilidad:** Representación independiente del lenguaje destino
**Entrada:** AST validado (del Análisis Semántico)
**Salida:** Lista de instrucciones IR

#### 📍 Ubicación en el Proyecto

```
src/lib/
├── IRBuilderListener.ts     ← Constructor de IR
├── irTypes.ts               ← Definiciones de tipos IR
└── irUtils.ts               ← Utilidades para IR
```

#### 🔧 Formato de Instrucciones IR

```typescript
interface IRInstruction {
  op: 'CREATE_OBJ'      // Crear objeto
     | 'ASSIGN_PROP'    // Asignar propiedad
     | 'DELETE_OBJ'     // Eliminar objeto
     | 'READ_PROP'      // Leer propiedad

  target: string        // Nombre del objeto o propiedad
  args: any[]          // Argumentos (valores, referencias, etc)
  lineNumber?: number  // Para debugging
}
```

#### 📝 Ejemplo de Transformación

```
ENTRADA:
  crear objeto usuario con nombre:"Juan", edad:30

IR GENERADO:
  [
    {
      op: 'CREATE_OBJ',
      target: 'usuario',
      args: []
    },
    {
      op: 'ASSIGN_PROP',
      target: 'usuario.nombre',
      args: ['Juan']
    },
    {
      op: 'ASSIGN_PROP',
      target: 'usuario.edad',
      args: [30]
    }
  ]
```

#### 🎯 Ventajas del IR

✅ **Independencia** → No depende de Mermaid diagrams
✅ **Optimización** → Fácil de transformar
✅ **Debugging** → Visible para inspeccionar
✅ **Modular** → Separar parsing de generación

---

### 4️⃣ OPTIMIZACIÓN

**Responsabilidad:** Mejorar el código IR
**Entrada:** IR no optimizado
**Salida:** IR optimizado y equivalente

#### 📍 Ubicación en el Proyecto

```
src/lib/
└── optimizer.ts         ← Motor de optimización
```

#### 🚀 Técnicas Implementadas

```
INPUT IR
    │
    ├──→ 1️⃣  DEAD CODE ELIMINATION (DCE)
    │       Elimina instrucciones nunca usadas
    │
    ├──→ 2️⃣  CONSTANT FOLDING
    │       Precalcula expresiones constantes
    │
    ├──→ 3️⃣  VARIABLE PROPAGATION
    │       Reemplaza variables por sus valores
    │
    └──→ 4️⃣  REDUNDANCY ELIMINATION
            Elimina asignaciones redundantes

OUTPUT IR (Optimizado)
```

#### 📊 Ejemplos de Optimización

| Técnica | Antes | Después | Ahorro |
|:---|:---|:---|:---|
| **Constant Folding** | `temp = 5 + 3`<br>`x = temp` | `x = 8` | 1 instr. |
| **Dead Code** | `y = x`<br>`y = 10` | `y = 10` | 1 instr. |
| **Propagation** | `a = 5`<br>`b = a * 1` | `b = 5` | 1 instr. |
| **Redundancy** | `x = foo()`<br>`z = x`<br>`y = x` | `x = foo()`<br>`z = x`<br>`y = x` | - |

#### ⚠️ Garantías de Optimización

> **Semántica Preservada:**
> - El resultado es idéntico al IR original
> - Solo cambia performance, no funcionalidad
> - Seguro para aplicar automáticamente

---

### 5️⃣ GENERACIÓN DE CÓDIGO JSON

**Responsabilidad:** Convertir IR a JSON final
**Entrada:** IR optimizado
**Salida:** String JSON formateado

#### 📍 Ubicación en el Proyecto

```
src/lib/
├── codegen.ts               ← Motor de generación
├── JsonBuilderListener.ts   ← Constructor JSON
└── valueUtils.ts            ← Utilidades de valores
```

#### 🔄 Pipeline de Generación

```
IR Optimizado
    │
    ├─→ 📦 PROCESADOR DE OBJETOS
    │    ├─ Agrupa instrucciones por objeto
    │    └─ Resuelve dependencias
    │
    ├─→ 🏗️  CONSTRUCTOR JSON
    │    ├─ Crea estructura de objetos
    │    ├─ Asigna propiedades
    │    └─ Valida tipos JSON
    │
    ├─→ 🎨 PRETTY PRINTER
    │    ├─ Añade indentación (2 espacios)
    │    ├─ Formatea correctamente
    │    └─ Asegura legibilidad
    │
    └─→ ✅ JSON Final
```

#### 📝 Ejemplo Completo

```
IR ENTRADA:
[
  { op: 'CREATE_OBJ', target: 'persona', args: [] },
  { op: 'ASSIGN_PROP', target: 'persona.nombre', args: ['Juan'] },
  { op: 'ASSIGN_PROP', target: 'persona.edad', args: [30] }
]

PROCESAMIENTO:
- Objeto: persona
  - nombre: "Juan" (STRING)
  - edad: 30 (NUMBER)

JSON SALIDA:
{
  "persona": {
    "nombre": "Juan",
    "edad": 30
  }
}
```

---

## 📂 Estructura de Archivos

```
natural-to-json-compiler-web/
│
├── src/
│   │
│   ├── NaturalToJson.g4              # 📄 Gramática ANTLR (fuente)
│   │
│   ├── generated/                    # 🤖 Archivos AUTO-GENERADOS
│   │   ├── NaturalToJsonLexer.ts
│   │   ├── NaturalToJsonParser.ts
│   │   ├── NaturalToJsonListener.ts
│   │   ├── NaturalToJsonVisitor.ts
│   │   └── *BaseListener.ts
│   │
│   ├── lib/                          # 🧠 Lógica del Compilador
│   │   ├── analyzer.ts               # 🎯 Orquestador principal
│   │   ├── SemanticListener.ts       # ✅ Validaciones semánticas
│   │   ├── SymbolTable.ts            # 📋 Tabla de símbolos
│   │   ├── IRBuilderListener.ts      # ⚙️  Generador de IR
│   │   ├── irTypes.ts                # 📦 Tipos de IR
│   │   ├── optimizer.ts              # 🚀 Optimizador
│   │   ├── codegen.ts                # 📝 Generador JSON
│   │   ├── JsonBuilderListener.ts    # 🏗️  Constructor JSON
│   │   ├── valueUtils.ts             # 🔧 Utilidades
│   │   └── errorHandler.ts           # ⚠️  Gestión de errores
│   │
│   ├── components/                   # 🎨 Componentes React
│   │   ├── Editor.tsx                # 📝 Editor de código
│   │   ├── OutputPanel.tsx           # 📊 Panel de salida
│   │   ├── ErrorDisplay.tsx          # ⚠️  Mostrador de errores
│   │   └── ...
│   │
│   └── app/                          # 🌐 Next.js Pages
│       ├── page.tsx                  # Página principal
│       ├── layout.tsx                # Layout global
│       └── ...
│
├── tests/                            # 🧪 Tests automatizados
│   ├── lexer.test.ts                 # Tests del lexer
│   ├── parser.test.ts                # Tests del parser
│   ├── semantic.test.ts              # Tests semánticos
│   ├── ir.test.ts                    # Tests de IR
│   ├── optimizer.test.ts             # Tests del optimizador
│   └── codegen.test.ts               # Tests de generación
│
├── examples/                         # 📚 Ejemplos
│   ├── valid/                        # ✅ Ejemplos válidos
│   └── invalid/                      # ❌ Ejemplos con errores
│
├── docs/                             # 📖 Documentación
│   ├── Manual_Tecnico.md
│   ├── Manual_Usuario.md
│   ├── Docs-Diagrams/
│   └── Docs-Text/
│
├── package.json                      # 📦 Dependencias
├── tsconfig.json                     # ⚙️  Config TypeScript
└── Makefile                          # 🛠️  Scripts útiles
```

---

## 🛠️ Guía de Extensión

### Cómo Agregar Nueva Sintaxis

> **⚠️ ADVERTENCIA:** Modificar la gramática requiere regenerar los archivos de ANTLR

#### 📋 Checklist de Implementación

```
1. ✏️  MODIFICAR GRAMÁTICA
   └─→ Editar: src/NaturalToJson.g4

2. 🤖 REGENERAR PARSER
   └─→ Ejecutar: antlr4 -Dlanguage=TypeScript ...

3. 📋 ACTUALIZAR SEMÁNTICA
   └─→ Editar: src/lib/SemanticListener.ts

4. ⚙️  ACTUALIZAR IR BUILDER
   └─→ Editar: src/lib/IRBuilderListener.ts

5. 📝 ACTUALIZAR CODEGEN
   └─→ Editar: src/lib/JsonBuilderListener.ts

6. 🧪 ESCRIBIR TESTS
   └─→ Crear: tests/newfeature.test.ts

7. ✅ PROBAR MANUALMENTE
   └─→ Ejecutar: npm run dev
```

#### 🎯 Ejemplo: Agregar Soporte para Arrays/Listas

**Paso 1: Gramática** (`NaturalToJson.g4`)

```antlr
// Agregar nueva regla
arrayDecl
  : 'crear' 'lista' ID 'con' '[' valueList ']'
  ;

valueList
  : value (',' value)*
  ;

value
  : NUMBER
  | STRING
  | BOOLEAN
  | ID
  ;
```

**Paso 2: Semántica** (`SemanticListener.ts`)

```typescript
exitArrayDecl(ctx: any) {
  const arrayName = ctx.ID().getText();

  // Validar que no existe
  if (this.symbolTable.exists(arrayName)) {
    this.errors.push(`Array '${arrayName}' ya declarado`);
    return;
  }

  // Agregar a tabla de símbolos
  this.symbolTable.add(arrayName, 'ARRAY');
}
```

**Paso 3: IR Builder** (`IRBuilderListener.ts`)

```typescript
exitArrayDecl(ctx: any) {
  const arrayName = ctx.ID().getText();
  const values = this.extractValues(ctx.valueList());

  this.instructions.push({
    op: 'CREATE_ARRAY',
    target: arrayName,
    args: values
  });
}
```

**Paso 4: Code Generator** (`JsonBuilderListener.ts`)

```typescript
case 'CREATE_ARRAY':
  const arrayName = instruction.target;
  const arrayValues = instruction.args;
  this.currentObject[arrayName] = arrayValues;
  break;
```

---

## 🐛 Troubleshooting - Solución de Problemas

### Diagnóstico Rápido

| 🔍 Problema | 💡 Causa Probable | ✅ Solución |
|:---|:---|:---|
| **Parser no reconoce sintaxis** | Gramática desactualizada | Revisar `NaturalToJson.g4` |
| **"Unexpected token"** | Token no definido en gramática | Agregar token a gramática |
| **Errores de tipo inconsistentes** | Tabla de símbolos corrupta | Reiniciar análisis |
| **IR incompleto** | Listener no registrado | Verificar listeners en analyzer.ts |
| **JSON malformado** | Error en codegen | Revisar JsonBuilderListener |
| **"Symbol not found"** | Variable usada sin declarar | Verificar declaraciones |

### Flujo de Debug

```
¿Hay error?
    ├─→ NO: ¡Excelente! ✅
    │
    └─→ SÍ:
        │
        ├─→ ¿Es sintáctico?
        │   └─→ Revisar: NaturalToJson.g4
        │
        ├─→ ¿Es semántico?
        │   ├─→ Revisar: SemanticListener.ts
        │   └─→ Revisar: SymbolTable.ts
        │
        ├─→ ¿Es en IR?
        │   └─→ Revisar: IRBuilderListener.ts
        │
        └─→ ¿Es en generación?
            └─→ Revisar: codegen.ts
```

---

## 📚 Referencias y Recursos

### Documentación Externa

- 🔗 [ANTLR Official Docs](https://www.antlr.org/)
- 🔗 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🔗 [Next.js Documentation](https://nextjs.org/docs)
- 🔗 [Compiler Design Principles](https://en.wikipedia.org/wiki/Compiler)

### Recursos Internos

- 📁 Código fuente: `src/lib/`
- 📝 Tests: `tests/`
- 💾 Ejemplos: `examples/`
- 📖 Manuales: `docs/`

### Comunidad y Soporte

> **¿Preguntas o sugerencias?**
>
> 📧 Contacto: [Especificar contacto]
> 🐛 Reportar bugs: [Especificar repositorio]
> 💬 Discusiones: [Especificar foro]

---

**Última actualización:** Noviembre 2024
**Versión del compilador:** 1.0.0
**Autor:** Equipo de Desarrollo
