import {Construct} from "./construct";

export class Expression extends Construct {
    public indexStart: number = 0;
    public indexEnd: number = 0;

    constructor(parent: Construct) {
        super(parent);
    }
}
