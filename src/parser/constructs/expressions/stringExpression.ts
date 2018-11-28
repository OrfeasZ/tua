import {LiteralStringContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class StringExpression extends Expression {
    constructor(ctx: LiteralStringContext, parent: Construct) {
        super(parent);
    }

    public type(): Type {
        return Type.Str;
    }
}
