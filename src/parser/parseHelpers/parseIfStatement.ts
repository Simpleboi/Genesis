import { TokenType } from '../../lexer/tokens';
import { ExpressionNode, IfStatementNode, ASTNode } from '../ast';
import { ParserClass } from '../parser';
import { parseExpression } from './parseExpression';
import { parseStatement } from './parseStatement';

/**
 * Parse if statements
 * Takes a ParserClass instance and operates on its state
 */
export function parseIfStatement(parser: ParserClass): IfStatementNode {
  // We've already matched "if"
  parser.consume(TokenType.LEFT_PAREN, "Expect '(' after 'if' keyword.");
  const condition: ExpressionNode = parseExpression(parser);
  parser.consume(TokenType.RIGHT_PAREN, "Expect ')' after condition.");

  parser.consume(TokenType.LEFT_CURLY, "Expect '{' before 'if' body.");
  const thenBranch: ASTNode[] = [];

  // Parse the 'then block'
  while (!parser.match(TokenType.RIGHT_CURLY)) {
    thenBranch.push(parseStatement(parser));
  }

  let elseBranch: ASTNode[] | undefined;

  // Optionally handle 'else'

  if (parser.match(TokenType.ELSE)) {
    parser.consume(TokenType.LEFT_CURLY, "Expect '{' before 'else' body.");
    elseBranch = [];
    while (!parser.match(TokenType.RIGHT_CURLY)) {
      elseBranch.push(parseStatement(parser));
    }
  }

  return {
    type: "IfStatement",
    condition,
    thenBranch,
    elseBranch,
  };
}
