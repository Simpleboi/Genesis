// Lexer is used to tokenize Genesis source code
import { Token } from "./tokens";

export class Lexer {
  private input: string;
  private currentIndex: number;

  constructor(input: string) {
    this.input = input;
    this.currentIndex = 0;
  }

  // Function to return the next token from the input string
  getNextToken(): Token {
    if (this.currentIndex >= this.input.length) {
      // Return EOF when input is finished
      return { type: 'EOF' };
    }

    const currentChar = this.input[this.currentIndex];

    // skip over any whitespace
    if (/\s/.test(currentChar)) {
        this.currentIndex++;
        return this.getNextToken();
    }

    // Match numbers
    if (/\d/.test(currentChar)) {
        let value = "";
        while (/\d/.test(this.input[this.currentIndex])) {
            value += this.input[this.currentIndex];
            this.currentIndex++;
        }
        return { type: "NUMBER", value};
    }

    // Match operators

    if (currentChar === "+") {
        this.currentIndex++;
        return {type: "PLUS"};
    }
    if (currentChar === '-') {
        this.currentIndex++;
        return { type: 'MINUS' };
      }
      if (currentChar === '*') {
        this.currentIndex++;
        return { type: 'TIMES' };
      }
      if (currentChar === '/') {
        this.currentIndex++;
        return { type: 'DIVIDE' };
      }
   
      // Match parentheses
      if (currentChar === '(') {
        this.currentIndex++;
        return { type: 'LEFTPAREN' };
      }
      if (currentChar === ')') {
        this.currentIndex++;
        return { type: 'RIGHTPAREN' };
      }
  
      // If an unknown character is encountered, throw an error
      throw new Error(`Unexpected character: ${currentChar}`);
    }
  
    // Function to tokenize the entire input string
    tokenize(): Token[] {
      const tokens: Token[] = [];
      let token = this.getNextToken();
  
      // Continue until EOF is reached
      while (token.type !== 'EOF') {
        tokens.push(token);
        token = this.getNextToken();
      }
  
      // Push EOF token at the end
      tokens.push({ type: 'EOF' });
  
      return tokens;
    }
  }
