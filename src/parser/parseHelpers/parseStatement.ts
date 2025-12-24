import { TokenType } from "../../lexer/tokens";
import { ASTNode } from "../ast";
import { ParserClass } from "../parser";
import { parseVarDecl } from "./parseVarDecl";
import { parseIfStatement } from "./parseIfStatement";
import { parseAssignment } from "./parseAssignment";
import { parseReturnStatement } from "./parseReturnStatement";
import { parseFunctionDeclaration } from "./parseFunctionDeclaration";

/**
 * Parse statements
 * Takes a ParserClass instance and operates on its state
 */
export function parseStatement(parser: ParserClass): ASTNode {
    const token = parser.currentToken();

    // If the token is a known Data Type -> could be variable or function
    if (parser.check(TokenType.DATA_TYPE)) {
        // Save position for potential backtrack
        const savedIndex = parser.getCurrentIndex();
        const typeToken = parser.currentToken();
        parser.advanceToken(); // Move past DATA_TYPE

        // Check if identifier followed by '(' = function declaration
        if (parser.check(TokenType.IDENTIFIER)) {
            parser.advanceToken(); // Move past IDENTIFIER

            if (parser.check(TokenType.LEFT_PAREN)) {
                // It's a function! Reset to type token and parse
                parser.resetToIndex(savedIndex);
                parser.advanceToken(); // Consume DATA_TYPE
                return parseFunctionDeclaration(parser, typeToken.value);
            }
        }

        // Not a function, reset and parse as variable declaration
        parser.resetToIndex(savedIndex);
        return parseVarDecl(parser);
    }

    // If the token is an 'if' keyword
    if (parser.check(TokenType.IF)) {
        parser.match(TokenType.IF);
        return parseIfStatement(parser);
    }

    // If the token is a 'return' keyword
    if (parser.check(TokenType.RETURN)) {
        parser.match(TokenType.RETURN);
        return parseReturnStatement(parser);
    }

    // If the token is an identifier
    if (parser.check(TokenType.IDENTIFIER)) {
        return parseAssignment(parser);
    }


    // Otherwise, placeholder or error
    console.log(`Statement token that failed to match: ${token}`);
    throw new Error(`Unknown statement start: ${token.type} ${token}`);

}