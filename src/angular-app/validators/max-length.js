
module.exports = function (ngModule) {
    ngModule.directive("maxlengthcustom", function () {
        return {
            require: "ngModel",
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.maxlengthcustom = function (modelValue, viewValue) {
                    return (modelValue || "").length > 20 || (modelValue || "").length === 0;
                };
            }
        };
    });
}
