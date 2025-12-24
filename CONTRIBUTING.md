# Contributing to Genesis

Thank you for your interest in contributing to Genesis! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Adding New Language Features](#adding-new-language-features)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment. Please be kind and considerate in all interactions.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git**

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Genesis.git
   cd Genesis
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/Simpleboi/Genesis.git
   ```

---

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Link the CLI globally (optional):**
   ```bash
   npm link
   ```
   Now you can use `genesis` command anywhere on your system.

4. **Run tests:**
   ```bash
   npm test
   ```

5. **Watch mode for development:**
   ```bash
   npm run watch
   ```

---

## Project Architecture

Genesis is a **three-stage compiler** that transpiles Genesis code to JavaScript:

### 1. Lexer (`src/lexer/`)
Converts source code into tokens.

**Key Files:**
- `lexer.ts` - Main lexer entry point
- `tokens.ts` - Token type definitions
- `lexerHelpers/` - Token readers (keywords, numbers, strings, symbols)

### 2. Parser (`src/parser/`)
Converts tokens into an Abstract Syntax Tree (AST).

**Key Files:**
- `parser.ts` - Main parser class
- `ast.ts` - AST node type definitions
- `parseHelpers/` - Statement and expression parsers

### 3. Transpiler (`src/transpiler/`)
Converts the AST into JavaScript code.

**Key Files:**
- `transpiler.ts` - Main code generation router
- `src/gen/` - Individual code generators for each node type

### 4. CLI (`src/cli/`)
Command-line interface built with Commander.js.

### 5. Standard Library (`src/lib/`)
Runtime utilities and built-in functions.

---

## How to Contribute

### Types of Contributions

- 🐛 **Bug fixes** - Fix issues in the compiler
- ✨ **New features** - Add new language features
- 📝 **Documentation** - Improve docs and examples
- 🧪 **Tests** - Add or improve test coverage
- 🎨 **Code quality** - Refactoring and optimization

### Finding Issues

- Check the [Issues](https://github.com/Simpleboi/Genesis/issues) page for open issues
- Look for issues tagged with `good first issue` or `help wanted`
- Ask questions in issue comments before starting work

### Before You Start

1. **Check existing issues/PRs** to avoid duplicate work
2. **Open an issue** to discuss major changes before implementing
3. **Get feedback** on your approach before writing code
4. **Keep PRs focused** - one feature/fix per pull request

---

## Coding Standards

### TypeScript Guidelines

- Use **TypeScript** for all source code
- Enable strict type checking
- Prefer interfaces over types for object shapes
- Use descriptive variable and function names

### Code Style

- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings
- **Semicolons:** Required
- **Naming:**
  - `camelCase` for variables and functions
  - `PascalCase` for classes and interfaces
  - `UPPER_SNAKE_CASE` for constants

### File Organization

- **One feature per file** - Keep files focused and modular
- **Group related files** - Use directories for related functionality
- **Consistent naming** - Follow existing patterns:
  - Lexer helpers: `readXYZ.ts`
  - Parser helpers: `parseXYZ.ts`
  - Code generators: `genXYZ.ts`

### Comments

- **JSDoc** for public APIs and exported functions
- **Inline comments** for complex logic
- **Avoid obvious comments** - code should be self-documenting when possible

Example:
```typescript
/**
 * Parse return statements
 * Syntax: return expression;  OR  return;
 * @param parser - The parser instance
 */
export function parseReturnStatement(parser: ParserClass): ReturnStatementNode {
  // Implementation
}
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- lexer.test.ts

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

- Place tests in the `tests/` directory
- Follow the naming convention: `feature.test.ts`
- Use Jest for testing framework

**Test Structure:**
```typescript
import { Lexer } from '../src/lexer/lexer';
import { TokenType } from '../src/lexer/tokens';

test('Lexer correctly tokenizes keywords', () => {
  const input = 'int float string';
  const tokens = Lexer(input);

  expect(tokens).toEqual([
    { type: TokenType.DATA_TYPE, value: 'int' },
    { type: TokenType.DATA_TYPE, value: 'float' },
    { type: TokenType.DATA_TYPE, value: 'string' },
    { type: TokenType.EOF, value: '' },
  ]);
});
```

### Test Coverage

- **Lexer tests** - Token recognition for all syntax elements
- **Parser tests** - AST generation for statements and expressions
- **Transpiler tests** - JavaScript code generation
- **Integration tests** - Full pipeline (Lexer → Parser → Transpiler)

---

## Pull Request Process

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

Branch naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### 2. Make Your Changes

- Write clean, well-documented code
- Add tests for new functionality
- Ensure all tests pass: `npm test`
- Build successfully: `npm run build`
- Lint your code: `npm run lint`

### 3. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git commit -m "Add support for for-loops

- Implement lexer tokens for 'for' keyword
- Add parser logic for for-loop syntax
- Create code generator for for-loops
- Add tests for for-loop functionality"
```

**Commit Message Format:**
- First line: Brief summary (50 chars or less)
- Blank line
- Detailed description (if needed)
- Reference issues: `Fixes #123` or `Closes #456`

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Open a Pull Request

- Go to the [Genesis repository](https://github.com/Simpleboi/Genesis)
- Click "New Pull Request"
- Select your branch
- Fill out the PR template with:
  - **Description** - What changes were made and why
  - **Testing** - How you tested the changes
  - **Related Issues** - Link to related issues

### 6. Code Review

- Respond to feedback promptly
- Make requested changes
- Push updates to the same branch
- Re-request review when ready

---

## Adding New Language Features

Follow this pattern when adding new language features:

### Step 1: Lexer - Add Tokens

**File:** `src/lexer/tokens.ts`
```typescript
export enum TokenType {
  // ... existing tokens
  NEW_TOKEN = 35,  // Your new token
}
```

**File:** `src/lexer/lexerHelpers/readKeywords.ts` (for keywords)
```typescript
const KEYWORDS = ['for', 'while', 'return', 'your-keyword'];
```

### Step 2: Parser - Define AST Node

**File:** `src/parser/ast.ts`
```typescript
export interface YourNewNode extends ASTNode {
  type: 'YourNewType';
  // ... properties
}
```

### Step 3: Parser - Create Parse Helper

**File:** `src/parser/parseHelpers/parseYourFeature.ts`
```typescript
export function parseYourFeature(parser: ParserClass): YourNewNode {
  // Parsing logic
}
```

### Step 4: Parser - Integrate into Statement Parser

**File:** `src/parser/parseHelpers/parseStatement.ts`
```typescript
if (parser.check(TokenType.NEW_TOKEN)) {
  parser.match(TokenType.NEW_TOKEN);
  return parseYourFeature(parser);
}
```

### Step 5: Transpiler - Create Code Generator

**File:** `src/gen/genYourFeature.ts`
```typescript
export function genYourFeature(node: YourNewNode): string {
  // Generate JavaScript code
}
```

### Step 6: Transpiler - Add to Router

**File:** `src/transpiler/transpiler.ts`
```typescript
case 'YourNewType':
  return genYourFeature(node as YourNewNode);
```

### Step 7: Add Tests

**File:** `tests/your-feature.test.ts`
- Test lexer tokenization
- Test parser AST generation
- Test code generation
- Test end-to-end integration

### Step 8: Documentation

- Update CLAUDE.md with new syntax
- Add examples in `src/examples/`
- Update README if needed

---

## Common Patterns

### Lookahead Parsing

When disambiguating similar syntax (e.g., function declaration vs variable declaration):

```typescript
// Save position
const savedIndex = parser.getCurrentIndex();
parser.advanceToken();

// Check next token
if (parser.check(TokenType.SOMETHING)) {
  parser.resetToIndex(savedIndex);
  return parseFeatureA(parser);
}

// Otherwise, parse feature B
parser.resetToIndex(savedIndex);
return parseFeatureB(parser);
```

### Recursive Statement Parsing

For blocks and nested statements:

```typescript
parser.consume(TokenType.LEFT_CURLY, "Expected '{'");

const body: ASTNode[] = [];
while (!parser.check(TokenType.RIGHT_CURLY)) {
  body.push(parseStatement(parser));  // Recursive
}

parser.consume(TokenType.RIGHT_CURLY, "Expected '}'");
```

---

## Resources

- **Documentation:** See [CLAUDE.md](./CLAUDE.md) for project overview
- **Architecture:** Review existing code in `src/` for patterns
- **Examples:** Check `src/examples/` for Genesis code samples
- **Issues:** [GitHub Issues](https://github.com/Simpleboi/Genesis/issues)

---

## Questions?

If you have questions:

1. Check existing documentation (README, CLAUDE.md)
2. Search [closed issues](https://github.com/Simpleboi/Genesis/issues?q=is%3Aissue+is%3Aclosed)
3. Open a new issue with your question

---

## License

By contributing to Genesis, you agree that your contributions will be licensed under the project's ISC License.

---

Thank you for contributing to Genesis! 🚀
