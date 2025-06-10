// Testing Core functionality
import { parseProgram } from "../parser/parser";
import { generateJS } from "../transpiler/transpiler";
import { Lexer } from "../lexer/lexer";

const code = "string name = 'nate' + 'great';";
console.log("Genesis code:", code);

// 1) Lexer
const tokens = Lexer(code);
console.log("Tokens:", tokens);

// 2) Parse
const ast = parseProgram(tokens);
console.log("AST:", JSON.stringify(ast, null, 2));

// 3) Generate JS
const jsCode = generateJS(ast);
console.log("Generated JS:", jsCode);
