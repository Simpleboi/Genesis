import { IdentifierNode } from "../parser/ast";

export function genIdentifier(node: IdentifierNode): string {
    return node.name; // e.g. "myVar"
  }
  