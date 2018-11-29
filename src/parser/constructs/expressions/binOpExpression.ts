import {BinOpContext, ExprContext} from "../../../grammar/TuaParser";
import {AnalysisError, TuaError} from "../../../util/analysisError";
import {TuaType, Type} from "../../types/type";
import {Construct} from "../construct";
import {Expression} from "../expression";
import {ExpressionFactory} from "../expressionFactory";

export enum BinOpExpressionType {
    ARITHMETIC,
    BITWISE,
    ARITHMETIC_COMPARISON,
    LOGICAL,
    EQUALITY,
    STRING,
}

export class BinOpExpression extends Expression {
    public readonly expressionType: BinOpExpressionType;
    public readonly operator: string;
    public readonly lhsExpression: Expression;
    public readonly rhsExpression: Expression;

    protected arithmeticType: Type = Type.Float;

    constructor(binop: BinOpContext, lhsExpr: ExprContext, rhsExpr: ExprContext, parent: Construct) {
        super(parent);

        this.indexStart = lhsExpr.start.startIndex;
        this.indexEnd = rhsExpr.stop!.stopIndex + 1;

        if (binop.arithmOp()) {
            this.expressionType = BinOpExpressionType.ARITHMETIC;
        } else if (binop.bitOp()) {
            this.expressionType = BinOpExpressionType.BITWISE;
        } else if (binop.logicOp()) {
            this.expressionType = BinOpExpressionType.LOGICAL;
        } else if (binop.arithmCompOp()) {
            this.expressionType = BinOpExpressionType.ARITHMETIC_COMPARISON;
        } else if (binop.equalityOp()) {
            this.expressionType = BinOpExpressionType.EQUALITY;
        } else {
            this.expressionType = BinOpExpressionType.STRING;
        }

        this.operator = binop.text;

        this.lhsExpression = ExpressionFactory.fromContext(lhsExpr, this);
        this.rhsExpression = ExpressionFactory.fromContext(rhsExpr, this);
    }

    public analyze() {
        // Analyze the left and right hand-side expressions.
        this.lhsExpression.analyze();
        this.rhsExpression.analyze();

        // Check for nullable type operations.
        // TODO: Account for `nullable == nil` checks.
        if (this.lhsExpression.type().nullable) {
            this.analysisErrors.push(new AnalysisError(
                TuaError.EXPRESSION_POSSIBLY_NULL,
                this.lhsExpression.indexStart,
                this.lhsExpression.indexEnd,
                [ this.lhsExpression ],
            ));
        }

        if (this.rhsExpression.type().nullable) {
            this.analysisErrors.push(new AnalysisError(
                TuaError.EXPRESSION_POSSIBLY_NULL,
                this.rhsExpression.indexStart,
                this.rhsExpression.indexEnd,
                [ this.rhsExpression ],
            ));
        }

        // Emit errors based on what we expect the lhs/rhs expressions to be and what they actually are.
        this.analyzeExpression();
    }

    public type(): Type {
        switch (this.expressionType) {
            case BinOpExpressionType.EQUALITY:
            case BinOpExpressionType.ARITHMETIC_COMPARISON:
            case BinOpExpressionType.LOGICAL:
                return Type.Bool;

            case BinOpExpressionType.BITWISE:
                return Type.Int;

            case BinOpExpressionType.ARITHMETIC:
                return this.arithmeticType;

            case BinOpExpressionType.STRING:
                return Type.Str;
        }
    }

    public collectErrors() {
        return [
            ...this.analysisErrors,
            ...this.lhsExpression.collectErrors(),
            ...this.rhsExpression.collectErrors(),
        ];
    }

    protected analyzeExpression() {
        // TODO: Add better checks here after we add support for table operators (ie. addition, comparison, etc).
        switch (this.expressionType) {
            case BinOpExpressionType.ARITHMETIC:
                // TODO: Do we need to perform specific checks for ints/floats?
                // TODO: Lua automatically converts strings to numbers. Add support.
                this.checkExpression(
                    [TuaType.FLOAT, TuaType.INT],
                    [TuaType.FLOAT, TuaType.INT],
                    TuaError.BINOP_EXPECTED_ARITHMETIC,
                );

                // Calculate the evaluated type of this expression.
                if (this.lhsExpression.type().type === TuaType.INT &&
                    this.rhsExpression.type().type === TuaType.INT) {
                    this.arithmeticType = Type.Int;
                } else {
                    this.arithmeticType = Type.Float;
                }

                // Division and exponentiation always result in a float. See 3.4.1.
                if (this.operator === "^" || this.operator === "/") {
                    this.arithmeticType = Type.Float;
                }

                break;

            case BinOpExpressionType.ARITHMETIC_COMPARISON:
                this.checkExpression(
                    [TuaType.FLOAT, TuaType.INT],
                    [TuaType.FLOAT, TuaType.INT],
                    TuaError.BINOP_EXPECTED_ARITHMETIC,
                );

                break;

            case BinOpExpressionType.LOGICAL:
                this.checkExpression(
                    [TuaType.BOOL],
                    [TuaType.BOOL],
                    TuaError.BINOP_EXPECTED_BOOLEAN,
                );

                break;

            case BinOpExpressionType.BITWISE:
                this.checkExpression(
                    [TuaType.INT],
                    [TuaType.INT],
                    TuaError.BINOP_EXPECTED_INTEGER,
                );

                break;

            case BinOpExpressionType.STRING:
                this.checkExpression(
                    [TuaType.STR],
                    [TuaType.STR],
                    TuaError.BINOP_EXPECTED_STRING,
                );

                break;

            case BinOpExpressionType.EQUALITY:
                // TODO: Improve this.
                if (!this.lhsExpression.type().isAssignableFrom(this.rhsExpression.type())) {
                    this.analysisErrors.push(new AnalysisError(
                        TuaError.BINOP_NO_EQUALITY,
                        this.indexStart,
                        this.indexEnd,
                        [ this ],
                    ));
                }

                break;

            default:
                break;
        }
    }

    protected checkExpression(expectedLhsTypes: TuaType[], expectedRhsTypes: TuaType[], error: TuaError) {
        if (!expectedLhsTypes.includes(this.lhsExpression.type().type)) {
            this.analysisErrors.push(new AnalysisError(
                error,
                this.lhsExpression.indexStart,
                this.lhsExpression.indexEnd,
                [ this.lhsExpression ],
            ));
        }

        if (!expectedRhsTypes.includes(this.rhsExpression.type().type)) {
            this.analysisErrors.push(new AnalysisError(
                error,
                this.rhsExpression.indexStart,
                this.rhsExpression.indexEnd,
                [ this.rhsExpression ],
            ));
        }
    }
}
