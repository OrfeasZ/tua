import {BoolExprContext} from "../../../grammar/TuaParser";
import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class BoolExpression extends Expression {
    public readonly boolValue: boolean;

    constructor(ctx: BoolExprContext, parent: Construct) {
        super(parent);

        this.boolValue = ctx.text === "true";
    }

    public type(): Type {
        return Type.Bool;
    }
}
