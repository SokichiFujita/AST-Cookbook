const parse = require('@babel/parser').parse;
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;
const t = require("@babel/types").default;

const option = {
  sourceType: 'module',
  plugins: ['jsx'],
}

const div = `<div user={{name:"John"}} others={{a:"b"}}>aaa</div>`;

console.log("*** before ***")
console.log(div);

const ast = parse(div, option)

//get JSXAttribute node
traverse(ast, {
  enter(path) {
    if (path.node.type === "JSXAttribute") {
      path.remove()
    }
  }
});

console.log("*** after ***")
console.log(generate(ast).code);


