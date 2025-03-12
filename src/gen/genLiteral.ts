import { LiteralNode } from '../parser/ast';

export function genLiteral(node: LiteralNode): string {
  // node.value might be a number
  if (typeof node.value === 'number') {
    return String(node.value);
  }
  // If it's a string or boolean, handle appropriately
  return JSON.stringify(node.value);
}
