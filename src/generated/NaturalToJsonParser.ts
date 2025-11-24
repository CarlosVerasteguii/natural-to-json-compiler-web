// Generated from src/NaturalToJson.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { NaturalToJsonListener } from "./NaturalToJsonListener";
import { NaturalToJsonVisitor } from "./NaturalToJsonVisitor";


export class NaturalToJsonParser extends Parser {
	public static readonly CREAR = 1;
	public static readonly OBJETO = 2;
	public static readonly LISTA = 3;
	public static readonly CON = 4;
	public static readonly ELEMENTOS = 5;
	public static readonly KW_VERDADERO = 6;
	public static readonly KW_FALSO = 7;
	public static readonly IDENTIFICADOR = 8;
	public static readonly STRING = 9;
	public static readonly NUMERO_DECIMAL = 10;
	public static readonly NUMERO_ENTERO = 11;
	public static readonly DOS_PUNTOS = 12;
	public static readonly COMA = 13;
	public static readonly COMENTARIO_LINEA = 14;
	public static readonly WHITESPACE = 15;
	public static readonly RULE_programa = 0;
	public static readonly RULE_comando = 1;
	public static readonly RULE_crear_objeto_cmd = 2;
	public static readonly RULE_propiedades = 3;
	public static readonly RULE_propiedad = 4;
	public static readonly RULE_crear_lista_cmd = 5;
	public static readonly RULE_items_lista = 6;
	public static readonly RULE_valor = 7;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"programa", "comando", "crear_objeto_cmd", "propiedades", "propiedad", 
		"crear_lista_cmd", "items_lista", "valor",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, "':'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CREAR", "OBJETO", "LISTA", "CON", "ELEMENTOS", "KW_VERDADERO", 
		"KW_FALSO", "IDENTIFICADOR", "STRING", "NUMERO_DECIMAL", "NUMERO_ENTERO", 
		"DOS_PUNTOS", "COMA", "COMENTARIO_LINEA", "WHITESPACE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(NaturalToJsonParser._LITERAL_NAMES, NaturalToJsonParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return NaturalToJsonParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "NaturalToJson.g4"; }

