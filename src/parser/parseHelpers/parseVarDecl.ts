import { VariableDeclarationNode, ExpressionNode } from '../ast';
import { match, consume, consumeOneOf, currentToken, check, advanceToken } from '../parser';
import { TokenType } from '../../lexer/tokens';
import { parseExpression } from './parseExpression';
import { advance } from '../../lexer/lexerUtils';


export function parseVarDecl(): VariableDeclarationNode {
  // 1. Expect the data type token (int, float, etc)

  const typeToken = consumeOneOf(
    [TokenType.INT, TokenType.FLOAT, TokenType.STRING, TokenType.BOOL],
    'Expected a type keyword (like int, bool) at the start of variable declaration',
  );
  console.log("parseVarDecl -> typeToken:", typeToken.value);


  // 2. Read the identifer
  if (!check(TokenType.IDENTIFIER)) {
    throw new Error("Expected an identifier after type.");
  }
  // Store the identifier token then advance
  const idToken = currentToken();
  console.log("parseVarDecl -> Token Identifier:", currentToken().value);
  advanceToken();


  // 3. Consume "=" and parse an expression if pressent/
  let initializer: ExpressionNode | null = null;
  if (match(TokenType.ASSIGNMENT)) {
    // "=" found, parse the expression
    console.log("parseVarDecl -> found '='. Next token:", currentToken().value);
    initializer = parseExpression();
  }

  // 4. Expect and consume a semicolon
  consume(TokenType.SEMICOLON, "Expected ';' after variable declaration");
  console.log("parseVarDecl -> after semicolon, next token is:", currentToken(), "\n");

  // 5. Build and return the VarDeclNode
  return {
    type: 'VariableDeclaration',
    varType: typeToken.value, // ex. "int"
    identifer: idToken.value, // ex. "num"
    initializer: initializer,
  };
}
