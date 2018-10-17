import {ANTLRInputStream, CommonTokenStream} from "antlr4ts";
import {TuaLexer} from "../grammar/TuaLexer";
import {TuaParser} from "../grammar/TuaParser";
import {AnalysisError} from "../util/analysisError";
import {Block} from "./constructs/block";

export class Analyzer {
    public static analyze(code: string): AnalysisError[] {
        const lexer = new TuaLexer(new ANTLRInputStream(code));
        const tokens  = new CommonTokenStream(lexer);
        const parser = new TuaParser(tokens);

        // Parse the code.
        const tree = parser.chunk();

        // Create our language constructs and analyze.
        const block = new Block(tree.block());
        block.analyze();

        // Return any analysis errors.
        return block.collectErrors();
    }
}