	// @Override
	public get ruleNames(): string[] { return NaturalToJsonParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return NaturalToJsonParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(NaturalToJsonParser._ATN, this);
	}
	// @RuleVersion(0)
	public programa(): ProgramaContext {
		let _localctx: ProgramaContext = new ProgramaContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, NaturalToJsonParser.RULE_programa);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 19;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === NaturalToJsonParser.CREAR) {
				{
				{
				this.state = 16;
				this.comando();
				}
				}
				this.state = 21;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 22;
			this.match(NaturalToJsonParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comando(): ComandoContext {
		let _localctx: ComandoContext = new ComandoContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, NaturalToJsonParser.RULE_comando);
		try {
			this.state = 26;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 24;
				this.crear_objeto_cmd();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 25;
				this.crear_lista_cmd();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public crear_objeto_cmd(): Crear_objeto_cmdContext {
		let _localctx: Crear_objeto_cmdContext = new Crear_objeto_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, NaturalToJsonParser.RULE_crear_objeto_cmd);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 28;
			this.match(NaturalToJsonParser.CREAR);
			this.state = 29;
			this.match(NaturalToJsonParser.OBJETO);
			this.state = 30;
			_localctx._nombre_obj = this.match(NaturalToJsonParser.IDENTIFICADOR);
			this.state = 31;
			this.match(NaturalToJsonParser.CON);
			this.state = 32;
			this.propiedades();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propiedades(): PropiedadesContext {
		let _localctx: PropiedadesContext = new PropiedadesContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, NaturalToJsonParser.RULE_propiedades);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 34;
			this.propiedad();
			this.state = 39;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === NaturalToJsonParser.COMA) {
				{
				{
				this.state = 35;
				this.match(NaturalToJsonParser.COMA);
				this.state = 36;
				this.propiedad();
				}
				}
				this.state = 41;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public propiedad(): PropiedadContext {
		let _localctx: PropiedadContext = new PropiedadContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, NaturalToJsonParser.RULE_propiedad);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 42;
			_localctx._clave = this.match(NaturalToJsonParser.IDENTIFICADOR);
			this.state = 43;
			this.match(NaturalToJsonParser.DOS_PUNTOS);
			this.state = 44;
			this.valor();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public crear_lista_cmd(): Crear_lista_cmdContext {
		let _localctx: Crear_lista_cmdContext = new Crear_lista_cmdContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, NaturalToJsonParser.RULE_crear_lista_cmd);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 46;
			this.match(NaturalToJsonParser.CREAR);
			this.state = 47;
			this.match(NaturalToJsonParser.LISTA);
			this.state = 48;
			_localctx._nombre_lista = this.match(NaturalToJsonParser.IDENTIFICADOR);
			this.state = 49;
			this.match(NaturalToJsonParser.CON);
			this.state = 50;
			this.match(NaturalToJsonParser.ELEMENTOS);
			this.state = 51;
			this.items_lista();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public items_lista(): Items_listaContext {
		let _localctx: Items_listaContext = new Items_listaContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, NaturalToJsonParser.RULE_items_lista);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 53;
			this.valor();
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === NaturalToJsonParser.COMA) {
				{
				{
				this.state = 54;
				this.match(NaturalToJsonParser.COMA);
				this.state = 55;
				this.valor();
				}
				}
				this.state = 60;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public valor(): ValorContext {
		let _localctx: ValorContext = new ValorContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, NaturalToJsonParser.RULE_valor);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 61;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << NaturalToJsonParser.KW_VERDADERO) | (1 << NaturalToJsonParser.KW_FALSO) | (1 << NaturalToJsonParser.STRING) | (1 << NaturalToJsonParser.NUMERO_DECIMAL) | (1 << NaturalToJsonParser.NUMERO_ENTERO))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x11B\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x03\x02\x07\x02\x14\n\x02\f\x02\x0E\x02\x17" +
		"\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x05\x03\x1D\n\x03\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x07\x05(\n\x05" +
		"\f\x05\x0E\x05+\v\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x07\b;\n\b" +
		"\f\b\x0E\b>\v\b\x03\t\x03\t\x03\t\x02\x02\x02\n\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x02\x03\x04\x02\b\t\v\r\x02=\x02\x15" +
		"\x03\x02\x02\x02\x04\x1C\x03\x02\x02\x02\x06\x1E\x03\x02\x02\x02\b$\x03" +
		"\x02\x02\x02\n,\x03\x02\x02\x02\f0\x03\x02\x02\x02\x0E7\x03\x02\x02\x02" +
		"\x10?\x03\x02\x02\x02\x12\x14\x05\x04\x03\x02\x13\x12\x03\x02\x02\x02" +
		"\x14\x17\x03\x02\x02\x02\x15\x13\x03\x02\x02\x02\x15\x16\x03\x02\x02\x02" +
		"\x16\x18\x03\x02\x02\x02\x17\x15\x03\x02\x02\x02\x18\x19\x07\x02\x02\x03" +
		"\x19\x03\x03\x02\x02\x02\x1A\x1D\x05\x06\x04\x02\x1B\x1D\x05\f\x07\x02" +
		"\x1C\x1A\x03\x02\x02\x02\x1C\x1B\x03\x02\x02\x02\x1D\x05\x03\x02\x02\x02" +
		"\x1E\x1F\x07\x03\x02\x02\x1F \x07\x04\x02\x02 !\x07\n\x02\x02!\"\x07\x06" +
		"\x02\x02\"#\x05\b\x05\x02#\x07\x03\x02\x02\x02$)\x05\n\x06\x02%&\x07\x0F" +
		"\x02\x02&(\x05\n\x06\x02\'%\x03\x02\x02\x02(+\x03\x02\x02\x02)\'\x03\x02" +
		"\x02\x02)*\x03\x02\x02\x02*\t\x03\x02\x02\x02+)\x03\x02\x02\x02,-\x07" +
		"\n\x02\x02-.\x07\x0E\x02\x02./\x05\x10\t\x02/\v\x03\x02\x02\x0201\x07" +
		"\x03\x02\x0212\x07\x05\x02\x0223\x07\n\x02\x0234\x07\x06\x02\x0245\x07" +
		"\x07\x02\x0256\x05\x0E\b\x026\r\x03\x02\x02\x027<\x05\x10\t\x0289\x07" +
		"\x0F\x02\x029;\x05\x10\t\x02:8\x03\x02\x02\x02;>\x03\x02\x02\x02<:\x03" +
		"\x02\x02\x02<=\x03\x02\x02\x02=\x0F\x03\x02\x02\x02><\x03\x02\x02\x02" +
		"?@\t\x02\x02\x02@\x11\x03\x02\x02\x02\x06\x15\x1C)<";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!NaturalToJsonParser.__ATN) {
			NaturalToJsonParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(NaturalToJsonParser._serializedATN));
		}

		return NaturalToJsonParser.__ATN;
	}

}

