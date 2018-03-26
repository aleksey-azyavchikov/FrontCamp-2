module.exports = function(ngModule) {
    require("./http.service.js")(ngModule);
    require("./todo.service.js")(ngModule);
}