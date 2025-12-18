import { TokenType } from '../tokens';
import { LexerClass } from '../lexer';

const KEYWORDS = ['for', 'while', 'return', 'else'];
const DATA_TYPES = ['int', 'float', 'string', 'char', 'bool', 'double'];

/**
 * Read keywords, data types, and identifiers
 * Takes a LexerClass instance and operates on its state
 */
export function readKeywords(lexer: LexerClass): boolean {
  let currentChar = lexer.peek();

  // If no character left or it's not a letter/underscore, return false
  if (!currentChar || !/[a-zA-Z_]/.test(currentChar)) {
    return false;
  }

  let word = '';

  while (true) {
    currentChar = lexer.peek();

    // If we're out of characters or the character isn't [a-zA-Z0-9_], break
    if (!currentChar || !/[a-zA-Z0-9_]/.test(currentChar)) {
      break;
    }
    word += currentChar;
    lexer.advance();
  }

  // if the word is in the keywords array
  if (KEYWORDS.includes(word)) {
    switch (word) {
      case 'if':
        lexer.addToken(TokenType.IF, word);
        break;
      default:
        lexer.addToken(TokenType.KEYWORD, word);
    }
  } else if (DATA_TYPES.includes(word)) {
    lexer.addToken(TokenType.DATA_TYPE, word);
  } else {
    lexer.addToken(TokenType.IDENTIFIER, word);
  }
  return true;
}
