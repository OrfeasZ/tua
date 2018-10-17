import {TableTypedefStatContext, TypedefStatContext} from "../../../grammar/TuaParser";
import {Construct} from "../construct";
import {Statement} from "../statement";

export class TypedefStatement extends Statement {
    constructor(ctx: TypedefStatContext | TableTypedefStatContext, parent: Construct) {
        super(parent);
    }
}
