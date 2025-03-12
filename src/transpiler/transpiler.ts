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

import { genProgram } from '../gen/genProgram';
import { genIdentifier } from '../gen/genIdentifier';
import { genBinaryExpression } from '../gen/genBinaryExpressions';
import { genVarDecl } from '../gen/genVarDecl';
import { genLiteral } from '../gen/genLiteral';

/**
 * The main entry point for code generation.
 * Takes an AST node and returns a string of JS source code.
 *
 */

export function generateJS(node: ASTNode): string {
  switch (node.type) {
    case 'Program':
      return genProgram(node as ProgramNode);
    case 'VariableDeclaration':
      return genVarDecl(node as VariableDeclarationNode);
    case 'Literal':
      return genLiteral(node as LiteralNode);
    case 'Identifier':
      return genIdentifier(node as IdentifierNode);
    case 'BinaryExpression':
      return genBinaryExpression(node as BinaryExpressionNode);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

/**
 * Each genXYZ function handles the logic for that node type.
 */

