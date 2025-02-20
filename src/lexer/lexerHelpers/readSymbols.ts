import { TokenType, Token } from "../tokens";


// Function to read symbols (operators, paren, etc)
export function readSymbols(src: string, currentIndex: number): [Token, number] | null {
    
    const char = src[currentIndex];

    switch (char) {
        case "=":
            return [{type: TokenType.EQUALS, value: "="}, currentIndex + 1];
        
        case "(":
            return [{type: TokenType.LEFTPAREN, value: "="}, currentIndex + 1];
        
        case ")":
            return [{type: TokenType.RIGHTPAREN, value: "="}, currentIndex + 1]
        
        case "+":
        case "-":
        case "*":
        case "/":
        
        default:
            return null;
    }
}
