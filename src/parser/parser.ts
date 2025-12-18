// Parsing logic to generate AST
import { Token, TokenType } from '../lexer/tokens';
import { ASTNode, ProgramNode } from './ast';
import { parseVarDecl } from './parseHelpers/parseVarDecl';
import { parseIfStatement } from './parseHelpers/parseIfStatement';
import { parseAssignment } from './parseHelpers/parseAssignment';

// ParserClass: A class-based parser that maintains its own state.
export class ParserClass {
  private tokens: Token[];
  private currentIndex: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentIndex = 0;
  }

  currentToken(): Token {
    return this.tokens[this.currentIndex];
  }

  advanceToken(): Token {
    if (!this.atEnd()) {
      this.currentIndex++;
    }

    return this.tokens[this.currentIndex];
  }

  atEnd(): boolean {
    return this.currentToken().type === TokenType.EOF;
  }

  // To verify incoming tokens with their types
  check(tokenType: TokenType): boolean {
    if (this.atEnd()) {
      return false;
    }
    return this.currentToken().type === tokenType;
  }

  match(tokenType: TokenType): boolean {
    if (this.check(tokenType)) {
      this.advanceToken();
      return true;
    }
    return false;
  }

  consume(tokenType: TokenType, errMessage: string): Token {
    const token = this.currentToken();

    if (token.type === tokenType) {
      this.advanceToken();
      return token;
    }

    throw new Error(errMessage + ' But got ' + this.currentToken().type);
  }

  consumeOneOf(types: TokenType[], errMessage: string): Token {
    for (const type of types) {
      if (this.match(type)) {
        return this.tokens[this.currentIndex - 1];
      }
    }
    throw new Error(errMessage + ' But got ' + this.currentToken().type);
  }

  // This is the main parsing method
  parse(): ProgramNode {
    const body: ASTNode[] = [];

    while (!this.atEnd()) {
      const stmt = this.parseStatement();
      body.push(stmt);
    }

    return {
      type: 'Program',
      body,
    };
  }

  // Import parse helper methods directly into the class
  private parseStatement(): ASTNode {
    const token = this.currentToken();

    // If the token is a known Data Type -> parse it
    if (this.check(TokenType.DATA_TYPE)) {
      return this.parseVarDecl();
    }

    // If the token is an 'if' keyword
    if (this.check(TokenType.IF)) {
      this.match(TokenType.IF);
      return this.parseIfStatement();
    }

    // If the token is an identifier
    if (this.check(TokenType.IDENTIFIER)) {
      return this.parseAssignment();
    }

    // Otherwise, placeholder or error
    console.log(`Statement token that failed to match: ${token}`);
    throw new Error(`Unknown statement start: ${token.type} ${token}`);
  }

  private parseVarDecl() {
    return parseVarDecl(this);
  }

  private parseIfStatement() {
    return parseIfStatement(this);
  }

  private parseAssignment() {
    return parseAssignment(this);
  }
}

// Backward compatibility: Keep the old module-level functions
// These now delegate to a singleton-like pattern
let _globalParser: ParserClass | null = null;

export function currentToken(): Token {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.currentToken();
}

export function advanceToken(): Token {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.advanceToken();
}

export function atEnd(): boolean {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.atEnd();
}

export function check(tokenType: TokenType): boolean {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.check(tokenType);
}

export function match(tokenType: TokenType): boolean {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.match(tokenType);
}

export function consume(tokenType: TokenType, errMessage: string): Token {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.consume(tokenType, errMessage);
}

export function consumeOneOf(types: TokenType[], errMessage: string): Token {
  if (!_globalParser) throw new Error('Parser not initialized');
  return _globalParser.consumeOneOf(types, errMessage);
}

/**
 * parseProgram: Convenience wrapper for backward compatibility
 */
export function parseProgram(incomingTokens: Token[]): ProgramNode {
  _globalParser = new ParserClass(incomingTokens);
  const result = _globalParser.parse();
  _globalParser = null; // Clean up
  return result;
}
