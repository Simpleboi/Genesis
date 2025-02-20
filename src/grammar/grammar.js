// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "ws", "symbols": [{"literal":" "}]},
    {"name": "ws", "symbols": [{"literal":"\t"}]},
    {"name": "ws", "symbols": [{"literal":"\n"}]},
    {"name": "ws", "symbols": [{"literal":"\r"}]},
    {"name": "digit", "symbols": [{"literal":"0"}]},
    {"name": "digit", "symbols": [{"literal":"1"}]},
    {"name": "digit", "symbols": [{"literal":"2"}]},
    {"name": "digit", "symbols": [{"literal":"3"}]},
    {"name": "digit", "symbols": [{"literal":"4"}]},
    {"name": "digit", "symbols": [{"literal":"5"}]},
    {"name": "digit", "symbols": [{"literal":"6"}]},
    {"name": "digit", "symbols": [{"literal":"7"}]},
    {"name": "digit", "symbols": [{"literal":"8"}]},
    {"name": "digit", "symbols": [{"literal":"9"}]},
    {"name": "number", "symbols": ["digit+"]},
    {"name": "expression", "symbols": ["digit", {"literal":"+"}]},
    {"name": "digit", "symbols": ["add_expr"]},
    {"name": "digit", "symbols": ["number", {"literal":"-"}]},
    {"name": "number", "symbols": ["sub_expr"]},
    {"name": "number", "symbols": ["number"]},
    {"name": "term", "symbols": ["number"]},
    {"name": "term", "symbols": [{"literal":"("}, "expression", {"literal":")"}]}
]
  , ParserStart: "ws"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
