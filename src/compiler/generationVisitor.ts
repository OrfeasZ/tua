import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {
    ArgsContext,
    AssignStatContext,
    BinOpContext,
    BlockContext,
    BoolExprContext,
    BreakStatContext,
    ChunkContext,
    ColonStatContext,
    DoStatContext, ElseIfStatContext, ElseStatContext, ExprContext, ExprKeyFieldContext,
    ExprListContext,
    FieldContext,
    FieldListContext,
    FieldSepContext,
    ForInStatContext,
    ForStatContext,
    FuncBodyContext,
    FuncNameContext, FunctionCallContext,
    FunctionDefContext,
    FunctionDefStatContext,
    GotoStatContext, IdentifierKeyFieldContext,
    IfStatContext,
    LabelContext,
    LiteralStringContext,
    LocalFunctionStatContext,
    LocalVarStatContext,
    NameListContext,
    NilExprContext,
    NumeralContext,
    ParListContext,
    PrefixExprContext,
    RepeatStatContext, RetStatContext,
    SelfCallContext, SelfCallIdentifierContext,
    StatContext,
    TableConstructorContext, TypedIdentifierContext, UnLogicNotContext,
    UnOpContext,
    VarargExprContext, VarEvalContext,
    VariableContext,
    VarListContext,
    WhileStatContext,
} from "../grammar/TuaParser";
import {TuaVisitor} from "../grammar/TuaVisitor";
import {NullWriter} from "../util/nullWriter";
import {Writer} from "../util/writer";

/**
 * Walks the parser tree and generates standard lua from tua code. The way this
 * works is by basically emitting code for every standard lua rule, while omitting
 * custom tua rules and expressions.
 *
 * Each `visitX()` method accepts an optional `writer` parameter. All generated
 * code will be written to the provided writer object.
 */
export class GenerationVisitor extends AbstractParseTreeVisitor<void> implements TuaVisitor<void> {
    // Generator methods.
    public visitChunk(ctx: ChunkContext, writer: Writer = new NullWriter()) {
        if (ctx.SHEBANG()) {
            writer.writeLine(ctx.SHEBANG()!.text);
        }

        this.visitBlock(ctx.block(), writer);
    }

    public visitNameList(ctx: NameListContext, writer: Writer = new NullWriter()) {
        const identifiers = ctx.typedIdentifier();
        const identifierCount = identifiers.length;

        for (let i = 0; i < identifierCount; ++i) {
            if (i > 0) {
                writer.write(", ");
            }

            this.visitTypedIdentifier(identifiers[i], writer);
        }
    }

    public visitTypedIdentifier(ctx: TypedIdentifierContext, writer: Writer = new NullWriter()) {
        writer.write(ctx.IDENTIFIER().text);
    }

    public visitLocalFunctionStat(ctx: LocalFunctionStatContext, writer: Writer = new NullWriter()) {
        writer.writeIndented("local function ");
        writer.write(ctx.IDENTIFIER().text);
        this.visitFuncBody(ctx.funcBody(), writer);
    }

    public visitFuncBody(ctx: FuncBodyContext, writer: Writer = new NullWriter()) {
        writer.write("(");

        if (ctx.parList()) {
            this.visitParList(ctx.parList()!, writer);
        }

        writer.writeLine(")");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
        writer.writeLine("end");
    }

    public visitFuncName(ctx: FuncNameContext, writer: Writer = new NullWriter()) {
        const identifiers = ctx.IDENTIFIER();
        const identifierCount = identifiers.length;

        for (let i = 0; i < identifierCount; ++i) {
            if (i > 0) {
                writer.write(".");
            }

            writer.write(identifiers[i].text);
        }

        if (ctx.selfCallIdentifier()) {
            this.visitSelfCallIdentifier(ctx.selfCallIdentifier()!, writer);
        }
    }

    public visitSelfCallIdentifier(ctx: SelfCallIdentifierContext, writer: Writer = new NullWriter()) {
        writer.write(":");
        writer.write(ctx.IDENTIFIER().text);
    }

    public visitSelfCall(ctx: SelfCallContext, writer: Writer = new NullWriter()) {
        if (ctx.selfCallIdentifier()) {
            this.visitSelfCallIdentifier(ctx.selfCallIdentifier()!, writer);
        }

        this.visitArgs(ctx.args(), writer);
    }

