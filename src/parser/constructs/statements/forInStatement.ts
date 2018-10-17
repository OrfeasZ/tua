import {ForInStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class ForInStatement extends Statement {
    constructor(ctx: ForInStatContext, parent: Construct) {
        super(parent);
    }
}
