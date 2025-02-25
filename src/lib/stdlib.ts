
// Function to generate a range of numbers (python's range)

export function grange(n: any) {
  return [...Array(n).keys()];
}

// Assert function to debug/test genesis code
export function gAssert(condition: any, message: string) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}
