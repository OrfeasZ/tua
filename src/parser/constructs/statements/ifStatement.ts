import {IfStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class IfStatement extends Statement {
    constructor(ctx: IfStatContext, parent: Construct) {
        super(parent);
    }
}
