import { TokenType } from '../tokens';
import { peek, advance, addToken } from '../lexerUtils';

const KEYWORDS: string[] = [
  'for',
  'while',
  'if',
  'else',
  'elif',
  'break',
  'continue',
];

export function readKeywords(): boolean {
  let currentChar = peek();
  let word = '';

  // if the first character is a letter, it could be a keyword or an identifier
  if (/[a-zA-Z_]/.test(currentChar)) {
    while (/[a-zA-Z_0-9]/.test(peek())) {
      word += peek();
      advance();
    }

    // Check if the word is a reserved keyword
    if (KEYWORDS.includes(word)) {
      addToken(TokenType.KEYWORD, word);
      return true;
    }
  }
  return false;
}
