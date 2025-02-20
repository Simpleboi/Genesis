// Token Definition

export enum TokenType {
    NUMBER,            // for numbers like 10, 20
    VARIABLE,          // for variables like "num"
    EQUALS,            // =
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
    DATA_TYPE,          // int, char, string
    EOF             
}

export interface Token {
    value: string;
    type: TokenType;
}