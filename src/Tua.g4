grammar Tua;

import Lua;

// Modified lua rules.
chunk
    : SHEBANG? block EOF
    ;

nameList
    : IDENTIFIER typeDecl? (',' IDENTIFIER typeDecl?)*
    ;

funcBody
    : '(' parList? ')' ('->' returnType)? block 'end'
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
    | typedefStat
    | globalStat
    ;

// Custom tua rules.
typeDecl
    : ':' tuaType '?'?
    ;

tuaType
    : builtinType
    | tableType
    | callableType
    | IDENTIFIER
    ;

typeList
    : tuaType (',' tuaType)*
    ;

returnType
    : '(' typeList ')'
    | tuaType
    | 'void'
    ;

namedType
    : IDENTIFIER ':' tuaType '?'?
    ;

namedOrTuaType
    : tuaType
    | namedType
    ;

tableType
    : '{' namedOrTuaType (',' namedOrTuaType)* ','? '}'
    ;

callableType
    : '(' typeList? ')' '->' returnType
    ;

builtinType
    : 'integer'
    | 'float'
    | 'boolean'
    | 'string'
    | 'any'
    | 'nil'
    ;

typedefStat
    : 'typedef' IDENTIFIER tuaType '?'?
    ;

globalStat
    : 'global' IDENTIFIER tuaType '?'?
    ;