import { Lexer } from '../src/lexer/lexer';
import { TokenType } from '../src/lexer/tokens';

// Testing for Keywords
// test('Lexer correctly tokenizes keywords', () => {
//   const input = 'int float';
//   const tokens = Lexer(input);

//   expect(tokens).toEqual([
//     { type: TokenType.KEYWORD, value: 'int' },
//     { type: TokenType.KEYWORD, value: 'float' },
//   ]);
// });

// // Testing for Numbers
// test('Lexer correctly tokenizes numbers', () => {
//   const input = '123 456';
//   const tokens = Lexer(input);

//   expect(tokens).toEqual([
//     { type: TokenType.NUMBER, value: '123' },
//     { type: TokenType.NUMBER, value: '456' },
//   ]);
// });

// Testing for Operators
test('Lexer correctly tokenizes operators', () => {
  const input = '+ - * /';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.PLUS, value: '+' },
    { type: TokenType.MINUS, value: '-' },
    { type: TokenType.TIMES, value: '*' },
    { type: TokenType.DIVIDE, value: '/' },
  ]);
});

// // Testing for Variable names
// test('Lexer correctly tokenizes variable names', () => {
//   const input = 'num x var1';
//   const tokens = Lexer(input);

//   expect(tokens).toEqual([
//     { type: TokenType.VARIABLE, value: 'num' },
//     { type: TokenType.VARIABLE, value: 'x' },
//     { type: TokenType.VARIABLE, value: 'var1' },
//   ]);
// });

// // Expression Testing
// test('Lexer correctly tokenizes an entire expression', () => {
//   const input = 'int num = 10;';
//   const tokens = Lexer(input);

//   expect(tokens).toEqual([
//     { type: TokenType.KEYWORD, value: 'int' },
//     { type: TokenType.VARIABLE, value: 'num' },
//     { type: TokenType.EQUALS, value: '=' },
//     { type: TokenType.NUMBER, value: '10' },
//     { type: TokenType.SEMICOLON, value: ';' },
//   ]);
// });
