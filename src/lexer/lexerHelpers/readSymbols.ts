import { peek, addToken, advance } from '../lexerUtils';
import { TokenType } from '../tokens';

// Function to read symbols (operators, paren, etc)
export function readSymbols(): boolean {
  let currentChar = peek();

  switch (currentChar) {
    case '+':
      addToken(TokenType.PLUS, currentChar);
      advance();
      return true;
    case '-':
      addToken(TokenType.MINUS, currentChar);
      advance();
      return true;
    case '*':
      addToken(TokenType.TIMES, currentChar);
      advance();
      return true;
    case '/':
      addToken(TokenType.DIVIDE, currentChar);
      advance();
      return true;
    case '(':
      addToken(TokenType.LEFT_PAREN, currentChar);
      advance();
      return true;
    case ')':
      addToken(TokenType.RIGHT_PAREN, currentChar);
      advance();
      return true;
    case '[':
      addToken(TokenType.LEFT_BRACKET, currentChar);
      advance();
      return true;
    case ']':
      addToken(TokenType.RIGHT_BRACKET, currentChar);
      advance();
      return true;
    case '{':
      addToken(TokenType.LEFT_CURLY, currentChar);
      advance();
      return true;
    case '}':
      addToken(TokenType.RIGHT_CURLY, currentChar);
      advance();
      return true;
    case '#':
      addToken(TokenType.COMMENT, currentChar);
      advance();
      return true;
    case '@':
      addToken(TokenType.DIRECTIVE, currentChar);
      advance();
      return true;
    case '=':
      addToken(TokenType.ASSIGNMENT, currentChar);
      advance();
      return true;
    case '.':
      addToken(TokenType.DECIMAL, currentChar);
      advance();
      return true;
    case ';':
      addToken(TokenType.SEMICOLON, currentChar);
      advance();
      return true;
    default:
      return false;
  }
}
