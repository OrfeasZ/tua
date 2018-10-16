import {ANTLRInputStream, CommonTokenStream} from "antlr4ts";
import {TuaLexer} from "../grammar/TuaLexer";
import {TuaParser} from "../grammar/TuaParser";
import {CountingErrorListener} from "../parser/util/countingErrorListener";
import {FileInputStream} from "../parser/util/fileInputStream";
import {TextWriter} from "../util/textWriter";
import {GenerationVisitor} from "./generationVisitor";

export class Compiler {
    /**
     * Compiles a list of a tua scripts to lua and returns the
     * generated code in an array. The order of the elements in
     * the returned array matches the order of the provided file
     * paths. If a script fails to compile, the corresponding
     * element will be `null`.
     * @param files The paths of the files to process.
     */
    public static compileFilesSync(...files: string[]): Array<string | null> {
        const streams: ANTLRInputStream[] = files.map((file) => new FileInputStream(file));
        return Compiler.compileStreamsSync(streams);
    }

    /**
     * Compiles a list of a tua scripts to lua and returns the
     * generated code in an array. The order of the elements in
     * the returned array matches the order of the provided code
     * If a script fails to compile, the corresponding element
     * will be `null`.
     * @param text The code to process.
     */
    public static compileTextSync(...text: string[]): Array<string | null> {
        const streams: ANTLRInputStream[] = text.map((data) => new ANTLRInputStream(data));
        return Compiler.compileStreamsSync(streams);
    }

    private static compileStreamsSync(streams: ANTLRInputStream[]): Array<string | null> {
        const outFiles: Array<string | null> = [];
        const errorListener = new CountingErrorListener();
        const treeVisitor = new GenerationVisitor();
        const writer = new TextWriter();

        for (const stream of streams) {
            // Clear any previous errors from the listener.
            errorListener.clearErrors();

            // Lex and parse the input file.
            const lexer = new TuaLexer(stream);
            const tokens  = new CommonTokenStream(lexer);
            const parser = new TuaParser(tokens);

            parser.removeErrorListeners();
            parser.addErrorListener(errorListener);
            const tree = parser.chunk();

            // Check if we encountered any errors.
            if (errorListener.errors() > 0) {
                // If we did then we signal it by pushing null to the output array.
                outFiles.push(null);
                continue;
            }

            // If we didn't, walk the tree, generate the code, and add it to the output.
            writer.clear();
            treeVisitor.visitChunk(tree, writer);

            outFiles.push(writer.str());
        }

        return outFiles;
    }
}
