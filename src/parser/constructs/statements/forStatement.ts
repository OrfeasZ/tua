import {ForStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class ForStatement extends Statement {
    constructor(ctx: ForStatContext, parent: Construct) {
        super(parent);
    }
}
