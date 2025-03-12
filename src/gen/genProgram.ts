import { ProgramNode } from '../parser/ast';
import { generateJS } from '../transpiler/transpiler';

export function genProgram(program: ProgramNode): string {
  // Each statement in 'body' gets its own generated code
  // Join them with newlines or semicolons

  return program.body.map(stmt => generateJS(stmt)).join("\n");
}
