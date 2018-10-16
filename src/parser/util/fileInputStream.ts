import {ANTLRInputStream} from "antlr4ts";
import * as fs from "fs";

export class FileInputStream extends ANTLRInputStream {
    constructor(file: string) {
        // TODO: Optimize this.
        super(fs.readFileSync(file).toString());
    }
}
