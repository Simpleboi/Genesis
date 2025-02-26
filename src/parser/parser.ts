// Parsing logic to generate AST
import { Token, TokenType } from '../lexer/tokens';
import { ASTNode, ProgramNode } from './ast';

let tokens: Token[] = [];
let currentIndex = 0;

export function currentToken(): Token {
  return tokens[currentIndex];
}

export function nextToken(): Token {
  return tokens[++currentIndex];
}

export function advanceToken(): Token {
  if (!atEnd()) {
    currentIndex++;
  }

  return tokens[currentIndex];
}

export function atEnd(): Boolean {
  return currentToken().type === TokenType.EOF;
}

// To verify incoming tokens with thier types
export function check(tokenType: TokenType): boolean {
  if (atEnd()) {
    return false;
  }
  return currentToken().type === tokenType;
}

export function match(tokenType: TokenType): boolean {
  if (check(tokenType)) {
    advanceToken();
    return true;
  }
  return false;
}

export function consume(tokenType: TokenType, errMessage: string): Token {
  if (check(tokenType)) {
    return advanceToken();
  }
  throw new Error(errMessage + ' But got ' + currentToken().type);
}

export function consumeOneOf(
  types: TokenType[],
  errMessage: string,
): Token {
  for (let type of types) {
    if (match(type)) {
      return tokens[currentIndex - 1];
    }
  }
  throw new Error(errMessage + ' But got ' + currentToken().type);
}

export function parseProgram(incomingTokens: Token[]): ProgramNode {
  tokens = incomingTokens;
  currentIndex = 0;

  let body: ASTNode[] = [];

  return {
    type: 'Program',
    body,
  };
}
