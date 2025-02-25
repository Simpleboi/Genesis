// Base interface for all AST nodes

export interface ASTNode {
  type: string;
}

// Program Node
export interface Program extends ASTNode {
  type: 'Program';
  body: ASTNode[]; // for statements, func dec, etc
}

// Statements
export interface VariableDeclaration extends ASTNode {
  type: 'VariableDeclaration';
  identifer: string;
  varType?: string; // ex. int, string, bool, etc.
  initializer?: Expression;
}

// Asignment
export interface AssignmentStatement extends ASTNode {
  type: 'AssignmentStatement';
  identifier: string;
  value: Expression;
}

// If Statement
export interface IfStatement extends ASTNode {
  type: 'IfStatement';
  condition: Expression;
  consequent: ASTNode[]; // Body of the 'if' block
  alternate?: ASTNode[]; // Body of the 'else' block
}

/*
While Statement.
contains a conditon and a body of statements
*/ 
export interface WhileStatement extends ASTNode {
  type: 'WhileStatement';
  condition: Expression;
  body: ASTNode[];
}

/*
For Statement
contains optional initialization, condition, and updates expressions, plus a body.
*/
export interface ForStatement extends ASTNode {
  type: 'ForStatement';
  initializer?: ASTNode;
  condition?: Expression;
  update?: Expression;
  body: ASTNode[];
}


/*
Function Declaration.
Contains a function name, optional parameter list, return type, and an array of statements as the body.
*/
export interface FunctionDeclaration extends ASTNode {
    type: "FunctionDeclaration";
    name: string;
    params: Parameter[];
    returnType?: string;
    body: ASTNode[];
}

export interface Parameter {
    identifier: string;
    paramType?: string;
}


/*
Expression Statement.
Wraps an "Expression" in a statement context when you want to allow expressions as standalone statements. 
*/
export interface ExpressionStatement extends ASTNode {
    type: "ExpressionStatement";
    expression: Expression;
}

/*
Expressions.
Expressions can be literal values like numbers, strings, identifier, function calls, or binary/unary expressions.
*/
export interface Identifier extends ASTNode {
  type: 'Identifier';
  name: string;
}

export interface Literal extends ASTNode {
  type: 'Literal';
  value: string | number | boolean;
}

export interface BinaryExpression extends ASTNode {
  type: 'BinaryExpression';
  operator: string; // Like "+", "-", "*", "/", "==", etc.
  left: Expression;
  right: Expression;
}

export interface UnaryExpression extends ASTNode {
  type: 'UnaryExpression';
  operator: string; // like "-", "!"
  argument: Expression;
}

export interface CallExpression extends ASTNode {
  type: 'CallExpression';
  callee: Expression; // an Identifier or another CallExpression
  arguments: Expression[]; // list of expressions passed as arguments
}

// Expressions
export type Expression =
  | Identifier
  | Literal
  | BinaryExpression
  | UnaryExpression
  | CallExpression;
