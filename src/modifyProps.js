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

let attr = [];

//get JSXAttribute node
traverse(ast, {
  enter(path) {
    if (path.node.type === "JSXAttribute") {
      path.node.name.name = path.node.name.name + "_x_"
      attr.push(path.node);
      path.node.name.name = path.node.name.name + "_y_"
    }
  }
});

//modify the JSXAttribute node in the attr
attr.forEach(x => {
  x.name.name = x.name.name + "_z_"
})

console.log("*** after ***")
console.log(generate(ast).code);


