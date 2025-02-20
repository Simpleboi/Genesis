// src/lexer/lexer.ts

import { TokenType, Token } from './tokens';
import { readNumbers } from './lexerHelpers/readNumbers';
import { readSymbols } from './lexerHelpers/readSymbols';
import { peek, addToken, skipWhiteSpace, advance } from './lexerUtils';

export function Lexer(input: string): Token[] {
    const tokens: Token[] = [];
    let currentIndex = 0;

    while (currentIndex < input.length) {
      skipWhiteSpace();

      const currentChar = peek();

      // Handle variable names (e.g., x, num)
      if (/[a-zA-Z_]/.test(currentChar!)) {
        let value = "";
        while (/[a-zA-Z0-9_]/.test(peek()!)) {
            value += peek();
            advance();
        }
        
        // Handle keywords like 'int', 'let', etc.
        if (value === 'int') {
            addToken(TokenType.KEYWORD, value);  // Treat as keyword
        } else {
            addToken(TokenType.VARIABLE, value); // Regular variable
        }
        continue;
    }
    }    

    return tokens;
}


let test = "int num = 10;";
console.log(Lexer(test))
