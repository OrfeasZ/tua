export enum ErrorSeverity {
    INFO,
    WARNING,
    ERROR,
    FATAL,
}

export interface ErrorDetails {
    code: number;
    severity: ErrorSeverity;
    message: string;
}

export class AnalysisError {
    public indexStart: number;
    public indexEnd: number;
    public error: ErrorDetails;
    public parameters: any[];

    public constructor(error: ErrorDetails, start: number, end: number, params: any[] = []) {
        this.error = error;
        this.indexStart = start;
        this.indexEnd = end;
        this.parameters = params;
    }
}
