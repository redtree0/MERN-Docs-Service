const dirTree = require("directory-tree");
const path = require("path");

const tree = dirTree(path.join(__dirname, ".."), {attributes:[ 'ino']});

console.log(tree);