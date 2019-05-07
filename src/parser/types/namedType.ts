import {TuaType, Type} from "./type";

export class NamedType extends Type {
    public readonly name: string;

    constructor(name: string, nullable: boolean) {
        super(TuaType.NAMED, nullable);

        this.name = name;
    }

    public nestedType(): Type {
        // TODO
        return Type.Unknown;
    }
}
