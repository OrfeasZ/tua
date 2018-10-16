import {Construct} from "./construct";

export abstract class Variable extends Construct {
    protected constructor(parent: Construct | null = null) {
        super(parent);
    }
}
