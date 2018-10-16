import {ANTLRErrorListener, RecognitionException, Recognizer} from "antlr4ts";

export class CountingErrorListener implements ANTLRErrorListener<any> {
    private errorCount = 0;

    public errors(): number {
        return this.errorCount;
    }

    public clearErrors() {
        this.errorCount = 0;
    }

    public syntaxError<T>(recognizer: Recognizer<T, any>, offendingSymbol: T,
                          line: number, charPositionInLine: number, msg: string, e: RecognitionException) {
        ++this.errorCount;
    }
}
