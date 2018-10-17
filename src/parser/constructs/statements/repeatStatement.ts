import {RepeatStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class RepeatStatement extends Statement {
    constructor(ctx: RepeatStatContext, parent: Construct) {
        super(parent);
    }
}
