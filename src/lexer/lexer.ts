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
  const tokens: Token[] = [];
  let currentIndex = 0;

  // Initialize the lexer
  initializeLexer(input);

  while (currentIndex < input.length) {
    // Skip white space
    skipWhiteSpace();

    // Check for data types (like "int", "bool")
    const dataTypeToken = readDataType(input, currentIndex);
    if (dataTypeToken) {
      addToken(TokenType.DATA_TYPE, dataTypeToken.value);
      currentIndex = dataTypeToken.index;
      continue;
    }

    // if no match found, advance the index
    advance();

    // Handle End Of File or unexpected characters
    if (currentIndex >= input.length) {
      break;
    }
  }

  return tokens;
}

let test = 'int num = 10;';
console.log(Lexer(test));
