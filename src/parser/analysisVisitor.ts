import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {
    ArgsContext,
    AssignStatContext,
    BinopContext,
    BlockContext,
    BoolExprContext,
    BreakStatContext,
    BuiltinTypeContext,
    CallableTypeContext,
    ChunkContext,
    ColonStatContext,
    DoStatContext,
    ElseIfStatContext,
    ElseStatContext, ExprContext,
    ExprKeyFieldContext,
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
    GlobalStatContext,
    GotoStatContext,
    IdentifierKeyFieldContext,
    IfStatContext,
    LabelContext,
    LiteralStringContext,
    LocalFunctionStatContext,
    LocalVarStatContext, NamedOrTuaTypeContext,
    NamedTypeContext, NameListContext,
    NilExprContext,
    NotopContext, NullableCallableTypeContext, NullableOpContext,
    NumeralContext,
    ParListContext, ParTypeListContext,
    PrefixExprContext,
    RepeatStatContext, RetStatContext,
    ReturnTypeContext,
    SelfCallContext,
    SelfCallIdentifierContext,
    StatContext,
    TableConstructorContext,
    TableTypeContext, TuaTypeContext,
    TypeDeclContext,
    TypedefStatContext,
    TypeListContext,
    TypeSpecializationContext,
    TypeTemplateContext,
    UnopContext,
    VarargExprContext, VarEvalContext,
    VariableContext,
    VarListContext,
    WhileStatContext,
} from "../grammar/TuaParser";
import {TuaVisitor} from "../grammar/TuaVisitor";

export class AnalysisVisitor extends AbstractParseTreeVisitor<void> implements TuaVisitor<void> {
    public visitArgs(ctx: ArgsContext) {}
    public visitAssignStat(ctx: AssignStatContext) {}
    public visitBinop(ctx: BinopContext) {}
    public visitBlock(ctx: BlockContext) {}
    public visitBoolExpr(ctx: BoolExprContext) {}
    public visitBreakStat(ctx: BreakStatContext) {}
    public visitBuiltinType(ctx: BuiltinTypeContext) {}
    public visitCallableType(ctx: CallableTypeContext) {}
    public visitChunk(ctx: ChunkContext) {}
    public visitColonStat(ctx: ColonStatContext) {}
    public visitDoStat(ctx: DoStatContext) {}
    public visitElseIfStat(ctx: ElseIfStatContext) {}
    public visitElseStat(ctx: ElseStatContext) {}
    public visitExpr(ctx: ExprContext) {}
    public visitExprKeyField(ctx: ExprKeyFieldContext) {}
    public visitExprList(ctx: ExprListContext) {}
    public visitField(ctx: FieldContext) {}
    public visitFieldList(ctx: FieldListContext) {}
    public visitFieldSep(ctx: FieldSepContext) {}
    public visitForInStat(ctx: ForInStatContext) {}
    public visitForStat(ctx: ForStatContext) {}
    public visitFuncBody(ctx: FuncBodyContext) {}
    public visitFuncName(ctx: FuncNameContext) {}
    public visitFunctionCall(ctx: FunctionCallContext) {}
    public visitFunctionDef(ctx: FunctionDefContext) {}
    public visitFunctionDefStat(ctx: FunctionDefStatContext) {}
    public visitGlobalStat(ctx: GlobalStatContext) {}
    public visitGotoStat(ctx: GotoStatContext) {}
    public visitIdentifierKeyField(ctx: IdentifierKeyFieldContext) {}
    public visitIfStat(ctx: IfStatContext) {}
    public visitLabel(ctx: LabelContext) {}
    public visitLiteralString(ctx: LiteralStringContext) {}
    public visitLocalFunctionStat(ctx: LocalFunctionStatContext) {}
    public visitLocalVarStat(ctx: LocalVarStatContext) {}
    public visitNameList(ctx: NameListContext) {}
    public visitNamedOrTuaType(ctx: NamedOrTuaTypeContext) {}
    public visitNamedType(ctx: NamedTypeContext) {}
    public visitNilExpr(ctx: NilExprContext) {}
    public visitNotop(ctx: NotopContext) {}
    public visitNullableCallableType(ctx: NullableCallableTypeContext) {}
    public visitNullableOp(ctx: NullableOpContext) {}
    public visitNumeral(ctx: NumeralContext) {}
    public visitParList(ctx: ParListContext) {}
    public visitParTypeList(ctx: ParTypeListContext) {}
    public visitPrefixExpr(ctx: PrefixExprContext) {}
    public visitRepeatStat(ctx: RepeatStatContext) {}
    public visitRetStat(ctx: RetStatContext) {}
    public visitReturnType(ctx: ReturnTypeContext) {}
    public visitSelfCall(ctx: SelfCallContext) {}
    public visitSelfCallIdentifier(ctx: SelfCallIdentifierContext) {}
    public visitStat(ctx: StatContext) {}
    public visitTableConstructor(ctx: TableConstructorContext) {}
    public visitTableType(ctx: TableTypeContext) {}
    public visitTuaType(ctx: TuaTypeContext) {}
    public visitTypeDecl(ctx: TypeDeclContext) {}
    public visitTypeList(ctx: TypeListContext) {}
    public visitTypeSpecialization(ctx: TypeSpecializationContext) {}
    public visitTypeTemplate(ctx: TypeTemplateContext) {}
    public visitTypedefStat(ctx: TypedefStatContext) {}
    public visitUnop(ctx: UnopContext) {}
    public visitVarEval(ctx: VarEvalContext) {}
    public visitVarList(ctx: VarListContext) {}
    public visitVarargExpr(ctx: VarargExprContext) {}
    public visitVariable(ctx: VariableContext) {}
    public visitWhileStat(ctx: WhileStatContext) {}

    protected defaultResult(): void {}
}
