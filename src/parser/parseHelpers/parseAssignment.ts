import { AssignmentStatementNode, ExpressionNode } from '../ast';
import { currentToken, advanceToken, consume } from '../parser';
import { TokenType } from '../../lexer/tokens';
import { parseExpression } from './parseExpression'; // <- whatever you're using

export function parseAssignment(): AssignmentStatementNode {
  const identifier = consume(TokenType.IDENTIFIER, 'Expected variable name');
  consume(TokenType.ASSIGNMENT, "Expected '=' in assignment");

  const value: ExpressionNode = parseExpression();
  consume(TokenType.SEMICOLON, "Expected ';' after assignment.");

  return {
    type: 'AssignmentStatement',
    identifier: {
        type: "Identifier",
        name: identifier.value
    },
    value
  };
}
