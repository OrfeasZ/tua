import {TuaTypeContext} from "../../grammar/TuaParser";
import {Construct} from "./construct";

export class TuaTypeDef extends Construct {
    constructor(ctx: TuaTypeContext, parent: Construct) {
        super(parent);
    }
}
