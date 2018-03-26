// require('../../common-css/common.scss');

module.exports = function(ngModule) {
    ngModule.component("todoPage", {
        template: require("./todo-page.html"),
        controller: "todoPageCtrl",
        controllerAs: "ctrl",
    });
}