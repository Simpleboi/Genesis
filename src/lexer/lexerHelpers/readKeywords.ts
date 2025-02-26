import { TokenType } from '../tokens';
import { peek, advance, addToken } from '../lexerUtils';
import { KEYWORDS } from './keywords';
import { DATA_TYPE } from './dataTypes';

export function readKeywords(): boolean {
  let currentChar = peek();

  // If no character left or it's not a letter/underscore, return false
  if (!currentChar || !/[a-zA-Z_]/.test(currentChar)) {
    return false;
  }

  let word = '';

  while (true) {
    currentChar = peek();

    // If we're out of characters or the character isn't [a-zA-Z0-9_], break
    if (!currentChar || !/[a-zA-Z0-9_]/.test(currentChar)) {
      break;
    }
    word += currentChar;
    advance();
  }

  if (KEYWORDS.includes(word)) {
    addToken(TokenType.KEYWORD, word);
  } 
  else if (DATA_TYPE.includes(word)) {
    addToken(TokenType.DATA_TYPE, word);
  } 
  else {
    addToken(TokenType.IDENTIFIER, word);
  }

  return true;
}
