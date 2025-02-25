import { addToken, advance, peek } from "../lexerUtils";
import { TokenType } from "../tokens";

// Function to check if the character is a digit
export function isDigit(char: string): boolean {
    return /\d/.test(char);
}

// Function to read numbers (tokenize the number portion)
export function readNumbers(): boolean {
    let currentChar = peek();

    if (/\d/.test(currentChar!)) {
        // to build the number token
        let number = "";

        // Keep adding digits
        while (/\d/.test(peek()!)) {
            number += peek();
            advance();
        }

        addToken(TokenType.NUMBER, number);
        return true;
    }
    return false;
}