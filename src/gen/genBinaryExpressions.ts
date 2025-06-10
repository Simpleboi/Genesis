import { BinaryExpressionNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genBinaryExpression(node: BinaryExpressionNode): string {
  const leftCode = generateJS(node.left);
  const rightCode = generateJS(node.right);
  const op = node.operator; // e.g. "+", "-", "*", etc.

  return `(${leftCode} ${op} ${rightCode})`;
}
