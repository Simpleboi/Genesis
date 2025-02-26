// Token Definition

export enum TokenType {
    NUMBER,            // for numbers like 10, 20
    VARIABLE,          // for variables like "num"
    EQUALS,            // ==
    LEFTPAREN,         // (
    RIGHTPAREN,        // )
    SEMICOLON,         // ;
    COLON,             // :
    PLUS,              // +
    MINUS,             // -
    TIMES,             // *
    DIVIDE,            // /
    KEYWORD,           // for, while
    LEFTBRACKET,       // [
    RIGHTBRACKET,      // ]
    LEFTCURLY,         // {
    RIGHTCURLY,        // }
    DIRECTIVE,         // @
    COMMENT,           // #
    DATA_TYPE,         // int, char, string
    IDENTIFIER,        // some words
    ASSIGNMENT,        // =
    INT,               // DataType 'int'
    FLOAT,             // DataType 'float'
    STRING,            // DataType 'string'
    BOOL,              // DataType 'bool'
    CHAR,              // DataType 'char'
    VOID,              // DataType 'void'
    EOF             
}

export interface Token {
    value: string;
    type: TokenType;
}