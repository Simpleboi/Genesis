// Base interface for all AST nodes

export interface ASTNode {
  type: string;
}

// Program Node
export interface ProgramNode extends ASTNode {
  type: 'Program';
  body: ASTNode[]; // for statements, func dec, etc
}

// Statements
export interface VariableDeclarationNode extends ASTNode {
  type: 'VariableDeclaration';
  varType?: string; // ex. int, string, bool, etc.
  identifier: string; // ex. "x", "name"
  initializer?: ExpressionNode | null; // possibly null if no
}

// Asignment
export interface AssignmentStatementNode extends ASTNode {
  type: 'AssignmentStatement';
  identifier: string;
  value: ExpressionNode;
}

// If Statement
export interface IfStatementNode extends ASTNode {
  type: 'IfStatement';
  condition: ExpressionNode;
  consequent: ASTNode[]; // Body of the 'if' block
  alternate?: ASTNode[]; // Body of the 'else' block
}

/*
While Statement.
contains a conditon and a body of statements
*/
export interface WhileStatementNode extends ASTNode {
  type: 'WhileStatement';
  condition: ExpressionNode;
  body: ASTNode[];
}

/*
For Statement
contains optional initialization, condition, and updates expressions, plus a body.
*/
export interface ForStatementNode extends ASTNode {
  type: 'ForStatement';
  initializer?: ASTNode;
  condition?: ExpressionNode;
  update?: ExpressionNode;
  body: ASTNode[];
}

/*
Function Declaration.
Contains a function name, optional parameter list, return type, and an array of statements as the body.
*/
export interface FunctionDeclarationNode extends ASTNode {
  type: 'FunctionDeclaration';
  name: string;
  params: ParameterNode[];
  returnType?: string;
  body: ASTNode[];
}

export interface ParameterNode {
  identifier: string;
  paramType?: string;
}

/*
Expression Statement.
Wraps an "Expression" in a statement context when you want to allow expressions as standalone statements. 
*/
export interface ExpressionStatementNode extends ASTNode {
  type: 'ExpressionStatement';
  expression: ExpressionNode;
}

/*
Expressions.
Expressions can be literal values like numbers, strings, identifier, function calls, or binary/unary expressions.
*/
export interface IdentifierNode extends ASTNode {
  type: 'Identifier';
  name: string;
}

export interface LiteralNode extends ASTNode {
  type: 'Literal';
  value: string | number | boolean;
}

export interface BinaryExpressionNode extends ASTNode {
  type: 'BinaryExpression';
  operator: string; // Like "+", "-", "*", "/", "==", etc.
  left: ExpressionNode;
  right: ExpressionNode;
}

export interface UnaryExpressionNode extends ASTNode {
  type: 'UnaryExpression';
  operator: string; // like "-", "!"
  argument: ExpressionNode;
}

export interface CallExpressionNode extends ASTNode {
  type: 'CallExpression';
  callee: ExpressionNode; // an Identifier or another CallExpression
  arguments: ExpressionNode[]; // list of expressions passed as arguments
}

// Expressions
export type ExpressionNode =
  | IdentifierNode
  | LiteralNode
  | BinaryExpressionNode
  | UnaryExpressionNode
  | CallExpressionNode;
