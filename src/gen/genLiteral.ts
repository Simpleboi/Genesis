import { LiteralNode } from '../parser/ast';

export function genLiteral(node: LiteralNode): string {
  // If node.value is a number
  if (typeof node.value === 'number') {
    return String(node.value);
  };

  // If node.value is a string
  if (typeof node.value === 'string') {
    return JSON.stringify(node.value);
  };

  // If node.value is a boolean
  if (typeof node.value === 'boolean') {
    return node.value? 'true' : 'false';
  };

  throw new Error(`Unsupported literal type: ${typeof node.value}`);
}
