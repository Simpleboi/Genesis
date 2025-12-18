import { TokenType } from '../tokens';
import { LexerClass } from '../lexer';

// Read numbers (integers and floats)
// Takes a LexerClass instance and operates on its state

export function readNumbers(lexer: LexerClass): boolean {
  const currentChar = lexer.peek();

  if (!currentChar || !lexer.isDigit(currentChar)) {
    return false;
  }

  // to build the number token
  let number = '';

  // Keep adding digits
  while (lexer.peek() && lexer.isDigit(lexer.peek()!)) {
    number += lexer.peek();
    lexer.advance();
  }

  // Check if there is a number after the decimal
  if (lexer.peek() === '.' && lexer.peek(1) && lexer.isDigit(lexer.peek(1)!)) {
    number += '.';
    lexer.advance();

    while (lexer.peek() && lexer.isDigit(lexer.peek()!)) {
      number += lexer.peek();
      lexer.advance();
    }

    lexer.addToken(TokenType.FLOAT, number);
  } else {
    lexer.addToken(TokenType.INTEGER, number);
  }
  return true;
}
