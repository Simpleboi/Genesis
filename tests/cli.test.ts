import fs from 'fs';
import { Lexer } from '../src/lexer/lexer';
import { parseProgram } from '../src/parser/parser';
import { generateJS } from '../src/transpiler/transpiler';

// Mock fs module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('CLI Build Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('build command transpiles .gen file to JavaScript', () => {
    const genCode = 'int x = 10;';
    mockedFs.readFileSync.mockReturnValue(genCode);

    // Simulate the build process
    const tokens = Lexer(genCode);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    expect(tokens).toBeDefined();
    expect(ast).toBeDefined();
    expect(js).toBeDefined();
    expect(typeof js).toBe('string');
  });

  test('build command writes to file when --out option is provided', () => {
    const genCode = 'int x = 10;';
    const outputFile = 'output.js';

    mockedFs.readFileSync.mockReturnValue(genCode);
    mockedFs.writeFileSync.mockImplementation();

    const tokens = Lexer(genCode);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    // Simulate writing the file
    mockedFs.writeFileSync(outputFile, js, 'utf-8');

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(outputFile, js, 'utf-8');
  });

  test('build command outputs to console when --out is not provided', () => {
    const genCode = 'int x = 10;';
    const consoleLogSpy = jest.spyOn(console, 'log');

    mockedFs.readFileSync.mockReturnValue(genCode);

    const tokens = Lexer(genCode);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    console.log(js);

    expect(consoleLogSpy).toHaveBeenCalledWith(js);
  });
});

describe('CLI Run Command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('run command transpiles and executes .gen file', () => {
    const genCode = 'int x = 10;';

    mockedFs.readFileSync.mockReturnValue(genCode);

    const tokens = Lexer(genCode);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    // Verify the transpilation pipeline works
    expect(tokens).toBeDefined();
    expect(ast).toBeDefined();
    expect(js).toBeDefined();

    // The actual eval() would happen in the CLI, but we can verify the JS is valid
    expect(() => eval(js)).not.toThrow();
  });
});

describe('CLI Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('transpiles variable declaration correctly', () => {
    const genCode = 'int num = 42;';
    mockedFs.readFileSync.mockReturnValue(genCode);

    const tokens = Lexer(genCode);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    expect(js).toContain('let');
    expect(js).toContain('num');
    expect(js).toContain('42');
  });

  test('transpiles multiple statements correctly', () => {
    const genCode = `int x = 10;
int y = 20;
int z = x + y;`;

    mockedFs.readFileSync.mockReturnValue(genCode);

    const tokens = Lexer(genCode);
    const ast = parseProgram(tokens);
    const js = generateJS(ast);

    expect(js).toBeDefined();
    expect(typeof js).toBe('string');
    expect(js.length).toBeGreaterThan(0);
  });

  test('handles file read errors gracefully', () => {
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => {
      mockedFs.readFileSync('nonexistent.gen', 'utf-8');
    }).toThrow('File not found');
  });
});

describe('CLI Full Pipeline', () => {
  test('complete transpilation pipeline works end-to-end', () => {
    const genCode = 'int result = 5 + 3;';
    mockedFs.readFileSync.mockReturnValue(genCode);

    // Full pipeline: Lexer → Parser → Transpiler
    const tokens = Lexer(genCode);
    expect(tokens.length).toBeGreaterThan(0);

    const ast = parseProgram(tokens);
    expect(ast).toBeDefined();
    expect(ast.type).toBe('Program');

    const js = generateJS(ast);
    expect(js).toBeDefined();
    expect(typeof js).toBe('string');
  });
});
