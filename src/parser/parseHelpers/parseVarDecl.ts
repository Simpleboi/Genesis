import { VariableDeclarationNode } from "../ast";
import { currentToken } from "../parser";

/*
Grammar for Variable Declaration

varDec -> (int | float | string) identifer (= Expression)? ";"

*/

// export function parseVarDecl(): VariableDeclarationNode {
//     // ex. "int"
//     let typeToken = currentToken();
// }