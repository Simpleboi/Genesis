import { print } from "./lib/print";
import { turnToString, breakIntoArray } from "./lib/string";

let str = "Nate";

let strArr = breakIntoArray(str)
print(breakIntoArray(str));

let backIntoStr = turnToString(strArr);
print(backIntoStr);