const parse = require('@babel/parser').parse;
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;
const t = require("@babel/types").default;

const option = {
  sourceType: 'module',
  plugins: ['jsx'],
}

const div = `<div>aaa</div>`;
const code = `
const message = "hello"
console.log(message);
console.log("world");
`

console.log("*** before ***")
console.log(div);

const ast = parse(div, option)
const ast2 = parse(code, option)

let es = []
traverse(ast2, {
  enter(path) {
    if (path.node.type === "Program") {
      es = es.concat(path.node.body)
    }
  }
});

traverse(ast, {
  enter(path) {
    if (path.node.type === "Program") {
      path.node.body = es.concat(path.node.body)
    }
  }
});

console.log("*** after ***")
console.log(generate(ast).code);