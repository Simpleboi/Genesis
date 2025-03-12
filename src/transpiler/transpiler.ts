// Logic to convert AST into JavaScript
import {
  ASTNode,
  ProgramNode,
  VariableDeclarationNode,
  ExpressionNode,
  LiteralNode,
  IdentifierNode,
  BinaryExpressionNode,
} from '../parser/ast';

/**
 * The main entry point for code generation.
 * Takes an AST node and returns a string of JS source code.
 *
 */

export function generateJS(node: ASTNode): string {
  //
}
/**
 * Each genXYZ function handles the logic for that node type.
 */

export function genProgram(node: ProgramNode): string {
  // Each statement in 'body' gets its own generated code
  // Join them with newlines or semicolons

  const lines = node.body.map((statement) => {
    generateJS(statement);
  });

  return lines.join('\n');
}
