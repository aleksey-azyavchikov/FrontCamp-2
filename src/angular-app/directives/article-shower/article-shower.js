// require('../../common-css/common.scss');
require("./article-shower.scss");

module.exports = function(ngModule) {
    ngModule.component("articleShower", {
        template: require("./article-shower.html"),
        controller: "articleShowerCtrl",
        controllerAs: "ctrl"
    });
    
}