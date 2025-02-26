
# Genesis Programming Language

Genesis is a **general-purpose** programming language designed for simplicity, stricter-typing, expressiveness, and easy integration with existing JavaScript ecosystems. It **transpiles** to JavaScript, so you can use it anywhere JS runs (in browsers, Node.js, etc.) without needing a separate runtime.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Standard Library](#standard-library)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Easy to Learn**: Genesis has familiar syntax for those who know JavaScript or C-style languages, More specifically C++.
- **Transpilation**: All Genesis code compiles down to readable JavaScript, so it runs anywhere JS does.
- **Extensible Standard Library**: Genesis comes with a library of utilities (like `print`, `range`, etc.) that can grow with community contributions.
- **No Separate Runtime**: Leverages the existing JavaScript environment, removing the need for an extra VM or heavy runtime.

### Example

```c++
int x = 10;
if (x > 5) {
    print("x is large!");
}
```

The generated JavaScript code would be:

```JavaScript
let x = 10;
if (x > 5) {
    console.log("x is large!");
}
```

## Installation

To install genesis, use the following command:

```bash
npm install genesis -g
```

## Getting Started

1. Use `npm install genesis -g` to get the Cli globally
2. Create a `.gen` file with your code.
3. Run the command `genesis <fileName>.gen` to produce the corresponding JavaScript
4. Execute the generated JS code via `node` or in any JS enviornment.

## Usage

Rather than running the `genesis <fileName>.gen` command to generate a corresponding JS file. You can simply run `genesis build <fileName>.gen`. This will transpile your genesis code and immeditely run the transpiled code.

## Standard Library

Genesis comes with a Transpiler API built-in if you want to integrate Genesis into a build step or IDE.

```JavaScript
import { transpiler } from "genesis";

const genesisCode = `
int main() {
    print("Hello from Genesis!");
}
`
const jsOutput = transpiler(genesisCode);
console.log(jsOutput); // -> 'console.log("Hello from Genesis!")'

```

## roadmap

## license

## contributing
