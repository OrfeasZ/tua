import {AnalysisError} from "../../util/analysisError";
import {Type} from "../types/type";

/**
 * Represents a language construct that is used for
 * compile-time analysis and type checking.
 */
export abstract class Construct {
    public readonly parent: Construct | null;
    protected readonly analysisErrors: AnalysisError[] = [];

    protected constructor(parent: Construct | null = null) {
        this.parent = parent;
    }

    /**
     * Performs analysis on this construct and its children.
     * Analysis must only be performed after the pre-analysis
     * stage has completed, and all constructs have been created.
     * After analysis has finished, all types will be calculated
     * and relevant errors will be available through the
     * `collectErrors()` call.
     */
    public analyze(): void {}

    /**
     * Collects and returns all the errors encountered by
     * this and all children constructs.
     */
    public collectErrors(): AnalysisError[] {
        return this.analysisErrors;
    }

    /**
     * Returns the type of this construct.
     */
    public type(): Type {
        return Type.Unknown;
    }

    /**
     * Returns whether this construct is a block or not.
     */
    public isBlock(): boolean {
        return false;
    }

    /**
     * Returns the top level Block by walking through
     * all the parents.
     */
    public topLevelBlock(): Construct {
        // If we don't have a parent it means we're the top level block.
        if (this.parent === null) {
            return this;
        }

        return this.parent.topLevelBlock();
    }

    /**
     * Gets the parent block for this construct by walking
     * the parent constructs until a block construct is found.
     */
    public parentBlock(): Construct | null {
        if (this.parent === null) {
            return null;
        }

        if (this.parent.isBlock()) {
            return this.parent;
        }

        return this.parent.parentBlock();
    }
}
