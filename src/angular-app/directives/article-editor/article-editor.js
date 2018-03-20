// require("../../common-css/common.scss");
require("./article-editor.scss");

module.exports = function(ngModule) {
    ngModule.directive("articleEditor", articleEditorFn);

    function articleEditorFn() {
        return  {
            restrict: "E",
            scope: {},
            template: require("./article-editor.html"),
            controller: "articleEditorCtrl",
            controllerAs: "ctrl"
        }
    }
}