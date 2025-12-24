import { ProgramNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genProgram(program: ProgramNode): string {
  // Inject built-in print function
  const printFunction = `
// Built-in print function
function print(...args) {
  console.log(...args);
}`.trim();

  // Each statement in 'body' gets its own generated code
  // Join them with newlines or semicolons
  const body = program.body.map(stmt => generateJS(stmt)).join("\n");

  return printFunction + '\n\n' + body;
}
