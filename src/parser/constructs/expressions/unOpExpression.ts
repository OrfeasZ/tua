import {ExprContext, UnOpContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class UnOpExpression extends Expression {
    constructor(unop: UnOpContext, expr: ExprContext, parent: Construct) {
        super(parent);
    }
}
