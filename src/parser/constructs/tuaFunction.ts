import {FuncBodyContext, TypeTemplateContext} from "../../grammar/TuaParser";
import {Construct} from "./construct";

export class TuaFunction extends Construct {
    constructor(ctx: FuncBodyContext, parent: Construct) {
        super(parent);
    }

    public setTemplate(ctx: TypeTemplateContext) {

    }
}
