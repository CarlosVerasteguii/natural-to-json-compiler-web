// Generated from src/NaturalToJson.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramaContext } from "./NaturalToJsonParser";
import { ComandoContext } from "./NaturalToJsonParser";
import { Crear_objeto_cmdContext } from "./NaturalToJsonParser";
import { PropiedadesContext } from "./NaturalToJsonParser";
import { PropiedadContext } from "./NaturalToJsonParser";
import { Crear_lista_cmdContext } from "./NaturalToJsonParser";
import { Items_listaContext } from "./NaturalToJsonParser";
import { ValorContext } from "./NaturalToJsonParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `NaturalToJsonParser`.
 */
export interface NaturalToJsonListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.programa`.
	 * @param ctx the parse tree
	 */
	enterPrograma?: (ctx: ProgramaContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.programa`.
	 * @param ctx the parse tree
	 */
	exitPrograma?: (ctx: ProgramaContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.comando`.
	 * @param ctx the parse tree
	 */
	enterComando?: (ctx: ComandoContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.comando`.
	 * @param ctx the parse tree
	 */
	exitComando?: (ctx: ComandoContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.crear_objeto_cmd`.
	 * @param ctx the parse tree
	 */
	enterCrear_objeto_cmd?: (ctx: Crear_objeto_cmdContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.crear_objeto_cmd`.
	 * @param ctx the parse tree
	 */
	exitCrear_objeto_cmd?: (ctx: Crear_objeto_cmdContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.propiedades`.
	 * @param ctx the parse tree
	 */
	enterPropiedades?: (ctx: PropiedadesContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.propiedades`.
	 * @param ctx the parse tree
	 */
	exitPropiedades?: (ctx: PropiedadesContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.propiedad`.
	 * @param ctx the parse tree
	 */
	enterPropiedad?: (ctx: PropiedadContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.propiedad`.
	 * @param ctx the parse tree
	 */
	exitPropiedad?: (ctx: PropiedadContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.crear_lista_cmd`.
	 * @param ctx the parse tree
	 */
	enterCrear_lista_cmd?: (ctx: Crear_lista_cmdContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.crear_lista_cmd`.
	 * @param ctx the parse tree
	 */
	exitCrear_lista_cmd?: (ctx: Crear_lista_cmdContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.items_lista`.
	 * @param ctx the parse tree
	 */
	enterItems_lista?: (ctx: Items_listaContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.items_lista`.
	 * @param ctx the parse tree
	 */
	exitItems_lista?: (ctx: Items_listaContext) => void;

	/**
	 * Enter a parse tree produced by `NaturalToJsonParser.valor`.
	 * @param ctx the parse tree
	 */
	enterValor?: (ctx: ValorContext) => void;
	/**
	 * Exit a parse tree produced by `NaturalToJsonParser.valor`.
	 * @param ctx the parse tree
	 */
	exitValor?: (ctx: ValorContext) => void;
}

