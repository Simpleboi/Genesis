import { TokenType, Token } from './tokens';
import {
  initializeLexer,
  _tokens,
  skipWhiteSpace,
  peek,
  _currentIndex,
  advance,
} from './lexerUtils';
import { readSymbols } from './lexerHelpers/readSymbols';
import { readNumbers } from './lexerHelpers/readNumbers';
import { readKeywords } from './lexerHelpers/readKeywords';

export function Lexer(input: string): Token[] {
  // Initialize the lexer
  initializeLexer(input);

  while (_currentIndex < input.length) {
    // Look at the current character
    let currentChar = peek();

    // Skip over whitespace
    skipWhiteSpace();

    // Read Keywords
    if (readKeywords()) {
      continue;
    }

    // Read Symbols
    if (readSymbols()) {
      continue;
    }

    // Read Numbers
    if (readNumbers()) {
      continue;
    }

    console.log(`Unexpected Character: ${currentChar}`)
    advance();
  }

  // Add the EOF token at the end
  _tokens.push({type: TokenType.EOF, value: ""});
  // Return the array of tokens
  return _tokens;
}


