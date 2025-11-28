# 🚀 Manual de Usuario - Natural to JSON Compiler

> **👤 Audiencia:** Usuarios sin conocimientos técnicos
> **🎯 Objetivo:** Aprender a usar el compilador en 10 minutos
> **⏱️ Lectura estimada:** 10-15 minutos

---

## 📋 Guía Rápida de Navegación

```
¿Primero vez aquí?        → Lee "¿Qué es esto?" + "Instalación Rápida"
¿Necesitas empezar?       → Ve a "Guía Visual de Uso"
¿Aprender la sintaxis?    → Salta a "Sintaxis del Lenguaje"
¿Ver ejemplos?            → Busca "Ejemplos Prácticos"
¿Tienes un error?         → Consulta "Solución de Problemas"
```

---

## 🎯 ¿Qué es esto?

### El Compilador Natural to JSON

```
┌──────────────────────────────────────┐
│  Natural to JSON Compiler Studio     │
├──────────────────────────────────────┤
│                                      │
│  Herramienta web que convierte:     │
│                                      │
│  📝 Texto en español → 📤 JSON       │
│                                      │
│  ¡Automáticamente y en tiempo real!  │
│                                      │
└──────────────────────────────────────┘
```

🚀 **[Probar Demo en Vivo](https://natural-to-json-compiler-web.vercel.app/)**

### ¿Para Qué Sirve?

| Caso de Uso | Descripción | Ejemplo |
|:---|:---|:---|
| 🏢 **Datos de empresa** | Crear estructuras JSON para apps | Usuario con edad y nombre |
| 📊 **Configuración** | Generar archivos de config | Tema claro/oscuro, activo/inactivo |
| 🤖 **APIs** | Preparar JSON para APIs | Enviar datos a un servidor |
| 📱 **Apps móviles** | Datos para aplicaciones | Perfiles, productos, etc |
| 🧪 **Testing** | Generar datos de prueba | Test data sin escribir JSON manual |

### Ventajas

```
✅ SIN SINTAXIS COMPLEJA  → Escribes como hablas
✅ SIN ERRORES JSON       → El compilador valida todo
✅ MÁS RÁPIDO            → Genera código en segundos
✅ GRATIS                → 100% gratuito
✅ OFFLINE               → Funciona sin internet
✅ EN ESPAÑOL            → Tu lenguaje natural
```

---

## 📦 Instalación Rápida

### ✅ Requisitos Previos

```
Necesitas tener instalado:

├─ Node.js v18 o superior
│  └─→ Descargar en: https://nodejs.org/
│
└─ Terminal de comandos (CMD, PowerShell, Terminal, etc.)
   └─→ Ya la tienes en tu sistema
```

### 🔧 Instalación - 4 Pasos

#### Paso 1️⃣ → Descargar el Proyecto

```bash
# Opción A: Clonar desde repositorio
git clone https://github.com/CarlosVerasteguii/natural-to-json-compiler-web
cd natural-to-json-compiler-web

# Opción B: Descargar ZIP
# 1. Ve a GitHub
# 2. Haz clic en "Code" → "Download ZIP"
# 3. Descomprime el archivo
# 4. Abre terminal en esa carpeta
```

#### Paso 2️⃣ → Abre una Terminal

```bash
# En Windows:
# Windows + R → cmd
# O: Click derecho en carpeta → "Abrir terminal aquí"

# En Mac/Linux:
# Ctrl + Alt + T
```

#### Paso 3️⃣ → Ejecuta la Instalación

```bash
# Opción A: CON Make (Recomendado - más simple)
make install
npm run dev

# Opción B: SIN Make (Manual)
npm install
npm run dev

# Opción C: Con Yarn (Si lo prefieres)
yarn install
yarn dev
```

#### Paso 4️⃣ → ¡Abre en el Navegador!

```
Deberías ver algo como:

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

👉 Abre este URL en tu navegador: http://localhost:3000
```

### ✨ ¿Qué Ver?

```
Si ves:  "Ready on http://localhost:3000" ✅

Entonces:
  1. Abre tu navegador
  2. Escribe: localhost:3000
  3. ¡Listo! El compilador está funcionando
```

### 🐛 Problemas de Instalación

| ❌ Problema | 💡 Solución |
|:---|:---|
| **"Command not found: npm"** | Node.js no está instalado. Descárgalo e instálalo |
| **"Puerto 3000 en uso"** | Otro programa usa el puerto. Ciérra lo o cambia puerto |
| **"Permission denied"** | Usa `sudo` (Mac/Linux) o abre terminal como admin |
| **"No se abre el navegador"** | Cópialo manualmente: `http://localhost:3000` |

---

## 🎨 Guía Visual de Uso

### 🖥️ La Interfaz del Compilador

```
┌─────────────────────────────────────────────────────────────────┐
│                    NATURAL TO JSON COMPILER                     │
├────────────────────────┬─────────────────────────────────────────┤
│                        │                                         │
│   📝 EDITOR            │         📄 PANEL DE SALIDA             │
│   de código            │                                         │
│                        │  {                                      │
│ crear objeto user      │    "usuario": {                        │
│ con nombre:"Juan"      │      "nombre": "Juan",                 │
│ edad:30                │      "edad": 30                        │
│                        │    }                                    │
│  [Compilar] Ctrl+Ent   │  }                                      │
│                        │                                         │
├────────────────────────┴─────────────────────────────────────────┤
│  ⚠️  PANEL DE ERRORES (si hay)                                   │
│  ────────────────────────────────────────                        │
│  (Mostrado solo si hay problemas)                                │
└─────────────────────────────────────────────────────────────────┘
```

### 📊 Componentes Principales

| 🎯 Componente | 📍 Ubicación | 🎯 Función |
|:---|:---|:---|
| **📝 Editor** | Lado izquierdo | Escribes tu código aquí |
| **▶️ Botón Compilar** | Bajo el editor | Procesa el código |
| **📄 Salida JSON** | Lado derecho | Muestra el resultado |
| **⚠️ Errores** | Abajo (si los hay) | Muestra problemas |

### 🔄 El Flujo de Trabajo

```
🚀 INICIO

    ↓

1️⃣  ESCRIBIR
    └─→ Escribe en el editor (lado izquierdo)
        "crear objeto usuario con nombre:"Juan""

    ↓

2️⃣  COMPILAR
    └─→ Haz clic en "Compilar" o presiona Ctrl+Enter

    ↓

3️⃣  ESPERAR
    └─→ El compilador procesa tu código

    ↓

❓ ¿HAY ERRORES?
    │
    ├─→ SÍ: Ve al panel de errores
    │       Corrige y compila de nuevo
    │
    └─→ NO: Continúa

    ↓

4️⃣  VER RESULTADO
    └─→ El JSON aparece en el panel derecho

    ↓

5️⃣  COPIAR O DESCARGAR
    └─→ Copiar al portapapeles o descargar

    ↓

✅ ¡LISTO!
```

### 👣 Ejemplo Paso a Paso

#### Escribir el Código

```
En el editor izquierdo, escribe EXACTAMENTE esto:

    crear objeto usuario con nombre:"Ana", edad:25
```

#### Compilar

```
1. Haz clic en el botón "Compilar"
   O presiona: Ctrl + Enter (Windows/Linux)
   O presiona: Cmd + Enter (Mac)
```

#### Ver el Resultado

```
El panel derecho mostrará:

{
  "usuario": {
    "nombre": "Ana",
    "edad": 25
  }
}
```

---

## 🔤 Sintaxis del Lenguaje

### 📖 Estructura Básica

Todo código sigue este patrón:

```
crear  →  objeto  →  NOMBRE  →  con  →  propiedades
─────     ────────    ───────    ───    ────────────
palabra   tipo de       nombre    conexión  atributos
clave     dato                           (pares clave-valor)
```

### 🔑 Palabras Clave (Keywords)

Son palabras **especiales** que el compilador reconoce:

| Palabra | ¿Qué hace? | Ejemplo de uso |
|:---|:---|:---|
| **`crear`** | Inicia una declaración | `crear objeto...` |
| **`objeto`** | Define un objeto | `...objeto usuario...` |
| **`con`** | Introduce propiedades | `...con nombre:"Ana"` |

> **⚠️ Nota:** Estas palabras son RESERVADAS. No puedes usarlas como nombres.

### 📦 Tipos de Datos

El compilador soporta **3 tipos principales**:

#### 1️⃣ STRING (Texto)

```
┌─────────────────────────┐
│ STRING = Texto          │
├─────────────────────────┤
│ Entre comillas           │
│ Puede contener letras   │
│ números y símbolos      │
└─────────────────────────┘

Ejemplos:
  nombre:"Juan"
  ciudad:"Madrid"
  email:"user@example.com"
  descripcion:"Texto con espacios y símbolos!"
```

#### 2️⃣ NUMBER (Número)

```
┌─────────────────────────┐
│ NUMBER = Número         │
├─────────────────────────┤
│ SIN comillas             │
│ Pueden ser enteros o     │
│ decimales                │
│ Pueden ser negativos     │
└─────────────────────────┘

Ejemplos:
  edad:25
  precio:99.99
  temperatura:-5
  cantidad:1000
```

#### 3️⃣ BOOLEAN (Verdadero/Falso)

```
┌─────────────────────────┐
│ BOOLEAN = Sí/No         │
├─────────────────────────┤
│ Dos valores posibles:    │
│ ✅ verdadero (true)     │
│ ❌ falso (false)        │
└─────────────────────────┘

Ejemplos:
  activo:verdadero
  premium:falso
  aprobado:verdadero
  bloqueado:falso
```

### 🎯 Propiedades Especiales con Tipo Fijo

Algunas propiedades **SIEMPRE** deben ser de un tipo específico:

```
╔════════════════════════════════════════════════════════╗
║          PROPIEDADES ESPECIALES Y SUS TIPOS            ║
╠═════════════╦═════════════════╦═════════════╦═════════╣
║ Propiedad   ║ Tipo Requerido  ║ ✅ Correcto ║ ❌ MAL  ║
╠═════════════╬═════════════════╬═════════════╬═════════╣
║ nombre      ║ STRING          ║ "Juan"      ║ Juan    ║
╠═════════════╬═════════════════╬═════════════╬═════════╣
║ edad        ║ NUMBER          ║ 25          ║ "25"    ║
╠═════════════╬═════════════════╬═════════════╬═════════╣
║ activo      ║ BOOLEAN         ║ verdadero   ║ "sí"    ║
╠═════════════╬═════════════════╬═════════════╬═════════╣
║ email       ║ STRING          ║ "a@b.com"   ║ a@b.com ║
╚═════════════╩═════════════════╩═════════════╩═════════╝
```

### 📏 Sintaxis Completa

```
Estructura de una declaración:

crear objeto NOMBRE con propiedad1:valor1, propiedad2:valor2, ...

Donde:
  - NOMBRE = Identificador único (sin espacios, sin números al inicio)
  - propiedadN = Nombre de la propiedad
  - valorN = Valor (STRING, NUMBER o BOOLEAN)
  - Las propiedades se separan con comas
  - Al final NO se pone punto ni coma
```

---

## 💡 Ejemplos Prácticos

### ✅ Ejemplo 1: Objeto Simple

**Lo que quieres:** Un objeto llamado "producto" con título y precio

**Código:**

```text
crear objeto producto con titulo:"Laptop", precio:1200
```

**Resultado JSON:**

```json
{
  "producto": {
    "titulo": "Laptop",
    "precio": 1200
  }
}
```

**Explicación:**
- Objeto: `producto`
- Propiedades:
  - `titulo` (STRING): `"Laptop"`
  - `precio` (NUMBER): `1200`

---

### ✅ Ejemplo 2: Dos Objetos Diferentes

**Lo que quieres:** Usuario + Configuración en el mismo JSON

**Código:**

```text
crear objeto usuario con nombre:"María", edad:28, activo:verdadero
crear objeto configuracion con tema:"claro", idioma:"español"
```

**Resultado JSON:**

```json
{
  "usuario": {
    "nombre": "María",
    "edad": 28,
    "activo": true
  },
  "configuracion": {
    "tema": "claro",
    "idioma": "español"
  }
}
```

**Explicación:**
- Dos declaraciones separadas
- Cada una crea un objeto diferente
- Ambos aparecen en el JSON final

---

### ✅ Ejemplo 3: Objeto con Propiedades Mixtas

**Lo que quieres:** Empleado con todos los tipos de datos

**Código:**

```text
crear objeto empleado con nombre:"Carlos", edad:35, activo:verdadero, salario:5000, departamento:"IT"
```

**Resultado JSON:**

```json
{
  "empleado": {
    "nombre": "Carlos",
    "edad": 35,
    "activo": true,
    "salario": 5000,
    "departamento": "IT"
  }
}
```

---

### ✅ Ejemplo 4: Objeto Simple con una Propiedad

**Lo que quieres:** Algo minimalista

**Código:**

```text
crear objeto mensaje con contenido:"Hola Mundo"
```

**Resultado JSON:**

```json
{
  "mensaje": {
    "contenido": "Hola Mundo"
  }
}
```

---

### ✅ Ejemplo 5: Datos de una Tienda

**Lo que quieres:** Producto con múltiples detalles

**Código:**

```text
crear objeto articulo con nombre:"iPhone 15", precio:999, stock:50, disponible:verdadero
```

**Resultado JSON:**

```json
{
  "articulo": {
    "nombre": "iPhone 15",
    "precio": 999,
    "stock": 50,
    "disponible": true
  }
}
```

---

## 🐛 Solución de Problemas

### 🔍 ¿Tu código tiene error?

```
¿Hay error?
    │
    ├─→ NO: ¡Excelente! ✅ Tu JSON es válido
    │
    └─→ SÍ: Mira el panel de errores
            Busca el error en la tabla abajo
            Corrige y compila de nuevo
```

### ❌ Errores Comunes

#### Error 1: "Palabra reservada"

```
❌ PROBLEMA:
   crear objeto crear con id:1

💡 CAUSA:
   "crear" es una palabra reservada del compilador
   No puedes usarla como nombre de objeto

✅ SOLUCIÓN:
   crear objeto registro con id:1
   crear objeto formulario con id:1
   crear objeto elemento con id:1
```

---

#### Error 2: "Tipo incorrecto para 'edad'"

```
❌ PROBLEMA:
   crear objeto persona con edad:"veinticinco"

💡 CAUSA:
   - "edad" SIEMPRE debe ser un número
   - Escribiste un texto: "veinticinco"
   - El compilador espera: 25 (sin comillas)

✅ SOLUCIÓN:
   crear objeto persona con edad:25
```

---

#### Error 3: "Tipo incorrecto para 'nombre'"

```
❌ PROBLEMA:
   crear objeto usuario con nombre:Juan

💡 CAUSA:
   - "nombre" SIEMPRE debe ser texto (STRING)
   - Escribiste sin comillas: Juan
   - El compilador espera: "Juan" (CON comillas)

✅ SOLUCIÓN:
   crear objeto usuario con nombre:"Juan"
```

---

#### Error 4: "Objeto ya declarado"

```
❌ PROBLEMA:
   crear objeto usuario con nombre:"Ana"
   crear objeto usuario con nombre:"Pedro"

💡 CAUSA:
   - No puedes crear dos objetos con el MISMO nombre
   - "usuario" se declaró dos veces

✅ SOLUCIÓN:
   crear objeto usuario1 con nombre:"Ana"
   crear objeto usuario2 con nombre:"Pedro"

   O:
   crear objeto usuarioAna con nombre:"Ana"
   crear objeto usuarioPedro con nombre:"Pedro"
```

---

#### Error 5: "Tipo incorrecto para 'activo'"

```
❌ PROBLEMA:
   crear objeto config con activo:"sí"

💡 CAUSA:
   - "activo" es BOOLEAN (solo verdadero/falso)
   - Escribiste: "sí" (que es un texto)
   - El compilador espera: verdadero o falso

✅ SOLUCIÓN:
   crear objeto config con activo:verdadero
   O:
   crear objeto config con activo:falso
```

---

### 📋 Tabla de Diagnóstico Rápido

| 🔴 Error | 📍 Dónde Aparece | 🔧 Qué Revisar | ✅ Solución Típica |
|:---|:---|:---|:---|
| **"Syntax Error"** | Panel de errores | Palabras clave mal escritas | Revisa ortografía |
| **"Token"** | Panel de errores | Carácter no reconocido | Usa caracteres válidos |
| **"Tipo incorrecto"** | Panel de errores | Tipo de datos mal | Verifica tabla de tipos |
| **"Ya declarado"** | Panel de errores | Nombre duplicado | Usa nombre único |
| **No aparece JSON** | Panel derecho vacío | Error grave | Abre consola (F12) |
| **JSON extraño** | Panel derecho | Lógica incorrecta | Revisa tu código |

### 🛠️ Pasos para Resolver Errores

```
1️⃣  Lee el error cuidadosamente
    └─→ ¿Qué palabra falta? ¿Qué está mal?

2️⃣  Busca el error en la tabla arriba
    └─→ Coincide con tu situación?

3️⃣  Aplica la solución
    └─→ Modifica tu código

4️⃣  Compila de nuevo
    └─→ Presiona Ctrl+Enter

5️⃣  ¿Funcionó?
    └─→ SÍ: ¡Excelente! Celebra 🎉
    └─→ NO: Vuelve al paso 1
```

---

## ❓ Preguntas Frecuentes

### ¿Puedo usar mayúsculas en nombres?

```
✅ SÍ, totalmente

Ejemplo:
  crear objeto Usuario con nombre:"Juan"
  crear objeto usuario con nombre:"Juan"

⚠️ NOTA: Usuario ≠ usuario (son diferentes)
```

### ¿Cuántos objetos puedo crear?

```
✅ NO HAY LÍMITE

Puedes crear:
  - 1 objeto
  - 10 objetos
  - 100 objetos
  - 1000 objetos

⚠️ RESTRICCIÓN: Cada uno debe tener NOMBRE ÚNICO
```

### ¿Funciona sin internet?

```
✅ SÍ, completamente offline

Una vez instalado:
  - No necesitas conexión
  - Todo funciona localmente
  - Tu código no se envía a ningún servidor
  - Privacidad total garantizada
```

### ¿Puedo usar espacios en los nombres?

```
❌ NO, no se permite

❌ INCORRECTO:
   crear objeto mi usuario con ...

✅ CORRECTO:
   crear objeto mi_usuario con ...
   crear objeto miUsuario con ...
   crear objeto miusuario con ...
```

### ¿Qué puedo hacer con el JSON?

```
Una vez generado el JSON, puedes:

✅ Copiar al portapapeles
   └─→ Click derecho → Copiar

✅ Descargar archivo
   └─→ Botón "Descargar"

✅ Usar en tu código
   └─→ JavaScript, Python, etc.

✅ Enviar a una API
   └─→ Servidor/base de datos

✅ Guardar en un archivo
   └─→ Crear archivo .json
```

### ¿Es realmente GRATIS?

```
✅ SÍ, 100% GRATIS

✅ Sin publicidad
✅ Sin suscripción
✅ Sin límites de uso
✅ Código abierto (puedes ver el código fuente)
```

---

## 🎓 Tips y Trucos

### ⚡ Atajo de Teclado

```
COMPILAR RÁPIDO:
  - Windows/Linux: Ctrl + Enter
  - Mac: Cmd + Enter

NO NECESITAS usar el mouse cada vez
```

### 🎨 Mejorar la Legibilidad

```
Usa NOMBRES DESCRIPTIVOS:

❌ MAL:
   crear objeto u con n:"Juan"

✅ BIEN:
   crear objeto usuario con nombre:"Juan"

Los nombres largos hacen más claro tu código
```

### 📝 Comentarios

```
El compilador NO soporta comentarios

❌ NO FUNCIONA:
   // crear objeto usuario
   crear objeto usuario con nombre:"Juan"

SOLUCIÓN: Usa nombres claros en lugar de comentarios
```

### 🔄 Reutilizar JSON

```
Puedes copiar el JSON generado y:

1. Usarlo en JavaScript:
   const data = { /* Tu JSON aquí */ }

2. Usarlo en Python:
   import json
   data = json.loads('{ /* Tu JSON aquí */ }')

3. Guardarlo como archivo:
   archivo.json
```

---

## 📚 Recursos Adicionales

### Documentación

| 📖 Recurso | 🎯 Para qué sirve | 🔗 Dónde está |
|:---|:---|:---|
| **Manual Técnico** | Desarrolladores | `docs/Manual_Tecnico.md` |
| **Este Manual** | Usuarios finales | `docs/Manual_Usuario.md` |
| **Ejemplos Válidos** | Ver qué funciona | `examples/valid/` |
| **Ejemplos con Errores** | Aprender de errores | `examples/invalid/` |

### Enlaces Útiles

```
🔗 Documentación de JSON:
   https://www.json.org/

🔗 Validador JSON online:
   https://jsonlint.com/

🔗 Editor JSON online:
   https://jsoncrack.com/

🔗 Playground de este proyecto:
   http://localhost:3000
```

### Soporte

```
¿Tienes preguntas?

📧 Email: a2203330170@alumnos.uat.edu.mx | a2203330125@alumnos.uat.edu.mx
🐛 Reportar bugs: [Especificar repositorio]
💬 Discusiones: [Especificar comunidad]
📞 Chat: [Especificar plataforma]
```

---

## 🚀 Próximos Pasos

### Nivel 1: Principiante

```
1. ✅ Instala el compilador
2. ✅ Crea tu primer objeto simple
3. ✅ Aprende los 3 tipos de datos
4. ✅ Crea 5 ejemplos diferentes
```

### Nivel 2: Intermedio

```
1. ✅ Crea múltiples objetos en el mismo proyecto
2. ✅ Usa todos los tipos de datos juntos
3. ✅ Copia JSON generado a tus proyectos
4. ✅ Experimenta con nombres complejos
```

### Nivel 3: Avanzado

```
1. ✅ Usa el JSON en tus aplicaciones reales
2. ✅ Integra con APIs y bases de datos
3. ✅ Automatiza generación de datos
4. ✅ Contribuye mejoras al proyecto
```

---

## 📊 Cheat Sheet (Referencia Rápida)

### Estructura Básica

```
crear objeto NOMBRE con propiedad1:valor1, propiedad2:valor2
```

### Tipos de Datos Rápido

| Tipo | Sintaxis | Ejemplo |
|:---|:---|:---|
| STRING | Con comillas | `"texto"` |
| NUMBER | Sin comillas | `123` |
| BOOLEAN | verdadero/falso | `verdadero` |

### Ejemplo Completo

```
crear objeto persona con
  nombre:"Juan",
  edad:30,
  activo:verdadero
```

### Propiedades Especiales

```
nombre:        STRING (con comillas)
edad:          NUMBER (sin comillas)
activo:        BOOLEAN (verdadero/falso)
email:         STRING (con comillas)
precio:        NUMBER (sin comillas)
disponible:    BOOLEAN (verdadero/falso)
```

---

**Última actualización:** Noviembre 2024
**Versión:** 1.0.0
**Idioma:** Español

> 💡 **Tip Final:** Tómate tu tiempo en aprender. La mejor manera de dominar es PRACTICANDO.
> Crea ejemplos, comete errores, aprende y ¡mejora! 🚀

---

## 🤖 Asistencia con IA

¿Tienes dudas sobre cómo usar el compilador o quieres entender mejor cómo funciona?

Puedes hacer preguntas directamente a nuestra IA entrenada con todo el código y documentación de este proyecto.

👉 **[Preguntar a la IA del Proyecto](https://deepwiki.com/CarlosVerasteguii/natural-to-json-compiler-web)**

La IA (Devian) tiene acceso a todo el repositorio indexado y puede ayudarte a:
- Entender errores específicos.
- Generar ejemplos de código.
- Explicar partes de la documentación.

