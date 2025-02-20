import { Lexer } from "../src/lexer/lexer";

const testCases = [
  {
    input: '3 + 4',
    expected: [
      { type: 'NUMBER', value: '3' },
      { type: 'PLUS' },
      { type: 'NUMBER', value: '4' },
      { type: 'EOF' },
    ],
  },
];

testCases.forEach(({ input, expected }, idx) => {
  test(`Lexer test case ${idx + 1}`, () => {
    const lexer = Lexer(input);
    expect(lexer).toEqual(expected);
    console.log(lexer);
  });
});
