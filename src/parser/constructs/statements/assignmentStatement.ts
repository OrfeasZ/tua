import {AssignStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class AssignmentStatement extends Statement {
    constructor(ctx: AssignStatContext, parent: Construct) {
        super(parent);
    }
}
