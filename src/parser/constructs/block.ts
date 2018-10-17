import {BlockContext} from "../../grammar/TuaParser";
import {AnalysisError} from "../../util/analysisError";
import {Type} from "../types/type";
import {Construct} from "./construct";
import {LangSymbol} from "./langSymbol";
import {Statement} from "./statement";
import {StatementFactory} from "./statementFactory";
import {ReturnStatement} from "./statements/returnStatement";

export class Block extends Construct {
    protected statements: Statement[] = [];
    protected returnStatement: ReturnStatement | null = null;
    protected scopedSymbols: { [key: string]: LangSymbol } = {};

    constructor(ctx: BlockContext, parent: Construct | null = null) {
        super(parent);

        // Parse statements.
        for (const stat of ctx.stat()) {
            const parsedStat = StatementFactory.fromContext(stat, this);

            if (parsedStat !== null) {
                this.statements.push(parsedStat);
            }
        }

        // Parse return statement (if it exists).
        if (ctx.retStat()) {
            this.returnStatement = new ReturnStatement(ctx.retStat()!, this);
        }
    }

    /**
     * Adds a language symbol to the scope of this block.
     * @param symbol The symbol to add.
     */
    public addSymbol(symbol: LangSymbol) {
        // TODO: Maybe emit warning if we're hiding a higher level or existing symbol.
        this.scopedSymbols[symbol.name] = symbol;
    }

    /**
     * Tries to locate a symbol in the current scope or any of the
     * enclosing (parent) scopes. Returns `null` if the symbol is
     * not found.
     * @param name The name of the symbol.
     */
    public getSymbol(name: string): LangSymbol | null {
        // Check if we have this symbol in our local scope.
        if (name in this.scopedSymbols) {
            return this.scopedSymbols[name];
        }

        // If we don't, then check in our parents.
        const parentBlock = this.parentBlock();

        if (parentBlock !== null) {
            return (parentBlock as Block).getSymbol(name);
        }

        return null;
    }

    /**
     * Checks if a language symbol exists in the current or enclosing scopes.
     * @param name The name of the symbol.
     */
    public hasSymbol(name: string): boolean {
        return this.getSymbol(name) !== null;
    }

    public type(): Type {
        if (this.returnStatement) {
            return this.returnStatement.type();
        }

        return Type.Invalid;
    }

    public isBlock(): boolean {
        return true;
    }

    public collectErrors(): AnalysisError[] {
        const errors: AnalysisError[] = [];

        for (const statement of this.statements) {
            errors.push(...statement.collectErrors());
        }

        if (this.returnStatement) {
            errors.push(...this.returnStatement.collectErrors());
        }

        return errors;
    }
}
