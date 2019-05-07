import {ErrorDetails, ErrorSeverity} from "./analysisError";

export const TuaError: { [key: string]: ErrorDetails } = {
    INTERNAL: {
        code: 1000,
        severity: ErrorSeverity.FATAL,
        message: "An internal compiler error has occurred.",
    },
    LOCAL_ASSIGNMENT_UNMATCHED: {
        code: 1001,
        severity: ErrorSeverity.ERROR,
        message: "The number of assignable variables doesn't match the number of assigned expressions.",
    },
    ASSIGNMENT_TYPES_NOT_ASSIGNABLE: {
        code: 1002,
        severity: ErrorSeverity.ERROR,
        message: "The type of the expression is not assignable to this variable.",
    },
    SYMBOL_UNKNOWN_TYPE: {
        code: 1003,
        severity: ErrorSeverity.WARNING,
        message: "No type could be inferred. Assuming `any`.",
    },
    EXPRESSION_POSSIBLY_NULL: {
        code: 1004,
        severity: ErrorSeverity.ERROR,
        message: "The expression is possibly nil.",
    },
    BINOP_EXPECTED_ARITHMETIC: {
        code: 1005,
        severity: ErrorSeverity.ERROR,
        message: "Expected an arithmetic expression.",
    },
    BINOP_EXPECTED_BOOLEAN: {
        code: 1006,
        severity: ErrorSeverity.ERROR,
        message: "Expected a boolean expression.",
    },
    BINOP_EXPECTED_STRING: {
        code: 1007,
        severity: ErrorSeverity.ERROR,
        message: "Expected a string expression.",
    },
    BINOP_EXPECTED_INTEGER: {
        code: 1008,
        severity: ErrorSeverity.ERROR,
        message: "Expected an integer expression.",
    },
    BINOP_NO_EQUALITY: {
        code: 1009,
        severity: ErrorSeverity.ERROR,
        message: "Cannot evaluate equality between two mismatched types.",
    },
    SYMBOL_HIDES_PREVIOUS_SYMBOL: {
        code: 1010,
        severity: ErrorSeverity.WARNING,
        message: "Symbol definition hides previously defined symbol.",
    },
};
