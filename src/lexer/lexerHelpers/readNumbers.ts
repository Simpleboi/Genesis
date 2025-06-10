import { addToken, advance, peek } from '../lexerUtils';
import { TokenType } from '../tokens';
import { isDigit } from '../lexerUtils';

// Function to read numbers (tokenize the number portion)
export function readNumbers(): boolean {
  let currentChar = peek();

  if (isDigit(currentChar!)) {
    // to build the number token
    let number = '';

    // Keep adding digits
    while (isDigit(peek()!)) {
      number += peek();
      advance();
    }

    // Check if there is a number after the decimal
    if (peek() === '.' && isDigit(peek(1)!)) {
      number += '.';
      advance();

      while (isDigit(peek()!)) {
        number += peek();
        advance();
      }

      addToken(TokenType.FLOAT, number);
    } else {
      addToken(TokenType.INTEGER, number);
    }
    console.log(number);
    return true;
  }
  return false;
}
