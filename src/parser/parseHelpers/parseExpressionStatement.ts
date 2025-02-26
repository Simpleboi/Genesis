import { parseExpression } from "./parseExpression";
import { ExpressionStatementNode } from "../ast";
import { TokenType } from "../../lexer/tokens";
import { consume } from "../parser";

export function parseExpressionStatement(): ExpressionStatementNode {
    let exprStatement = parseExpression();
    consume(TokenType.SEMICOLON, "Expect ';' after expression.");
    return {
        type: "ExpressionStatement",
        expression: exprStatement
    }
}