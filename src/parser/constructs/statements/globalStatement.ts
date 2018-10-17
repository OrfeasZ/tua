import {GlobalStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class GlobalStatement extends Statement {
    constructor(ctx: GlobalStatContext, parent: Construct) {
        super(parent);
    }
}
