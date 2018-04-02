module.exports = function(ngModule) {
    ngModule.filter("filterByFirstLetter", function() {
        return function(array, input) {
            input = input || "";
            const result = array.filter(item => !input || item.text[0] === input[0]);
            return result;
        };
    })
}