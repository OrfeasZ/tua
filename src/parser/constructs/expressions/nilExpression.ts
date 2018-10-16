import {Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";

export class NilExpression extends Expression {
    constructor(parent: Construct) {
        super(parent);
    }

    public type(): Type {
        return Type.Nil;
    }
}
