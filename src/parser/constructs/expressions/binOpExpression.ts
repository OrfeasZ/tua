import {BinOpContext, ExprContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class BinOpExpression extends Expression {
    constructor(binop: BinOpContext, lhsExpr: ExprContext, rhsExpr: ExprContext, parent: Construct) {
        super(parent);
    }
}
