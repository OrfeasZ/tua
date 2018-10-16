/**
 * A generic text writer class used to provide text writing
 * and manipulation capabilities, along with extra features
 * such as text indentation support.
 */
export abstract class Writer {
    protected indent: string = "";
    protected indentChar: string = "";

    /**
     * Creates a new writer.
     * @param indentChar The character to use for indentation.
     */
    protected constructor(indentChar: string = "\t") {
        this.indentChar = indentChar;
    }

    /**
     * Writes the specified text.
     * @param text
     */
    public abstract write(text: string): void;

    /**
     * Writes the specified text and a newline character.
     * @param text
     */
    public writeLine(text: string = ""): void {
        this.write(text);
        this.write("\n");
    }

    /**
     * Indents and writes the specified text.
     * @param text
     */
    public writeIndented(text: string = ""): void {
        this.write(this.indent);
        this.write(text);
    }

    /**
     * Indents and writes the specified text and a newline character.
     * @param text
     */
    public writeIndentedLine(text: string = ""): void {
        this.writeIndented(text);
        this.write("\n");
    }

    /**
     * Increases the current indentation level.
     */
    public increaseIndentation(): void {
        this.indent += "\t";
    }

    /**
     * Decreases the current indentation level.
     */
    public decreaseIndentation(): void {
        if (this.indent.length === 0) {
            return;
        }

        this.indent = this.indent.substr(0, this.indent.length - this.indentChar.length);
    }

    /**
     * Returns the current indentation level.
     */
    public indentationLevel(): number {
        return this.indent.length / this.indentChar.length;
    }
}
