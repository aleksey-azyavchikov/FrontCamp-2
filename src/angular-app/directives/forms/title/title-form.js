
require("./title-form.scss");

module.exports = function(ngModule) {
    ngModule.component("titleForm", {
        template: require("./title-form.html"),
        controller: "titleFormCtrl",
        controllerAs: "ctrl",
        bindings: {
            onSubmit: "&",
            title: "<"
        }
    });
}