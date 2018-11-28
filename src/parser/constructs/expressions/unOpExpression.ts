import {ExprContext, UnopContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class UnOpExpression extends Expression {
    constructor(unop: UnopContext, expr: ExprContext, parent: Construct) {
        super(parent);
    }
}
