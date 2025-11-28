# Manual de Usuario - Natural to JSON Compiler

> [!NOTE]
> Este manual está dirigido a usuarios que desean aprender a utilizar el compilador para convertir descripciones en lenguaje natural a formato JSON.

## 📋 Tabla de Contenidos

- [¿Qué es esto?](#qué-es-esto)
- [Instalación Rápida](#instalación-rápida)
- [Guía Visual de Uso](#guía-visual-de-uso)
- [Sintaxis del Lenguaje](#sintaxis-del-lenguaje)
- [Ejemplos Prácticos](#ejemplos-prácticos)
- [Solución de Problemas](#solución-de-problemas)

---

## ¿Qué es esto?

El **Natural to JSON Compiler Studio** es una herramienta web interactiva que te permite escribir descripciones simples en español y convertirlas automáticamente a formato JSON.

🚀 **[Probar Demo en Vivo](https://natural-to-json-compiler-web.vercel.app/)**

### ¿Para qué sirve?

```mermaid
graph LR
    A[Escribes en español] --> B[El compilador traduce]
    B --> C[Obtienes JSON válido]
    
    style A fill:#e3f2fd
    style C fill:#c8e6c9
```

**Ejemplo rápido:**

| Tu escribes... | Obtienes... |
|----------------|-------------|
| `crear objeto usuario con nombre:"Ana"` | `{"usuario": {"nombre": "Ana"}}` |

---

## Instalación Rápida

### Requisitos Previos

- **Node.js** v18 o superior ([Descargar aquí](https://nodejs.org/))
- Terminal de comandos

### Pasos de Instalación

```mermaid
flowchart TD
    A[1. Descargar proyecto] --> B[2. Abrir terminal]
    B --> C[3. Ejecutar: make install]
    C --> D[4. Ejecutar: npm run dev]
    D --> E[5. Abrir navegador en localhost:3000]
    
    style E fill:#d4edda
```

**Comandos detallados:**

```bash
# Opción 1: Con Make (recomendado)
make install
npm run dev

# Opción 2: Sin Make
npm install
npm run dev
```

> [!TIP]
> Si ves el mensaje "Ready on <http://localhost:3000>", ¡todo está listo! 🎉

---

## Guía Visual de Uso

### Interfaz Principal

```mermaid
graph TB
    subgraph UI["Interfaz del Compilador"]
        A[📝 Editor de Código<br/>Escribe aquí tu código]
        B[▶️ Botón Compilar<br/>Procesa el código]
        C[📄 Salida JSON<br/>Resultado en JSON]
        D[⚠️ Panel de Errores<br/>Muestra problemas]
    end
    
    A --> B
    B --> C
    B --> D
    
    style A fill:#e3f2fd
    style C fill:#c8e6c9
    style D fill:#fff3cd
```

### Flujo de Trabajo Típico

```mermaid
sequenceDiagram
    participant U as 👤 Usuario
    participant E as 📝 Editor
    participant C as 🔧 Compilador
    participant O as 📊 Output
    
    U->>E: 1. Escribe código en español
    E->>C: 2. Presiona "Compilar"
    C->>C: 3. Procesa y valida
    
    alt Sin errores
        C->>O: 4a. Muestra JSON válido ✅
    else Con errores
        C->>O: 4b. Muestra errores ⚠️
        U->>E: 5. Corrige el código
    end
```

### Paso a Paso

#### 1️⃣ Escribir Código

En el editor izquierdo, escribe tu descripción:

```text
crear objeto persona con nombre:"Juan", edad:30
```

#### 2️⃣ Compilar

Haz clic en el botón **"Compilar"** o presiona `Ctrl+Enter`.

#### 3️⃣ Ver Resultado

El JSON aparecerá en el panel derecho:

```json
{
  "persona": {
    "nombre": "Juan",
    "edad": 30
  }
}
```

---

## Sintaxis del Lenguaje

### Estructura Básica

```mermaid
flowchart LR
    A["crear"] --> B["objeto"]
    B --> C["NOMBRE"]
    C --> D["con"]
    D --> E["propiedades"]
    
    style A fill:#ffe0b2
    style B fill:#ffe0b2
    style C fill:#c8e6c9
    style D fill:#ffe0b2
    style E fill:#bbdefb
```

### Palabras Clave

| Palabra | Uso | Ejemplo |
|---------|-----|---------|
| `crear` | Inicio de declaración | `crear objeto...` |
| `objeto` | Define un objeto | `...objeto usuario...` |
| `con` | Introduce propiedades | `...con nombre:"Ana"` |

### Tipos de Datos

```mermaid
graph TD
    Tipos[Tipos de Datos]
    
    Tipos --> String[📝 STRING<br/>Entre comillas]
    Tipos --> Number[🔢 NUMBER<br/>Sin comillas]
    Tipos --> Boolean[✅ BOOLEAN<br/>verdadero/falso]
    
    String --> SE["nombre:'Juan'"]
    Number --> NE["edad:25"]
    Boolean --> BE["activo:verdadero"]
    
    style String fill:#e3f2fd
    style Number fill:#fff9c4
    style Boolean fill:#f8bbd0
```

### Reglas Importantes

> [!IMPORTANT]
> **Propiedades especiales con tipo fijo:**

| Propiedad | Tipo Requerido | ✅ Correcto | ❌ Incorrecto |
|-----------|----------------|-------------|---------------|
| `edad` | NUMBER | `edad:25` | `edad:"25"` |
| `activo` | BOOLEAN | `activo:verdadero` | `activo:"si"` |
| `nombre` | STRING | `nombre:"Ana"` | `nombre:Ana` |

---

## Ejemplos Prácticos

### Ejemplo 1: Objeto Simple

**Entrada:**

```text
crear objeto producto con titulo:"Laptop", precio:1200
```

**Salida:**

```json
{
  "producto": {
    "titulo": "Laptop",
    "precio": 1200
  }
}
```

---

### Ejemplo 2: Múltiples Objetos

**Entrada:**

```text
crear objeto usuario con nombre:"María", edad:28
crear objeto configuracion con tema:"claro", activo:verdadero
```

**Salida:**

```json
{
  "usuario": {
    "nombre": "María",
    "edad": 28
  },
  "configuracion": {
    "tema": "claro",
    "activo": true
  }
}
```

---

### Ejemplo 3: Propiedades Mixtas

**Entrada:**

```text
crear objeto empleado con nombre:"Carlos", edad:35, activo:verdadero, salario:5000
```

**Salida:**

```json
{
  "empleado": {
    "nombre": "Carlos",
    "edad": 35,
    "activo": true,
    "salario": 5000
  }
}
```

---

## Solución de Problemas

### Diagrama de Diagnóstico

```mermaid
flowchart TD
    Start{¿Hay un error?} -->|Sí| Type{¿Qué tipo?}
    Start -->|No| Success[✅ Todo bien!]
    
    Type -->|Sintaxis| Syntax[Revisa palabras clave]
    Type -->|Tipo| TypeCheck[Verifica tipos de datos]
    Type -->|Duplicado| Duplicate[Cambia nombre de objeto]
    
    Syntax --> Fix[Corregir código]
    TypeCheck --> Fix
    Duplicate --> Fix
    
    Fix --> Start
    
    style Success fill:#d4edda
    style Type fill:#fff3cd
```

### Errores Comunes

#### ❌ Error: "Palabra reservada"

**Problema:**

```text
crear objeto crear con id:1
```

**Causa:** `crear` es una palabra reservada.

**Solución:**

```text
crear objeto registro con id:1
```

---

#### ❌ Error: "Tipo incorrecto para 'edad'"

**Problema:**

```text
crear objeto persona con edad:"veinticinco"
```

**Causa:** `edad` debe ser un número.

**Solución:**

```text
crear objeto persona con edad:25
```

---

#### ❌ Error: "Objeto ya declarado"

**Problema:**

```text
crear objeto usuario con nombre:"Ana"
crear objeto usuario con nombre:"Pedro"
```

**Causa:** No puedes declarar el mismo nombre dos veces.

**Solución:**

```text
crear objeto usuario1 con nombre:"Ana"
crear objeto usuario2 con nombre:"Pedro"
```

---

### Tabla de Referencia Rápida

| Síntoma | Causa Probable | Solución |
|---------|----------------|----------|
| El servidor no inicia | Puerto 3000 ocupado | Cambiar puerto o liberar el 3000 |
| No aparece JSON | Error de sintaxis | Revisar panel de errores |
| JSON incorrecto | Tipos mal asignados | Verificar tipos de propiedades especiales |
| "Syntax Error" | Falta palabra clave | Revisar sintaxis básica |

---

## Preguntas Frecuentes

**Q: ¿Puedo usar mayúsculas en nombres?**  
A: Sí, los nombres son case-sensitive: `Usuario` ≠ `usuario`.

**Q: ¿Cuántos objetos puedo crear?**  
A: No hay límite, pero cada uno debe tener un nombre único.

**Q: ¿Funciona sin internet?**  
A: Sí, una vez instalado funciona completamente offline.

---

## Recursos Adicionales

- 📖 [Manual Técnico](Manual_Tecnico.md) - Para desarrolladores
- 📁 [Ejemplos válidos](../../examples/valid)
- 📁 [Ejemplos con errores](../../examples/invalid)

### Soporte

¿Tienes preguntas?

📧 Email: a2203330170@alumnos.uat.edu.mx | a2203330125@alumnos.uat.edu.mx

---

> [!TIP]
> **Pro Tip:** Usa `Ctrl+Enter` para compilar rápidamente sin usar el mouse. ⚡

---

## 🤖 Asistencia con IA

¿Tienes dudas sobre cómo usar el compilador o quieres entender mejor cómo funciona?

Puedes hacer preguntas directamente a nuestra IA entrenada con todo el código y documentación de este proyecto.

👉 **[Preguntar a la IA del Proyecto](https://deepwiki.com/CarlosVerasteguii/natural-to-json-compiler-web)**

La IA (Devian) tiene acceso a todo el repositorio indexado y puede ayudarte a:
- Entender errores específicos.
- Generar ejemplos de código.
- Explicar partes de la documentación.

