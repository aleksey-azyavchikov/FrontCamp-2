module.exports = function(ngModule) {
    require("./article/article-shower.controller.js")(ngModule);
    require("./article/article-editor.controller.js")(ngModule);
    require("./todo-list/todo-list.controller.js")(ngModule);
    require("./todo-page/todo-page.controller.js")(ngModule);
}