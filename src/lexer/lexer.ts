import { TokenType, Token } from './tokens';

/**
 * LexerClass: A class-based lexer that maintains its own state.
 * This prevents issues with concurrent parsing and test side effects.
 */
export class LexerClass {
  private input: string;
  private currentIndex: number;
  private tokens: Token[];

  constructor(input: string) {
    this.input = input;
    this.currentIndex = 0;
    this.tokens = [];
  }

  // Get the current character without advancing
  peek(offset: number = 0): string | null {
    return this.currentIndex + offset < this.input.length
      ? this.input[this.currentIndex + offset]
      : null;
  }

  // Advance to the next character
  advance(): void {
    if (this.currentIndex < this.input.length) {
      this.currentIndex++;
    }
  }

  // Add a token to the array
  addToken(type: TokenType, value: string): void {
    this.tokens.push({ type, value });
  }

  // Skip whitespace characters
  skipWhiteSpace(): void {
    while (true) {
      let currentChar = this.peek();

      if (currentChar === null || !/\s/.test(currentChar)) {
        break;
      }
      this.advance();
    }
  }

  // Check if a character is a digit
  isDigit(char: string): boolean {
    return /^\d$/.test(char);
  }

  // Read string literals
  readStrings(): boolean {
    const quote = this.peek();

    if (quote !== '"' && quote !== "'") {
      return false;
    }

    this.advance(); // Skip opening quote

    let value = '';
    while (this.peek() !== quote && this.peek() !== null) {
      value += this.peek();
      this.advance();
    }

    if (this.peek() === quote) {
      this.advance(); // skip closing quote
      this.addToken(TokenType.STRING, value);
      return true;
    }

    throw new Error(`Unterminated string literal: ${value}`);
  }

  // Read keywords, data types, and identifiers
  readKeywords(): boolean {
    let currentChar = this.peek();

    // If no character left or it's not a letter/underscore, return false
    if (!currentChar || !/[a-zA-Z_]/.test(currentChar)) {
      return false;
    }

    let word = '';

    while (true) {
      currentChar = this.peek();

      // If we're out of characters or the character isn't [a-zA-Z0-9_], break
      if (!currentChar || !/[a-zA-Z0-9_]/.test(currentChar)) {
        break;
      }
      word += currentChar;
      this.advance();
    }

    // Keywords
    const KEYWORDS = ['for', 'while', 'return', 'else'];
    const DATA_TYPES = ['int', 'float', 'string', 'char', 'bool', 'double'];

    // if the word is in the keywords array
    if (KEYWORDS.includes(word)) {
      switch (word) {
        case 'if':
          this.addToken(TokenType.IF, word);
          break;
        default:
          this.addToken(TokenType.KEYWORD, word);
      }
    } else if (DATA_TYPES.includes(word)) {
      this.addToken(TokenType.DATA_TYPE, word);
    } else {
      this.addToken(TokenType.IDENTIFIER, word);
    }
    return true;
  }

  // Read numbers (integers and floats)
  readNumbers(): boolean {
    let currentChar = this.peek();

    if (!currentChar || !this.isDigit(currentChar)) {
      return false;
    }

    // to build the number token
    let number = '';

    // Keep adding digits
    while (this.peek() && this.isDigit(this.peek()!)) {
      number += this.peek();
      this.advance();
    }

    // Check if there is a number after the decimal
    if (this.peek() === '.' && this.peek(1) && this.isDigit(this.peek(1)!)) {
      number += '.';
      this.advance();

      while (this.peek() && this.isDigit(this.peek()!)) {
        number += this.peek();
        this.advance();
      }

      this.addToken(TokenType.FLOAT, number);
    } else {
      this.addToken(TokenType.INTEGER, number);
    }
    return true;
  }

  // Read symbols (operators, parentheses, etc.)
  readSymbols(): boolean {
    let currentChar = this.peek();

    switch (currentChar) {
      case '+':
        this.addToken(TokenType.PLUS, currentChar);
        this.advance();
        return true;
      case '-':
        this.addToken(TokenType.MINUS, currentChar);
        this.advance();
        return true;
      case '*':
        this.addToken(TokenType.TIMES, currentChar);
        this.advance();
        return true;
      case '/':
        this.addToken(TokenType.DIVIDE, currentChar);
        this.advance();
        return true;
      case '(':
        this.addToken(TokenType.LEFT_PAREN, currentChar);
        this.advance();
        return true;
      case ')':
        this.addToken(TokenType.RIGHT_PAREN, currentChar);
        this.advance();
        return true;
      case '[':
        this.addToken(TokenType.LEFT_BRACKET, currentChar);
        this.advance();
        return true;
      case ']':
        this.addToken(TokenType.RIGHT_BRACKET, currentChar);
        this.advance();
        return true;
      case '{':
        this.addToken(TokenType.LEFT_CURLY, currentChar);
        this.advance();
        return true;
      case '}':
        this.addToken(TokenType.RIGHT_CURLY, currentChar);
        this.advance();
        return true;
      case '#':
        this.addToken(TokenType.COMMENT, currentChar);
        this.advance();
        return true;
      case '@':
        this.addToken(TokenType.DIRECTIVE, currentChar);
        this.advance();
        return true;
      case '=':
        this.addToken(TokenType.ASSIGNMENT, currentChar);
        this.advance();
        return true;
      case '.':
        this.addToken(TokenType.DECIMAL, currentChar);
        this.advance();
        return true;
      case ';':
        this.addToken(TokenType.SEMICOLON, currentChar);
        this.advance();
        return true;
      default:
        return false;
    }
  }

  // Main tokenization method
  tokenize(): Token[] {
    while (this.currentIndex < this.input.length) {
      // Look at the current character
      let currentChar = this.peek();

      // Skip over whitespace
      this.skipWhiteSpace();

      // Read Strings
      if (this.readStrings()) {
        continue;
      }

      // Read Keywords
      if (this.readKeywords()) {
        continue;
      }

      // Read Symbols
      if (this.readSymbols()) {
        continue;
      }

      // Read Numbers
      if (this.readNumbers()) {
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


