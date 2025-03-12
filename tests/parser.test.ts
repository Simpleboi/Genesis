import { TokenType } from "../src/lexer/tokens";
import { parseProgram } from "../src/parser/parser";

// Sample parser test
test("Sample parser test", () => {
    expect(true).toBe(true);
});

test("Parses a simple variable declaration", () => {
    const tokens = [
      { type: TokenType.INT, value: "int" },
      { type: TokenType.IDENTIFIER, value: "num" },
      { type: TokenType.ASSIGNMENT, value: "=" },
      { type: TokenType.NUMBER, value: "10" },
      { type: TokenType.SEMICOLON, value: ";" },
      { type: TokenType.EOF, value: "" },
    ];
  
    const ast = parseProgram(tokens);
    expect(ast).toEqual({
      type: "Program",
      body: [
        {
          type: "VariableDeclaration",
          varType: "int",
          identifier: "num",
          initializer: {
            type: "Literal",
            value: "10"
          }
        }
      ]
    });
  });
  