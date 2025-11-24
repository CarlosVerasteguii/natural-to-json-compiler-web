// Generated from src/NaturalToJson.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ProgramaContext } from "./NaturalToJsonParser";
import { ComandoContext } from "./NaturalToJsonParser";
import { Crear_objeto_cmdContext } from "./NaturalToJsonParser";
import { PropiedadesContext } from "./NaturalToJsonParser";
import { PropiedadContext } from "./NaturalToJsonParser";
import { Crear_lista_cmdContext } from "./NaturalToJsonParser";
import { Items_listaContext } from "./NaturalToJsonParser";
import { ValorContext } from "./NaturalToJsonParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `NaturalToJsonParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface NaturalToJsonVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.programa`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrograma?: (ctx: ProgramaContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.comando`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComando?: (ctx: ComandoContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.crear_objeto_cmd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCrear_objeto_cmd?: (ctx: Crear_objeto_cmdContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.propiedades`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropiedades?: (ctx: PropiedadesContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.propiedad`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPropiedad?: (ctx: PropiedadContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.crear_lista_cmd`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCrear_lista_cmd?: (ctx: Crear_lista_cmdContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.items_lista`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitItems_lista?: (ctx: Items_listaContext) => Result;

	/**
	 * Visit a parse tree produced by `NaturalToJsonParser.valor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValor?: (ctx: ValorContext) => Result;
}

