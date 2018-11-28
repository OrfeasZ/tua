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
    protected scopedSymbols: { [key: string]: LangSymbol[] } = {};

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
        if (!(symbol.name in this.scopedSymbols)) {
            this.scopedSymbols[symbol.name] = [];
        }

        // Add the symbol and sort our existing symbols based on their
        // starting offset. This allows us to properly resolve them later
        // when a symbol hides another previous symbol.
        const symbols = [ ...this.scopedSymbols[symbol.name], symbol ];
        symbols.sort((a: LangSymbol, b: LangSymbol) => {
            if (a.startIndex < b.startIndex) {
                return -1;
            }

            if (a.startIndex > b.startIndex) {
                return 1;
            }

            return 0;
        });

        this.scopedSymbols[symbol.name] = symbols;
    }

    /**
     * Tries to locate a symbol in the current scope or any of the
     * enclosing (parent) scopes. Returns `null` if the symbol is
     * not found.
     * @param name The name of the symbol.
     * @param offset The offset of the requesting construct.
     */
    public getSymbol(name: string, offset: number = -1): LangSymbol | null {
        // Check if we have this symbol in our local scope.
        if (name in this.scopedSymbols) {
            // If we do then try to find the corresponding symbol for
            // the provided offset. Offset == -1 means we want the last
            // defined symbol.
            const symbols = this.scopedSymbols[name];

            if (offset === -1) {
                return symbols[symbols.length - 1];
            }

            for (let i = 1; i < symbols.length; ++i) {
                if (symbols[i - 1].startIndex < offset &&
                    symbols[i].startIndex > offset) {
                    return symbols[i - 1];
                }
            }

            // If we didn't find a symbol there, check if the last
            // symbol matches our criteria.
            if (symbols[symbols.length - 1].startIndex < offset) {
                return symbols[symbols.length - 1];
            }
        }

        // If we couldn't resolve the symbol check in our parents.
        const parentBlock = this.parentBlock();

        if (parentBlock !== null) {
            return (parentBlock as Block).getSymbol(name, offset);
        }

        return null;
    }

    /**
     * Checks if a language symbol exists in the current or enclosing scopes.
     * @param name The name of the symbol.
     * @param offset The offset of the requesting construct.
     */
    public hasSymbol(name: string, offset: number = -1): boolean {
        return this.getSymbol(name, offset) !== null;
    }

    public type(): Type {
        if (this.returnStatement) {
            return this.returnStatement.type();
        }

        return Type.Unknown;
    }

    public isBlock(): boolean {
        return true;
    }

    public collectErrors(): AnalysisError[] {
        const errors: AnalysisError[] = [ ...this.analysisErrors ];

        for (const statement of this.statements) {
            errors.push(...statement.collectErrors());
        }

        if (this.returnStatement) {
            errors.push(...this.returnStatement.collectErrors());
        }

        return errors;
    }

    public analyze() {
        for (const statement of this.statements) {
            statement.analyze();
        }

        if (this.returnStatement) {
            this.returnStatement.analyze();
        }
    }
}
