import { TokenType, Token } from "../tokens";

// Function to check if the character is a digit
export function isDigit(char: string): boolean {
    return /\d/.test(char);
}

// Function to read numbers (tokenize the number portion)
export function readNumbers(src: string, currentIndex: number): [Token, number] | null {
    let value = "";
    let index = currentIndex;

    // Read characters until a non-digit is encountered
    while (isDigit(src[index])) {
        value += src[index];
        index++;
    }

    if (value) {
        const token: Token = {type: TokenType.NUMBER, value};
        return [token, index]
    }

    return null;
}