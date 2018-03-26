
module.exports = function(ngModule) { 
    ngModule.controller("todoListCtrl", ["$scope", function ($scope) {
        const ctrl = this;
        ctrl.todos = [{text: "d"}];
    }]);
}