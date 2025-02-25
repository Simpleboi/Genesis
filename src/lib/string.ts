// For string utilities

export function gRepeat(str: string, count: number) {
  let result = '';
  for (let i = 0; i < count; i++) {
    result += str;
  }
  return result;
}

// JS's map() function
export function gMap(array: Array<any>, fn: Function) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i], i));
  }
  return result;
}

// JS's filter() function
export function gFilter(array: Array<any>, fn: Function) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i)) {
      result.push(array[i]);
    }
  }
  return result;
}

// Function to find a character in a string
export function doesExist(str: string, val: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === val) {
      return true;
    }
  }
  return false;
}

// Break's a string into an Array, replaces the "Join" function in JS
export function breakIntoArray(str: string): Array<string> {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str[i]);
  }
  return result;
}

// Changes every other character to a capital letter, for shits n giggles honestly
export function mock(str: string): string {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (i % 2 == 0) {
      result += str[i].toUpperCase();
    } else {
      result += str[i].toLowerCase();
    }
  }
  return result;
}

// Takes in a string array, and turns it back into a string
export function turnToString(arr: string[]): string {
  let result = '';

  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }

  return result;
}
