import { FunctionDeclarationNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genFunctionDeclaration(node: FunctionDeclarationNode): string {
  const name = node.name;

  // Generate parameter list (drop types for JavaScript)
  const params = node.params
    .map(param => param.identifier)
    .join(', ');

  // Generate function body
  const bodyCode = node.body
    .map(stmt => generateJS(stmt))
    .join('\n  '); // Indent body statements

  // Generate JavaScript function
  // Genesis: int add(int x, int y) { ... }
  // JS:      function add(x, y) { ... }

  return `function ${name}(${params}) {\n  ${bodyCode}\n}`;
}
