// require('../../common-css/common.scss');
require("./todo-item.scss");

module.exports = function(ngModule) {
    ngModule.component("todoItem", {
        template: require("./todo-item.html"),
        controller: "todoItemCtrl",
        controllerAs: "vm",
        bindings: {
            todo: "=",
        }
    });
}