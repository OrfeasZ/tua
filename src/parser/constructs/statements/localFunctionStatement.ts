import {LocalFunctionStatContext} from "../../../grammar/TuaParser";
import {Block} from "../block";
import {Construct} from "../construct";
import {LangSymbol} from "../langSymbol";
import {Statement} from "../statement";
import {TuaFunction} from "../tuaFunction";

export class LocalFunctionStatement extends Statement {
    public readonly function: TuaFunction;
    public readonly symbol: LangSymbol;

    constructor(ctx: LocalFunctionStatContext, parent: Construct) {
        super(parent);

        this.function = new TuaFunction(ctx.funcBody(), this);

        if (ctx.typeTemplate()) {
            this.function.setTemplate(ctx.typeTemplate()!);
        }

        this.symbol = new LangSymbol(ctx.IDENTIFIER(), this);

        // Register the symbol with our parent block.
        const parentBlock = this.parentBlock() as Block;
        parentBlock.addSymbol(this.symbol);
    }

    public analyze(): void {
        this.symbol.analyze();
        this.function.analyze();
    }

    public collectErrors() {
        return [
            ...this.analysisErrors,
            ...this.function.collectErrors(),
            ...this.symbol.collectErrors(),
        ];
    }
}
