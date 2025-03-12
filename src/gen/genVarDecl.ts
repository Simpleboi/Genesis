import { VariableDeclarationNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genVarDecl(node: VariableDeclarationNode): string {
  // If your language uses `int num = 10;`,
  // we might convert to "let num = 10;" in JS.
  // Or "var", or "const". Up to you.
  const varName = node.identifer;

  // If there's an initializer, generate that code; else empty
  let initCode = '';
  if (node.initializer) {
    initCode = ' = ' + generateJS(node.initializer);
  }

  // Construct the final line
  // e.g. "let num = 10;"
  // or "let num;", if no init
  return `let ${varName}${initCode};`;
}
