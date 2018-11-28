grammar Tua;

import Lua;

// Modified lua rules.
chunk
    : SHEBANG? block EOF
    ;

nameList
    : typedIdentifier (',' typedIdentifier)*
    ;

localFunctionStat
    : 'local' 'function' IDENTIFIER typeTemplate? funcBody
    ;

funcBody
    : '(' parList? ')' ('->' returnType)? block 'end'
    ;

funcName
    : IDENTIFIER ('.' IDENTIFIER)* selfCallIdentifier? typeTemplate?
    ;

selfCall
    : typeSpecialization? args
    | selfCallIdentifier typeSpecialization? args
    ;

stat
    : colonStat
    | assignStat
    | functionCall
    | label
    | breakStat
    | gotoStat
    | doStat
    | whileStat
    | repeatStat
    | ifStat
    | forStat
    | forInStat
    | functionDefStat
    | localFunctionStat
    | localVarStat
    | tableTypedefStat
    | typedefStat
    | globalStat
    ;

// Custom tua rules.
typeDecl
    : ':' tuaType
    ;

selfCallIdentifier
    : ':' IDENTIFIER
    ;

typedIdentifier
    : IDENTIFIER typeDecl?
    ;

tuaType
    : builtinType nullableOp?
    | tableType nullableOp?
    | callableType
    | nullableCallableType
    | IDENTIFIER typeSpecialization? nullableOp?
    ;

nullableOp
    : '?'
    ;

nullableCallableType
    : '(' callableType ')' nullableOp
    ;

typeList
    : tuaType (',' tuaType)*
    ;

// TODO: Support specifying type for vararg callables.
parTypeList
    : typeList (',' varargExpr)?
    ;

returnType
    : '(' typeList ')'
    | tuaType
    | 'void'
    ;

namedType
    : IDENTIFIER typeTemplate? ':' tuaType
    ;

namedOrTuaType
    : tuaType
    | namedType
    ;

tableType
    : '{' namedOrTuaType (',' namedOrTuaType)* ','? '}'
    ;

callableType
    : '(' parTypeList? ')' '->' returnType
    ;

builtinType
    : 'int'
    | 'float'
    | 'bool'
    | 'str'
    | 'any'
    ;

typeTemplate
    : '<' IDENTIFIER (',' IDENTIFIER)* '>'
    ;

typeSpecialization
    : '<' tuaType (',' tuaType)* '>'
    ;

templatedIdentifiers
    : IDENTIFIER typeTemplate? (',' IDENTIFIER typeTemplate?)*
    ;

tableTypedefStat
    : 'typedef' IDENTIFIER ('extends' templatedIdentifiers)? tableType
    ;

typedefStat
    : 'typedef' IDENTIFIER typeTemplate? tuaType
    ;

globalStat
    : 'global' IDENTIFIER tuaType
    ;