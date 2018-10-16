import {Construct} from "./construct";

export abstract class Variable extends Construct {
    protected constructor(parent: Construct) {
        super(parent);
    }
}
