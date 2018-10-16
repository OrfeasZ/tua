import {Construct} from "./construct";

export abstract class Statement extends Construct {
    protected constructor(parent: Construct) {
        super(parent);
    }
}
