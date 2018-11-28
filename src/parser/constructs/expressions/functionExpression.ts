import {FunctionDefContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class FunctionExpression extends Expression {
    constructor(ctx: FunctionDefContext, parent: Construct) {
        super(parent);
    }
}
