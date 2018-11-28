import {ExprContext} from "../../grammar/TuaParser";
import {Construct} from "./construct";
import {Expression} from "./expression";
import {NilExpression} from "./expressions/nilExpression";
import {NumeralExpression} from "./expressions/numeralExpression";

export class ExpressionFactory {
    /**
     * Creates an expression construct from an expression context.
     * Returns `NilExpression` for unsupported expressions.
     * @param ctx
     * @param parent
     */
    public static fromContext(ctx: ExprContext, parent: Construct): Expression {
        if (ctx.numeral()) {
            return new NumeralExpression(ctx.numeral()!, parent);
        }

        return new NilExpression(parent);
    }
}
