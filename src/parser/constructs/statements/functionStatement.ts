import {FunctionDefStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class FunctionStatement extends Statement {
    constructor(ctx: FunctionDefStatContext, parent: Construct) {
        super(parent);
    }
}
