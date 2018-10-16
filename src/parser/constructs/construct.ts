import {Type} from "../types/type";

export abstract class Construct {
    public readonly parent: Construct | null;

    protected constructor(parent: Construct | null = null) {
        this.parent = parent;
    }

    /**
     * Collects and returns all the errors encountered by
     * this and all children constructs.
     */
    public collectErrors(): SyntaxError[] {
        return [];
    }

    /**
     * Returns the type of this construct.
     */
    public type(): Type {
        return Type.Invalid;
    }

    /**
     * Returns the top level construct by walking through
     * all the parents. The top level construct will always
     * be a Block construct in regular library usage.
     */
    public topLevelConstruct(): Construct {
        if (this.parent === null) {
            return this;
        }

        return this.parent.topLevelConstruct();
    }
}
