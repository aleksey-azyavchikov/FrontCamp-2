// require('../../common-css/common.scss');

module.exports = function(ngModule) {
    ngModule.component("editTodoPage", {
        template: require("./edit-todo-page.html"),
        controller: "editTodoPageCtrl",
        controllerAs: "ctrl"
    });
}