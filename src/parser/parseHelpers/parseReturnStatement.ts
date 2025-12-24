import { ReturnStatementNode, ExpressionNode } from '../ast';
import { ParserClass } from '../parser';
import { TokenType } from '../../lexer/tokens';
import { parseExpression } from './parseExpression';

/**
 * Parse return statements
 * Syntax: return expression;  OR  return;
 * @param ParserClass - an instance that operates on its state
 */

// This function is called when the lexer matches the 'return' keyword
export function parseReturnStatement(parser: ParserClass): ReturnStatementNode {

  let value: ExpressionNode | undefined;

  // Check if there's an expression to return
  if (!parser.check(TokenType.SEMICOLON)) {
    value = parseExpression(parser);
  }

  parser.consume(TokenType.SEMICOLON, "Expected ';' after return statement");

  return {
    type: 'ReturnStatement',
    value,
  };
}
