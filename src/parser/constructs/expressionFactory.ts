import {ExprContext} from "../../grammar/TuaParser";
import {Construct} from "./construct";
import {Expression} from "./expression";
import {BinOpExpression} from "./expressions/binOpExpression";
import {BoolExpression} from "./expressions/boolExpression";
import {FunctionExpression} from "./expressions/functionExpression";
import {NilExpression} from "./expressions/nilExpression";
import {NumeralExpression} from "./expressions/numeralExpression";
import {PrefixExpression} from "./expressions/prefixExpression";
import {StringExpression} from "./expressions/stringExpression";
import {TableExpression} from "./expressions/tableExpression";
import {UnOpExpression} from "./expressions/unOpExpression";
import {VarargExpression} from "./expressions/varargExpression";

export class ExpressionFactory {
    /**
     * Creates an expression construct from an expression context.
     * Returns `NilExpression` for unsupported expressions.
     * @param ctx
     * @param parent
     */
    public static fromContext(ctx: ExprContext, parent: Construct): Expression {
        if (ctx.nilExpr()) {
            return new NilExpression(ctx.nilExpr()!, parent);
        } else if (ctx.boolExpr()) {
            return new BoolExpression(ctx.boolExpr()!, parent);
        } else if (ctx.numeral()) {
            return new NumeralExpression(ctx.numeral()!, parent);
        } else if (ctx.literalString()) {
            return new StringExpression(ctx.literalString()!, parent);
        } else if (ctx.varargExpr()) {
            return new VarargExpression(ctx.varargExpr()!, parent);
        } else if (ctx.functionDef()) {
            return new FunctionExpression(ctx.functionDef()!, parent);
        } else if (ctx.prefixExpr()) {
            return new PrefixExpression(ctx.prefixExpr()!, parent);
        } else if (ctx.tableConstructor()) {
            return new TableExpression(ctx.tableConstructor()!, parent);
        } else if (ctx.binOp()) {
            return new BinOpExpression(ctx.binOp()!, ctx.expr()[0], ctx.expr()[1], parent);
        } else if (ctx.unOp()) {
            return new UnOpExpression(ctx.unOp()!, ctx.expr()[0], parent);
        }

        return new NilExpression(null, parent);
    }
}
