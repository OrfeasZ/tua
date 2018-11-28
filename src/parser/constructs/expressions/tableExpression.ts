import {TableConstructorContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class TableExpression extends Expression {
    constructor(ctx: TableConstructorContext, parent: Construct) {
        super(parent);
    }
}
