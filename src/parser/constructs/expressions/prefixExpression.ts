import {PrefixExprContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class PrefixExpression extends Expression {
    constructor(ctx: PrefixExprContext, parent: Construct) {
        super(parent);
    }

    public type(): Type {
        return Type.Str;
    }
}
