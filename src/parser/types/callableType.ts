import {TuaType, Type} from "./type";

export enum CallableReturnType {
    SINGLE,
    MULTIPLE,
    VOID,
}

export class CallableType extends Type {
    protected internalReturnType: CallableReturnType;
    protected internalReturnTypes: Type[] = [];
    protected internalArgumentTypes: Type[] = [];
    protected internalHasVararg: boolean = false;

    constructor(returnType: CallableReturnType, nullable: boolean) {
        super(TuaType.CALLABLE, nullable);
        this.internalReturnType = returnType;
    }

    public returnType(): CallableReturnType {
        return this.internalReturnType;
    }

    public returnTypes(): Type[] {
        return this.internalReturnTypes;
    }

    public argumentTypes(): Type[] {
        return this.internalArgumentTypes;
    }

    public hasVararg(): boolean {
        return this.internalHasVararg;
    }

    public addReturnType(type: Type) {
        this.internalReturnTypes.push(type);
    }

    public addArgumentType(type: Type) {
        this.internalArgumentTypes.push(type);
    }

    public setHasVararg() {
        this.internalHasVararg = true;
    }

    public isAssignableFrom(otherType: Type): boolean {
        // Call the super assignable check. This takes care of nullable and `any` checks.
        if (!super.isAssignableFrom(otherType)) {
            return false;
        }

        const otherCallableType = otherType as CallableType;

        // Check if our return type matches.
        if (this.internalReturnType !== otherCallableType.returnType()) {
            return false;
        }

        if (this.internalReturnTypes.length !== otherCallableType.returnTypes().length) {
            return false;
        }

        // Check each return type one-by-one to check if they're assignable to each other.
        // This also checks if they're in the correct order.
        for (let i = 0; i < this.internalReturnTypes.length; ++i) {
            if (!this.internalReturnTypes[i].isAssignableFrom(otherCallableType.returnTypes()[i])) {
                return false;
            }
        }

        // TODO: Check arguments

        return true;
    }
}
