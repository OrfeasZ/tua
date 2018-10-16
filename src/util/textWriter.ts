import {Writer} from "./writer";

/**
 * A memory-backed text writer.
 */
export class TextWriter extends Writer {
    protected buffer: string = "";

    /**
     * Creates a new writer.
     * @param indentChar
     * @param initialText Text to initialize the memory buffer with.
     */
    constructor(indentChar: string = "\t", initialText: string = "") {
        super(indentChar);
        this.buffer = initialText;
    }

    /**
     * Clears the memory buffer.
     */
    public clear() {
        this.buffer = "";
    }

    /**
     * Returns the memory buffer.
     */
    public str() {
        return this.buffer;
    }

    /**
     * Writes text to the writer.
     * @param text
     */
    public write(text: string): void {
        this.buffer += text;
    }
}
