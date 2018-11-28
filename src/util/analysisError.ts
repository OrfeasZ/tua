export enum TuaError {
    INTERNAL,
    LOCAL_ASSIGNMENT_UNMATCHED,
    ASSIGNMENT_TYPES_NOT_ASSIGNABLE,
    SYMBOL_UNKNOWN_TYPE,
}

export class AnalysisError {
    public indexStart: number;
    public indexEnd: number;
    public error: TuaError;
    public parameters: any[];

    public constructor(error: TuaError, start: number, end: number, params: any[] = []) {
        this.error = error;
        this.indexStart = start;
        this.indexEnd = end;
        this.parameters = params;
    }
}
