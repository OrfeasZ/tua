import {NumeralContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class NumeralExpression extends Expression {
    private readonly internalType: Type;

    constructor(ctx: NumeralContext, parent: Construct) {
        super(parent);

        if (ctx.INTEGER() || ctx.HEX()) {
            this.internalType = Type.Int;
        } else {
            this.internalType = Type.Float;
        }
    }

    public type(): Type {
        return this.internalType;
    }
}
