import {Type} from "../types/type";
import {Construct} from "./construct";
import {LangSymbol} from "./langSymbol";
import {Statement} from "./statement";
import {ReturnStatement} from "./statements/returnStatement";

export class Block extends Construct {
    protected statements: Statement[] = [];
    protected returnStatement: ReturnStatement | null = null;
    protected scopedSymbols: LangSymbol[] = [];

    constructor(parent: Construct | null = null) {
        super(parent);
    }

    public type(): Type {
        if (this.returnStatement) {
            return this.returnStatement.type();
        }

        return Type.Invalid;
    }

    public collectErrors(): SyntaxError[] {
        const errors: SyntaxError[] = [];

        for (const statement of this.statements) {
            errors.push(...statement.collectErrors());
        }

        if (this.returnStatement) {
            errors.push(...this.returnStatement.collectErrors());
        }

        return errors;
    }
}
