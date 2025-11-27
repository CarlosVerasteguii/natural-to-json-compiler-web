# 📂 Ejemplos de Código - Natural to JSON

Bienvenido a la suite de ejemplos del compilador. Aquí encontrarás casos de uso diseñados meticulosamente para demostrar las capacidades del lenguaje y los mecanismos de validación del compilador.

## 🗺️ Estructura del Directorio

| Directorio | Descripción |
|------------|-------------|
| [`valid/`](./valid/) | **Casos Exitosos**: Código sintácticamente correcto que compila a JSON. |
| [`invalid/`](./invalid/) | **Casos de Error**: Código diseñado para fallar y probar las validaciones. |
| [`expected/`](./expected/) | **Resultados**: El JSON exacto que debe generar cada caso válido. |

---

## 🧪 Catálogo de Ejemplos

### 1. Conceptos Básicos

**Archivo:** [`valid/caso_simple.txt`](./valid/caso_simple.txt)
> **Objetivo:** Demostrar la sintaxis mínima para crear objetos.
>
> **¿Qué aprenderás?**
>
> - Cómo declarar un objeto simple.
> - Uso de tipos básicos (`STRING`, `NUMBER`, `BOOLEAN`).

### 2. Estructuras Complejas

**Archivo:** [`valid/complejo.txt`](./valid/complejo.txt)
> **Objetivo:** Probar la robustez del parser con múltiples definiciones y tipos mixtos.
>
> **Características:**
>
> - Múltiples sentencias en un archivo.
> - Uso de identificadores con `snake_case`.
> - Mezcla de enteros y decimales.

### 3. Listas y Arrays

**Archivo:** [`valid/listas.txt`](./valid/listas.txt)
> **Objetivo:** Enseñar la sintaxis de colecciones.
>
> **Sintaxis Clave:** `CREAR LISTA ... CON ELEMENTOS ...`

---

## ⚠️ Casos de Prueba de Errores (Invalid)

Estos archivos son cruciales para entender qué **NO** hacer y cómo el compilador te protege.

| Archivo | Tipo de Error | Descripción |
|---------|---------------|-------------|
| [`errores_tipo.txt`](./invalid/errores_tipo.txt) | **Semántico** | Intento de asignar un número a un campo de texto o viceversa. |
| [`sintaxis_lista.txt`](./invalid/sintaxis_lista.txt) | **Sintáctico** | Errores en la estructura gramatical (falta de palabras clave). |
| [`valor_invalido.txt`](./invalid/valor_invalido.txt) | **Léxico/Semántico** | Uso de identificadores no definidos como valores. |

---

## 🚀 Cómo probar estos ejemplos

1. Copia el contenido de cualquier archivo `.txt` en `valid/`.
2. Pégalo en el editor del compilador.
3. Compara el resultado con su contraparte en `expected/`.
