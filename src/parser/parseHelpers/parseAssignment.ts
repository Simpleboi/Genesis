import { AssignmentStatementNode, ExpressionNode } from '../ast';
import { ParserClass } from '../parser';
import { TokenType } from '../../lexer/tokens';
import { parseExpression } from './parseExpression';

/**
 * Parse assignment statements
 * Takes a ParserClass instance and operates on its state
 */
export function parseAssignment(parser: ParserClass): AssignmentStatementNode {
  const identifier = parser.consume(TokenType.IDENTIFIER, 'Expected variable name');
  parser.consume(TokenType.ASSIGNMENT, "Expected '=' in assignment");

  const value: ExpressionNode = parseExpression(parser);
  parser.consume(TokenType.SEMICOLON, "Expected ';' after assignment.");

  return {
    type: 'AssignmentStatement',
    identifier: {
        type: "Identifier",
        name: identifier.value
    },
    value
  };
}