    public visitStat(ctx: StatContext, writer: Writer = new NullWriter()) {
        if (ctx.colonStat()) {
            this.visitColonStat(ctx.colonStat()!, writer);
        } else if (ctx.assignStat()) {
            this.visitAssignStat(ctx.assignStat()!, writer);
        } else if (ctx.functionCall()) {
            this.visitFunctionCall(ctx.functionCall()!, writer);
        } else if (ctx.label()) {
            this.visitLabel(ctx.label()!, writer);
        } else if (ctx.breakStat()) {
            this.visitBreakStat(ctx.breakStat()!, writer);
        } else if (ctx.gotoStat()) {
            this.visitGotoStat(ctx.gotoStat()!, writer);
        } else if (ctx.doStat()) {
            this.visitDoStat(ctx.doStat()!, writer);
        } else if (ctx.whileStat()) {
            this.visitWhileStat(ctx.whileStat()!, writer);
        } else if (ctx.repeatStat()) {
            this.visitRepeatStat(ctx.repeatStat()!, writer);
        } else if (ctx.ifStat()) {
            this.visitIfStat(ctx.ifStat()!, writer);
        } else if (ctx.forStat()) {
            this.visitForStat(ctx.forStat()!, writer);
        } else if (ctx.forInStat()) {
            this.visitForInStat(ctx.forInStat()!, writer);
        } else if (ctx.functionDefStat()) {
            this.visitFunctionDefStat(ctx.functionDefStat()!, writer);
        } else if (ctx.localFunctionStat()) {
            this.visitLocalFunctionStat(ctx.localFunctionStat()!, writer);
        } else if (ctx.localVarStat()) {
            this.visitLocalVarStat(ctx.localVarStat()!, writer);
        }
    }

    public visitBlock(ctx: BlockContext, writer: Writer = new NullWriter()) {
        for (const stat of ctx.stat()) {
            writer.writeIndented();
            this.visitStat(stat, writer);
            writer.writeLine();
        }

        if (ctx.retStat()) {
            writer.writeIndented();
            this.visitRetStat(ctx.retStat()!, writer);
            writer.writeLine();
        }
    }

    public visitColonStat(ctx: ColonStatContext, writer: Writer = new NullWriter()) {
        writer.write(";");
    }

    public visitAssignStat(ctx: AssignStatContext, writer: Writer = new NullWriter()) {
        this.visitVarList(ctx.varList(), writer);
        writer.write(" = ");
        this.visitExprList(ctx.exprList(), writer);
    }

    public visitBreakStat(ctx: BreakStatContext, writer: Writer = new NullWriter()) {
        writer.write("break");
    }

    public visitGotoStat(ctx: GotoStatContext, writer: Writer = new NullWriter()) {
        writer.write("goto ");
        writer.write(ctx.IDENTIFIER().text);
    }

    public visitDoStat(ctx: DoStatContext, writer: Writer = new NullWriter()) {
        writer.writeLine("do");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
        writer.writeIndented("end");
    }

    public visitWhileStat(ctx: WhileStatContext, writer: Writer = new NullWriter()) {
        writer.write("while ");
        this.visitExpr(ctx.expr(), writer);

        writer.writeLine(" do");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
        writer.writeIndented("end");
    }

    public visitRepeatStat(ctx: RepeatStatContext, writer: Writer = new NullWriter()) {
        writer.writeLine("repeat");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
        writer.writeIndented("until ");

        this.visitExpr(ctx.expr(), writer);
    }

    public visitIfStat(ctx: IfStatContext, writer: Writer = new NullWriter()) {
        writer.write("if ");
        this.visitExpr(ctx.expr(), writer);

        writer.writeLine(" then");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();

        for (const stat of ctx.elseIfStat()) {
            this.visitElseIfStat(stat, writer);
        }

        if (ctx.elseStat()) {
            this.visitElseStat(ctx.elseStat()!, writer);
        }

        writer.writeIndented("end");
    }

    public visitElseIfStat(ctx: ElseIfStatContext, writer: Writer = new NullWriter()) {
        writer.write("elseif ");
        this.visitExpr(ctx.expr(), writer);

        writer.writeLine(" then");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
    }

    public visitElseStat(ctx: ElseStatContext, writer: Writer = new NullWriter()) {
        writer.writeLine("else");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
    }

    public visitForStat(ctx: ForStatContext, writer: Writer = new NullWriter()) {
        writer.write("for ");
        writer.write(ctx.IDENTIFIER().text);
        writer.write(" = ");

        this.visitExpr(ctx.expr()[0], writer);
        writer.write(", ");
        this.visitExpr(ctx.expr()[1], writer);

        if (ctx.expr().length === 3) {
            writer.write(", ");
            this.visitExpr(ctx.expr()[2], writer);
        }

        writer.writeLine(" do");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
        writer.writeIndented("end");
    }

    public visitForInStat(ctx: ForInStatContext, writer: Writer = new NullWriter()) {
        writer.write("for ");
        this.visitNameList(ctx.nameList(), writer);

        writer.write(" in ");
        this.visitExprList(ctx.exprList(), writer);

        writer.writeLine(" do");
        writer.increaseIndentation();

        this.visitBlock(ctx.block(), writer);

        writer.decreaseIndentation();
        writer.writeIndented("end");
    }

