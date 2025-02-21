import { peek, addToken } from '../lexerUtils';
import { TokenType } from '../tokens';

// Function to read symbols (operators, paren, etc)
export function readSymbols(): boolean {
  let currentChar = peek();

  switch (currentChar) {
    case '+':
      addToken(TokenType.PLUS, currentChar);
      return true;
    case '-':
      addToken(TokenType.MINUS, currentChar);
      return true;
    case '*':
      addToken(TokenType.TIMES, currentChar);
      return true;
    case '/':
      addToken(TokenType.DIVIDE, currentChar);
      return true;
    case '(':
      addToken(TokenType.LEFTPAREN, currentChar);
      return true;
    case ')':
      addToken(TokenType.RIGHTPAREN, currentChar);
      return true;
    case '[':
      addToken(TokenType.LEFTBRACKET, currentChar);
      return true;
    case ']':
      addToken(TokenType.RIGHTBRACKET, currentChar);
      return true;
    case '{':
      addToken(TokenType.LEFTCURLY, currentChar);
      return true;
    case '}':
      addToken(TokenType.RIGHTCURLY, currentChar);
      return true;
    case '#':
      addToken(TokenType.COMMENT, currentChar);
      return true;
    case '@':
      addToken(TokenType.DIRECTIVE, currentChar);
      return true;
    default:
      return false;
  }
}
