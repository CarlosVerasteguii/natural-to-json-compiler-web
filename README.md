# Natural to JSON Compiler Web

Un compilador completo que traduce lenguaje natural a formato JSON, implementando análisis semántico, generación de código intermedio, código final y optimización.

## Información del Curso

- **Materia:** Compiladores 2
- **Institución:** Universidad Autonoma de Tamaulipas
- **Semestre:** Noveno semestre
- **Profesor:** Dr. Dante Adolfo Muñoz Quintero

## Integrantes del Equipo

- **Carlos Verastegui Cruz**
- **Roberto Chavez Lopez**

## Estructura del Proyecto

El proyecto sigue la siguiente estructura de directorios:

- `src/`: Código fuente de la aplicación Next.js y lógica del compilador (`src/lib`).
- `docs/`: Documentación técnica y de usuario.
- `examples/`: Ejemplos de entrada/salida.
  - `valid/`: Casos de prueba válidos.
  - `invalid/`: Casos con errores intencionales.
  - `expected/`: Salidas JSON esperadas.
- `tests/`: Pruebas automatizadas (Unitarias y de Integración).
- `lib/`: Librerías externas (Referencia).
- `Makefile`: Script de construcción y automatización.

## Requisitos y Dependencias

- **Node.js**: v18 o superior.
- **NPM**: Gestor de paquetes.
- **Java**: Requerido si se necesita regenerar la gramática ANTLR (opcional para ejecución).

## Instrucciones de Compilación y Ejecución

### Usando Makefile (Recomendado)

1. **Instalar dependencias:**

   ```bash
   make install
   ```

2. **Compilar el proyecto:**

   ```bash
   make build
   ```

3. **Ejecutar pruebas:**

   ```bash
   make test
   ```

### Ejecución en Desarrollo

Para levantar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Ejemplos de Uso

### Entrada (Lenguaje Natural)

```text
crear objeto usuario con nombre:"Juan", edad:25
```

### Salida (JSON)

```json
{
  "usuario": {
    "nombre": "Juan",
    "edad": 25
  }
}
```

Para más detalles, consulte el [Manual de Usuario](docs/Manual_Usuario.md).
