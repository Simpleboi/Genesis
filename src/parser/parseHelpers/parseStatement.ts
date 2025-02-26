import { TokenType } from "../../lexer/tokens";
import { ASTNode } from "../ast";
import { check, currentToken } from "../parser";
import { parseVarDecl } from "./parseVarDecl";

export function parseStatement(): ASTNode {
    let token = currentToken();

    // If the token type is a known type token -> parse it
    if (check(TokenType.INT) || check(TokenType.STRING) || check(TokenType.BOOL)) {
        return parseVarDecl();
    }

    // Otherwise, placeholder or error
    throw new Error(`Unknown statement start: ${token.type}`);
}