import {Construct} from "../construct";
import {Expression} from "../expression";

export class VarargExpression extends Expression {
    constructor(parent: Construct | null = null) {
        super(parent);
    }
}
