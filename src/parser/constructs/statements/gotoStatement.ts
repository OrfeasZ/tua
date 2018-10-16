import {Construct} from "../construct";
import {Statement} from "../statement";

export class GotoStatement extends Statement {
    constructor(parent: Construct | null = null) {
        super(parent);
    }
}
