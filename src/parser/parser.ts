// Parsing logic to generate AST using Nearley
import { Token, TokenType } from "../lexer/tokens";
import { ASTNode, ProgramNode } from "./ast";


let tokens: Token[] = [];
let currentIndex = 0;

function currentToken(): Token {
  return tokens[currentIndex];
}

function nextToken(): Token {
  return tokens[++currentIndex];
}

function atEnd(): Boolean {
  return currentIndex >= tokens.length || currentToken().type === TokenType.EOF;
}

export function parseProgram(incomingTokens: Token[]): ProgramNode {
  tokens = incomingTokens;
  currentIndex = 0;

  let body: ASTNode[] = [];

  return {
    type: "Program",
    body
  };
}