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
const div2 = `<div>bbb</div>`;

console.log("*** before ***")
console.log(div);
console.log(div2);

const ast = parse(div, option)
const ast2 = parse(div2, option)

let attr = [];

traverse(ast, {
  enter(path) {
    if (path.node.type === "JSXAttribute") {
      attr.push(path.node);
    }
  }
});

traverse(ast2, {
  enter(path) {
    if (path.node.type === "JSXOpeningElement") {
      attr.forEach(x => {
        path.node.attributes.push(x)
      })
    }
  }
});

console.log("*** after ***")
console.log(generate(ast).code);
console.log(generate(ast2).code);


