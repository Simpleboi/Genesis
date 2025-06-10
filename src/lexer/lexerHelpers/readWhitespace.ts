import { Token } from "../tokens";

// Function to check if the character is whitespace
export function isWhiteSpace(char: string): boolean {
    return /\s/.test(char);
}

// Function to read and skip over whitespace
export function skipWhitespace(src:  string, currentIndex: number): [Token | null, number] {
    let index = currentIndex;

    // skip over whitespace
    while (isWhiteSpace(src[index])) {
        index++;
    }

    return [null, index];
}