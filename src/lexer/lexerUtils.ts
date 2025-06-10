import { Token, TokenType } from './tokens';

let _input = '';
export let _currentIndex = 0;
export let _tokens: Token[] = [];

export function initializeLexer(newInput: string) {
  _input = newInput;
  _tokens.length = 0;
  _currentIndex = 0;
}

// Function to peek at the current character without advancing
export function peek(offset: number = 0) {
  return _currentIndex + offset < _input.length
    ? _input[_currentIndex + offset]
    : null;
}

// Function to Advance the current index to the next character
export function advance(): void {
  if (_currentIndex < _input.length) {
    _currentIndex++;
  }
}

// Function to Add a token to the array
export function addToken(type: TokenType, value: string) {
  _tokens.push({ type, value });
}

// Function to skipe whitespace characters
export function skipWhiteSpace() {
  while (true) {
    let currentChar = peek();

    if (currentChar === null || !/\s/.test(currentChar)) {
      break;
    }
    advance();
  }
}
