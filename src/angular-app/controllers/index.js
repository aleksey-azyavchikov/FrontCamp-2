module.exports = function(ngModule) {
    require("./article/article-shower.controller.js")(ngModule);
    require("./article/article-editor.controller.js")(ngModule);
    require("./todo-list/todo-list.controller.js")(ngModule);
    require("./todo-page/todo-page.controller.js")(ngModule);
    require("./todo-item/todo-item.controller.js")(ngModule);
    require("./edit-todo-page/edit-todo-page.controller.js")(ngModule);
    require("./forms")(ngModule);
}