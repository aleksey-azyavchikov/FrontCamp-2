
module.exports = function(ngModule) { 
    ngModule.controller("todoPageCtrl", [
        "$scope", 
        "todoService", 
        function (
            $scope,
            todoService
        ) {
        const ctrl = this;
        ctrl.todos = [
            { text: "a", completed: true, createdDate: new Date(2018, 2, 22) },
            { text: "c", completed: true, createdDate: new Date() },
            { text: "b", completed: false, createdDate: new Date() }
        ]
        ctrl.todoFilters = todoService.todoFilters;
    }]);
}