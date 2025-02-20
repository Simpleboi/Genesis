// Token Definition

export enum TokenType {
    NUMBER,
    VARIABLE,
    EQUALS,
    LEFTPAREN,
    RIGHTPAREN,
    SEMICOLON,
    COLON,
    PLUS,
    MINUS,
    TIMES,
    DIVIDE,
    KEYWORD,
    LEFTBRACKET,
    RIGHTBRACKET,
    EOF
}

export interface Token {
    value: string;
    type: TokenType;
}