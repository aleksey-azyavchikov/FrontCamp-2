// require('../../common-css/common.scss');
require("./todo-list.scss");

module.exports = function(ngModule) {
    ngModule.component("todoList", {
        template: require("./todo-list.html"),
        controller: "todoListCtrl",
        controllerAs: "ctrl",
        bindings: {
            todos: "<",
            title: "<"
        }
    });
}