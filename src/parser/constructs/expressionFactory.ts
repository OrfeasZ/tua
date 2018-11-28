import {ExprContext} from "../../grammar/TuaParser";
import {Construct} from "./construct";
import {Expression} from "./expression";
import {NilExpression} from "./expressions/nilExpression";

export class ExpressionFactory {
    /**
     * Creates an expression construct from an expression context.
     * Returns `NilExpression` for unsupported expressions.
     * @param ctx
     * @param parent
     */
    public static fromContext(ctx: ExprContext, parent: Construct): Expression {
        // TODO
        return new NilExpression(parent);
    }
}
