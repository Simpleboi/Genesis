import { TokenType } from '../tokens';
import { LexerClass } from '../lexer';

// Read symbols (operators, parentheses, etc.)
// Takes a LexerClass instance and operates on its state

export function readSymbols(lexer: LexerClass): boolean {
  const currentChar = lexer.peek();

  switch (currentChar) {
    case '+':
      lexer.addToken(TokenType.PLUS, currentChar);
      lexer.advance();
      return true;
    case '-':
      lexer.addToken(TokenType.MINUS, currentChar);
      lexer.advance();
      return true;
    case '*':
      lexer.addToken(TokenType.TIMES, currentChar);
      lexer.advance();
      return true;
    case '/':
      lexer.addToken(TokenType.DIVIDE, currentChar);
      lexer.advance();
      return true;
    case '(':
      lexer.addToken(TokenType.LEFT_PAREN, currentChar);
      lexer.advance();
      return true;
    case ')':
      lexer.addToken(TokenType.RIGHT_PAREN, currentChar);
      lexer.advance();
      return true;
    case '[':
      lexer.addToken(TokenType.LEFT_BRACKET, currentChar);
      lexer.advance();
      return true;
    case ']':
      lexer.addToken(TokenType.RIGHT_BRACKET, currentChar);
      lexer.advance();
      return true;
    case '{':
      lexer.addToken(TokenType.LEFT_CURLY, currentChar);
      lexer.advance();
      return true;
    case '}':
      lexer.addToken(TokenType.RIGHT_CURLY, currentChar);
      lexer.advance();
      return true;
    case '#':
      lexer.addToken(TokenType.COMMENT, currentChar);
      lexer.advance();
      return true;
    case '@':
      lexer.addToken(TokenType.DIRECTIVE, currentChar);
      lexer.advance();
      return true;
    case '=':
      lexer.addToken(TokenType.ASSIGNMENT, currentChar);
      lexer.advance();
      return true;
    case '.':
      lexer.addToken(TokenType.DECIMAL, currentChar);
      lexer.advance();
      return true;
    case ';':
      lexer.addToken(TokenType.SEMICOLON, currentChar);
      lexer.advance();
      return true;
    case ',':
      lexer.addToken(TokenType.COMMA, currentChar);
      lexer.advance();
      return true;
    default:
      return false;
  }
}
