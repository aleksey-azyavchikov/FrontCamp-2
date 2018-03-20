require("./brand-bar.scss");

module.exports = function(ngModule) {
    ngModule.component("brandBar", {
        restrict: "E",
        template: require("./brand-bar.html")
    });
}