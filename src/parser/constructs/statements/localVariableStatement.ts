import {LocalVarStatContext} from "../../../grammar/TuaParser";
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

    constructor(ctx: LocalVarStatContext, parent: Construct) {
        super(parent);

        this.symbols = [];
        this.expressions = [];

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
}