export class ProgramaContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(NaturalToJsonParser.EOF, 0); }
	public comando(): ComandoContext[];
	public comando(i: number): ComandoContext;
	public comando(i?: number): ComandoContext | ComandoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ComandoContext);
		} else {
			return this.getRuleContext(i, ComandoContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_programa; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterPrograma) {
			listener.enterPrograma(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitPrograma) {
			listener.exitPrograma(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitPrograma) {
			return visitor.visitPrograma(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComandoContext extends ParserRuleContext {
	public crear_objeto_cmd(): Crear_objeto_cmdContext | undefined {
		return this.tryGetRuleContext(0, Crear_objeto_cmdContext);
	}
	public crear_lista_cmd(): Crear_lista_cmdContext | undefined {
		return this.tryGetRuleContext(0, Crear_lista_cmdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_comando; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterComando) {
			listener.enterComando(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitComando) {
			listener.exitComando(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitComando) {
			return visitor.visitComando(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Crear_objeto_cmdContext extends ParserRuleContext {
	public _nombre_obj!: Token;
	public CREAR(): TerminalNode { return this.getToken(NaturalToJsonParser.CREAR, 0); }
	public OBJETO(): TerminalNode { return this.getToken(NaturalToJsonParser.OBJETO, 0); }
	public CON(): TerminalNode { return this.getToken(NaturalToJsonParser.CON, 0); }
	public propiedades(): PropiedadesContext {
		return this.getRuleContext(0, PropiedadesContext);
	}
	public IDENTIFICADOR(): TerminalNode { return this.getToken(NaturalToJsonParser.IDENTIFICADOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_crear_objeto_cmd; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterCrear_objeto_cmd) {
			listener.enterCrear_objeto_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitCrear_objeto_cmd) {
			listener.exitCrear_objeto_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitCrear_objeto_cmd) {
			return visitor.visitCrear_objeto_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropiedadesContext extends ParserRuleContext {
	public propiedad(): PropiedadContext[];
	public propiedad(i: number): PropiedadContext;
	public propiedad(i?: number): PropiedadContext | PropiedadContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropiedadContext);
		} else {
			return this.getRuleContext(i, PropiedadContext);
		}
	}
	public COMA(): TerminalNode[];
	public COMA(i: number): TerminalNode;
	public COMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(NaturalToJsonParser.COMA);
		} else {
			return this.getToken(NaturalToJsonParser.COMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_propiedades; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterPropiedades) {
			listener.enterPropiedades(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitPropiedades) {
			listener.exitPropiedades(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitPropiedades) {
			return visitor.visitPropiedades(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropiedadContext extends ParserRuleContext {
	public _clave!: Token;
	public DOS_PUNTOS(): TerminalNode { return this.getToken(NaturalToJsonParser.DOS_PUNTOS, 0); }
	public valor(): ValorContext {
		return this.getRuleContext(0, ValorContext);
	}
	public IDENTIFICADOR(): TerminalNode { return this.getToken(NaturalToJsonParser.IDENTIFICADOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_propiedad; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterPropiedad) {
			listener.enterPropiedad(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitPropiedad) {
			listener.exitPropiedad(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitPropiedad) {
			return visitor.visitPropiedad(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Crear_lista_cmdContext extends ParserRuleContext {
	public _nombre_lista!: Token;
	public CREAR(): TerminalNode { return this.getToken(NaturalToJsonParser.CREAR, 0); }
	public LISTA(): TerminalNode { return this.getToken(NaturalToJsonParser.LISTA, 0); }
	public CON(): TerminalNode { return this.getToken(NaturalToJsonParser.CON, 0); }
	public ELEMENTOS(): TerminalNode { return this.getToken(NaturalToJsonParser.ELEMENTOS, 0); }
	public items_lista(): Items_listaContext {
		return this.getRuleContext(0, Items_listaContext);
	}
	public IDENTIFICADOR(): TerminalNode { return this.getToken(NaturalToJsonParser.IDENTIFICADOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_crear_lista_cmd; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterCrear_lista_cmd) {
			listener.enterCrear_lista_cmd(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitCrear_lista_cmd) {
			listener.exitCrear_lista_cmd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitCrear_lista_cmd) {
			return visitor.visitCrear_lista_cmd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Items_listaContext extends ParserRuleContext {
	public valor(): ValorContext[];
	public valor(i: number): ValorContext;
	public valor(i?: number): ValorContext | ValorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValorContext);
		} else {
			return this.getRuleContext(i, ValorContext);
		}
	}
	public COMA(): TerminalNode[];
	public COMA(i: number): TerminalNode;
	public COMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(NaturalToJsonParser.COMA);
		} else {
			return this.getToken(NaturalToJsonParser.COMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_items_lista; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterItems_lista) {
			listener.enterItems_lista(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitItems_lista) {
			listener.exitItems_lista(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitItems_lista) {
			return visitor.visitItems_lista(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValorContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(NaturalToJsonParser.STRING, 0); }
	public NUMERO_DECIMAL(): TerminalNode | undefined { return this.tryGetToken(NaturalToJsonParser.NUMERO_DECIMAL, 0); }
	public NUMERO_ENTERO(): TerminalNode | undefined { return this.tryGetToken(NaturalToJsonParser.NUMERO_ENTERO, 0); }
	public KW_VERDADERO(): TerminalNode | undefined { return this.tryGetToken(NaturalToJsonParser.KW_VERDADERO, 0); }
	public KW_FALSO(): TerminalNode | undefined { return this.tryGetToken(NaturalToJsonParser.KW_FALSO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return NaturalToJsonParser.RULE_valor; }
	// @Override
	public enterRule(listener: NaturalToJsonListener): void {
		if (listener.enterValor) {
			listener.enterValor(this);
		}
	}
	// @Override
	public exitRule(listener: NaturalToJsonListener): void {
		if (listener.exitValor) {
			listener.exitValor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: NaturalToJsonVisitor<Result>): Result {
		if (visitor.visitValor) {
			return visitor.visitValor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


