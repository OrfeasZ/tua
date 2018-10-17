import {LabelContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class LabelStatement extends Statement {
    constructor(ctx: LabelContext, parent: Construct) {
        super(parent);
    }
}
