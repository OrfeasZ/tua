import {Writer} from "./writer";

/**
 * A no-op text writer. Everything written to this writer will
 * get lost in the void.
 */
export class NullWriter extends Writer {
    constructor() {
        super();
    }

    public write(text: string): void {}
    public writeLine(text: string = ""): void {}
    public writeIndented(text: string = ""): void {}
    public writeIndentedLine(text: string = ""): void {}
    public increaseIndentation(): void {}
    public decreaseIndentation(): void {}

    public indentationLevel(): number {
        return 0;
    }
}
