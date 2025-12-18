import { TokenType } from "../../lexer/tokens";
import { ASTNode } from "../ast";
import { ParserClass } from "../parser";
import { parseVarDecl } from "./parseVarDecl";
import { parseIfStatement } from "./parseIfStatement";
import { parseAssignment } from "./parseAssignment";

/**
 * Parse statements
 * Takes a ParserClass instance and operates on its state
 */
export function parseStatement(parser: ParserClass): ASTNode {
    let token = parser.currentToken();

    // If the token is a known Data Type -> parse it
    if (parser.check(TokenType.DATA_TYPE)) {
        return parseVarDecl(parser);
    }

    // If the token is an 'if' keyword
    if (parser.check(TokenType.IF)) {
        parser.match(TokenType.IF);
        return parseIfStatement(parser);
    }

    // If the token is an identifier
    if (parser.check(TokenType.IDENTIFIER)) {
        return parseAssignment(parser);
    }


    // Otherwise, placeholder or error
    console.log(`Statement token that failed to match: ${token}`);
    throw new Error(`Unknown statement start: ${token.type} ${token}`);

}