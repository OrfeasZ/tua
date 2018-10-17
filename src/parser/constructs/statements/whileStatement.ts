import {WhileStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class WhileStatement extends Statement {
    constructor(ctx: WhileStatContext, parent: Construct) {
        super(parent);
    }
}
