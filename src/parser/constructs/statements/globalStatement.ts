import {Construct} from "../construct";
import {Statement} from "../statement";

export class GlobalStatement extends Statement {
    constructor(parent: Construct | null = null) {
        super(parent);
    }
}
