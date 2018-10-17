import {RetStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class ReturnStatement extends Statement {
    constructor(ctx: RetStatContext, parent: Construct) {
        super(parent);
    }
}
