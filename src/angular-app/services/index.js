module.exports = function(ngModule) {
    require("./article.http.service.js")(ngModule);
    require("./todo.http.service.js")(ngModule);
    require("./todo.service.js")(ngModule);
}