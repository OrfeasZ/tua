import {GotoStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class GotoStatement extends Statement {
    constructor(ctx: GotoStatContext, parent: Construct) {
        super(parent);
    }
}
