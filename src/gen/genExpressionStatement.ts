import { ExpressionStatementNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genExpressionStatement(node: ExpressionStatementNode): string {
  return generateJS(node.expression) + ';';
}
