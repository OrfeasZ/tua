export enum TuaType {
    INVALID,
    INT,
    FLOAT,
    BOOL,
    STR,
    ANY,
    TABLE,
    CALLABLE,
}

export class Type {
    // Ready types for easy consumption.
    public static Int: Type = new Type(TuaType.INT, false);
    public static NullableInt: Type = new Type(TuaType.INT, true);
    public static Float: Type = new Type(TuaType.FLOAT, false);
    public static NullableFloat: Type = new Type(TuaType.FLOAT, true);
    public static Bool: Type = new Type(TuaType.BOOL, false);
    public static NullableBool: Type = new Type(TuaType.BOOL, true);
    public static Str: Type = new Type(TuaType.STR, false);
    public static NullableStr: Type = new Type(TuaType.STR, true);
    public static Any: Type = new Type(TuaType.ANY, true);

    // Internal type fields.
    protected internalType: TuaType = TuaType.INVALID;
    protected nullable: boolean;

    constructor(type: TuaType, nullable: boolean) {
        this.internalType = type;
        this.nullable = nullable || type === TuaType.ANY;
    }

    /**
     * Returns the low-level tua type enumeration for this type.
     */
    public type(): TuaType {
        return this.internalType;
    }

    /**
     * Returns whether this type instance is nullable.
     */
    public isNullable(): boolean {
        return this.nullable || this.internalType === TuaType.ANY;
    }

    /**
     * Checks if an expression of `otherType` can be assigned this type.
     * @param otherType
     */
    public isAssignableFrom(otherType: Type): boolean {
        // Nullable types cannot be assigned to non-nullable types
        // (the opposite is fine).
        if (otherType.isNullable() && !this.isNullable()) {
            return false;
        }

        // If we're of type any then any type can be assigned to us.
        if (this.type() === TuaType.ANY) {
            return true;
        }

        // Allow assignment of both ints and floats to floats.
        // TODO: Make this configurable.
        if (this.type() === TuaType.FLOAT &&
            (otherType.type() === TuaType.FLOAT ||
            otherType.type() === TuaType.INT)) {
            return true;
        }

        // Otherwise we expect the types to be equal.
        // More specialized types (like table and callable) provide
        // their own implementation.
        return this.type() === otherType.type();
    }
}