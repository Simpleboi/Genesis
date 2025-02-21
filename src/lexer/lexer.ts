import { TokenType, Token } from './tokens';
import { initializeLexer, _tokens } from './lexerUtils';
import { readSymbols } from './lexerHelpers/readSymbols';

export function Lexer(input: string): Token[] {
  // To keep track of where we are in the string.
  let currentIndex = 0;

  // Initialize the lexer
  initializeLexer(input);

  while (currentIndex < input.length) {
    // Look at the current character.
    let currentChar = input[currentIndex];

    // Skip spaces
    if (/\s/.test(currentChar)) {
      currentIndex++; // Move to the next character if it's a space.
      continue; 
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

    // Read Symbols 
    if (readSymbols()) {
      console.log(`we found a match ${currentChar}`);
      currentIndex++;
      continue;
    }

    // if (/[=+\-*/;]/.test(currentChar)) {
    //   tokens.push({ type: TokenType.VARIABLE, value: currentChar }); // Add the operator token.
    //   currentIndex++;
    //   continue;
    // }

    // If no match, log the character

    // Advance the token
    currentIndex++;
  }

  // Return the array of tokens
  return _tokens;
}

let test = '+-';
let tokens = Lexer(test);

tokens.forEach((element) => {
  console.log({
    type: TokenType[element.type],
    value: element.value,
  });
});
