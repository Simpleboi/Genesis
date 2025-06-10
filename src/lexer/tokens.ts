// Token Definition

export enum TokenType {
  NUMBER = 0,            // for numbers like 10, 20
  VARIABLE = 1,          // for variables like "num"
  EQUALS = 2,            // ==
  LEFT_PAREN = 3,        // (
  RIGHT_PAREN = 4,       // )
  SEMICOLON = 5,         // ;
  COLON = 6,             // :
  PLUS = 7,              // +
  MINUS = 8,             // -
  TIMES = 9,             // *
  DIVIDE = 10,           // /
  KEYWORD = 11,           // for, while
  LEFT_BRACKET = 12,      // [
  RIGHT_BRACKET = 13,     // ]
  LEFT_CURLY = 14,        // {
  RIGHT_CURLY = 15,       // }
  DIRECTIVE = 16,         // @
  BANG = 17,              // !
  COMMENT = 18,           // #
  LESS_THAN = 19,         // <
  GREATER_THAN = 20,      // >
  DATA_TYPE = 21,         // int, char, string
  IDENTIFIER = 22,        // some words
  ASSIGNMENT = 23,        // =
  INTEGER = 24,           // 10, 200
  FLOAT = 25,             // 3.14, 10001.2
  DECIMAL = 26,           // .
  EOF = 26,              // EOF = End Of File
}

export interface Token {
  type: TokenType;
  value: string;
}
