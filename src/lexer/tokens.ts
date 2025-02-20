// Token Definition

export enum TokenType {
    NUMBER,
    VARIABLE,
    EQUALS,
    LEFTPAREN,
    RIGHTPAREN,
    BINARYOPERATIONS,
    EOF
}

export interface Token {
    value: string;
    type: TokenType;
}


