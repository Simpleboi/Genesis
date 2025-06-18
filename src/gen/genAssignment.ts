import { AssignmentStatementNode } from "../parser/ast";
import { generateJS } from "../transpiler/transpiler";

export function genAssignmentExpression(node: AssignmentStatementNode): string {
    const identifer = generateJS(node.identifier);
    const value = generateJS(node.value);
    return `${identifer} = ${value}`;
}