import {TuaType, Type} from "./type";

export class NamedType extends Type {
    public readonly name: string;
    public readonly realType: Type;

    constructor(name: string, realType: Type) {
        super(TuaType.NAMED, false);

        this.name = name;
        this.realType = realType;
    }

    public nestedType(): Type {
        return this.realType.nestedType();
    }
}
