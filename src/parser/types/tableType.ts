import {TuaType, Type} from "./type";

export class TableType extends Type {
    protected internalNamedTypes: {[key: string]: Type} = {};
    protected internalRepeatedTypes: Type[] = [];

    constructor(nullable: boolean) {
        super(TuaType.TABLE, nullable);
    }

    public namedTypes(): {[key: string]: Type} {
        return this.internalNamedTypes;
    }

    public repeatedTypes(): Type[] {
        return this.internalRepeatedTypes;
    }

    public addNamedType(name: string, type: Type) {
        if (name in this.internalNamedTypes) {
            // TODO: Emit error
        }

        this.internalNamedTypes[name] = type;
    }

    public addRepeatedType(type: Type) {
        this.internalRepeatedTypes.push(type);
    }

    public hasAnyRepeatedType(): boolean {
        for (const type of this.internalRepeatedTypes) {
            if (type.type() === TuaType.ANY) {
                return true;
            }
        }

        return false;
    }

    public isAssignableFrom(otherType: Type): boolean {
        // Call the super assignable check. This takes care of nullable and `any` checks.
        if (!super.isAssignableFrom(otherType)) {
            return false;
        }

        // If we have `any` specified as a repeated field then anything else
        // should be assignable to us.
        if (this.hasAnyRepeatedType()) {
            return true;
        }

        const otherTableType = otherType as TableType;

        // Otherwise we need to check our types one-by-one.
        // We expect to have all the named types of the other type.
        const ourNamedTypes = { ...this.internalNamedTypes };
        const otherNamedTypes = otherTableType.namedTypes();

        for (const key of Object.keys(otherNamedTypes)) {
            // Check if the key exists in our named types.
            if (!(key in ourNamedTypes)) {
                return false;
            }

            // Check if the types are assignable.
            if (!ourNamedTypes[key].isAssignableFrom(otherTableType.namedTypes()[key])) {
                return false;
            }

            // Remove the processed key.
            delete ourNamedTypes[key];
        }

        // All of the leftover types must be nullable.
        for (const key of Object.keys(ourNamedTypes)) {
            if (!ourNamedTypes[key].isNullable()) {
                return false;
            }
        }

        // Now handle repeated types.
        // TODO

        return true;
    }
}
