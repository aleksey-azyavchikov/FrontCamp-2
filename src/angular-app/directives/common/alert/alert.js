
module.exports = function(ngModule) {
    ngModule.component("alert", {
        template: require("./alert.html"),
        controllerAs: "ctrl",
        bindings: {
            message: "<",
        }
    });
}