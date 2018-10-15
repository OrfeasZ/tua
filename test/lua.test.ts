import {ANTLRErrorListener, ANTLRInputStream, CommonTokenStream, RecognitionException, Recognizer} from "antlr4ts";
import {expect} from "chai";
import * as fs from "fs";
import {TuaLexer} from "../src/grammar/TuaLexer";
import {TuaParser} from "../src/grammar/TuaParser";

interface ISyntaxError {
    line: number;
    charPositionInLine: number;
    msg: string;
}

class TestErrorListener implements ANTLRErrorListener<any> {
    public errors: ISyntaxError[] = [];

    public syntaxError<T>(recognizer: Recognizer<T, any>, offendingSymbol: T,
                          line: number, charPositionInLine: number, msg: string, e: RecognitionException) {
        this.errors.push({
            charPositionInLine,
            line,
            msg,
        });
    }
}

describe("Lua", () => {
    it("can be parsed", () => {
        const testFiles = fs.readdirSync("test/lua");

        const errorListener = new TestErrorListener();

        for (const file of testFiles) {
            if (!file.endsWith(".lua")) {
                continue;
            }

            const fileData = fs.readFileSync("test/lua/" + file).toString();
            const chars = new ANTLRInputStream(fileData);
            const lexer = new TuaLexer(chars);
            const tokens  = new CommonTokenStream(lexer);
            const parser = new TuaParser(tokens);

            parser.removeErrorListeners();
            parser.addErrorListener(errorListener);
            parser.chunk();
        }

        expect(errorListener.errors.length).to.equal(0);
    });
});
