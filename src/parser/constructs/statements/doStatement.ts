import {DoStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class DoStatement extends Statement {
    constructor(ctx: DoStatContext, parent: Construct) {
        super(parent);
    }
}
