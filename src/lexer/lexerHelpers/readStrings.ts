import { TokenType } from '../tokens';
import { LexerClass } from '../lexer';

/**
 * Read string literals
 * Takes a LexerClass instance and operates on its state
 */
export function readStrings(lexer: LexerClass): boolean {
  const quote = lexer.peek();

  if (quote !== '"' && quote !== "'") {
    return false;
  }

  lexer.advance(); // Skip opening quote

  let value = '';
  while (lexer.peek() !== quote && lexer.peek() !== null) {
    value += lexer.peek();
    lexer.advance();
  }

  if (lexer.peek() === quote) {
    lexer.advance(); // skip closing quote
    lexer.addToken(TokenType.STRING, value);
    return true;
  }

  throw new Error(`Unterminated string literal: ${value}`);
}
