import {StatContext} from "../../grammar/TuaParser";
import {Construct} from "./construct";
import {Statement} from "./statement";
import {AssignmentStatement} from "./statements/assignmentStatement";
import {DoStatement} from "./statements/doStatement";
import {ForInStatement} from "./statements/forInStatement";
import {ForStatement} from "./statements/forStatement";
import {FunctionCallStatement} from "./statements/functionCallStatement";
import {FunctionStatement} from "./statements/functionStatement";
import {GlobalStatement} from "./statements/globalStatement";
import {GotoStatement} from "./statements/gotoStatement";
import {IfStatement} from "./statements/ifStatement";
import {LabelStatement} from "./statements/labelStatement";
import {LocalFunctionStatement} from "./statements/localFunctionStatement";
import {LocalVariableStatement} from "./statements/localVariableStatement";
import {RepeatStatement} from "./statements/repeatStatement";
import {TypedefStatement} from "./statements/typedefStatement";
import {WhileStatement} from "./statements/whileStatement";

export class StatementFactory {
    /**
     * Creates a statement construct from a statement context.
     * Returns `null` for unsupported statements.
     * @param ctx
     * @param parent
     */
    public static fromContext(ctx: StatContext, parent: Construct): Statement | null {
        if (ctx.assignStat()) {
            return new AssignmentStatement(ctx.assignStat()!, parent);
        } else if (ctx.functionCall()) {
            return new FunctionCallStatement(ctx.functionCall()!, parent);
        } else if (ctx.label()) {
            return new LabelStatement(ctx.label()!, parent);
        } else if (ctx.gotoStat()) {
            return new GotoStatement(ctx.gotoStat()!, parent);
        } else if (ctx.doStat()) {
            return new DoStatement(ctx.doStat()!, parent);
        } else if (ctx.whileStat()) {
            return new WhileStatement(ctx.whileStat()!, parent);
        } else if (ctx.repeatStat()) {
            return new RepeatStatement(ctx.repeatStat()!, parent);
        } else if (ctx.ifStat()) {
            return new IfStatement(ctx.ifStat()!, parent);
        } else if (ctx.forStat()) {
            return new ForStatement(ctx.forStat()!, parent);
        } else if (ctx.forInStat()) {
            return new ForInStatement(ctx.forInStat()!, parent);
        } else if (ctx.functionDefStat()) {
            return new FunctionStatement(ctx.functionDefStat()!, parent);
        } else if (ctx.localFunctionStat()) {
            return new LocalFunctionStatement(ctx.localFunctionStat()!, parent);
        } else if (ctx.localVarStat()) {
            return new LocalVariableStatement(ctx.localVarStat()!, parent);
        } else if (ctx.tableTypedefStat()) {
            return new TypedefStatement(ctx.tableTypedefStat()!, parent);
        } else if (ctx.typedefStat()) {
            return new TypedefStatement(ctx.typedefStat()!, parent);
        } else if (ctx.globalStat()) {
            return new GlobalStatement(ctx.globalStat()!, parent);
        }

        return null;
    }
}
