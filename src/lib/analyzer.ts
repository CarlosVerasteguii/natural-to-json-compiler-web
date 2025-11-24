import { CharStreams, CommonTokenStream } from "antlr4ts";
import { NaturalToJsonLexer } from "../generated/NaturalToJsonLexer";
import { NaturalToJsonParser } from "../generated/NaturalToJsonParser";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { SymbolTable } from "./SymbolTable";
import { SemanticListener } from "./SemanticListener";
import { JsonBuilderListener } from "./JsonBuilderListener";
import { IRBuilderListener } from "./IRBuilderListener";
import { generatePythonFromIR } from "./codegen";
import { IRInstruction } from "./irTypes";
import { optimizeIR } from "./optimizer";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

export interface TokenInfo {
  type: string;
  text: string;
  line: number;
}

export interface AnalysisResult {
  json: any; // Return object, not string
  pythonCode: string | null;
  errors: string[];
  tokens: TokenInfo[];
  symbolTable: any;
  rawIr: IRInstruction[];
  optimizedIr: IRInstruction[];
}

const walk = (
  listener: ParseTreeListener,
  tree: ReturnType<NaturalToJsonParser["programa"]>
) => {
  ParseTreeWalker.DEFAULT.walk(listener, tree);
};

export function analyze(input: string): AnalysisResult {
  const chars = CharStreams.fromString(input);
  const lexer = new NaturalToJsonLexer(chars);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new NaturalToJsonParser(tokenStream);

  // Add custom error listener to catch syntax errors
  const syntaxErrors: string[] = [];
  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError: (recognizer, offendingSymbol, line, charPositionInLine, msg, e) => {
      syntaxErrors.push(`Syntax Error at line ${line}:${charPositionInLine} - ${msg}`);
    }
  });

  const tree = parser.programa();

  // Extract tokens with details
  const tokens: TokenInfo[] = tokenStream.getTokens().map((t) => ({
    type: NaturalToJsonLexer.VOCABULARY.getSymbolicName(t.type) || "UNK",
    text: t.text || "",
    line: t.line,
  })).filter(t => t.type !== "EOF");

  if (syntaxErrors.length > 0) {
    return {
      json: null,
      pythonCode: null,
      errors: syntaxErrors,
      tokens,
      symbolTable: {},
      rawIr: [],
      optimizedIr: [],
    };
  }

  const symbolTable = new SymbolTable();
  const semanticListener = new SemanticListener(symbolTable);

  walk(semanticListener, tree);

  const semanticErrors = semanticListener.getErrors();

  if (semanticErrors.length > 0) {
    return {
      json: null,
      pythonCode: null,
      errors: semanticErrors,
      tokens,
      symbolTable: symbolTable.getSymbols(), // Expose partial symbol table even on error
      rawIr: [],
      optimizedIr: [],
    };
  }

  const jsonBuilder = new JsonBuilderListener();
  walk(jsonBuilder, tree);

  const irBuilder = new IRBuilderListener();
  walk(irBuilder, tree);

  const rawIR = irBuilder.getInstructions();
  const optimizedIR = optimizeIR(rawIR);
  const pythonCode = generatePythonFromIR(optimizedIR);
  const jsonResult = jsonBuilder.getResult();

  return {
    json: jsonResult,
    pythonCode,
    errors: [],
    tokens,
    symbolTable: symbolTable.getSymbols(),
    rawIr: rawIR,
    optimizedIr: optimizedIR,
  };
}
