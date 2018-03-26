

module.exports = function(ngModule) {
    ngModule.filter("predicate", function() {
        return function(array, predicateFn) {
            const result = array.filter(item => predicateFn(item));
            return result;
        };
    })
}