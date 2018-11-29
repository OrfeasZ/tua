import {LiteralStringContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class StringExpression extends Expression {
    public readonly stringValue: string;

    constructor(ctx: LiteralStringContext, parent: Construct) {
        super(parent);

        this.indexStart = ctx.start.startIndex;
        this.indexEnd = ctx.stop!.stopIndex + 1;

        this.stringValue = ctx.text;
    }

    public type(): Type {
        return Type.Str;
    }
}
