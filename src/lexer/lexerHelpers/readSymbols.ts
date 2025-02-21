import { peek, addToken } from '../lexerUtils';
import { TokenType } from '../tokens';

// Function to read symbols (operators, paren, etc)
export function readSymbols(): boolean {
  let currentChar = peek();
  console.log(`The value of peek is: ${currentChar}`);

  switch (currentChar) {
    case '+':
      console.log('did we see the plus sign?');
      addToken(TokenType.PLUS, currentChar);
      console.log(`Did we add the token: ${currentChar}`);
      return true;
    case '-':
      console.log('did we see the minus sign?');
      addToken(TokenType.MINUS, currentChar);
      return true;
    case '*':
      addToken(TokenType.TIMES, currentChar);
      return true;
    case '/':
      addToken(TokenType.DIVIDE, currentChar);
      return true;
    default:
      return false;
  }
}
