// Parsing logic to generate AST using Nearley
import * as nearley from 'nearley';
import * as grammar from "../grammar/grammar.js";

// function that uses Nearley to parse input
function Parse(input: string) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  // Feed the input to the parser
  parser.feed(input);

  //return the results
  return parser.results;
}

const input = "123";
const results = Parse(input);
console.log(results);
