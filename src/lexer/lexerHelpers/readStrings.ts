import { addToken, advance, peek } from "../lexerUtils";
import { TokenType } from "../tokens";

export function readStrings(): boolean {
    const quote = peek();

    if (quote !== '"' && quote !== "'") {
        return false;
    };

    advance(); // Skip opening "

    let value = "";
    while (peek() !== quote && peek() !== null) {
        value += peek();
        advance();
    }

    if (peek() === quote) {
        advance(); // skip closing 
        addToken(TokenType.STRING, value);
        return true;
    }

    throw new Error(`Undetermined string literl. ${value}`)
}