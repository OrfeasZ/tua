import {BoolExprContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class BoolExpression extends Expression {
    constructor(ctx: BoolExprContext, parent: Construct) {
        super(parent);
    }

    public type(): Type {
        return Type.Bool;
    }
}
