import { TokenType, Token } from './tokens';
import {
  peek,
  addToken,
  skipWhiteSpace,
  advance,
  initializeLexer,
} from './lexerUtils';
import { readDataType } from './lexerHelpers/readDataType';

export function Lexer(input: string): Token[] {
  const tokens: Token[] = []; // This will hold our tokens.
  let currentIndex = 0; // To keep track of where we are in the string.

  while (currentIndex < input.length) {
    const currentChar = input[currentIndex]; // Look at the current character.

    // Skip spaces
    if (/\s/.test(currentChar)) {
      currentIndex++; // Move to the next character if it's a space.
      continue; // Skip the rest and go back to the top of the loop.
    }

    // Check for numbers
    if (/\d/.test(currentChar)) {
      let number = ''; // Start building the number token.

      // Keep adding digits to the number token.
      while (currentIndex < input.length && /\d/.test(input[currentIndex])) {
        number += input[currentIndex];
        currentIndex++;
      }

      tokens.push({ type: TokenType.NUMBER, value: number }); // Add the number token.
      continue;
    }

    // Check for words (like "int", "num")
    if (/[a-zA-Z]/.test(currentChar)) {
      let word = ''; // Start building the word token.

      // Keep adding letters to the word token.
      while (
        currentIndex < input.length &&
        /[a-zA-Z]/.test(input[currentIndex])
      ) {
        word += input[currentIndex];
        currentIndex++;
      }

      tokens.push({ type: TokenType.KEYWORD, value: word }); // Add the word token.
      continue;
    }

    // Check for operators (like "+" or "=")
    if (/[=+\-*/;]/.test(currentChar)) {
      tokens.push({ type: TokenType.VARIABLE, value: currentChar }); // Add the operator token.
      currentIndex++;
      continue;
    }

    // If no match, just skip it (you can add error handling here)
    currentIndex++;
  }

  // Return the array of tokens
  return tokens;
}

let test = 'int num = 10;';
let tokens = Lexer(test);

tokens.forEach((element) => {
  console.log({
    type: TokenType[element.type],
    value: element.value,
  });
});
