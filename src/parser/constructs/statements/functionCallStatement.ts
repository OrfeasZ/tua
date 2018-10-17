import {FunctionCallContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class FunctionCallStatement extends Statement {
    constructor(ctx: FunctionCallContext, parent: Construct) {
        super(parent);
    }
}
