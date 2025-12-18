import { VariableDeclarationNode, ExpressionNode } from '../ast';
import { ParserClass } from '../parser';
import { TokenType } from '../../lexer/tokens';
import { parseExpression } from './parseExpression';


// Parse variable declarations
export function parseVarDecl(parser: ParserClass): VariableDeclarationNode {
  
  // 1. Expect the data type token (int, float, etc)
  const typeToken = parser.consumeOneOf(
    [TokenType.DATA_TYPE],
    'Expected a type keyword (like int, bool) at the start of variable declaration',
  );
  console.log("parseVarDecl -> Token Type:", typeToken.value);


  // 2. Read the identifer
  if (!parser.check(TokenType.IDENTIFIER)) {
    throw new Error("Expected an identifier after type.");
  }
  // Store the identifier token then advance
  const idToken = parser.currentToken();
  console.log("parseVarDecl -> Token Identifier:", parser.currentToken().value);
  parser.advanceToken();


  // 3. Consume "=" and parse an expression if present
  let initializer: ExpressionNode | null = null;
  if (parser.match(TokenType.ASSIGNMENT)) {
    // "=" found, parse the expression
    console.log("parseVarDecl -> found '='. Next token:", parser.currentToken().value);
    initializer = parseExpression(parser);
  }

  // 4. Expect and consume a semicolon
  parser.consume(TokenType.SEMICOLON, "Expected ';' after variable declaration");
  console.log("parseVarDecl -> after semicolon, next token is:", parser.currentToken(), "\n");

  // 5. Build and return the VarDeclNode
  return {
    type: 'VariableDeclaration',
    varType: typeToken.value, // ex. "int"
    identifier: idToken.value, // ex. "num"
    initializer: initializer,
  };
}
