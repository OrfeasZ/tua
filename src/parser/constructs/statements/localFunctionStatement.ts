import {LocalFunctionStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class LocalFunctionStatement extends Statement {
    constructor(ctx: LocalFunctionStatContext, parent: Construct) {
        super(parent);
    }
}
