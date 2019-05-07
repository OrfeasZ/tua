import {FuncBodyContext, TypeTemplateContext} from "../../grammar/TuaParser";
import {Block} from "./block";
import {Construct} from "./construct";
import {LangSymbol} from "./langSymbol";
import {TuaTypeDef} from "./tuaTypeDef";

export class TuaFunction extends Construct {
    public readonly parameters: LangSymbol[];
    public readonly hasVararg: boolean;
    public readonly block: Block;

    // Empty array here means void. Undefined means we need to automatically infer the type.
    protected readonly returnTypes?: TuaTypeDef[];

    constructor(ctx: FuncBodyContext, parent: Construct) {
        super(parent);

        this.parameters = [];
        this.hasVararg = false;

        // Set the main block.
        this.block = new Block(ctx.block(), this);

        // Parse the parameter list.
        if (ctx.parList()) {
            if (ctx.parList()!.nameList()) {
                for (const id of ctx.parList()!.nameList()!.typedIdentifier()) {
                    const symbol = new LangSymbol(id.IDENTIFIER(), this);

                    if (id.typeDecl()) {
                        symbol.definedType = new TuaTypeDef(id.typeDecl()!.tuaType(), this);
                    }

                    this.parameters.push(symbol);

                    // Register the symbol with our main block.
                    this.block.addSymbol(symbol);
                }
            }

            // Check if we have a vararg expression.
            // TODO: Typing for vararg expressions.
            if (ctx.parList()!.varargExpr()) {
                this.hasVararg = true;
            }
        }

        // Parse the return type.
        if (ctx.returnType()) {
            this.returnTypes = [];

            if (ctx.returnType()!.tuaType()) {
                this.returnTypes.push(new TuaTypeDef(ctx.returnType()!.tuaType()!, this));
            } else if (ctx.returnType()!.typeList()) {
                for (const type of ctx.returnType()!.typeList()!.tuaType()) {
                    this.returnTypes.push(new TuaTypeDef(type, this));
                }
            }
        }
    }

    public setTemplate(ctx: TypeTemplateContext) {

    }

    public analyze(): void {
        // Analyze the parameters.
        for (const param of this.parameters) {
            param.analyze();
        }

        // Analyze the main block
        this.block.analyze();

        // Analyze the return types.
        if (this.returnTypes) {
            for (const type of this.returnTypes) {
                type.analyze();
            }
        }

        // TODO: Error checking

        // Check if the return types match.
        if (this.returnTypes) {

        }
    }

    public collectErrors() {
        let errors = [ ...this.analysisErrors, ...this.block.collectErrors() ];

        for (const symbol of this.parameters) {
            errors = [ ...errors, ...symbol.collectErrors() ];
        }

        if (this.returnTypes) {
            for (const type of this.returnTypes) {
                errors = [...errors, ...type.collectErrors()];
            }
        }

        return errors;
    }
}
