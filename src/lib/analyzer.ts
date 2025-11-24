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

export interface AnalysisResult {
  json: string | null;
  pythonCode: string | null;
  errors: string[];
  tokens: string[];
  ir: IRInstruction[];
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

  const tree = parser.programa();

  const symbolTable = new SymbolTable();
  const semanticListener = new SemanticListener(symbolTable);

  walk(semanticListener, tree);

  const semanticErrors = semanticListener.getErrors();

  const tokens = tokenStream
    .getTokens()
    .filter((t) => t.text && t.text !== "<EOF>")
    .map((t) => {
      const name =
        NaturalToJsonLexer.VOCABULARY.getSymbolicName(t.type) ?? "UNK";
      return `[${name}] '${t.text}'`;
    });

  if (semanticErrors.length > 0) {
    return {
      json: null,
      pythonCode: null,
      errors: semanticErrors,
      tokens,
      ir: [],
    };
  }

  const jsonBuilder = new JsonBuilderListener();
  walk(jsonBuilder, tree);

  const irBuilder = new IRBuilderListener();
  walk(irBuilder, tree);

  const rawIR = irBuilder.getInstructions();
  const optimizedIR = optimizeIR(rawIR);
  const pythonCode = generatePythonFromIR(optimizedIR);
  const jsonString = JSON.stringify(jsonBuilder.getResult(), null, 2);

  return {
    json: jsonString,
    pythonCode,
    errors: [],
    tokens,
    ir: optimizedIR,
  };
}
