import { Token, TokenType } from './tokens';

let _input = '';
export let _tokens: Token[] = [];
let _currentIndex = 0;

export function initializeLexer(newInput: string) {
  _input = newInput;
  _tokens.length = 0;
  _currentIndex = 0;
}

// Function to peek at the current character without advancing
export function peek() {
  return _currentIndex < _input.length ? _input[_currentIndex] : null;
}

// Function to Advance the current index to the next character
export function advance(): string | null {
  const currentChar = peek();
  if (currentChar !== null) {
    _currentIndex++;
  }
  return currentChar;
}

// Function to Add a token to the array
export function addToken(type: TokenType, value: string) {
  _tokens.push({ type, value }); //
}

// Function to skipe whitespace characters
export function skipWhiteSpace() {
  while (peek() && /\s/.test(peek()!)) {
    advance();
  }
}
