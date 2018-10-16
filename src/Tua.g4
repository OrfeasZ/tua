grammar Tua;

import Lua;

// Modified lua rules.
chunk
    : SHEBANG? block EOF
    ;

nameList
    : IDENTIFIER typeDecl? (',' IDENTIFIER typeDecl?)*
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

selfCallIdentifier
    : ':' IDENTIFIER
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
    | IDENTIFIER typeSpecialization?
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
    : IDENTIFIER typeTemplate? ':' tuaType '?'?
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
    : 'int'
    | 'float'
    | 'bool'
    | 'str'
    | 'any'
    | 'nil'
    ;

typeTemplate
    : '<' IDENTIFIER (',' IDENTIFIER)* '>'
    ;

typeSpecialization
    : '<' tuaType (',' tuaType)* '>'
    ;

typedefStat
    : 'typedef' IDENTIFIER typeTemplate? tuaType '?'?
    ;

globalStat
    : 'global' IDENTIFIER tuaType '?'?
    ;