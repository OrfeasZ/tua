import {TerminalNode} from "antlr4ts/tree";
import {Type} from "../types/type";
import {Construct} from "./construct";
import {TuaTypeDef} from "./tuaTypeDef";

export class LangSymbol extends Construct {
    public readonly name: string;
    public readonly startIndex: number;
    public readonly endIndex: number;
    public definedType: TuaTypeDef | null = null;

    protected internalType: Type = Type.Any;

    constructor(ctx: TerminalNode, parent: Construct) {
        super(parent);

        this.name = ctx.text;
        this.startIndex = ctx.payload.startIndex;
        this.endIndex = ctx.payload.stopIndex;
    }

    public setType(type: Type) {
        this.internalType = type;
    }

    public type(): Type {
        return this.internalType;
    }
}
