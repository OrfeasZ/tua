import {TuaTypeContext} from "../../grammar/TuaParser";
import {CallableReturnType, CallableType} from "../types/callableType";
import {NamedType} from "../types/namedType";
import {TableType} from "../types/tableType";
import {Type} from "../types/type";
import {Construct} from "./construct";

export class TuaTypeDef extends Construct {
    private readonly realType: Type;
    private readonly nullable: boolean;

    constructor(ctx: TuaTypeContext, parent: Construct) {
        super(parent);

        this.nullable = ctx.nullableOp() !== undefined;

        if (ctx.builtinType()) {
            switch (ctx.builtinType()!.text) {
                case "int":
                    this.realType = this.nullable ? Type.NullableInt : Type.Int;
                    break;

                case "float":
                    this.realType = this.nullable ? Type.NullableFloat : Type.Float;
                    break;

                case "bool":
                    this.realType = this.nullable ? Type.NullableBool : Type.Bool;
                    break;

                case "str":
                    this.realType = this.nullable ? Type.NullableStr : Type.Str;
                    break;

                case "any":
                    this.realType = Type.Any;
                    break;

                default:
                    throw new Error(`Encountered unknown built-in type: ${ctx.builtinType()!.text}.`);
            }

            return;
        }

        if (ctx.callableType() || ctx.nullableCallableType()) {
            const callableType = ctx.nullableCallableType()
                ? ctx.nullableCallableType()!.callableType()
                : ctx.callableType()!;

            // Get return type.
            let returnType: CallableReturnType;

            if (callableType.returnType().typeList()) {
                if (callableType.returnType().typeList()!.tuaType().length > 1) {
                    returnType = CallableReturnType.MULTIPLE;
                } else {
                    returnType = CallableReturnType.SINGLE;
                }
            } else if (callableType.returnType().tuaType()) {
                returnType = CallableReturnType.SINGLE;
            } else {
                returnType = CallableReturnType.VOID;
            }

            // Create our callable type.
            this.realType = new CallableType(returnType, ctx.nullableCallableType() !== undefined);

            // TODO: Add callable arguments and such.

            return;
        }

        if (ctx.tableType()) {
            this.realType = new TableType(this.nullable);

            // TODO: Set inner table type.

            return;
        }

        // Handle named types.
        this.realType = new NamedType(ctx.IDENTIFIER()!.text, this.nullable);

        // TODO: Set specialization.
    }
    
    public type(): Type {
        return this.realType;
    }
}
