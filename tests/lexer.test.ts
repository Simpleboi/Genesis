import { Lexer } from "../src/lexer/lexer";

const testCases = [
    {
      input: "3 + 4",
      expected: [
        { type: "NUMBER", value: "3" },
        { type: "PLUS" },
        { type: "NUMBER", value: "4" },
        { type: "EOF" }
      ]
    },
    {
      input: "(1 + 2) * 3",
      expected: [
        { type: "LEFTPAREN" },
        { type: "NUMBER", value: "1" },
        { type: "PLUS" },
        { type: "NUMBER", value: "2" },
        { type: "RIGHTPAREN" },
        { type: "TIMES" },
        { type: "NUMBER", value: "3" },
        { type: "EOF" }
      ]
    }
  ];
  
  testCases.forEach(({ input, expected }, idx) => {
    test(`Lexer test case ${idx + 1}`, () => {
      const lexer = new Lexer(input);
      const tokens = lexer.tokenize();
      expect(tokens).toEqual(expected);
    });
  });