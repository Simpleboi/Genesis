import { TokenType } from "../../lexer/tokens";
import { ASTNode } from "../ast";
import { check, currentToken, match } from "../parser";
import { parseVarDecl } from "./parseVarDecl";
import { parseIfStatement } from "./parseIfStatement";

export function parseStatement(): ASTNode {
    let token = currentToken();

    // If the token is a known Data Type -> parse it
    if (check(TokenType.DATA_TYPE)) {
        return parseVarDecl();
    }

    // If the token is an 'if' keyword
    if (check(TokenType.KEYWORD)) {
        match(TokenType.KEYWORD);
        return parseIfStatement();
    }

    // Otherwise, placeholder or error
    console.log(`Statement token that failed to match: ${token}`);
    throw new Error(`Unknown statement start: ${token.type} ${token}`);
    
}