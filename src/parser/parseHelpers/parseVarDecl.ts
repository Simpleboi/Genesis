import { VariableDeclarationNode, ExpressionNode } from '../ast';
import { match, consume, consumeOneOf } from '../parser';
import { TokenType } from '../../lexer/tokens';

/**
 * Parses a variable declaration statement:
 * int x = 5;
 * float y;
 * string name = "Nate";
 *
 * Grammar:
 * VarDecl -> ( "int" | "float" | "string" ...) identifier ("=" Expression)? ";"
 *
 */

export function parseVarDecl(): VariableDeclarationNode {
  // 1. Expect the data type token (int, float, etc)
  const typeToken = consumeOneOf(
    [TokenType.INT, TokenType.FLOAT, TokenType.STRING, TokenType.BOOL],
    'Expected a type keyword (like int, bool) at the start of variable declaration',
  );

  // 2. Expect and consume an identifer
  const idToken = consume(
    TokenType.IDENTIFIER,
    'Expected an identifier after type keyword.',
  );

  // 3. Consume "=" and parse an expression if pressent/
  let initializer: ExpressionNode | null = null;
  if (match(TokenType.ASSIGNMENT)) {
    // "=" found, parse the expression
  }

  // 4. Expect and consume a semicolon
  consume(TokenType.SEMICOLON, "Expected ';' after variable declaration");

  // 5. Build and return the VarDeclNode
  return {
    type: 'VariableDeclaration',
    varType: typeToken.value,
    identifer: idToken.value,
    initializer: initializer,
  };
}
