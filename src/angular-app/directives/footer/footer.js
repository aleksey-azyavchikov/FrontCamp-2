require("./footer.scss");

module.exports = function(ngModule) {
    ngModule.component("footer", {
        restrict: "E",
        template: require("./footer.html")
    });
}