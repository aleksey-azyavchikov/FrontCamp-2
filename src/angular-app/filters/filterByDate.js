module.exports = function(ngModule) {
    ngModule.filter("filterByDate", function() {
        return function(array, input) {
            input = input || "";
            const result = array.filter(item => !input || item.createdDate.toLocaleDateString().startsWith(input));
            return result;
        };
    })
}