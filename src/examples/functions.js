// Built-in print function
function print(...args) {
  console.log(...args);
}

function greet(name) {
  print("Hello, ");
  print(name);
}
greet("World");
function add(x, y) {
  return (x + y);
}
let sum = add(5, 3);
print(sum);