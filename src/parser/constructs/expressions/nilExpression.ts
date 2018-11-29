import {NilExprContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class NilExpression extends Expression {
    constructor(ctx: NilExprContext | null, parent: Construct) {
        super(parent);

        if (ctx !== null) {
            this.indexStart = ctx.start.startIndex;
            this.indexEnd = ctx.stop!.stopIndex + 1;
        }
    }

    public type(): Type {
        return Type.Nil;
    }
}
