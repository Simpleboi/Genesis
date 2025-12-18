import { parseExpression } from "./parseExpression";
import { ExpressionStatementNode } from "../ast";
import { TokenType } from "../../lexer/tokens";
import { ParserClass } from "../parser";

/**
 * Parse expression statements
 * Takes a ParserClass instance and operates on its state
 */
export function parseExpressionStatement(parser: ParserClass): ExpressionStatementNode {
    let exprStatement = parseExpression(parser);
    parser.consume(TokenType.SEMICOLON, "Expect ';' after expression.");
    return {
        type: "ExpressionStatement",
        expression: exprStatement
    }
}
