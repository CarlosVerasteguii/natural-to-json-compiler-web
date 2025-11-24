# UX Design Plan: Natural-to-JSON Compiler Web

## Design Philosophy
"Transparency & Visualization". The goal is not just to compile, but to *show* the compilation process. This directly supports the assignment requirement for "Screenshots of the application... in different stages of execution".

## Sitemap & View Structure

### 1. **Home / Compiler Studio** (`/`)
*   **Purpose**: The main workspace for writing code and seeing the result.
*   **Key Features**:
    *   **Split Editor**: Left pane for Natural Language input (Monaco Editor or simple textarea with syntax highlighting). Right pane for JSON Output.
    *   **Action Bar**: "Compile", "Clear", "Load Example".
    *   **Status Bar**: Shows current state (Ready, Compiling, Error).
    *   **Quick Error View**: Inline error markers or a bottom panel showing semantic/syntax errors.

### 2. **Pipeline Inspector** (`/pipeline`) **[CRITICAL FOR ASSIGNMENT]**
*   **Purpose**: Visualize the internal phases of the compiler. This is the "money shot" for the assignment screenshots.
*   **Layout**: Tabs or a Stepper interface for each phase:
    1.  **Lexical**: Show the stream of Tokens (Type, Value, Line).
    2.  **Syntax**: Visual Parse Tree (using a tree visualizer library if possible, or indented text).
    3.  **Semantic**: The Symbol Table (Variables, Types, Scopes).
    4.  **Intermediate Code**: The raw IR (Quadruples/Triples).
    5.  **Optimization**: The Optimized IR (highlighting changes/removals).
    6.  **Code Generation**: The final JSON.

### 3. **Test Suite** (`/tests`)
*   **Purpose**: Automated verification of requirements.
*   **Features**:
    *   Sidebar list of pre-loaded examples (Valid vs. Invalid).
    *   "Run All" button.
    *   Pass/Fail indicators.
    *   Detail view showing Input vs. Expected Output vs. Actual Output.

### 4. **Documentation Hub** (`/docs`)
*   **Purpose**: Host the required deliverables and technical info.
*   **Content**:
    *   **User Manual**: Embedded PDF or HTML guide.
    *   **Technical Manual**: BNF Grammar, Semantic Rules explanation.
    *   **Team Info**: List of team members (for the cover page requirement).
    *   **Download Button**: "Download Full Report PDF".

## Aesthetic Direction
*   **Theme**: "Cyber-Academic". Dark mode default.
*   **Colors**:
    *   Primary: Electric Blue (Process flow).
    *   Success: Neon Green (Valid compilation).
    *   Error: Hot Pink/Red (Semantic errors).
    *   Background: Deep Slate/Black.
*   **Typography**: `Inter` for UI, `JetBrains Mono` for code.

## Navigation
A persistent top or side navigation bar:
*   `[Home]`
*   `[Pipeline]`
*   `[Tests]`
*   `[Docs]`

## Alignment with Assignment Rubric
*   **"Detecta y maneja errores complejos"**: The Home and Test views will clearly display error messages.
*   **"Código intermedio optimizable"**: The Pipeline view explicitly shows IR vs. Optimized IR.
*   **"Capturas de pantalla... en distintas etapas"**: The Pipeline view is designed specifically to generate these screenshots easily.
*   **"Documentación Técnica"**: The Docs view makes this accessible within the app itself.
