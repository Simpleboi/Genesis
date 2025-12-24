import { FunctionDeclarationNode, ParameterNode, ASTNode } from '../ast';
import { ParserClass } from '../parser';
import { TokenType } from '../../lexer/tokens';
import { parseStatement } from './parseStatement';

/**
 * Parse function declarations
 * Syntax: returnType name(type param, type param) { body }
 * Takes a ParserClass instance and operates on its state
 * @param parser - The parser instance
 * @param returnType - The return type (already consumed by parseStatement)
 */
export function parseFunctionDeclaration(
  parser: ParserClass,
  returnType: string
): FunctionDeclarationNode {
  // returnType already consumed by parseStatement

  // Parse function name
  const nameToken = parser.consume(
    TokenType.IDENTIFIER,
    "Expected function name after return type"
  );
  const name = nameToken.value;

  // Parse parameter list
  parser.consume(TokenType.LEFT_PAREN, "Expected '(' after function name");

  const params: ParameterNode[] = [];

  // Parse parameters: (type param, type param, ...)
  if (!parser.check(TokenType.RIGHT_PAREN)) {
    do {
      // Parse parameter type
      const paramTypeToken = parser.consume(
        TokenType.DATA_TYPE,
        "Expected parameter type"
      );

      // Parse parameter name
      const paramNameToken = parser.consume(
        TokenType.IDENTIFIER,
        "Expected parameter name after type"
      );

      params.push({
        identifier: paramNameToken.value,
        paramType: paramTypeToken.value,
      });
    } while (parser.match(TokenType.COMMA));
  }

  parser.consume(TokenType.RIGHT_PAREN, "Expected ')' after parameters");

  // Parse function body
  parser.consume(TokenType.LEFT_CURLY, "Expected '{' before function body");

  const body: ASTNode[] = [];
  while (!parser.check(TokenType.RIGHT_CURLY)) {
    body.push(parseStatement(parser));
  }

  parser.consume(TokenType.RIGHT_CURLY, "Expected '}' after function body");

  return {
    type: 'FunctionDeclaration',
    name,
    params,
    returnType,
    body,
  };
}
