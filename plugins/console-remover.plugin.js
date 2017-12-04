const console = "console";
const log = "log";
module.exports = function () {
  return {
    visitor: {
      MemberExpression(path) {
        if(path.node.object.name === console && 
            path.node.property.name === log) {
  			 path.findParent(path => path.isExpressionStatement()).remove()
      	}
      }
    }
  }
}