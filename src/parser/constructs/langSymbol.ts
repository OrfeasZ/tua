import {Construct} from "./construct";

export class LangSymbol extends Construct {
    public readonly name: string;

    constructor(name: string, parent: Construct) {
        super(parent);

        this.name = name;
    }
}
