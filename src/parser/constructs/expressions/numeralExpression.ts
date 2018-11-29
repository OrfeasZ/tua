import {NumeralContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class NumeralExpression extends Expression {
    // We store this as a string so we can maintain accuracy.
    private readonly numeralValue: string;
    private readonly internalType: Type;

    constructor(ctx: NumeralContext, parent: Construct) {
        super(parent);

        this.indexStart = ctx.start.startIndex;
        this.indexEnd = ctx.stop!.stopIndex + 1;

        if (ctx.INTEGER() || ctx.HEX()) {
            this.internalType = Type.Int;
        } else {
            this.internalType = Type.Float;
        }

        this.numeralValue = ctx.text;
    }

    public type(): Type {
        return this.internalType;
    }
}
