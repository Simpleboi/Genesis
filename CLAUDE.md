# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Genesis is a general-purpose programming language that transpiles to JavaScript. It features C++-like syntax with stricter typing while maintaining compatibility with JavaScript ecosystems. The language is currently pre-1.0 and under active development.

**File Extension**: `.gen`

## Development Commands

### Building and Running
```bash
npm run build           # Compile TypeScript to dist/
npm run watch          # Watch mode for TypeScript compilation
npm run dev            # Run with ts-node-dev for development
npm start              # Run core.ts directly with ts-node
```

### Testing and Quality
```bash
npm test               # Run Jest tests
npm run lint           # Lint TypeScript files
npm run lint:fix       # Auto-fix linting issues
```

### Genesis CLI Commands
```bash
npm run gen            # Transpile src/examples/index.gen to JS
npm run genc           # Transpile and execute the example file
genesis build <file> --out <output.js>  # Transpile .gen file
genesis run <file>     # Transpile and execute .gen file
```

### Running Tests

- All tests: `npm test`
- Tests are located in `tests/` and organized by component:
  - `lexer.test.ts` - Tokenization tests
  - `parser.test.ts` - AST generation tests
  - `gen.test.ts` - Code generation tests
  - `library.test.ts` - Standard library tests
  - `runtime.test.ts` - Runtime behavior tests

## Architecture

Genesis is a **three-stage compiler** (Lexer → Parser → Transpiler):

### 1. Lexer Stage (`src/lexer/`)
- **Entry Point**: `lexer.ts` exports `Lexer(input: string): Token[]`
- **Token Definitions**: `tokens.ts` contains `TokenType` enum and `Token` interface
- **Utilities**: `lexerUtils.ts` provides stateful helpers (`advance()`, `peek()`, etc.)
- **Reader Modules** (`lexerHelpers/`):
  - `readKeywords.ts` - Data types (int, float, string, char) and control flow keywords
  - `readNumbers.ts` - Integer and float literals
  - `readStrings.ts` - String literals
  - `readSymbols.ts` - Operators and punctuation

The lexer processes source code character-by-character, maintaining internal state through `_currentIndex` and `_tokens` in `lexerUtils.ts`.

### 2. Parser Stage (`src/parser/`)
- **Entry Point**: `parser.ts` exports `parseProgram(tokens: Token[]): ProgramNode`
- **AST Definitions**: `ast.ts` defines all node types (VariableDeclarationNode, IfStatementNode, BinaryExpressionNode, etc.)
- **Parse Helpers** (`parseHelpers/`):
  - `parseStatement.ts` - Routes to specific statement parsers
  - `parseVarDecl.ts` - Variable declarations (e.g., `int x = 10;`)
  - `parseAssignment.ts` - Assignment statements (e.g., `x = 20;`)
  - `parseIfStatement.ts` - If/else conditionals
  - `parseWhileStatement.ts` - While loops
  - `parseExpression.ts` - Binary expressions, literals, identifiers
  - `parseExpressionStatement.ts` - Expression as statement

The parser uses stateful token consumption with helper functions like `match()`, `consume()`, `check()`, and `advanceToken()`.

### 3. Transpiler Stage (`src/transpiler/`)
- **Entry Point**: `transpiler.ts` exports `generateJS(node: ASTNode): string`
- **Code Generators** (`src/gen/`):
  - `genProgram.ts` - Root program node
  - `genVarDecl.ts` - Variable declarations (converts Genesis types to JS `let`)
  - `genAssignment.ts` - Assignment expressions
  - `genBinaryExpressions.ts` - Binary operations (+, -, *, /, etc.)
  - `genLiteral.ts` - Literal values
  - `genIdentifier.ts` - Variable references

The transpiler uses a visitor pattern, routing each AST node type through `generateJS()` to its corresponding `genXYZ()` function.

### 4. CLI (`src/cli/`)
- Built with Commander.js
- Commands:
  - `build <file> --out <output>` - Transpile to JavaScript file
  - `run <file>` - Transpile and execute using `eval()`
- The CLI orchestrates the full pipeline: Lexer → Parser → Transpiler

### 5. Standard Library (`src/lib/`)
Genesis provides JavaScript runtime utilities:
- `stdlib.ts` - Core utilities (`grange()`, `gAssert()`)
- `print.ts` - Console output helpers
- `io.ts` - Input/output operations
- `math.ts` - Mathematical functions
- `string.ts` - String manipulation
- `array.ts` - Array utilities

These are imported in generated JavaScript code as needed.

## Key Implementation Patterns

### Adding New Language Features
When implementing new syntax:

1. **Lexer**: Add token type to `TokenType` enum in `tokens.ts`, then create/update reader in `lexerHelpers/`
2. **Parser**: Define AST node interface in `ast.ts`, create parse helper in `parseHelpers/`, integrate into `parseStatement.ts`
3. **Transpiler**: Create generator function in `gen/`, add case to switch statement in `transpiler.ts`
4. **Tests**: Add tests in appropriate `tests/*.test.ts` file

### Type System
Genesis has declared types (int, float, string, char, bool, double) that are stored in AST nodes but currently transpile to JavaScript's dynamic typing. The `varType` and `resultType` fields in AST nodes track Genesis types.

### Recent Changes
Based on git history, recent work includes:
- Reassignment support (commit f2f2909)
- If statement implementation (commits c56aca5, 1604b7d)
- CLI tool enhancements (commit f8ace29)

Current modified files (from git status):
- `src/core/core.ts` - Test harness for compiler stages
- `src/parser/ast.ts` - AST node definitions
- `src/parser/parser.ts` - Token consumption logic

## File Organization Principles

- **Separation of Concerns**: Each compiler stage is isolated in its own directory
- **Helper Functions**: Complex parsing/lexing logic is split into focused helper modules
- **Modular Generators**: Each AST node type has its own generator file in `src/gen/`
- **Stateful Utilities**: Lexer and parser maintain state through utility modules rather than class instances

## Project Status

This is a **pre-1.0 project**. Many features are incomplete or not yet implemented. The language is not production-ready. Focus development on core compiler functionality before adding advanced features.
