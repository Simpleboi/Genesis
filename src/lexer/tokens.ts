// Token Definition

export enum TokenType {
  NUMBER,           // for numbers like 10, 20
  VARIABLE,         // for variables like "num"
  EQUALS,           // ==
  LEFT_PAREN,        // (
  RIGHT_PAREN,       // )
  SEMICOLON,        // ;
  COLON,            // :
  PLUS,             // +
  MINUS,            // -
  TIMES,            // *
  DIVIDE,           // /
  KEYWORD,          // for, while
  LEFT_BRACKET,      // [
  RIGHT_BRACKET,     // ]
  LEFT_CURLY,        // {
  RIGHT_CURLY,       // }
  DIRECTIVE,        // @
  BANG,             // !
  COMMENT,          // #
  LESS_THAN,         // <
  GREATER_THAN,      // >
  DATA_TYPE,        // int, char, string
  IDENTIFIER,       // some words
  ASSIGNMENT,       // =
  INT,              // DataType 'int'
  FLOAT,            // DataType 'float'
  STRING,           // DataType 'string'
  BOOL,             // DataType 'bool'
  CHAR,             // DataType 'char'
  VOID,             // DataType 'void'
  NULL,             // DataType 'null'
  UNDEFINED,        // DataType 'undefined'
  EOF,              // EOF = End Of File
}

export interface Token {
  type: TokenType;
  value: string;
}
