import { CallExpressionNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genCallExpression(node: CallExpressionNode): string {
  // Generate the callee (function name)
  const callee = generateJS(node.callee);

  // Generate arguments
  const args = node.arguments
    .map(arg => generateJS(arg))
    .join(', ');

  // Generate JavaScript call
  // Genesis: add(1, 2)
  // JS:      add(1, 2)

  return `${callee}(${args})`;
}
