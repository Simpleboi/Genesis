import { TokenType, Token } from './tokens';
import { readSymbols } from './lexerHelpers/readSymbols';
import { readNumbers } from './lexerHelpers/readNumbers';
import { readKeywords } from './lexerHelpers/readKeywords';
import { readStrings } from './lexerHelpers/readStrings';

// LexerClass: A class-based lexer that maintains its own state
export class LexerClass {
  private input: string;
  private currentIndex: number;
  private tokens: Token[];

  constructor(input: string) {
    this.input = input;
    this.currentIndex = 0;
    this.tokens = [];
  }

  // Public methods that helpers can call
  peek(offset: number = 0): string | null {
    return this.currentIndex + offset < this.input.length
      ? this.input[this.currentIndex + offset]
      : null;
  }

  advance(): void {
    if (this.currentIndex < this.input.length) {
      this.currentIndex++;
    }
  }

  addToken(type: TokenType, value: string): void {
    this.tokens.push({ type, value });
  }

  skipWhiteSpace(): void {
    while (true) {
      const currentChar = this.peek();

      if (currentChar === null || !/\s/.test(currentChar)) {
        break;
      }
      this.advance();
    }
  }

  isDigit(char: string): boolean {
    return /^\d$/.test(char);
  }

  // Main tokenization method
  tokenize(): Token[] {
    while (this.currentIndex < this.input.length) {
      // Look at the current character
      const currentChar = this.peek();

      // Skip over whitespace
      this.skipWhiteSpace();

      // Read Strings
      if (readStrings(this)) {
        continue;
      }

      // Read Keywords 
      if (readKeywords(this)) {
        continue;
      }

      // Read Symbols 
      if (readSymbols(this)) {
        continue;
      }

      // Read Numbers
      if (readNumbers(this)) {
        continue;
      }

      console.log(`Unexpected Character: ${currentChar}`);
      this.advance();
    }

    // Add the EOF token at the end
    this.tokens.push({ type: TokenType.EOF, value: '' });
    // Return the array of tokens
    return this.tokens;
  }
}

/**
 * Lexer function: Convenience wrapper for backward compatibility
 */
export function Lexer(input: string): Token[] {
  const lexer = new LexerClass(input);
  return lexer.tokenize();
}
