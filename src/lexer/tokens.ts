// Token Definition

export type Token = 
| {type: "NUMBER"; value: string}
| {type: "PLUS"}
| {type: "MINUS"}
| {type: "TIMES"}
| {type: "DIVIDE"}
| {type: "LEFTPAREN"}
| {type: "RIGHTPAREN"}
| {type: "EOF"} // End of File
