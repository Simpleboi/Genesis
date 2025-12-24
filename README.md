# Genesis Programming Language

[![Version](https://img.shields.io/badge/version-0.9.4-blue.svg)](https://github.com/Simpleboi/Genesis)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)

</div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Genesis Programming Language](#genesis-programming-language)
  - [⚠️ Pre-Release Notice](#️-pre-release-notice)
  - [📖 Table of Contents](#-table-of-contents)
  - [🎯 About](#-about)
  - [✨ Features](#-features)
    - [Currently Implemented](#currently-implemented)
    - [In Development](#in-development)
  - [Installation](#installation)
    - [Global Installation (Recommended)](#global-installation-recommended)
    - [Local Development](#local-development)
  - [Quick Start](#quick-start)
    - [1. Create a Genesis file](#1-create-a-genesis-file)
    - [2. Build and run](#2-build-and-run)
    - [3. Output](#3-output)
  - [📚 Language Guide](#-language-guide)
    - [Variable Declarations](#variable-declarations)
    - [Functions](#functions)
    - [Control Flow](#control-flow)
    - [Expressions](#expressions)
  - [🔧 CLI Usage](#-cli-usage)
    - [Commands](#commands)
    - [Examples](#examples)
  - [📚 Standard Library](#-standard-library)
    - [Built-in Functions](#built-in-functions)
      - [`print(...args)`](#printargs)
  - [💡 Examples](#-examples)
    - [Example 1: Basic Calculator](#example-1-basic-calculator)
    - [Example 2: Conditional Logic](#example-2-conditional-logic)
    - [Example 3: Nested Functions](#example-3-nested-functions)
  - [Roadmap](#roadmap)
    - [Version 0.9.4 (Current)](#version-094-current)
    - [Version 1.0.0 (Target: March 2025)](#version-100-target-march-2025)
    - [Version 1.1.0 and Beyond](#version-110-and-beyond)
  - [🤝 Contributing](#-contributing)
    - [How to Contribute](#how-to-contribute)
    - [Good First Issues](#good-first-issues)
  - [📄 License](#-license)
  - [🔗 Links](#-links)
  - [🙏 Acknowledgments](#-acknowledgments)

<!-- /code_chunk_output -->

## ⚠️ Pre-Release Notice

**Genesis is currently in pre-1.0 development and is NOT production-ready.** Many features are still being implemented and the language specification is subject to change. Use at your own risk and expect breaking changes.

**Current Status:** Version 0.9.4 - Active Development

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Language Guide](#-language-guide)
- [CLI Usage](#-cli-usage)
- [Standard Library](#-standard-library)
- [Examples](#-examples)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

Genesis is a **general-purpose programming language** designed with a focus on:

- **Familiarity** - C++-style syntax that's easy to learn for developers from C, C++, Java, or JavaScript backgrounds
- **Type Safety** - Stricter typing than JavaScript while maintaining simplicity
- **JavaScript Integration** - Transpiles to clean, readable JavaScript for seamless ecosystem integration
- **No Runtime Overhead** - Runs anywhere JavaScript runs (browsers, Node.js, Deno) without additional dependencies

Genesis combines the familiar syntax of compiled languages with the flexibility and ubiquity of JavaScript.

---

## ✨ Features

### Currently Implemented

✅ **Static Typing** - Declare variables with types (`int`, `float`, `string`, `char`, `bool`, `double`, `void`)
✅ **Functions** - Full function support with typed parameters and return values
✅ **Control Flow** - If/else statements and conditionals
✅ **Operators** - Arithmetic, comparison, and logical operators
✅ **Built-in Functions** - `print()` function for console output
✅ **Clean Transpilation** - Generates readable, well-formatted JavaScript
✅ **CLI Tool** - Command-line interface for building and running Genesis code

### In Development

🚧 **Loops** - For and while loops (parser support exists, transpiler in progress)
🚧 **Arrays** - Array types and operations
🚧 **Classes** - Object-oriented programming support
🚧 **Modules** - Import/export system
🚧 **Standard Library** - Comprehensive built-in utilities

---

## Installation

### Global Installation (Recommended)

```bash
npm install -g genesis-project
```

### Local Development

```bash
git clone https://github.com/Simpleboi/Genesis.git
cd Genesis
npm install
npm run build
npm link
```

---

## Quick Start

### 1. Create a Genesis file

Create a file named `hello.gen`:

```cpp
void greet(string name) {
    print("Hello, ");
    print(name);
}

int add(int x, int y) {
    return x + y;
}

greet("World");

int result = add(5, 3);
print(result);
```

### 2. Build and run

```bash
# Transpile to JavaScript
genesis build hello.gen --out hello.js

# Or transpile and run immediately
genesis run hello.gen
```

### 3. Output

```md
Hello,
World
8
```

---

## 📚 Language Guide

### Variable Declarations

Genesis requires explicit type declarations:

```cpp
int age = 25;
float price = 19.99;
string name = "Alice";
bool isActive = true;
double pi = 3.14159265359;
```

Transpiles to:

```javascript
let age = 25;
let price = 19.99;
let name = "Alice";
let isActive = true;
let pi = 3.14159265359;
```

### Functions

Functions use C-style syntax with typed parameters and return types:

```cpp
// Function with return value
int multiply(int a, int b) {
    return a * b;
}

// Void function
void sayHello(string name) {
    print("Hello, " + name);
}

// Function calls
int product = multiply(4, 5);
sayHello("Genesis");
```

Transpiles to:

```javascript
function multiply(a, b) {
    return a * b;
}

function sayHello(name) {
    print("Hello, " + name);
}

let product = multiply(4, 5);
sayHello("Genesis");
```

### Control Flow

```cpp
int x = 10;

if (x > 5) {
    print("x is greater than 5");
} else {
    print("x is 5 or less");
}
```

### Expressions

```cpp
int a = 10;
int b = 20;
int sum = a + b;
int difference = a - b;
int product = a * b;
int quotient = b / a;

bool isEqual = (a == b);
bool isGreater = (a > b);
```

---

## 🔧 CLI Usage

### Commands

```bash
# Build (transpile) a Genesis file
genesis build <file.gen> [--out <output.js>]

# Run (transpile and execute) a Genesis file
genesis run <file.gen>

# Show version
genesis --version

# Show help
genesis --help
```

### Examples

```bash
# Transpile and save to file
genesis build src/main.gen --out dist/main.js

# Transpile and print to stdout
genesis build src/main.gen

# Transpile and run immediately
genesis run src/main.gen
```

---

## 📚 Standard Library

Genesis automatically injects essential built-in functions into all transpiled code.

### Built-in Functions

#### `print(...args)`

Outputs values to the console.

```cpp
print("Hello");
print("Sum:", 5 + 3);
```

Transpiles to:

```javascript
console.log("Hello");
console.log("Sum:", 5 + 3);
```

*More standard library functions coming soon!*

---

## 💡 Examples

### Example 1: Basic Calculator

```cpp
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

int divide(int a, int b) {
    return a / b;
}

int x = 10;
int y = 5;

print("Addition:", add(x, y));
print("Subtraction:", subtract(x, y));
print("Multiplication:", multiply(x, y));
print("Division:", divide(x, y));
```

### Example 2: Conditional Logic

```cpp
int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

int larger = max(15, 20);
print("The larger number is:", larger);
```

### Example 3: Nested Functions

```cpp
int square(int n) {
    return n * n;
}

int sumOfSquares(int a, int b) {
    return square(a) + square(b);
}

int result = sumOfSquares(3, 4);
print("3² + 4² =", result);  // Output: 25
```

More examples can be found in the [`src/examples/`](./src/examples/) directory.

---

## Roadmap

### Version 0.9.4 (Current)

- [x] Basic lexer and parser
- [x] Variable declarations with types
- [x] Function declarations and calls
- [x] Return statements
- [x] If/else statements
- [x] Binary expressions
- [x] Built-in print function
- [x] CLI tool

### Version 1.0.0 (Target: March 2025)

- [ ] While loops
- [ ] For loops
- [ ] Arrays and array operations
- [ ] String manipulation
- [ ] Type checking and validation
- [ ] Better error messages
- [ ] Comprehensive standard library
- [ ] Full test coverage

### Version 1.1.0 and Beyond

- [ ] Classes and objects
- [ ] Interfaces
- [ ] Generics
- [ ] Module system (import/export)
- [ ] Enums
- [ ] Switch statements
- [ ] Try/catch error handling
- [ ] Async/await support
- [ ] Package manager integration
- [ ] IDE support (syntax highlighting, LSP)
- [ ] Sourcemap generation
- [ ] Watch mode
- [ ] REPL (Read-Eval-Print Loop)

See [Issues](https://github.com/Simpleboi/Genesis/issues) for detailed feature requests and bug reports.

---

## 🤝 Contributing

Contributions are welcome! Genesis is an open-source project and we'd love your help.

### How to Contribute

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- Development setup
- Project architecture
- Coding standards
- Testing requirements
- Pull request process
- How to add new language features

### Good First Issues

Looking for a place to start? Check out issues tagged with [`good first issue`](https://github.com/Simpleboi/Genesis/labels/good%20first%20issue).

---

## 📄 License

Genesis is licensed under the [ISC License](./LICENSE).

```md
Copyright (c) 2024 Nathaniel E. Paz

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 🔗 Links

- **GitHub:** [https://github.com/Simpleboi/Genesis](https://github.com/Simpleboi/Genesis)
- **Issues:** [https://github.com/Simpleboi/Genesis/issues](https://github.com/Simpleboi/Genesis/issues)
- **Documentation:** See [CLAUDE.md](./CLAUDE.md) for technical architecture details
- **Contributing:** See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines

---

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- CLI powered by [Commander.js](https://github.com/tj/commander.js)
- Tested with [Jest](https://jestjs.io/)

---

**Made with ❤️ by [Nathaniel E. Paz](https://github.com/Simpleboi)**

⭐ Star this repository if you find it interesting!

</div>
