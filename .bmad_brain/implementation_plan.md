## Phase 1: Foundation & Navigation [x]
1.  **Layout Setup**:
    -   [x] Create `src/components/Layout/Navbar.tsx`.
    -   [x] Define routes: `/`, `/pipeline`, `/tests`, `/docs`.
2.  **Global State**:
    -   [x] Create a Context (`CompilerContext`) to store:
        -   `sourceCode`: string
        -   `compilationResult`: object (Tokens, ParseTree, SymbolTable, IR, OptimizedIR, Output, Errors).
    -   This allows the "Pipeline" view to visualize what was compiled in the "Home" view.

## Phase 2: Core Views Implementation [x]
### 2.1 Home / Compiler Studio (`/`) [x]
-   **Components**: `CodeEditor` (Monaco/Textarea), `JsonViewer`, `ErrorPanel`.
-   **Logic**: Connect "Compile" button to `analyzer.ts`. Update `CompilerContext`.

### 2.2 Pipeline Inspector (`/pipeline`) [x]
-   **Components**:
    -   `TokenList`: Table of tokens.
    -   `ParseTreeViewer`: Tree visualization.
    -   `SymbolTableViewer`: Table of symbols/types.
    -   `IRViewer`: Side-by-side view (Raw IR vs. Optimized IR).
-   **Goal**: This is the "Debug" view for the assignment screenshots.

### 2.3 Test Suite (`/tests`) [x]
-   **Refinement**: Use the `TestRunner` planned previously, but ensure it uses the shared `testExamples.ts` data.

### 2.4 Documentation Hub (`/docs`) [x]
-   **Content**: Static pages or PDF viewer for the manuals.
-   **Team Section**: Simple card layout for team members.

## Phase 3: Logic Integration [x]
1.  **Expose Internals**:
    -   [x] Modify `src/lib/analyzer.ts` to return *all* intermediate artifacts (Tokens, Tree, Table, IR), not just the final JSON.
    -   [x] Ensure `optimizer.ts` returns the *diff* or the specific optimized list for comparison.

## Phase 4: Polish & "Wow" Factor
1.  **Styling**: Apply the "Cyber-Academic" theme (Tailwind).
2.  **Animations**: Smooth transitions between pipeline tabs.
