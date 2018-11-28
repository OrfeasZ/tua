export enum TuaType {
    UNKNOWN,
    INVALID,
    INT,
    FLOAT,
    BOOL,
    STR,
    ANY,
    NIL,
    TABLE,
    CALLABLE,
    NAMED,
}

export class Type {
    // Ready types for easy consumption.
    public static Unknown: Type = new Type(TuaType.UNKNOWN, false);
    public static Invalid: Type = new Type(TuaType.INVALID, false);
    public static Int: Type = new Type(TuaType.INT, false);
    public static NullableInt: Type = new Type(TuaType.INT, true);
    public static Float: Type = new Type(TuaType.FLOAT, false);
    public static NullableFloat: Type = new Type(TuaType.FLOAT, true);
    public static Bool: Type = new Type(TuaType.BOOL, false);
    public static NullableBool: Type = new Type(TuaType.BOOL, true);
    public static Str: Type = new Type(TuaType.STR, false);
    public static NullableStr: Type = new Type(TuaType.STR, true);
    public static Any: Type = new Type(TuaType.ANY, true);
    public static Nil: Type = new Type(TuaType.NIL, true);

    /**
     * The low-level tua type enumeration for this type.
     */
    public readonly type: TuaType;

    /**
     * Whether this type instance is nullable or not.
     */
    public readonly nullable: boolean;

    constructor(type: TuaType, nullable: boolean) {
        this.type = type;
        this.nullable = nullable || type === TuaType.ANY || type === TuaType.NIL;
    }

    /**
     *  Returns the nested (real) type of this type. Mostly useful for
     *  named types (types with named aliases).
     */
    public nestedType(): Type {
        return this;
    }

    /**
     * Checks if an expression of `otherType` can be assigned this type.
     * @param otherType
     */
    public isAssignableFrom(otherType: Type): boolean {
        const ourType = this.nestedType();
        const realOtherType = otherType.nestedType();

        // Nullable types cannot be assigned to non-nullable types
        // (the opposite is fine).
        if (realOtherType.nullable && !ourType.nullable) {
            return false;
        }

        // If we're of type any then any type can be assigned to us.
        if (ourType.type === TuaType.ANY) {
            return true;
        }


        // Allow assignment of both ints and floats to floats.
        // TODO: Make this configurable.
        if (ourType.type === TuaType.FLOAT &&
            (realOtherType.type === TuaType.FLOAT ||
            realOtherType.type === TuaType.INT)) {
            return true;
        }

        // Otherwise we expect the types to be equal.
        // More specialized types (like table and callable) provide
        // their own implementation.
        return ourType.type === realOtherType.type;
    }
}
