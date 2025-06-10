import { match, consume, currentToken } from '../parser';
import {
  ExpressionNode,
  BinaryExpressionNode,
  LiteralNode,
  IdentifierNode,
} from '../ast';
import { TokenType } from '../../lexer/tokens';

/**
 * The top-level expression parser, e.g. for "x + 3" or "4 * (y - 2)"
 * We'll parse from highest precedence (Term) to handle + and - at this level.
 */
export function parseExpression(): ExpressionNode {
  return parseTerm();
}

/**
 * parseTerm handles + and -
 * e.g. expression => term ( ( '+' | '-' ) term )*
 */
function parseTerm(): ExpressionNode {
  let expr = parseFactor(); // parse lower-precedence (factor) first

  while (true) {
    if (match(TokenType.PLUS)) {
      const right = parseFactor();
      expr = makeBinary(expr, '+', right);
    } else if (match(TokenType.MINUS)) {
      const right = parseFactor();
      expr = makeBinary(expr, '-', right);
    } else {
      break;
    }
  }
  return expr;
}

/**
 * parseFactor handles * and /
 * e.g. factor => unary ( ( '*' | '/' ) unary )*
 */
function parseFactor(): ExpressionNode {
  let expr = parseUnary();

  while (true) {
    if (match(TokenType.TIMES)) {
      const right = parseUnary();
      expr = makeBinary(expr, '*', right);
    } else if (match(TokenType.DIVIDE)) {
      const right = parseUnary();
      expr = makeBinary(expr, '/', right);
    } else {
      break;
    }
  }
  return expr;
}

/**
 * parseUnary handles unary operators like ! or -
 * e.g. unary => ( '!' | '-' ) unary | primary
 */
function parseUnary(): ExpressionNode {
  if (match(TokenType.BANG)) {
    // e.g. !someExpr
    const operand = parseUnary();
    return {
      type: 'UnaryExpression',
      operator: '!',
      argument: operand,
    };
  } else if (match(TokenType.MINUS)) {
    // e.g. -someExpr
    const operand = parseUnary();
    return {
      type: 'UnaryExpression',
      operator: '-',
      argument: operand,
    };
  }

  // Otherwise, fall back to parsePrimary
  return parsePrimary();
}

/**
 * parsePrimary handles literals, identifiers, and parentheses
 */
function parsePrimary(): ExpressionNode {
  const token = currentToken();

  if (match(TokenType.INTEGER)) {
    // Example: "42"
    return <LiteralNode>{
      type: 'Literal',
      value: parseInt(token.value),
      valueType: 'int',
    };
  }

  if (match(TokenType.FLOAT)) {
    // Example: "103.7"
    return <LiteralNode>{
      type: 'Literal',
      value: parseFloat(token.value),
      valueType: 'float',
    };
  }

  if (match(TokenType.IDENTIFIER)) {
    // Example: "x" or "myVar"
    return <IdentifierNode>{
      type: 'Identifier',
      name: token.value,
    };
  }

  if (match(TokenType.LEFT_PAREN)) {
    // '(' Expression ')'
    const expr = parseExpression();
    consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
    return expr;
  }

  throw new Error(`Unexpected token in parsePrimary: ${token.type}`);
}

/**
 * Helper to create a BinaryExpressionNode
 */
function makeBinary(
  left: ExpressionNode,
  operator: string,
  right: ExpressionNode,
): BinaryExpressionNode {

  return {
    type: 'BinaryExpression',
    operator,
    left,
    right,
  };
}