    public visitFunctionDefStat(ctx: FunctionDefStatContext, writer: Writer = new NullWriter()) {
        writer.write("function ");
        this.visitFuncName(ctx.funcName(), writer);
        this.visitFuncBody(ctx.funcBody(), writer);
    }

    public visitLocalVarStat(ctx: LocalVarStatContext, writer: Writer = new NullWriter()) {
        writer.write("local ");
        this.visitNameList(ctx.nameList(), writer);

        if (ctx.exprList()) {
            writer.write(" = ");
            this.visitExprList(ctx.exprList()!, writer);
        }
    }

    public visitRetStat(ctx: RetStatContext, writer: Writer = new NullWriter()) {
        writer.write("return");

        if (ctx.exprList()) {
            writer.write(" ");
            this.visitExprList(ctx.exprList()!, writer);
        }

        if (ctx.colonStat()) {
            this.visitColonStat(ctx.colonStat()!, writer);
        }
    }

    public visitLabel(ctx: LabelContext, writer: Writer = new NullWriter()) {
        writer.write("::");
        writer.write(ctx.IDENTIFIER().text);
        writer.write("::");
    }

    public visitVarList(ctx: VarListContext, writer: Writer = new NullWriter()) {
        const vars = ctx.variable();
        const varCount = vars.length;

        for (let i = 0; i < varCount; ++i) {
            if (i > 0) {
                writer.write(", ");
            }

            this.visitVariable(vars[i], writer);
        }
    }

    public visitVariable(ctx: VariableContext, writer: Writer = new NullWriter()) {
        if (ctx.IDENTIFIER()) {
            writer.write(ctx.IDENTIFIER()!.text);
        } else {
            writer.write("(");
            this.visitExpr(ctx.expr()!, writer);
            writer.write(")");
        }

        for (const varEval of ctx.varEval()) {
            this.visitVarEval(varEval, writer);
        }
    }

    public visitVarEval(ctx: VarEvalContext, writer: Writer = new NullWriter()) {
        for (const selfCall of ctx.selfCall()) {
            this.visitSelfCall(selfCall, writer);
        }

        if (ctx.expr()) {
            writer.write("[");
            this.visitExpr(ctx.expr()!, writer);
            writer.write("]");
        } else {
            writer.write(".");
            writer.write(ctx.IDENTIFIER()!.text);
        }
    }

    public visitExprList(ctx: ExprListContext, writer: Writer = new NullWriter()) {
        const exprs = ctx.expr();
        const exprCount = exprs.length;

        for (let i = 0; i < exprCount; ++i) {
            if (i > 0) {
                writer.write(", ");
            }

            this.visitExpr(exprs[i], writer);
        }
    }

    public visitExpr(ctx: ExprContext, writer: Writer = new NullWriter()) {
        if (ctx.nilExpr()) {
            this.visitNilExpr(ctx.nilExpr()!, writer);
        } else if (ctx.boolExpr()) {
            this.visitBoolExpr(ctx.boolExpr()!, writer);
        } else if (ctx.numeral()) {
            this.visitNumeral(ctx.numeral()!, writer);
        } else if (ctx.literalString()) {
            this.visitLiteralString(ctx.literalString()!, writer);
        } else if (ctx.varargExpr()) {
            this.visitVarargExpr(ctx.varargExpr()!, writer);
        } else if (ctx.functionDef()) {
            this.visitFunctionDef(ctx.functionDef()!, writer);
        } else if (ctx.prefixExpr()) {
            this.visitPrefixExpr(ctx.prefixExpr()!, writer);
        } else if (ctx.tableConstructor()) {
            this.visitTableConstructor(ctx.tableConstructor()!, writer);
        } else if (ctx.binOp()) {
            this.visitExpr(ctx.expr()[0], writer);
            this.visitBinOp(ctx.binOp()!, writer);
            this.visitExpr(ctx.expr()[1], writer);
        } else if (ctx.unOp()) {
            this.visitUnOp(ctx.unOp()!, writer);
            this.visitExpr(ctx.expr()[0], writer);
        }
    }

    public visitNilExpr(ctx: NilExprContext, writer: Writer = new NullWriter()) {
        writer.write("nil");
    }

    public visitBoolExpr(ctx: BoolExprContext, writer: Writer = new NullWriter()) {
        writer.write(ctx.text);
    }

    public visitVarargExpr(ctx: VarargExprContext, writer: Writer = new NullWriter()) {
        writer.write("...");
    }

