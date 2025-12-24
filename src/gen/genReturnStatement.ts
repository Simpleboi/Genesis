import { ReturnStatementNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genReturnStatement(node: ReturnStatementNode): string {
  // If there's a value to return, generate it
  if (node.value) {
    const valueCode = generateJS(node.value);
    return `return ${valueCode};`;
  }

  // Otherwise, just return
  return 'return;';
}
