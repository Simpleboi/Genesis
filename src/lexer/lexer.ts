// src/lexer/lexer.ts

import { TokenType, Token } from './tokens';
import { readNumbers } from './lexerHelpers/readNumbers';
import { readSymbols } from './lexerHelpers/readSymbols';
import { skipWhitespace } from './lexerHelpers/readWhitespace';

// export function tokenize(sourceCode: string): Token[] {
//     const tokens: Token[] = [];
//     let currentIndex = 0;
// }

