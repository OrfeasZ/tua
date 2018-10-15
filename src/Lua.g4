grammar Lua;

chunk
    : SHEBANG? block EOF
    ;

block
    : stat* retstat?
    ;

stat
    : ';'
    | varlist '=' explist
    | functioncall
    | label
    | 'break'
    | 'goto' IDENTIFIER
    | 'do' block 'end'
    | 'while' exp 'do' block 'end'
    | 'repeat' block 'until' exp
    | 'if' exp 'then' block ('elseif' exp 'then' block)* ('else' block)? 'end'
    | 'for' IDENTIFIER '=' exp ',' exp (',' exp)? 'do' block 'end'
    | 'for' namelist 'in' explist 'do' block 'end'
    | 'function' funcname funcbody
    | 'local' 'function' IDENTIFIER funcbody
    | 'local' namelist ('=' explist)?
    ;

retstat
    : 'return' explist? ';'?
    ;

label
    : '::' IDENTIFIER '::'
    ;

funcname
    : IDENTIFIER ('.' IDENTIFIER)* (':' IDENTIFIER)?
    ;

varlist
    : variable (',' variable)*
    ;

variable
    : IDENTIFIER vareval*
    | '(' exp ')' vareval+
    ;

vareval
    : selfcall* '[' exp ']'
    | selfcall* '.' IDENTIFIER
    ;

namelist
    : IDENTIFIER (',' IDENTIFIER)*
    ;

explist
    : exp (',' exp)*
    ;

exp
    : 'nil'
    | 'false'
    | 'true'
    | numeral
    | literalstring
    | '...'
    | functiondef
    | prefixexp
    | tableconstructor
    | exp binop exp
    | unop exp
    ;

prefixexp
    : variable selfcall*
    | '(' exp ')' selfcall*
    ;

functioncall
    : variable selfcall+
    | '(' exp ')' selfcall+
    ;

selfcall
    : args
    | ':' IDENTIFIER args
    ;

args
    : '(' explist? ')'
    | tableconstructor
    | literalstring
    ;

functiondef
    : 'function' funcbody
    ;

funcbody
    : '(' parlist? ')' block 'end'
    ;

parlist
    : namelist (',' '...')?
    | '...'
    ;

tableconstructor
    : '{' fieldlist? '}'
    ;

fieldlist
    : field (fieldsep field)* fieldsep?
    ;

field
    : '[' exp ']' '=' exp
    | IDENTIFIER '=' exp
    | exp
    ;

fieldsep
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

literalstring
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
