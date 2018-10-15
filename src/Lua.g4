grammar Lua;

chunk
    : SHEBANG? block EOF
    ;

block
    : stat* retStat?
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
    ;

colonStat
    : ';'
    ;

assignStat
    : varList '=' exprList
    ;

breakStat
    : 'break'
    ;

gotoStat
    : 'goto' IDENTIFIER
    ;

doStat
    :  'do' block 'end'
    ;

whileStat
    : 'while' expr 'do' block 'end'
    ;

repeatStat
    : 'repeat' block 'until' expr
    ;

ifStat
    : 'if' expr 'then' block ('elseif' expr 'then' block)* ('else' block)? 'end'
    ;

forStat
    : 'for' IDENTIFIER '=' expr ',' expr (',' expr)? 'do' block 'end'
    ;

forInStat
    : 'for' nameList 'in' exprList 'do' block 'end'
    ;

functionDefStat
    : 'function' funcName funcBody
    ;

localFunctionStat
    : 'local' 'function' IDENTIFIER funcBody
    ;

localVarStat
    : 'local' nameList ('=' exprList)?
    ;

retStat
    : 'return' exprList? ';'?
    ;

label
    : '::' IDENTIFIER '::'
    ;

funcName
    : IDENTIFIER ('.' IDENTIFIER)* (':' IDENTIFIER)?
    ;

varList
    : variable (',' variable)*
    ;

variable
    : IDENTIFIER varEval*
    | '(' expr ')' varEval+
    ;

varEval
    : selfCall* '[' expr ']'
    | selfCall* '.' IDENTIFIER
    ;

nameList
    : IDENTIFIER (',' IDENTIFIER)*
    ;

exprList
    : expr (',' expr)*
    ;

expr
    : nilExpr
    | boolExpr
    | numeral
    | literalString
    | varargExpr
    | functionDef
    | prefixExpr
    | tableConstructor
    | expr binop expr
    | unop expr
    ;

nilExpr
    : 'nil'
    ;

boolExpr
    : 'false'
    | 'true'
    ;

varargExpr
    : '...'
    ;

prefixExpr
    : variable selfCall*
    | '(' expr ')' selfCall*
    ;

functionCall
    : variable selfCall+
    | '(' expr ')' selfCall+
    ;

selfCall
    : args
    | ':' IDENTIFIER args
    ;

args
    : '(' exprList? ')'
    | tableConstructor
    | literalString
    ;

functionDef
    : 'function' funcBody
    ;

funcBody
    : '(' parList? ')' block 'end'
    ;

parList
    : nameList (',' '...')?
    | '...'
    ;

tableConstructor
    : '{' fieldList? '}'
    ;

fieldList
    : field (fieldSep field)* fieldSep?
    ;

field
    : '[' expr ']' '=' expr
    | IDENTIFIER '=' expr
    | expr
    ;

fieldSep
    : ','
    | ';'
    ;

binop
    : '+'
    | '-'
    | '*'
    | '/'
    | '//'
    | '^'
    | '%'
    | '&'
    | '~'
    | '|'
    | '>>'
    | '<<'
    | '..'
    | '<'
    | '<='
    | '>'
    | '>='
    | '=='
    | '~='
    | 'and'
    | 'or'
    ;

unop
    : '-'
    | 'not'
    | '#'
    | '~'
    ;

literalString
    : SINGLE_STRING
    | DOUBLE_STRING
    | LONG_STRING
    ;

numeral
    : INTEGER
    | HEX
    | FLOAT
    | HEX_FLOAT
    ;

IDENTIFIER
    : [a-zA-Z_][a-zA-Z0-9_]*
    ;

SINGLE_STRING
    : '\'' (~[\r\n\\'] | EscChar)* '\''
    ;

DOUBLE_STRING
    : '"' (~[\r\n\\"] | EscChar)* '"'
    ;

fragment EscChar
    : '\\\n'
    | '\\' [\\abfnrtvz'"]
    | '\\x' HexDigit HexDigit
    | '\\' DecDigit DecDigit? DecDigit?
    | '\\u{' HexDigit+ '}'
    | '\\z' [ \t\r\n]+
    ;

fragment BlockedString
    : '=' BlockedString '='
    | '[' .*? ']'
    ;

LONG_STRING
    : '[' BlockedString ']'
    ;

fragment DecDigit
    : [0-9]
    ;

fragment HexDigit
    : [0-9a-fA-F]
    ;

fragment HexPrefix
    : '0x'
    | '0X'
    ;

INTEGER
    : DecDigit+
    ;

HEX
    : HexPrefix HexDigit+
    ;

fragment FloatExponent
    : [eE] [+-]? DecDigit+
    ;

fragment HexExponent
    : [pP] [+-]? DecDigit+
    ;

FLOAT
    : DecDigit+ '.' DecDigit* FloatExponent?
    | DecDigit+ FloatExponent
    | '.' DecDigit+ FloatExponent?
    ;

HEX_FLOAT
    : HexPrefix HexDigit+ '.' HexDigit* HexExponent?
    | HexPrefix HexDigit+ HexExponent
    | HexPrefix '.' HexDigit+ HexExponent?
    ;

LONG_COMMENT
    : '--[' BlockedString ']' -> channel(HIDDEN)
    ;

SHORT_COMMENT
    : '--' ~('\r' | '\n')* -> channel(HIDDEN)
    ;

WS
    : [\r\n\t ]+ -> skip
    ;

SHEBANG
    : '#!' ~('\r' | '\n')*
    ;
