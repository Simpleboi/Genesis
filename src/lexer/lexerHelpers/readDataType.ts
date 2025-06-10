import { TokenType } from '../tokens';
import { DATA_TYPE } from './dataTypes';

// Function to read data types 
export function readDataType(input: string, currentIndex: number): {type: TokenType, value: string, index: number} | null {
    let value = "";
    let index = currentIndex;

    // Read until a non-letter character is shown
    while (/[a-zA-Z]/.test(input[index])) {
        value += input[index];
        index++;
    }

    // Check if the value is a valid data type
    if (DATA_TYPE.includes(value)) {
        return { type: TokenType.DATA_TYPE, value, index}
    }

    return null;
}