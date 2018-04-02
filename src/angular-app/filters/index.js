module.exports = function(ngModule) {
    require("./predicate.filter.js")(ngModule);
    require("./day.filter.js")(ngModule);
    require("./filterByDate.js")(ngModule);
    require("./filterByFirstLetter.js")(ngModule);
}