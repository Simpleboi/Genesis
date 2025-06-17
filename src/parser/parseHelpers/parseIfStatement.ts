import { TokenType } from '../../lexer/tokens';
import { ExpressionNode, IfStatementNode, ASTNode } from '../ast';
import { consume, match } from '../parser';
import { parseExpression } from './parseExpression';
import { parseStatement } from './parseStatement';

export function parseIfStatement(): IfStatementNode {
  // We've already matched "if"
  consume(TokenType.LEFT_PAREN, "Expect '(' after 'if' keyword.");
  const condition: ExpressionNode = parseExpression();
  consume(TokenType.RIGHT_PAREN, "Expect ')' after conditon.");

  consume(TokenType.LEFT_CURLY, "Expect '{' before 'if' body.");
  const thenBranch: ASTNode[] = [];

  // Parse the 'then block'
  while (!match(TokenType.RIGHT_CURLY)) {
    thenBranch.push(parseStatement());
  }

  let elseBranch: ASTNode[] | undefined;

  // Optionally handle 'else'

  if (match(TokenType.ELSE)) {
    consume(TokenType.LEFT_CURLY, "Expect '{' before 'else' body.");
    elseBranch = [];
    while (!match(TokenType.RIGHT_CURLY)) {
      elseBranch.push(parseIfStatement());
    }
  }

  return {
    type: "IfStatement",
    condition,
    thenBranch,
    elseBranch,
  };
}
