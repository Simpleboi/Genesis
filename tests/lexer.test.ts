import { Lexer } from '../src/lexer/lexer';
import { TokenType } from '../src/lexer/tokens';

// Testing for Keywords
test('Lexer correctly tokenizes keywords', () => {
  const input = 'int float string char';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.DATA_TYPE, value: 'int' },
    { type: TokenType.DATA_TYPE, value: 'float' },
    { type: TokenType.DATA_TYPE, value: 'string' },
    { type: TokenType.DATA_TYPE, value: 'char' },
    { type: TokenType.EOF, value: '' },
  ]);
});

// Testing for Numbers
test('Lexer correctly tokenizes numbers', () => {
  const input = '123 456 1 280 1000 7';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.INTEGER, value: '123' },
    { type: TokenType.INTEGER, value: '456' },
    { type: TokenType.INTEGER, value: '1' },
    { type: TokenType.INTEGER, value: '280' },
    { type: TokenType.INTEGER, value: '1000' },
    { type: TokenType.INTEGER, value: '7' },
    { type: TokenType.EOF, value: '' }
  ]);
});

// Testing for Operators
test('Lexer correctly tokenizes operators', () => {
  const input = '+-*/()[]{}';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.PLUS, value: '+' },
    { type: TokenType.MINUS, value: '-' },
    { type: TokenType.TIMES, value: '*' },
    { type: TokenType.DIVIDE, value: '/' },
    { type: TokenType.LEFT_PAREN, value: '(' },
    { type: TokenType.RIGHT_PAREN, value: ')' },
    { type: TokenType.LEFT_BRACKET, value: '[' },
    { type: TokenType.RIGHT_BRACKET, value: ']' },
    { type: TokenType.LEFT_CURLY, value: '{' },
    { type: TokenType.RIGHT_CURLY, value: '}' },
    { type: TokenType.EOF, value: '' }
  ]);
});

// Testing for Variable names
test('Lexer correctly tokenizes variable names', () => {
  const input = 'num x var1';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.IDENTIFIER, value: 'num' },
    { type: TokenType.IDENTIFIER, value: 'x' },
    { type: TokenType.IDENTIFIER, value: 'var1' },
    { type: TokenType.EOF, value: '' }
  ]);
});

// Expression Testing
test('Lexer correctly tokenizes an entire expression', () => {
  const input = 'int num = 10;';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.DATA_TYPE, value: 'int' },
    { type: TokenType.IDENTIFIER, value: 'num' },
    { type: TokenType.ASSIGNMENT, value: '=' },
    { type: TokenType.INTEGER, value: '10' },
    { type: TokenType.SEMICOLON, value: ';' },
    { type: TokenType.EOF, value: '' }
  ]);
});


// sample runtime test
test("Sample lexer test", () => {
  expect(true).toBe(true);
});