    public visitPrefixExpr(ctx: PrefixExprContext, writer: Writer = new NullWriter()) {
        if (ctx.variable()) {
            this.visitVariable(ctx.variable()!, writer);
        } else {
            writer.write("(");
            this.visitExpr(ctx.expr()!, writer);
            writer.write(")");
        }

        for (const selfCall of ctx.selfCall()) {
            this.visitSelfCall(selfCall, writer);
        }
    }

    public visitFunctionCall(ctx: FunctionCallContext, writer: Writer = new NullWriter()) {
        if (ctx.variable()) {
            this.visitVariable(ctx.variable()!, writer);
        } else {
            writer.write("(");
            this.visitExpr(ctx.expr()!, writer);
            writer.write(")");
        }

        for (const selfCall of ctx.selfCall()) {
            this.visitSelfCall(selfCall, writer);
        }
    }

    public visitArgs(ctx: ArgsContext, writer: Writer = new NullWriter()) {
        if (ctx.tableConstructor()) {
            this.visitTableConstructor(ctx.tableConstructor()!, writer);
        } else if (ctx.literalString()) {
            this.visitLiteralString(ctx.literalString()!, writer);
        } else {
            writer.write("(");

            if (ctx.exprList()) {
                this.visitExprList(ctx.exprList()!, writer);
            }

            writer.write(")");
        }
    }

    public visitFunctionDef(ctx: FunctionDefContext, writer: Writer = new NullWriter()) {
        writer.write("function ");
        this.visitFuncBody(ctx.funcBody(), writer);
    }

    public visitParList(ctx: ParListContext, writer: Writer = new NullWriter()) {
        if (ctx.nameList()) {
            this.visitNameList(ctx.nameList()!, writer);

            if (ctx.varargExpr()) {
                writer.write(", ");
                this.visitVarargExpr(ctx.varargExpr()!, writer);
            }
        } else {
            this.visitVarargExpr(ctx.varargExpr()!, writer);
        }
    }

    public visitTableConstructor(ctx: TableConstructorContext, writer: Writer = new NullWriter()) {
        writer.write("{");

        if (ctx.fieldList()) {
            writer.writeLine();
            writer.increaseIndentation();
            this.visitFieldList(ctx.fieldList()!, writer);
            writer.decreaseIndentation();
        }

        writer.write("}");
    }

    public visitFieldList(ctx: FieldListContext, writer: Writer = new NullWriter()) {
        const fields = ctx.field();
        const separators = ctx.fieldSep();
        const fieldCount = fields.length;
        const separatorCount = separators.length;

        for (let i = 0; i < fieldCount; ++i) {
            if (i > 0) {
                this.visitFieldSep(separators[i - 1], writer);
            }

            writer.writeIndented();
            this.visitField(fields[i], writer);
        }

        if (fieldCount === separatorCount) {
            this.visitFieldSep(separators[separatorCount - 1]);
        } else {
            writer.writeLine();
        }
    }

    public visitField(ctx: FieldContext, writer: Writer = new NullWriter()) {
        if (ctx.exprKeyField()) {
            this.visitExprKeyField(ctx.exprKeyField()!, writer);
        } else if (ctx.identifierKeyField()) {
            this.visitIdentifierKeyField(ctx.identifierKeyField()!, writer);
        } else {
            this.visitExpr(ctx.expr()!, writer);
        }
    }

    public visitExprKeyField(ctx: ExprKeyFieldContext, writer: Writer = new NullWriter()) {
        writer.write("[");
        this.visitExpr(ctx.expr()[0], writer);
        writer.write("] = ");
        this.visitExpr(ctx.expr()[1], writer);
    }

    public visitIdentifierKeyField(ctx: IdentifierKeyFieldContext, writer: Writer = new NullWriter()) {
        writer.write(ctx.IDENTIFIER().text);
        writer.write(" = ");
        this.visitExpr(ctx.expr(), writer);
    }

    public visitFieldSep(ctx: FieldSepContext, writer: Writer = new NullWriter()) {
        writer.writeLine(ctx.text);
    }

    public visitBinOp(ctx: BinOpContext, writer: Writer = new NullWriter()) {
        writer.write(" ");
        writer.write(ctx.text);
        writer.write(" ");
    }

    public visitUnOp(ctx: UnOpContext, writer: Writer = new NullWriter()) {
        if (ctx.unLogicNot()) {
            this.visitUnLogicNot(ctx.unLogicNot()!, writer);
        } else {
            writer.write(ctx.text);
        }
    }

    public visitUnLogicNot(ctx: UnLogicNotContext, writer: Writer = new NullWriter()) {
        writer.write("not ");
    }

    public visitLiteralString(ctx: LiteralStringContext, writer: Writer = new NullWriter()) {
        writer.write(ctx.text);
    }

    public visitNumeral(ctx: NumeralContext, writer: Writer = new NullWriter()) {
        writer.write(ctx.text);
    }

    protected defaultResult(): void {}
}
