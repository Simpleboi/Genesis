#!/usr/bin/env node
import fs from 'fs';
import { Lexer } from '../lexer/lexer';
import { parseProgram } from '../parser/parser';
import { generateJS } from '../transpiler/transpiler';
import { program } from 'commander';

program
  .name('Genesis')
  .description('A CLI for the Genesis Language')
  .version('0.9.4');

// "Build" command: transpile .gen code to JS
program
  .command('build <file>')
  .option('-o, --out <filename>', 'Output JS file')
  .description('Transpile a .gen file to JavaScript')
  .action((file: string, options: { out?: string }) => {
    const code = fs.readFileSync(file, 'utf-8');

    // 1) Lexer
    const tokens = Lexer(code);

    // 2) Parser
    const ast = parseProgram(tokens);

    // 3) Code generation
    const js = generateJS(ast);

    if (options.out) {
      fs.writeFileSync(options.out, js, 'utf-8');
      console.log(`Wrote transpiled output to ${options.out}`);
    } else {
      // Just print to stdout
      console.log(js);
    }
  });

// Transpile the .gen code and immediately execute the JS
program
  .command('run <file>')
  .description('Transpile and run a .gen file')
  .action((file: string) => {
    const code = fs.readFileSync(file, 'utf-8');

    const tokens = Lexer(code);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    // Now run the generated JS. One approach is to use "vm" or child_process
    // For simplicity, let's just do a quick eval (caution: security!)
    eval(js);
  });


// Help messages
program.on("--help", () => {
    console.log("\n");
    console.log("Example calls: ");
    console.log("$ genesis build example.gen --out output.js ");
    console.log("$ genesis run example.gen");
})

// Parse CLI arguments
program.parse(process.argv);