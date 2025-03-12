import { print } from './print';

export function swap(x: any, y: any): void {
  let temp;
  temp = x; 
  x = y;     
  y = temp; 
  print(`x is ${x}`);
  print(`y is ${y}`);
}

function addTwo(x: number, y: number) {
    return x + y;
}

addTwo(10, 20);

let result = addTwo(10, 20);

print(result)

