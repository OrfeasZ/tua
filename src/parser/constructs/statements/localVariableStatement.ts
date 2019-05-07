import {LocalVarStatContext} from "../../../grammar/TuaParser";
import {AnalysisError} from "../../../util/analysisError";
import {TuaError} from "../../../util/analysisErrors";
import {TuaType, Type} from "../../types/type";
import {Block} from "../block";
import {Construct} from "../construct";
import {Expression} from "../expression";
import {ExpressionFactory} from "../expressionFactory";
import {LangSymbol} from "../langSymbol";
import {Statement} from "../statement";
import {TuaTypeDef} from "../tuaTypeDef";

export class LocalVariableStatement extends Statement {
    public readonly symbols: LangSymbol[];
    public readonly expressions: Expression[];
    protected readonly ctx: LocalVarStatContext;

    constructor(ctx: LocalVarStatContext, parent: Construct) {
        super(parent);

        this.symbols = [];
        this.expressions = [];
        this.ctx = ctx;

        // Parse all the lhs variables.
        for (const id of ctx.nameList().typedIdentifier()) {
            const symbol = new LangSymbol(id.IDENTIFIER(), this);

            if (id.typeDecl()) {
                symbol.definedType = new TuaTypeDef(id.typeDecl()!.tuaType(), this);
            }

            this.symbols.push(symbol);

            // Register the symbol with our parent block.
            const parentBlock = this.parentBlock() as Block;
            parentBlock.addSymbol(symbol);
        }

        // Parse all rhs expressions.
        if (ctx.exprList()) {
            for (const expr of ctx.exprList()!.expr()) {
                this.expressions.push(ExpressionFactory.fromContext(expr, this));
            }
        }
    }

    public analyze() {
        // Analyze all assigned expressions and symbols.
        for (const expr of this.expressions) {
            expr.analyze();
        }

        for (const symbol of this.symbols) {
            symbol.analyze();
        }

        // Check the types of our defined symbols against the assigned expressions.
        for (let i = 0; i < this.expressions.length && i < this.symbols.length; ++i) {
            const symbolType = this.symbols[i].type();
            const expressionType = this.expressions[i].type();

            // Symbol type is `UNKNOWN`. This means that there was no explicit type specified.
            // In this case, the type is inferred from the assigned expression.
            if (symbolType.type === TuaType.UNKNOWN) {
                this.symbols[i].setType(expressionType);
                continue;
            }

            // Check if calculated types don't match.
            if (!symbolType.isAssignableFrom(expressionType)) {
                this.analysisErrors.push(new AnalysisError(
                    TuaError.ASSIGNMENT_TYPES_NOT_ASSIGNABLE,
                    this.symbols[i].startIndex,
                    this.symbols[i].endIndex,
                    [ symbolType, expressionType ],
                ));
            }
        }

        // Emit error if umber of expressions is greater than the number
        // of assigned-to symbols.
        if (this.expressions.length > this.symbols.length) {
            this.analysisErrors.push(new AnalysisError(
                TuaError.LOCAL_ASSIGNMENT_UNMATCHED,
                this.ctx.start.startIndex,
                this.ctx.stop!.stopIndex + 1,
            ));
        }

        // Emit errors for symbols with unknown types and switch their type to any.
        // TODO: Do a forward pass and try to see if we can infer the type from later assignment.
        for (const symbol of this.symbols) {
            if (symbol.type().type !== TuaType.UNKNOWN) {
                continue;
            }

            this.analysisErrors.push(new AnalysisError(
                TuaError.SYMBOL_UNKNOWN_TYPE,
                symbol.startIndex,
                symbol.endIndex,
                [symbol],
            ));

            // TODO: Make this behavior configurable.
            symbol.setType(Type.Any);
        }
    }

    public collectErrors() {
        let errors = [ ...this.analysisErrors ];

        for (const symbol of this.symbols) {
            errors = [ ...errors, ...symbol.collectErrors() ];
        }

        for (const expression of this.expressions) {
            errors = [ ...errors, ...expression.collectErrors() ];
        }

        return errors;
    }
}
