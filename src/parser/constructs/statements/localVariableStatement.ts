import {LocalVarStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class LocalVariableStatement extends Statement {
    constructor(ctx: LocalVarStatContext, parent: Construct) {
        super(parent);
    }
}
