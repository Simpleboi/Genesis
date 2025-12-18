import { ParserClass } from '../parser';
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
 * Takes a ParserClass instance and operates on its state
 */
export function parseExpression(parser: ParserClass): ExpressionNode {
  return parseTerm(parser);
}

/**
 * parseTerm handles + and -
 * e.g. expression => term ( ( '+' | '-' ) term )*
 */
function parseTerm(parser: ParserClass): ExpressionNode {
  let expr = parseFactor(parser); // parse lower-precedence (factor) first

  while (true) {
    if (parser.match(TokenType.PLUS)) {
      const right = parseFactor(parser);
      expr = makeBinary(expr, '+', right);
    } else if (parser.match(TokenType.MINUS)) {
      const right = parseFactor(parser);
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
function parseFactor(parser: ParserClass): ExpressionNode {
  let expr = parseUnary(parser);

  while (true) {
    if (parser.match(TokenType.TIMES)) {
      const right = parseUnary(parser);
      expr = makeBinary(expr, '*', right);
    } else if (parser.match(TokenType.DIVIDE)) {
      const right = parseUnary(parser);
      expr = makeBinary(expr, '/', right);
    } else {
      break;
    }
  }
  return expr;
}

function determineResultType(
  left: ExpressionNode,
  right: ExpressionNode,
): 'int' | 'float' | 'string' | 'bool' | 'double' {

  const getType = (node: ExpressionNode): 'int' | 'float' | 'string' | 'bool' | 'double' => {

    if (node.type === 'Literal' && 'valueType' in node) {
      return node.valueType as 'int' | 'float' | 'string' | 'bool' | 'double';
    }
    if (node.type === 'BinaryExpression') {
      return node.resultType;
    }
    if (node.type === 'Identifier') {
      return 'string'; // defaulting to string is okay for now
    }
    return 'float'; // fallback default
  };

  const leftType = getType(left);
  const rightType = getType(right);

  if (leftType === 'string' || rightType === 'string') return 'string';
  if (leftType === 'double' || rightType === 'double') return 'double';
  if (leftType === 'float' || rightType === 'float') return 'float';
  if (leftType === 'bool' || rightType === 'bool') return 'bool';
  return 'int';
}

/**
 * parseUnary handles unary operators like ! or -
 * e.g. unary => ( '!' | '-' ) unary | primary
 */
function parseUnary(parser: ParserClass): ExpressionNode {
  if (parser.match(TokenType.BANG)) {
    // e.g. !someExpr
    const operand = parseUnary(parser);
    return {
      type: 'UnaryExpression',
      operator: '!',
      argument: operand,
    };
  } else if (parser.match(TokenType.MINUS)) {
    // e.g. -someExpr
    const operand = parseUnary(parser);
    return {
      type: 'UnaryExpression',
      operator: '-',
      argument: operand,
    };
  }

  // Otherwise, fall back to parsePrimary
  return parsePrimary(parser);
}

/**
 * parsePrimary handles literals, identifiers, and parentheses
 */
function parsePrimary(parser: ParserClass): ExpressionNode {
  const token = parser.currentToken();

  if (parser.match(TokenType.INTEGER)) {
    // Example: "42"
    return <LiteralNode>{
      type: 'Literal',
      value: parseInt(token.value),
      valueType: 'int',
    };
  }

  if (parser.match(TokenType.STRING)) {
    return {
      type: 'Literal',
      value: token.value,
      valueType: 'string',
    };
  }

  if (parser.match(TokenType.FLOAT)) {
    // Example: "103.7"
    return <LiteralNode>{
      type: 'Literal',
      value: parseFloat(token.value),
      valueType: 'float',
    };
  }

  if (parser.match(TokenType.IDENTIFIER)) {
    // Example: "x" or "myVar"
    return <IdentifierNode>{
      type: 'Identifier',
      name: token.value,
    };
  }

  if (parser.match(TokenType.LEFT_PAREN)) {
    // '(' Expression ')'
    const expr = parseExpression(parser);
    parser.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
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
    resultType: determineResultType(left, right)
  };
}
