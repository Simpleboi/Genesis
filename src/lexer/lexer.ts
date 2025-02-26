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

    // Check for numbers
    // if (/\d/.test(currentChar)) {
    //   let number = ''; // Start building the number token.

    //   // Keep adding digits to the number token.
    //   while (currentIndex < input.length && /\d/.test(input[currentIndex])) {
    //     number += input[currentIndex];
    //     currentIndex++;
    //   }

    //   _tokens.push({ type: TokenType.NUMBER, value: number }); // Add the number token.
    //   continue;
    // }

    // Read Keywords
    if (readKeywords()) {
      console.log(`Keyword found and token added`);
      continue;
    }

    // Read Symbols
    if (readSymbols()) {
      console.log(`Symbol found and token added`);
      continue;
    }

    // Read Numbers
    if (readNumbers()) {
      console.log(`Symbol found and token added`);
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

let test = '10 + 20;';
let tokens = Lexer(test);

tokens.forEach((element) => {
  console.log({
    type: TokenType[element.type],
    value: element.value,
  });
});
